module.exports = {
  'extends': [
    'standard'
  ],
  'plugins': [],
  'rules': {
    'node/exports-style': ['error', 'exports'],
    'func-names': 2,
    'no-var': 2,
    'camelcase': 0,
    'array-bracket-spacing': 2,
    'object-curly-spacing': [
      2,
      'always'
    ],
    'indent': [
      'error',
      2,
      {
        'SwitchCase': 1,
        'VariableDeclarator': 1,
        'outerIIFEBody': 1,
        'MemberExpression': 1,
        'FunctionDeclaration': {
          'parameters': 'first',
          'body': 1
        },
        'FunctionExpression': {
          'parameters': 1,
          'body': 1
        },
        'CallExpression': {
          'arguments': 1
        },
        'ArrayExpression': 1,
        'ObjectExpression': 1,
        'ImportDeclaration': 1,
        'flatTernaryExpressions': false,
        'ignoreComments': false
      }
    ] // ,
    // 'mocha/no-exclusive-tests': 'error',
    // 'mocha/handle-done-callback': 'error',
    // 'mocha/no-return-and-callback': 'error',
    // 'mocha/no-skipped-tests': 'error',
    // 'should-promised/return-promise': 'error',
  },
  'env': {
    'browser': false,
    'node': true,
    // 'mocha': true,
    'es6': true
  }
}
