import { RouteProps } from 'react-router';
import { Redirect, Route } from 'react-router-dom';
import { AppRoute } from '../shared/appRoute';

interface Props extends RouteProps {
  token: string;
}

function PrivateRoute({ children, token, ...rest }: Props) {
  return (
    <Route
      {...rest}
      render={({ location }) =>
        token ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: AppRoute.Login,
              state: { from: location },
            }}
          />
        )
      }
    />
  );
}

export default PrivateRoute;
