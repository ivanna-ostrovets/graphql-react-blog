import { gql, useMutation, useQuery } from '@apollo/client';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { PostForm } from '../../components/PostForm/PostForm';
import styles from './PostDetails.module.css';

const POST_DETAILS_FIELDS = gql`
  fragment PostDetailsFields on Post {
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
    isRead @client
    readCount @client
  }
`;

const GET_POST_BY_ID = gql`
  ${POST_DETAILS_FIELDS}
  query GetPostById($id: ID!) {
    post: postById(id: $id) {
      ...PostFields
    }
  }
`;

const EDIT_POST = gql`
  ${POST_DETAILS_FIELDS}
  mutation EditPost($id: ID!, $body: PatchPostInput!) {
    post: patchPost(postId: $id, body: $body) {
      ...PostFields
    }
  }
`;

export function PostDetails() {
  const { id } = useParams<{ id: string }>();
  const { loading, data } = useQuery(GET_POST_BY_ID, {
    variables: { id },
  });
  const [editPost] = useMutation(EDIT_POST);

  const [isEdit, setEdit] = useState(false);
  const [post, setPost] = useState<any>();

  const editPostHandler = async (post: any) => {
    const { data } = await editPost({ variables: { id, body: post } });

    setPost(data?.post);
    setEdit(false);
  };

  useEffect(() => {
    const postsReadCount = JSON.parse(
      localStorage.getItem('postsReadCount') || '{}',
    );

    if (postsReadCount[id]) {
      postsReadCount[id] += 1;
    } else {
      postsReadCount[id] = 1;
    }

    localStorage.setItem('postsReadCount', JSON.stringify(postsReadCount));
  }, [id]);

  useEffect(() => {
    if (!data?.post) return;

    setPost(data?.post);
  }, [data?.post]);

  if (loading || !post) return null;

  if (isEdit) return <PostForm onSubmit={editPostHandler} post={post} />;

  return (
    <div className={styles.post}>
      <button className={styles.editButton} onClick={() => setEdit(!isEdit)}>
        Edit
      </button>

      {post.isRead && (
        <div>
          ✔ <span>Read {post.readCount} times</span>
        </div>
      )}

      <h1>{post.title}</h1>

      {post.image?.url && (
        <img
          key={Date.now()}
          src={`${post.image?.url}?${new Date().getTime()}`}
          alt={`Post ${post.title}`}
        />
      )}

      <div className={styles.postDetails}>
        <div>
          {post.user.name} ({post.user.email})
        </div>

        <div>{post.dateCreated}</div>
      </div>

      <div>{post.body}</div>

      <h3>Comments</h3>

      {post.comments?.map((comment: any) => (
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
