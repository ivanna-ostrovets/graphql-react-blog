import { authMiddleware } from './authMiddleware';
import { AuthAPI } from './data-source';
import { getProfile } from './getProfile';
import { permissions } from './permissions';
import { authResolvers } from './resolvers';
import { authTypeDefs } from './schema';

export {
  AuthAPI,
  authMiddleware,
  authResolvers,
  authTypeDefs,
  getProfile,
  permissions,
};
