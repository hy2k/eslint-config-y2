import type { Linter } from 'eslint';

import eslint from '@eslint/js';
import typescriptPlugin from '@typescript-eslint/eslint-plugin';
import typescriptParser from '@typescript-eslint/parser';
import importPlugin from 'eslint-plugin-import';
import perfectionistPlugin from 'eslint-plugin-perfectionist';
import robloxTsPlugin from 'eslint-plugin-roblox-ts';

type FlatConfig = Linter.FlatConfig;
type RulesRecord = Linter.RulesRecord;

export const ignores: FlatConfig = {
	ignores: ['**/node_modules/**', '**/dist/**', '**/out/**'],
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
	'@typescript-eslint/switch-exhaustiveness-check': 'error',

	'no-shadow': 'off',
	'no-unused-vars': 'off',
};

export const tsConfig: FlatConfig = {
	files: ['**/*.ts'],
	languageOptions: {
		// @ts-ignore
		parser: typescriptParser,
		parserOptions: {
			project: `tsconfig.json`,
			sourceType: 'module',
		},
	},
	plugins: {
		// @ts-ignore
		'@typescript-eslint': typescriptPlugin,
	},
	rules: tsRules,
};

export const robloxConfig: FlatConfig = {
	files: ['**/*.ts'],
	ignores: ['**/out/**'],
	languageOptions: {
		parserOptions: {
			ecmaFeatures: {
				jsx: true,
			},
			ecmaVersion: 'latest',
			project: 'tsconfig.json',
			sourceType: 'module',
		},
	},
	plugins: {
		// @ts-ignore
		'@typescript-eslint': typescriptPlugin,
		'roblox-ts': robloxTsPlugin,
	},
	rules: {
		...robloxTsPlugin.configs.recommended.rules,

		// Overrides some rules roblox-ts config turns off
		...tsRules,

		// Roblox-ts does not allow this
		'@typescript-eslint/ban-ts-comment': 'error',

		// Luau can throw string errors, so this is fine
		'@typescript-eslint/no-throw-literal': 'off',
	},
};

export const importConfig: FlatConfig = {
	files: ['**/*.ts'],
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
