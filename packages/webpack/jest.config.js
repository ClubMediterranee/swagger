// eslint-disable-next-line node/exports-style
module.exports = (name) => {
  return {
    roots: [
      '<rootDir>/src'
    ],
    collectCoverageFrom: [
      'src/**/*.{js,jsx,ts,tsx}',
      '!src/**/*.d.ts'
    ],
    setupFiles: [
      'react-app-polyfill/jsdom',
      require.resolve('./jest/setupTests.js')
    ],
    setupFilesAfterEnv: [],
    testMatch: [
      '<rootDir>/src/**/__tests__/**/*.{js,jsx,ts,tsx}',
      '<rootDir>/src/**/*.{spec,test}.{js,jsx,ts,tsx}'
    ],
    testEnvironment: 'jest-environment-jsdom-fourteen',
    transform: {
      '^.+\\.(js|jsx|ts|tsx)$': require.resolve('./jest/babelTransform.js'),
      '^.+\\.css$': require.resolve('./jest/cssTransform.js'),
      '^(?!.*\\.(js|jsx|ts|tsx|css|json)$)': require.resolve('./jest/fileTransform.js')
    },
    transformIgnorePatterns: [
      '[/\\\\]node_modules[/\\\\].+\\.(js|jsx|ts|tsx)$',
      '^.+\\.module\\.(css|sass|scss)$'
    ],
    modulePaths: [],
    moduleNameMapper: {
      'react/jsx-dev-runtime': require.resolve('react/jsx-dev-runtime'),
      'react/jsx-runtime': require.resolve('react/jsx-runtime'),
      '^react$': require.resolve('react'),
      '^react-native$': 'react-native-web',
      '^.+\\.module\\.(css|sass|scss)$': 'identity-obj-proxy'
    },
    moduleFileExtensions: [
      'web.js',
      'js',
      'web.ts',
      'ts',
      'web.tsx',
      'tsx',
      'json',
      'web.jsx',
      'jsx',
      'node'
    ],
    watchPlugins: [
      'jest-watch-typeahead/filename',
      'jest-watch-typeahead/testname'
    ],
    reporters: [
      'default',
      ['jest-junit', {
        suiteName: `jest tests ${name}`,
        outputName: `test-results-${name}.xml`,
        outputDirectory: '<rootDir>/../../../reports'
      }]
    ]
  }
}
