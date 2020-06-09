module.exports = {
  testRegex: '(\\.(test|spec|inttest|intspec))\\.(js)$',
  moduleFileExtensions: ['js', 'json', 'node' ],
  globalSetup: './__tests__/setup.js',
  globalTeardown: './__tests__/teardown.js',
  testEnvironment: 'node',
  verbose: false, // so that we can console.log in test files
  moduleNameMapper: {
    '^@controllers(.*)$': '<rootDir>/src/controllers$1',
    '^@src(.*)$': '<rootDir>/src/$1',
  }
}