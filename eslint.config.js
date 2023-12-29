import { baseConfig, ignoresConfig, importConfig, sortConfig, tsConfig } from './dist/index.js';

// Ignore untyped plugins
tsConfig.rules = {};

/** @type {import("eslint").Linter.FlatConfig[]} */
export default [
	// prettier-ignore
	ignoresConfig,
	baseConfig,

	tsConfig,

	importConfig,
	sortConfig,
];
