import {
	baseConfig,
	ignoresConfig,
	importConfig,
	perfConfig,
	reactConfig,
	robloxConfig,
	sortConfig,
	testConfig,
	tsOverridesConfig,
} from 'eslint-config-y2';

// Project must be overriden for multi-place Roblox projects.
// This also applies to mono-repo setup using NPM/PNPM workspace.
robloxConfig.languageOptions.parserOptions = {
	...robloxConfig.languageOptions.parserOptions,
	project: ['projects/*/tsconfig.json'],
};

// Treat TS path alias like $shared, $server, $client, etc as internal modules
const sortImport = sortConfig.rules['perfectionist/sort-imports'];
sortImport[1]['internal-pattern'] = ['$*/**'];

// Apply same parser options to JSX config when using React-Roblox
reactConfig.languageOptions = {
	...robloxConfig.languageOptions,
};

/** @type {import("eslint").Linter.FlatConfig[]} */
export default [
	ignoresConfig,

	{
		// Skip generated files and local scripts
		ignores: ['**/service.d.ts', 'scripts/**'],
	},

	baseConfig,
	robloxConfig,
	reactConfig,

	// Turns off eslint rules that are better handled by TypeScript
	tsOverridesConfig,

	importConfig,
	testConfig,
	sortConfig,
	perfConfig,
];
