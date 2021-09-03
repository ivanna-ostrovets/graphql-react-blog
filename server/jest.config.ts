const { defaults } = require('jest-config');

module.exports = {
  verbose: true,
  transform: { '\\.ts$': ['ts-jest'] },
  moduleFileExtensions: [...defaults.moduleFileExtensions, 'ts', 'tsx'],
};
