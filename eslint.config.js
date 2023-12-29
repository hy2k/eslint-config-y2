import { baseConfig, ignoresConfig, importConfig, sortConfig, tsConfig, tsOverrideRules } from './dist/index.js';

/** @type {import("eslint").Linter.FlatConfig[]} */
export default [
	// prettier-ignore
	ignoresConfig,
	baseConfig,

	{
		...tsConfig,
		rules: tsOverrideRules,
	},

	importConfig,
	sortConfig,
];
