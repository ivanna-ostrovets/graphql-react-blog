import { useState } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import styles from './App.module.css';
import PrivateRoute from './components/PrivateRoute';
import Login from './features/login/Login';
import { AppRoute } from './shared/appRoute';

function App() {
  const [token, setToken] = useState(localStorage.getItem('token') || '');

  return (
    <BrowserRouter>
      <div className={styles.app}>
        <Switch>
          <Route path={AppRoute.Login}>
            <Login setToken={setToken} />
          </Route>

          <PrivateRoute token={token} path={AppRoute.Default}>
            Posts
          </PrivateRoute>
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
