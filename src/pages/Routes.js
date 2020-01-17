import React from 'react';
import { Route, Switch, Link } from 'react-router-dom';
import { ROUTES } from 'config/routes';

export default class Router extends React.PureComponent {
  render() {
    return (
      <Switch>
        <Route
          exact
          path={ROUTES.HOME_PAGE}
          component={() => (
            <div>
              Home page<Link to={ROUTES.LOGIN}>test</Link>
            </div>
          )}
        />
        <Route exact path={ROUTES.LOGIN} component={() => <div>Login</div>} />
      </Switch>
    );
  }
}
