import { RESTDataSource } from 'apollo-datasource-rest';
import DataLoader from 'dataloader';
import { paginate } from '../../shared/utils/paginate';

export class UsersAPI extends RESTDataSource {
  private loader: DataLoader<string | number, unknown>;

  constructor() {
    super();
    this.baseURL = process.env.API_URL;
    this.loader = new DataLoader((ids) => this.getUserByIds(ids));
  }

  willSendRequest(request) {
    request.headers.set('Authorization', this.context.token);
  }

  async getUsers() {
    return this.get('users');
  }

  async getUsersPaginated({ pageNumber, pageSize }) {
    return paginate({ data: await this.getUsers(), pageNumber, pageSize });
  }

  async getUserById(id: string | number) {
    return this.get(`users/${id}`);
  }

  async getUserByIds(ids: readonly (string | number)[]) {
    return this.get(`users?ids=[${ids.join(',')}]`);
  }

  async createUser(body) {
    return this.post('users', body);
  }

  async updateUser(userId: string, body) {
    return this.put(`users/${userId}`, body);
  }

  async patchUser(userId: string, body) {
    return this.patch(`users/${userId}`, body);
  }

  async deleteUser(userId: string) {
    return this.delete(`users/${userId}`);
  }
}
