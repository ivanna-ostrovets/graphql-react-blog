import { gql, useQuery } from '@apollo/client';
import { Link } from 'react-router-dom';
import { AppRoute } from '../../shared/appRoute';

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

export function PostList() {
  const { loading, error, data } = useQuery(GET_POSTS);

  if (loading) return null;

  if (error) return <div>Error! {error}</div>;

  return (
    <div>
      <h1>Posts</h1>

      {data.posts.map((post: any) => (
        <Link key={post.id} to={`${AppRoute.Posts}/${post.id}`}>
          <div style={{ marginBottom: 10 }}>
            {post.image?.thumbnailUrl && (
              <img src={post.image?.thumbnailUrl} alt={`Post ${post.title}`} />
            )}

            <div>
              <div>{post.title}</div>
              <div>{post.dateCreated}</div>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}
