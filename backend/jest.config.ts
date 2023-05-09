import type { Config } from '@jest/types'

const config: Config.InitialOptions = {
    moduleFileExtensions: ['js', 'json', 'ts'],
    rootDir: '.',
    testRegex: '.*\\.spec\\.ts$',
    transform: {
        '^.+\\.(t|j)s$': 'ts-jest',
    },
    collectCoverageFrom: ['**/*.(t|j)s'],
    coverageDirectory: './coverage',
    testEnvironment: 'node',
    roots: ['<rootDir>/libs/', '<rootDir>/apps/'],
    moduleNameMapper: {
        '^@app/auth(|/.*)$': '<rootDir>/libs/auth/src/$1',
        '^@app/models(|/.*)$': '<rootDir>/libs/models/src/$1',
        '^@app/users(|/.*)$': '<rootDir>/libs/users/src/$1',
    },
    modulePathIgnorePatterns: [
        '<rootDir>/dist/',
        '<rootDir>/node_modules/',
        '<rootDir>/fixtures/',
        '<rootDir>/apps/fixtures/',
        '<rootDir>/libs/auth/src/auth.service.spec.ts',
        '<rootDir>/apps/backend/src/controllers/users.controller.spec.ts',
    ],
    setupFilesAfterEnv: ['<rootDir>/test-utils/jest/test-setup.ts'],
}

export default config
