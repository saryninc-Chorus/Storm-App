# sort-util

[![npm version](https://badge.fury.io/js/%40saryninc-chorus%2Fsort-util.svg)](https://www.npmjs.com/package/@saryninc-chorus/sort-util)
[![npm downloads](https://img.shields.io/npm/dm/@saryninc-chorus/sort-util.svg)](https://www.npmjs.com/package/@saryninc-chorus/sort-util)
[![CI](https://github.com/saryninc-Chorus/sort-util/workflows/CI/badge.svg)](https://github.com/saryninc-Chorus/sort-util/actions)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

Utility to sort arrays of objects by a key with options for descending, locale, case-insensitive, custom accessor, and custom comparator.

## Install
```bash
npm install @saryninc-chorus/sort-util
```

## Import
```javascript
import { sortByKey } from '@saryninc-chorus/sort-util';
```

## Usage
```javascript
const data = [{ id: 3 }, { id: 1 }, { id: 2 }];
const asc = sortByKey(data, 'id');        // [ {id:1}, {id:2}, {id:3} ]
const desc = sortByKey(data, 'id', { desc: true });
```

Case-insensitive:
```javascript
sortByKey(items, 'name', { caseInsensitive: true });
```

Locale:
```javascript
sortByKey(items, 'title', { locale: 'de' });
```

Accessor:
```javascript
sortByKey(rows, 'ignored', { accessor: r => r.meta.score });
```

Custom comparator:
```javascript
sortByKey(rows, 'name', { comparator: (a, b) => a.length - b.length });
```

Null/undefined: always pushed to end (or start if desc).

Non-array input: returns [].

Non-mutating: original array is not changed.

## API
sortByKey(array, key, options)
- key: string (ignored if accessor provided)
- options:
  - desc: boolean
  - locale: string (localeCompare locale)
  - caseInsensitive: boolean
  - accessor(item): any
  - comparator(aValue, bValue): number

## Test
```bash
npm test
```

## License
MIT