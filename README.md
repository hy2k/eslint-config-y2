# eslint-config-y2

> [!IMPORTANT]
> Use biome.

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
	tsOverridesConfig,
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
	tsOverridesConfig,
];
```
