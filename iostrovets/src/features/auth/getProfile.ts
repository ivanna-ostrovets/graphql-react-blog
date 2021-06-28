import { ApolloError } from 'apollo-server-express';
import axios from 'axios';

export async function getProfile(token: string) {
  if (!token) return;

  try {
    const response = await axios.get(`${process.env.API_URL}profile`, {
      headers: { Authorization: token },
    });

    return response.data;
  } catch (error) {
    if (error.response.status === 401 || error.response.status === 403) return;

    throw new ApolloError(error);
  }
}
