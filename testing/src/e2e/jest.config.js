module.exports = {
  testMatch: ['**/?(*.)+(ispec|test).[t]s'],
  transform: {
    '^.+\\.ts?$': 'ts-jest',
  },
  testTimeout: 60000,
}
