# meaninglessdirtree
Build meaningless directory structure.

## Install

```Bash
$ npm install daikiueda/meaninglessdirtree
```

## Usage

```JavaScript
var meaninglessdirtree = require( "meaninglessdirtree" );
meaninglessdirtree( targetRootDir, dirBandLimit, dirLevelLimit, fileCount, options );
```

## Example

```Bash
$ mkdir test
$ cd test

$ npm i daikiueda/meaninglessdirtree

$ mkdir target
$ node -e 'require( "meaninglessdirtree" )( "target", 2, 2, 2 )'
```

result
```
./test
├── node_modules
└── target
    ├── barbaz
    │   ├── bar
    │   │   ├── baz.bar
    │   │   └── quxnorf.foo
    │   ├── foobar
    │   │   ├── baz.bar
    │   │   └── quxnorf.foo
    │   ├── norffoo.foo
    │   └── qux.bar
    ├── barbaz.foo
    ├── foo.bar
    └── qux
        ├── barbaz
        │   ├── norffoo.foo
        │   └── qux.bar
        ├── baz
        │   ├── norffoo.foo
        │   └── qux.bar
        ├── foobar.foo
        └── norf.bar
```
