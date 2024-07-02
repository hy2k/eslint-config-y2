import type { FlatConfig as TSFlatConfig } from '@typescript-eslint/utils/ts-eslint';
import type { Linter } from 'eslint';

import eslint from '@eslint/js';
import typescriptPlugin from '@typescript-eslint/eslint-plugin';
import typescriptParser from '@typescript-eslint/parser';
import importPlugin from 'eslint-plugin-import';
import perfectionistPlugin from 'eslint-plugin-perfectionist';
import reactPlugin from 'eslint-plugin-react';
import reactHookPlugin from 'eslint-plugin-react-hooks';
import robloxTsPlugin from 'eslint-plugin-roblox-ts';
import tsEslint from 'typescript-eslint';

type FlatConfig = Linter.FlatConfig;
type RulesRecord = Linter.RulesRecord;

export const ignoresConfig: FlatConfig = {
	ignores: ['**/node_modules/**', '**/dist/**', '**/out/**', '**/.next/**', '**/.wrangler/**', '**/*.json'],
};

export const baseConfig: FlatConfig = {
	files: ['**/*'],
	rules: {
		...eslint.configs.recommended.rules,

		curly: ['warn', 'all'],
		'function-paren-newline': ['warn', 'multiline-arguments'],
		'object-shorthand': ['warn', 'never'],
		'prefer-arrow-callback': 'error',
	},
};

// Disable rules that are incompatible with or better handled by TypeScript
export const tsOverrideRules: RulesRecord = typescriptPlugin.configs['eslint-recommended'].overrides.reduce(
	(acc, override) => {
		return {
			...acc,
			...override.rules,
		};
	},
	{},
);

export const tsRules: RulesRecord = {
	...tsOverrideRules,
	...typescriptPlugin.configs['strict-type-checked'].rules,

	'@typescript-eslint/consistent-indexed-object-style': ['warn', 'index-signature'],
	'@typescript-eslint/consistent-type-imports': [
		'warn',
		{
			disallowTypeAnnotations: true,
			fixStyle: 'separate-type-imports',
			prefer: 'type-imports',
		},
	],
	'@typescript-eslint/explicit-function-return-type': 'error',
	'@typescript-eslint/method-signature-style': ['warn', 'property'],
	'@typescript-eslint/no-shadow': 'error',
	'@typescript-eslint/no-unused-vars': [
		'warn',
		{
			args: 'all',
			argsIgnorePattern: '^_',
			varsIgnorePattern: '^_',
		},
	],
	'@typescript-eslint/restrict-template-expressions': [
		'error',
		{
			allowNumber: true,
		},
	],
	'@typescript-eslint/switch-exhaustiveness-check': 'error',

	'no-shadow': 'off',
	'no-unused-vars': 'off',
};

const defaultParserOptions: Linter.ParserOptions = {
	ecmaFeatures: {
		jsx: true,
	},
	project: `tsconfig.json`,
	sourceType: 'module',
};

export const tsConfig: TSFlatConfig.Config = tsEslint.config({
	files: ['**/*.{ts,tsx}'],
	languageOptions: {
		parser: typescriptParser,
		parserOptions: {
			...defaultParserOptions,
		},
	},
	plugins: {
		'@typescript-eslint': typescriptPlugin,
	},
	rules: {
		...tsRules,
	},
})[0];

export const robloxConfig: TSFlatConfig.Config = tsEslint.config({
	files: ['**/*.{ts,tsx}'],
	ignores: ['**/out/**'],
	languageOptions: {
		parser: typescriptParser,
		parserOptions: {
			...defaultParserOptions,
		},
	},
	plugins: {
		'@typescript-eslint': typescriptPlugin,
		'roblox-ts': robloxTsPlugin,
	},
	rules: {
		...robloxTsPlugin.configs.recommended.rules,

		// Overrides some rules roblox-ts config turns off
		...tsRules,

		// Roblox-ts does not allow this
		'@typescript-eslint/ban-ts-comment': 'error',

		// See: https://roblox-ts.com/docs/guides/callbacks-vs-methods
		'@typescript-eslint/method-signature-style': 'off',

		// Luau can throw string errors, so this is fine
		'@typescript-eslint/no-throw-literal': 'off',
	},
})[0];

export const tsOverridesConfig: FlatConfig = {
	files: ['**/*.{ts,tsx}'],
	rules: {
		...tsOverrideRules,
	},
};

export const reactConfig: TSFlatConfig.Config = tsEslint.config({
	files: ['**/*.jsx', '**/*.tsx'],
	languageOptions: {
		parser: typescriptParser,
		parserOptions: {
			...defaultParserOptions,
		},
	},
	plugins: {
		react: reactPlugin,
		'react-hooks': reactHookPlugin,
	},
	rules: {
		...reactPlugin.configs.recommended.rules,
		...reactPlugin.configs['jsx-runtime'].rules,
		...reactHookPlugin.configs.recommended.rules,
	},
	settings: {
		react: {
			version: 'detect',
		},
	},
})[0];

export const importConfig: FlatConfig = {
	files: ['**/*.{ts,tsx}'],
	ignores: ['**/*.config.js', '**/*.config.ts'],
	plugins: {
		import: importPlugin,
	},
	rules: {
		'import/max-dependencies': 'off',
		'import/no-default-export': 'warn',
		'import/no-duplicates': 'warn',
		'import/no-extraneous-dependencies': ['error', { devDependencies: false }],
		'import/no-mutable-exports': 'warn',
	},
};

export const testConfig: FlatConfig = {
	files: ['**/*.test.*', '**/*.spec.*'],
	rules: {
		'@typescript-eslint/unbound-method': 'off',
		'import/no-extraneous-dependencies': 'off',
	},
};

// Ref: https://typescript-eslint.io/linting/troubleshooting/performance-troubleshooting
export const perfConfig: FlatConfig = {
	files: ['**/*'],
	rules: {
		'@typescript-eslint/indent': 'off',
		'import/default': 'off',
		'import/named': 'off',
		'import/namespace': 'off',
		'import/no-cycle': 'off',
		'import/no-deprecated': 'off',
		'import/no-named-as-default': 'off',
		'import/no-named-as-default-member': 'off',
		'import/no-unused-modules': 'off',
		indent: 'off',
	},
};

export const sortConfig: FlatConfig = {
	files: ['**/*'],
	plugins: {
		perfectionist: perfectionistPlugin,
	},
	rules: Object.entries(perfectionistPlugin.configs['recommended-natural'].rules)
		.map(([key, value]) => {
			return [key, ['warn', value[1]]];
		})
		.reduce((acc, [key, value]) => {
			// @ts-ignore
			acc[key] = value;
			return acc;
		}, {}),
};
