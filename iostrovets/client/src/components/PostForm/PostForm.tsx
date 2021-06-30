import { useState } from 'react';
import styles from './PostForm.module.css';

export function PostForm({
  post,
  onSubmit,
}: {
  post?: any;
  onSubmit: (post: any) => void;
}) {
  const [title, setTitle] = useState(post?.title);
  const [body, setBody] = useState(post?.body);
  const [image, setImage] = useState<any>();

  const onSubmitHandler = () => {
    const newPost: any = { title, body };

    if (image) newPost.image = image;

    onSubmit(newPost);
  };

  return (
    <form onSubmit={onSubmitHandler} className={styles.post}>
      <label>
        <div>Title:</div>
        <input
          type="text"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
        />
      </label>

      <label>
        <div>Body:</div>
        <textarea
          value={body}
          onChange={(event) => setBody(event.target.value)}
        />
      </label>

      <label>
        <div>Image:</div>

        {post.image?.url && (
          <img src={post.image?.url} alt={`Post ${post.title}`} />
        )}

        <input
          type="file"
          onChange={({ target: { validity, files } }) => {
            if (validity.valid && files && files[0]) {
              setImage(files[0]);
            }
          }}
        />
      </label>

      <input
        type="button"
        value="Submit"
        className={styles.submitButton}
        onClick={onSubmitHandler}
      />
    </form>
  );
}
