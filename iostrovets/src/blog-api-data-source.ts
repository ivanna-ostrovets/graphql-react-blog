import { RESTDataSource } from 'apollo-datasource-rest';

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
    const posts = await this.get('posts');
    const photos = await this.get('/albums/1/photos');

    return posts.map(async (post) => {
      const photo = getRandomValueFromArray(photos);
      const user = await this.getUserById(post.userId);
      const comments = await this.getCommentsByPost(post.id);

      return {
        ...post,
        user,
        comments,
        dateCreated: new Date(),
        photo: {
          url: photo.url,
          thumbnailUrl: photo.thumbnailUrl,
        },
      };
    });
  }

  async getPostById(id: string | number) {
    return this.get(`posts/${id}`);
  }

  async getPostsByUser(userId: string | number) {
    return this.get(`posts?userId=${userId}`);
  }

  async getUsers() {
    const users = await this.get('users');

    return users.map((user) => ({
      ...user,
      gender: getRandomValueFromArray(GENDERS),
    }));
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
}
