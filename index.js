var postcss = require('postcss');

DEFAULT_OPTIONS = {
  fallback: 'column-count'
}
AVAILABLE_FALLBACKS = ['column-count', 'overflow', 'clearfix']
 
module.exports = postcss.plugin('postcss-display-flow-root', function(options) {
  var options = Object.assign({}, DEFAULT_OPTIONS, options)
  
  return function(root, result) {
    if (AVAILABLE_FALLBACKS.indexOf(options.fallback) === -1) {
      result.warn(
        "Fallback option '" + options.fallback + "' isn`t available, choose from the followings: " + 
        AVAILABLE_FALLBACKS.join(', ') + "."
      )
    }
    
    root.walkRules(function(rule) {
      // NOTE: nothing to do, if element have overflow:hidden cuz it create own flow
      var haveOverflowHidden = false;
      rule.walkDecls('overflow', function(decl) {
        if (decl.value == 'hidden') { haveOverflowHidden = true; }
      });
      rule.walkDecls('display', function(decl) {
        if (decl.value == 'flow-root' && !haveOverflowHidden) {
          switch (options.fallback) {
            case 'column-count':
              rule.append('column-count: 1;');
              break;
            case 'clearfix':
              // TODO: case when rule.selector already pseudo-element
              // NOTE: last clearfix version (IE8+) https://css-tricks.com/snippets/css/clear-fix/
              root.append(rule.selector + '::after {content: "";display: table;clear: both;}');
              break;
            case 'overflow':
              rule.append('overflow: hidden;');
              break;
          }
        }
      })
    });
  }
});
