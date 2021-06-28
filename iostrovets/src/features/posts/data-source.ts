import { RESTDataSource } from 'apollo-datasource-rest';
import { paginate } from '../../shared/utils/paginate';

export class PostsAPI extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = process.env.API_URL;
  }

  willSendRequest(request) {
    request.headers.set('Authorization', this.context.token);
  }

  async getPosts() {
    return this.get('posts');
  }

  async getPostsPaginated({ pageNumber, pageSize }) {
    return paginate({ data: await this.getPosts(), pageNumber, pageSize });
  }

  async getPostById(id: string | number) {
    return this.get(`posts/${id}`);
  }

  async getPostsByUser(userId: string | number) {
    return this.get(`posts?userId=${userId}`);
  }

  async createPost(body) {
    return this.post('posts', body);
  }

  async uploadPostImage(postId, imageBuffer) {
    return this.post(`post-image/${postId}`, imageBuffer);
  }

  async updatePost(postId: string, body) {
    return this.put(`posts/${postId}`, body);
  }

  async patchPost(postId: string, body) {
    return this.patch(`posts/${postId}`, body);
  }

  async deletePost(postId: string) {
    return this.delete(`posts/${postId}`);
  }
}
