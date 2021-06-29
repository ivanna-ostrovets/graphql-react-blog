import { RESTDataSource } from 'apollo-datasource-rest';
import { paginate } from '../../shared/utils/paginate';

export class CommentsAPI extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = process.env.API_URL;
  }

  willSendRequest(request) {
    request.headers.set('Authorization', this.context.token);
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
