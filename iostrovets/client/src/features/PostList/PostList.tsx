import { gql, useMutation, useQuery, useSubscription } from '@apollo/client';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { AppRoute } from '../../shared/appRoute';
import styles from './PostList.module.css';

const POST_FIELDS = gql`
  fragment PostFields on Post {
    id
    title
    dateCreated
    image {
      thumbnailUrl
    }
  }
`;

const GET_POSTS = gql`
  ${POST_FIELDS}
  query GetPosts {
    posts {
      ...PostFields
    }
  }
`;

const DELETE_POST = gql`
  mutation DeletePost($id: ID!) {
    deletePost(postId: $id)
  }
`;

export const ON_POST_DELETED = gql`
  ${POST_FIELDS}
  subscription OnPostDeleted {
    posts: postDeleted {
      ...PostFields
    }
  }
`;

export function PostList() {
  const { data } = useQuery(GET_POSTS);
  const { data: subData } = useSubscription(ON_POST_DELETED);
  const [deletePost] = useMutation(DELETE_POST);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    if (!data?.posts) return;

    setPosts(data?.posts);
  }, [data?.posts]);

  useEffect(() => {
    if (!subData?.posts) return;

    setPosts(subData?.posts);
  }, [subData?.posts]);

  return (
    <div>
      <h1>Posts</h1>

      {posts.map((post: any) => (
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
