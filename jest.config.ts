import type { Config } from 'jest';

const config: Config = {
  clearMocks: true,
  preset: 'ts-jest',
  testEnvironment: 'jsdom',

  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],

  testMatch: [
    '<rootDir>/src/**/__tests__/**/*.test.[jt]s?(x)',
    '<rootDir>/src/**/*.test.[jt]s?(x)',
  ],
  testPathIgnorePatterns: ['/node_modules/', '/dist/', '/.github/', '/public/'],

  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest',
    '^.+\\.svg$': 'jest-transform-stub',
  },

  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
    '\\.(jpg|jpeg|png|gif|svg)$': '<rootDir>/src/__mocks__/svgMock.ts',
  },

  collectCoverage: true,
  collectCoverageFrom: ['src/**/*.{ts,tsx}', '!src/**/*.d.ts', '!src/**/index.ts'],

  coverageReporters: ['json', 'lcov', 'text', 'clover'],

  coverageThreshold: {
    global: {
      branches: 40,
      functions: 40,
      lines: 40,
      statements: 40,
    },
  },

  globals: {
    'ts-jest': {
      tsconfig: 'tsconfig.app.json',
    },
  },
};

export default config;
