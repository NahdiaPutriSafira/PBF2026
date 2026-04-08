import nextJest from 'next/jest.js';

const createJestConfig = nextJest({
  // Provide the path to your Next.js app to load next.config.js and .env files in your test environment
  dir: './',
});

// Add any custom config to be passed to Jest
/** @type {import('jest').Config} */
const config = {
  // Add more setup options before each test is run
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],

  coverageProvider: 'v8',
  testEnvironment: 'jsdom',
  modulePaths: ['<rootDir>/src'],
  collectCoverage: true,
  collectCoverageFrom: [
    'src/**/*.{js,jsx,ts,tsx}',
    '!**/*.d.ts',
    '!**/node_modules/**',
    '!<rootDir>/next.config.ts',
    '!<rootDir>/out/**',
    '!<rootDir>/.next/**',
    '!<rootDir>/*.config.js',
    '!<rootDir>/src/pages/api/auth/**',
    '!<rootDir>/src/utlis/db/**',
    '!<rootDir>/src/views/auth/**',
    '!<rootDir>/src/views/produk/HeroSection.tsx',
    '!<rootDir>/src/views/produk/MainSection.tsx',
    '!<rootDir>/coverage/**',
  ],
};

// createJestConfig is exported this way to ensure that next/jest can load the Next.js config which is async
export default createJestConfig(config);