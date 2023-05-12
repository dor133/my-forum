import type { Config } from '@jest/types'
import 'jest-extended'

const config: Config.InitialOptions = {
    verbose: true,
    moduleFileExtensions: ['js', 'json', 'ts'],
    rootDir: '.',
    testRegex: '.*\\.spec\\.ts$',
    transform: {
        '^.+\\.(t|j)s$': 'ts-jest',
    },
    collectCoverageFrom: ['**/*.(t|j)s'],
    coveragePathIgnorePatterns: ['/node_modules/', '/dist/', '/fixtures/', '/test-utils/', '/apps/fixtures/', '/apps/backend/test/'],
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
        '<rootDir>/apps/backend/src/controllers/users.controller.spec.ts',
        '<rootDir>/libs/auth/src/local-auth.guard.spec.ts',
    ],
    setupFilesAfterEnv: ['<rootDir>/test-utils/jest/test-setup.ts', 'jest-extended/all'],
}

export default config
