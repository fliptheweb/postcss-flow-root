var postcss = require('postcss');
 
module.exports = postcss.plugin('postcss-display-flow-root', function(options) {
  options = options || {};
  
  return function(root) {
    root.walkRules(function(rule) {
      // NOTE: nothing to do, if element have overflow:hidden cuz it create own flow
      var haveOverflowHidden = false;
      rule.walkDecls('overflow', function(decl) {
        if (decl.value == 'hidden') {
          haveOverflowHidden = true;
        }
      });
      rule.walkDecls('display', function(decl) {
        if (decl.value == 'flow-root' && !haveOverflowHidden) {
          // NOTE: last clearfix version (IE8+) https://css-tricks.com/snippets/css/clear-fix/
          root.append(rule.selector + '::after {content: "";display: table;clear: both;}');
        }
      });
    });
  }
});
