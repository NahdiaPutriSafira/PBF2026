import nextJest from 'next/jest.js';

const createJestConfig = nextJest({
    dir: './'
});

/** @type {import('jest').Config} */
const config = {
    coverageProvider: 'v8',
    testEnvironment: 'jsdom', // Huruf 't' harus kecil
};

// createJestConfig harus dipanggil sebagai fungsi dan membungkus 'config'
export default createJestConfig(config);