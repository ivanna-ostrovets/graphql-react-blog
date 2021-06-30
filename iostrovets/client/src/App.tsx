import { gql, useLazyQuery, useReactiveVar } from '@apollo/client';
import { useEffect, useState } from 'react';
import { BrowserRouter, Link, Route, Switch } from 'react-router-dom';
import styles from './App.module.css';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';
import Login from './features/Login/Login';
import { PostDetails } from './features/PostDetails/PostDetails';
import { PostList } from './features/PostList/PostList';
import { UsersList } from './features/UsersList/UsersList';
import { currentUserVar } from './index';
import { AppRoute } from './shared/appRoute';

const GET_PROFILE = gql`
  query GetProfile {
    user: profile {
      name
      role
    }
  }
`;

function App() {
  const [token, setToken] = useState(localStorage.getItem('token') || '');
  const [getProfile, { data }] = useLazyQuery(GET_PROFILE);
  const currentUser = useReactiveVar(currentUserVar);

  useEffect(() => {
    if (!token) return;

    getProfile();
  }, [getProfile, token]);

  useEffect(() => {
    currentUserVar(data?.user);
  }, [data?.user]);

  return (
    <BrowserRouter>
      <div className={styles.app}>
        {token && (
          <header className={styles.header}>
            <div>
              <Link to={AppRoute.Posts}>Posts</Link>
              {currentUser?.role === 'ADMIN' && (
                <Link to={AppRoute.Users}>Users</Link>
              )}
            </div>

            <div className={styles.userSection}>
              <div>Hello, {currentUser?.name}</div>

              <button
                onClick={async () => {
                  await localStorage.clear();
                  await currentUserVar({});
                  await setToken('');
                }}
              >
                Log Out
              </button>
            </div>
          </header>
        )}

        <Switch>
          <Route path={AppRoute.Login}>
            <Login setToken={setToken} />
          </Route>

          <PrivateRoute exact token={token} path={AppRoute.Posts}>
            <PostList />
          </PrivateRoute>

          <PrivateRoute exact token={token} path={`${AppRoute.Posts}/:id`}>
            <PostDetails />
          </PrivateRoute>

          {currentUser?.role === 'ADMIN' && (
            <PrivateRoute exact token={token} path={AppRoute.Users}>
              <UsersList />
            </PrivateRoute>
          )}

          <PrivateRoute token={token} path="*">
            <PostList />
          </PrivateRoute>
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
