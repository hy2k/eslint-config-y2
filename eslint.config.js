import {
	baseConfig,
	ignores,
	importConfig,
	perfConfig,
	robloxConfig,
	sortConfig,
	testConfig,
	tsConfig,
} from './index.js';

/** @type {import("eslint").Linter.FlatConfig[]} */
export default [
	ignores,
	baseConfig,
	tsConfig,
	robloxConfig,
	importConfig,
	testConfig,
	sortConfig,
	perfConfig,
];
