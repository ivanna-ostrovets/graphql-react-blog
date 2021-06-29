import { gql, useQuery } from '@apollo/client';

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
        <div key={post.id} style={{ marginBottom: 10 }}>
          {post.image?.thumbnailUrl && (
            <img src={post.image?.thumbnailUrl} alt={`Post ${post.title}`} />
          )}

          <div>
            <div>{post.title}</div>
            <div>{post.dateCreated}</div>
          </div>
        </div>
      ))}
    </div>
  );
}
