# exac

## What is it?

exac = **EX**istential **AC**cessor - usefull feature from Groovy (read more http://docs.groovy-lang.org/latest/html/documentation/index.html#_safe_navigation_operator)

## Why?

**TL;DR;** https://esdiscuss.org/topic/existential-operator-null-propagation-operator

We have **config.json** (NOTE: some fields are optional):
```
{
    ...
    "foo": {
      "bar": true,
      "baz": "foo",
      "aaa": {
        "bbb": "my_value",
        "ccc": false,
        "ddd": {
          "xxx": "brbrbr",
          "yyy": "mew-mew",
          "zzz": null
        },
        "eee": {
          "www": true,
          "ttt": [1, 2, 3]
        }
      }
    }
    ...
}
```

We want to do `const v = config.aaa.ddd.zzz.kkk;`

### What should we do?

**Option 1**

```
if (config && config.aaa && config.aaa.ddd && config.aaa.ddd.zzz && config.aaa.ddd.zzz.kkk) {
    // bla-bla-bla
}
```

**Option 2**
```
const DEDAULT_VALUE = 'moo';
const v = config && config.aaa && config.aaa.ddd && config.aaa.ddd.zzz && config.aaa.ddd.zzz.kkk || DEFAUL_VALUE;
```

**Option 3**
```
const v = ((((config || {}).aaa || {}).ddd || {}).zzz || {}).kkk;
```

### Have you ever seen the most pretty syntax?

Yep, sure! I show you (of course you have forgot CoffeeScript):
```
const v = config?.aaa?.ddd?.zzz?.kkk;
```

But it's not realized yet, it is only discussed... You can read more here: https://esdiscuss.org/topic/existential-operator-null-propagation-operator

OK, let's polyfill!

## How to

```
const exac = require('exac'),
      config = exac(require('./config.json'));
      
//...

let v = config.aaa.ddd.zzz.kkk.$; // "$" at the end id mandatory - it's terminator

```

What is the `$`??? Yes, it's a little bit ugly, but it's only the way to terminate "test & get" recursion.

## Installation
```
npm install exac --save --production
```

## Pre-requisites

* Proxy (https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy)
* ES Classes (https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes)

## Documentation

function exac(obj : Object, terminator = '$' : string) : Proxy

Params:

* `obj` - entity you want ot wrap
* `terminator` - symbol at the end of 'dot-notation' chain, by default `$`

Returns:

* `<Proxy>` - proxied object with lazy recursion
 
## What's futher?

We're looking forward for a native implementation in ES or at least in Babel/Babylon

## Todo

we need more tests!...

## License

MIT

