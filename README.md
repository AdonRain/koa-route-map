# koa-route-map
Koa route middleware

---

## Install

```
$ npm i koa-route-map --save
```

## Example

app.js
```
const koa = require('koa');
const routeMap = require('koa-route-map');

const app = koa();
app.use(routeMap('./services/'));

app.listen(3000);
```

services/index.js
```
exports.get = {
    '/': 'home.index',
    '/foo': 'home.foo',
    '/bar': 'page.bar',
};

exports.post = {
    // your config
}
```

services/home/index.js
```
exports.index = function*(){
  this.body = 'Hello';
};

exports.home = function*(){
  this.body = 'world';
};
```

## LICENSE

MIT
