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

importConfig.files?.push('**/*.js');

/** @type {import("eslint").Linter.FlatConfig[]} */
// eslint-disable-next-line import/no-default-export
export default [
	//
	ignores,
	baseConfig,
	tsConfig,
	robloxConfig,
	importConfig,
	testConfig,
	sortConfig,
	perfConfig,
];
