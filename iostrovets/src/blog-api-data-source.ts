import { RESTDataSource } from 'apollo-datasource-rest';
import { paginate } from './utils/paginate';

const GENDERS = ['FEMALE', 'MALE', 'OTHER'];

function getRandomValueFromArray(array) {
  return array[Math.floor(Math.random() * array.length)];
}

export class BlogAPI extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = 'https://jsonplaceholder.typicode.com/';
  }

  async getPosts() {
    return (await this.get('posts')).map(async (post) => ({
      ...post,
      dateCreated: new Date(),
    }));
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

  async updatePost(postId: string, body) {
    return this.put(`posts/${postId}`, body);
  }

  async patchPost(postId: string, body) {
    return this.patch(`posts/${postId}`, body);
  }

  async deletePost(postId: string) {
    return this.delete(`posts/${postId}`);
  }

  async getUsers() {
    const users = await this.get('users');

    return users.map((user) => ({
      ...user,
      gender: getRandomValueFromArray(GENDERS),
    }));
  }

  async getUsersPaginated({ pageNumber, pageSize }) {
    return paginate({ data: await this.getUsers(), pageNumber, pageSize });
  }

  async getUserById(id: string | number) {
    return {
      ...(await this.get(`users/${id}`)),
      gender: getRandomValueFromArray(GENDERS),
    };
  }

  async getComments() {
    return (await this.get('comments')).map((comment) => ({
      ...comment,
      dateCreated: new Date(),
    }));
  }

  async getCommentsPaginated({ pageNumber, pageSize }) {
    return paginate({ data: await this.getComments(), pageNumber, pageSize });
  }

  async getCommentById(id: string | number) {
    return {
      ...(await this.get(`comments/${id}`)),
      dateCreated: new Date(),
    };
  }

  async getCommentsByUser(userId: string | number) {
    return (await this.get(`comments/?userId=${userId}`)).map((comment) => ({
      ...comment,
      dateCreated: new Date(),
    }));
  }

  async getCommentsByPost(postId: string | number) {
    return (await this.get(`comments/?postId=${postId}`)).map((comment) => ({
      ...comment,
      dateCreated: new Date(),
    }));
  }

  async getPhoto() {
    const photos = await this.get('/albums/1/photos');
    const photo = getRandomValueFromArray(photos);

    return {
      url: photo.url,
      thumbnailUrl: photo.thumbnailUrl,
    };
  }
}
