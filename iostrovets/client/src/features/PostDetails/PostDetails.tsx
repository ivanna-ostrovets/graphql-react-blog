import { gql, useQuery } from '@apollo/client';
import { useParams } from 'react-router-dom';
import styles from './PostDetails.module.css';

const GET_POST_BY_ID = gql`
  query GetPostById($id: ID!) {
    post: postById(id: $id) {
      title
      dateCreated
      body
      image {
        url
      }
      user {
        email
        name
      }
      comments {
        id
        name
        body
        dateCreated
        user {
          email
          name
        }
      }
    }
  }
`;

export function PostDetails() {
  const { id } = useParams<{ id: string }>();
  const { loading, error, data } = useQuery(GET_POST_BY_ID, {
    variables: { id },
  });

  if (loading) return null;

  if (error) return <div>Error! {error}</div>;

  return (
    <div className={styles.post}>
      <h1>{data.post.title}</h1>

      {data.post.image?.url && (
        <img src={data.post.image?.url} alt={`Post ${data.post.title}`} />
      )}

      <div className={styles.postDetails}>
        <div>
          {data.post.user.name} ({data.post.user.email})
        </div>

        <div>{data.post.dateCreated}</div>
      </div>

      <div>{data.post.body}</div>

      <h3>Comments</h3>

      {data.post.comments?.map((comment: any) => (
        <div className={styles.comment} key={comment.id}>
          <b>{comment.name}</b>

          <div className={styles.postDetails}>
            <div>
              {comment.user.name} ({comment.user.email})
            </div>

            <div>{comment.dateCreated}</div>
          </div>

          <div>{comment.body}</div>
        </div>
      ))}
    </div>
  );
}
