import  type { Config } from '@jest/types';

const config: Config.InitialOptions = {
    preset: 'ts-jest',             // Используем ts-jest для трансформации TypeScript
    testEnvironment: 'node',       // Тестовый окружение – Node.js
    roots: ['<rootDir>/src', '<rootDir>/__tests__'], // Корневые директории для поиска тестов
    transform: {
        '^.+\\.ts$': 'ts-jest',      // Трансформация файлов .ts с помощью ts-jest
    },
    moduleFileExtensions: ['ts', 'js', 'json', 'node'], // Расширения модулей
    testMatch: [                   // Шаблоны поиска тестовых файлов
        '**/*.test.ts',
        '**/*.e2e.test.ts'
    ],
    collectCoverageFrom: [         // Определяем файлы для покрытия тестами
        'src/**/*.{ts,js}',
        '!src/**/*.d.ts'
    ],
    coverageDirectory: 'coverage', // Директория для отчётов покрытия
    verbose: true,                 // Подробный вывод результатов тестов
};

export default config;
