// @flow
import React, { type ComponentType } from 'react';
import { useSelector } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';
// import { Head } from '../components';
import { getAppRoutes } from '../utils/contentProviders';
import { sessionLoggedInSelector } from '../redux/selectors/session';

type AppRouteType = ({
  isPrivate: boolean,
  title?: string,
  component: ComponentType<*>,
  redirectPath?: string,
}) => React$Node;

const AppRoute: AppRouteType = ({
  isPrivate,
  title,
  component: Component,
  redirectPath = getAppRoutes().signIn,
  ...rest
}) => {
  const isLoggedIn = useSelector(sessionLoggedInSelector);

  const renderRoute = (props: Object) => {
    if (isPrivate) {
      if (isLoggedIn) {
        return <Component {...props} />;
      }

      return (
        <Redirect
          to={{ pathname: redirectPath, state: { from: props.location } }}
        />
      );
    } else {
      return <Component {...props} />;
    }
  };

  return (
    <>
      {/*<Head title={title} />*/}
      <Route {...rest} render={renderRoute} />
    </>
  );
};

export default AppRoute;
