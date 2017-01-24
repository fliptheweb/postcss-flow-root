## Clearfix fallback for display: flow-root
Use `display: flow-root` without a mess today, just add clearfix fallback by that simple plugin. [Article about `flow-root`.](https://rachelandrew.co.uk/archives/2017/01/24/the-end-of-the-clearfix-hack/)

Transform that:
```css
.selector {
  display: flow-root;
}
```
to
```css
.selector {
  display: flow-root;
}

.selector::after {
  content: '';
  display: table;
  clear: both;
}
```

### Installation
```sh
yarn add --dev postcss-flow-root
```
or
```sh
npm install --save-dev postcss-flow-root
```

And add to your postcss plugins list, for example in `webpack`:
```js
postcss: function () {
  return [
    require('postcss-flow-root')()
  ];
}
```
