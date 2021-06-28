import { AuthenticationError } from 'apollo-server-express';

export async function authMiddleware(resolve, parent, args, context, info) {
  if (!context.user && info.fieldName !== 'login') {
    throw new AuthenticationError('Authentication failed');
  }

  return await resolve(parent, args, context, info);
}
