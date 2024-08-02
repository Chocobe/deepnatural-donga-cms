module.exports = {
  testEnvironment: "jest-environment-jsdom",

  preset: 'ts-jest',
  verbose: true,
  automock: false,

  transform: {
    '^.+\\.(ts|tsx)$': ['ts-jest', { 
      diagnostics: { 
        ignoreCodes: ['TS151001'] 
      } 
    }],
    '^.+\\.(js|jsx)$': 'babel-jest',
  },
  moduleNameMapper: {
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
  },
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.(ts|tsx|js)$',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
};
