# eslint-config-y2

Highly opinionated ESLint flat config for my TypeScript projects.

## Usage

```bash
npm i -D eslint-config-y2
```

### Example

```js
import {
	baseConfig,
	ignoresConfig,
	importConfig,
	perfConfig,
	sortConfig,
	testConfig,
	tsConfig,
} from 'eslint-config-y2';

/** @type {import("eslint").Linter.FlatConfig[]} */
export default [
	// prettier-ignore
	ignoresConfig,
	baseConfig,
	tsConfig,
	importConfig,
	testConfig,
	sortConfig,
	perfConfig,
];
```

### Example for multi-place Rojo setup using Roblox-TS and React-Roblox

```ts
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
// Override if custom React-hooks modules use .ts extension, but since it may raise some false
// positive for Matter-hooks, only jsx/tsx is checked by default.
reactConfig.files = ['**/*.{tsx,ts}'];

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

	{
		// Turns off rules that may conflict with Prettier
		files: ['**/*'],
		rules: {
			'no-mixed-spaces-and-tabs': 'off',
		},
	},
];
```
