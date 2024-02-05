import nextPlugin from '@next/eslint-plugin-next';
import {
	baseConfig,
	ignoresConfig,
	importConfig,
	perfConfig,
	reactConfig,
	sortConfig,
	testConfig,
	tsConfig,
	tsOverridesConfig,
} from 'eslint-config-y2';

/** @type {import("eslint").Linter.FlatConfig[]} */
export default [
	ignoresConfig,

	baseConfig,
	tsConfig,
	importConfig,

	reactConfig,
	{
		files: ['*.ts', '*.tsx'],
		plugins: {
			'@next/next': nextPlugin,
		},
		rules: {
			...nextPlugin.configs.recommended.rules,
			...nextPlugin.configs['core-web-vitals'].rules,
		},
	},
	// App router expects default exports
	{
		files: ['**/page.tsx', '**/layout.tsx', '**/not-found.tsx'],
		rules: {
			'import/no-default-export': 'off',
		},
	},

	tsOverridesConfig,

	testConfig,
	sortConfig,
	perfConfig,
];
