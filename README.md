# node-utils

This node library is utility function package, especially JSON object access.

## Install

```
$ npm install --save @taharactrl/utils
```

## Usage

## Subtract JSON (`subtractJSON`)

```
const _utils = require('@taharactrl/utils');

const jsonA = {
  a1: "hoge",
  a2: "foo",
  a3: [123],
};

const jsonB = {
  a1: "hoge",
  a2: "foo",
};

const ret1 = _utils.subtractJSON(jsonA, jsonB)
console.log(ret1)
// => ['a3']

const ret2 = _utils.subtractJSON(jsonB, jsonA)
console.log(ret2)
// => []

```

## Difference JSON (`differenceJSON`)

```
const _utils = require('@taharactrl/utils');

const jsonA = {
  a1: "hoge",
  a2: "foo",
  a3: [123],
  a5: [1]
};

const jsonB = {
  a1: "hoge",
  a2: "foo",
  a4: [234],
  a5: [2]
};

const ret = _utils.differenceJSON(jsonA, jsonB)
console.log(ret1)
// => ["a3", "a5.0", "a4"]
```

## Detect recursive object (`detectRecursiveObject`)

```
const _utils = require('@taharactrl/utils');

class A {
  constructor(){
    this.a = {b: this}
    this.c = this;
    this.d = [this];
  }
}

const a = new A();

const ret = _utils.detectRecursiveObject(a);
console.log(ret)
// => ['a.b', 'c', 'd.0']

```

## Include JSON (`includeJSON`)

```
const _utils = require('@taharactrl/utils');

const jsonA = {
  a1: "hoge",
  a2: "foo",
  a3: [123],
};

const jsonB = {
  a1: "hoge",
  a2: "foo",
};

const ret1 = _utils.includeJSON(jsonA, jsonB)
console.log(ret1)
// => true

const ret2 = _utils.includeJSON(jsonB, jsonA)
console.log(ret2)
// => false
```

## Equal JSON (`equalJSON`)

```
const _utils = require('@taharactrl/utils');

const jsonA = {
  a1: "hoge",
  a2: "foo",
  a3: [123],
};

const jsonB = {
  a1: "hoge",
  a2: "foo",
};

const jsonC = {
  a1: "hoge",
  a2: "foo",
  a3: [123],
};

const ret1 = _utils.equalJSON(jsonA, jsonB)
console.log(ret1)
// => false

const ret2 = _utils.equalJSON(jsonA, jsonC)
console.log(ret2)
// => true
```
