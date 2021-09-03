import { gql, useMutation } from '@apollo/client';
import { Dispatch, SetStateAction, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { AppRoute } from '../../shared/appRoute';
import styles from './Login.module.css';

const LOGIN = gql`
  mutation Login($email: EmailAddress!, $password: String!) {
    login(email: $email, password: $password)
  }
`;

export default function Login({
  setToken,
}: {
  setToken: Dispatch<SetStateAction<string>>;
}) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const history = useHistory();
  const [login] = useMutation(LOGIN);

  const handleLogin = async () => {
    const { data } = await login({
      variables: {
        email,
        password,
      },
    });
    const token = data.login;

    if (token) {
      await setToken(token);
      await localStorage.setItem('token', token);
      history.push(AppRoute.Posts);
    }
  };

  return (
    <div className={styles.container}>
      <form
        onSubmit={handleLogin}
        autoComplete="on"
        className={styles.loginForm}
      >
        <label>
          Email:
          <input
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
        </label>

        <label htmlFor="password">
          Password:
          <input
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        </label>

        <input type="button" value="Login" onClick={handleLogin} />
      </form>
    </div>
  );
}
