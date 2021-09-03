import { RESTDataSource } from 'apollo-datasource-rest';

export class AuthAPI extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = process.env.API_URL;
  }

  willSendRequest(request) {
    request.headers.set('Authorization', this.context.token);
  }

  async login(email, password) {
    return this.post('login', { email, password });
  }

  async profile() {
    return this.get('profile');
  }
}
