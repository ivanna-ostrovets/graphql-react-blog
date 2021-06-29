import { gql, useMutation, useQuery } from '@apollo/client';
import { Link } from 'react-router-dom';
import { AppRoute } from '../../shared/appRoute';
import styles from './PostList.module.css';

const GET_POSTS = gql`
  query GetPosts {
    posts {
      id
      title
      dateCreated
      image {
        thumbnailUrl
      }
    }
  }
`;

const DELETE_POST = gql`
  mutation DeletePost($id: ID!) {
    deletePost(postId: $id)
  }
`;

export function PostList() {
  const { loading, error, data } = useQuery(GET_POSTS);
  const [deletePost] = useMutation(DELETE_POST);

  if (loading) return null;

  if (error) return <div>Error! {error}</div>;

  return (
    <div>
      <h1>Posts</h1>

      {data.posts.map((post: any) => (
        <div key={post.id} className={styles.postContainer}>
          <Link to={`${AppRoute.Posts}/${post.id}`}>
            <div className={styles.post}>
              {post.image?.thumbnailUrl && (
                <img
                  src={post.image?.thumbnailUrl}
                  alt={`Post ${post.title}`}
                />
              )}

              <div>
                <div>{post.title}</div>
                <div>{post.dateCreated}</div>
              </div>
            </div>
          </Link>

          <button
            className={styles.deletePostButton}
            onClick={() => deletePost({ variables: { id: post.id } })}
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}
