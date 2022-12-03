# What is this?

This is a low footprint (Less than 1kb) Map implementation that expires entries after a given time.

# How do I install it?

You can install it by using the following command:

```bash
npm install @cadienvan/expirable-map
```

# How to use it?

Simply import the module and start using it as follows:

```js
import { ExpirableMap } from "@cadienvan/expirable-map";
const map = new ExpirableMap(1000); // 1000 is the expiration time in milliseconds, default for every entry
map.set("key", "value");
map.get("key"); // "value"
```

You can also pass a third parameter to the `set` method to override the default expiration time (`0`) for that entry:

```js
map.set("key", "value", 2000); // 2000 is the expiration time in milliseconds for this entry
```

The ExpirableMap also has a `setExpiration` method which takes a `key` and a `timeInMs` arguments and expires the entry associated with that key after the specified expiration time:

```js
map.setExpiration("key", 2000); // Expires the entry associated with the key "key" after 2000 milliseconds
```

Passing `0` as the expiration time will make the entry never expire:

```js
map.set("key", "value", 0); // The entry associated with the key "key" will never expire
```

# How does this work?

The implementation is so simple because it extends the native `Map` class and overrides the `set` method to add a timeout that will remove the entry after the given time, just needing a new `setExpiration` method to manage the timeouts.  

# What if I set a key that already exists?

The `set` method will override the previous entry and reset the timeout for that key.

# Tests

You can run the tests by using the following command:

```bash
npm test
```

# Scaffolding

This project was generated using Cadienvan's own [npm-package-ts-scaffholding](https://github.com/Cadienvan/npm-package-ts-scaffholding) so it has all the necessary tools to develop, test and publish a TypeScript package importable both via CommonJS and ES Modules.