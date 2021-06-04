import { RESTDataSource } from 'apollo-datasource-rest';
import { paginate } from './shared/utils/paginate';

export class BlogAPI extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = 'http://localhost:3000/';
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

  async getComments() {
    return this.get('comments');
  }

  async getCommentsPaginated({ pageNumber, pageSize }) {
    return paginate({ data: await this.getComments(), pageNumber, pageSize });
  }

  async getCommentById(id: string | number) {
    return this.get(`comments/${id}`);
  }

  async getCommentsByUser(userId: string | number) {
    return this.get(`comments/?userId=${userId}`);
  }

  async getCommentsByPost(postId: string | number) {
    return this.get(`comments/?postId=${postId}`);
  }

  async createComment(body) {
    return this.post('comments', body);
  }

  async updateComment(commentId: string, body) {
    return this.put(`comments/${commentId}`, body);
  }

  async patchComment(commentId: string, body) {
    return this.patch(`comments/${commentId}`, body);
  }

  async deleteComment(commentId: string) {
    return this.delete(`comments/${commentId}`);
  }
}
