## Fallback for display: flow-root
Use `display: flow-root` without a mess today, just add fallback by that simple plugin. [Article about `flow-root`.](https://rachelandrew.co.uk/archives/2017/01/24/the-end-of-the-clearfix-hack/).

Transform that
```css
.selector {
  display: flow-root;
}
```
to
```css
.selector {
  display: flow-root;
  column-count: 1;
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

### Usage
Add `postcss-flow-root` to your plugins list, for example in `webpack`:
```js
postcss: function () {
  return [
    require('postcss-flow-root')(options)
  ];
}
```
Be careful: use plugin before `autoprefixer`.

### Options
You can choose fallback for emulate flow-root. There is a [sandbox](http://codepen.io/SelenIT/pen/GrEbop) with all methods by [@SelenIT](https://github.com/SelenIT).
```js
{
  fallback: 'column-count' (default) | 'clearfix' | 'overflow'
}
```
- `column-count` - create block formatting context for element, [browser support](http://caniuse.com/#feat=multicolumn) (IE10+);
- `clearfix` - add [clearfix](https://css-tricks.com/snippets/css/clear-fix/) by pseudo-element;
- `overflow` - use `overflow: hidden` fallback.
