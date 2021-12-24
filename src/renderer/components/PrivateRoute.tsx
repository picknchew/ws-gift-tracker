import { Route, Redirect } from 'react-router-dom';
import { useAuth } from 'renderer/hooks/useAuth';
import { RouteProps } from 'react-router';

function PrivateRoute({ children, ...rest }: RouteProps) {
  const auth = useAuth();
  return (
    <Route
      // eslint-disable-next-line
      {...rest}
      render={({ location }) =>
        auth.isAuth ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: '/',
              state: { from: location },
            }}
          />
        )
      }
    />
  );
}

export default PrivateRoute;
