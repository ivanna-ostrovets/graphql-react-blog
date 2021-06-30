import { useState } from 'react';
import { BrowserRouter, Link, Route, Switch } from 'react-router-dom';
import styles from './App.module.css';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';
import Login from './features/Login/Login';
import { PostDetails } from './features/PostDetails/PostDetails';
import { PostList } from './features/PostList/PostList';
import { UsersList } from './features/UsersList/UsersList';
import { AppRoute } from './shared/appRoute';

function App() {
  const [token, setToken] = useState(localStorage.getItem('token') || '');

  return (
    <BrowserRouter>
      <div className={styles.app}>
        {token && (
          <header className={styles.header}>
            <Link to={AppRoute.Posts}>Posts</Link>
            <Link to={AppRoute.Users}>Users</Link>
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

          <PrivateRoute exact token={token} path={AppRoute.Users}>
            <UsersList />
          </PrivateRoute>

          <PrivateRoute token={token} path="*">
            <PostList />
          </PrivateRoute>
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
