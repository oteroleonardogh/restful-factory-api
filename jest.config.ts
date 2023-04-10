import type { Config } from '@jest/types';

export default async (): Promise<Config.InitialOptions> => {
  return {
    verbose: true,
    transform: {
      '^.+\\.tsx?$': 'ts-jest',
    },
    watchman: false,
    testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.(jsx?|tsx?)$',
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
    setupFilesAfterEnv: ['./src/__tests__/setupTests.ts'],
    testPathIgnorePatterns: ['<rootDir>/node_modules/', '<rootDir>/build/', '<rootDir>/dist/', '<rootDir>/coverage/', '<rootDir>/src/__tests__/setupTests.ts'],
  };
};