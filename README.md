# eslint-config-y2

Highly opinionated ESLint flat config for my TypeScript projects.

## Usage

```bash
npm i -D eslint-config-y2
```

### eslint.config.js

```js
import {
	baseConfig,
	ignores,
	importConfig,
	perfConfig,
	robloxConfig,
	sortConfig,
	testConfig,
	tsConfig,
} from 'eslint-config-y2';

/** @type {import("eslint").Linter.FlatConfig[]} */
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
```
