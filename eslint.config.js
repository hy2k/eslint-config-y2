import { baseConfig, ignores, importConfig, sortConfig, tsConfig, tsOverrideRules } from './dist/index.js';

/** @type {import("eslint").Linter.FlatConfig[]} */
export default [
	//
	ignores,
	baseConfig,

	{
		...tsConfig,
		rules: tsOverrideRules,
	},

	importConfig,
	sortConfig,
];
