// @flow
import React, { Suspense, useEffect, lazy } from 'react';
import { Switch, Route, useLocation } from 'react-router-dom';
import { getAppRoutes } from './utils/contentProviders';
import Layout from './layout';
import AppRoute from './containers/AppRoute';
import Loader from './components/Loader';

type RoutesType = () => React$Node;

const Pages = {};

const Routes: RoutesType = () => {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
  }, [location]);

  return (
    <Suspense fallback={<Loader />}>
      <Layout>
        <Switch>
          <Route
            path={getAppRoutes().auth}
            component={lazy(() => import('./pages/Auth'))}
          />
          <Route
            path={getAppRoutes().candidateDetails}
            component={lazy(() => import('./pages/CandidateDetails'))}
          />
          <AppRoute
            isPrivate
            path={getAppRoutes().onboarding}
            component={lazy(() => import('./pages/Onboarding'))}
          />
          <AppRoute
            isPrivate
            path={getAppRoutes().apply}
            component={lazy(() => import('./pages/CandidateDetails'))}
          />
          <AppRoute
            isPrivate
            path={getAppRoutes().createJob}
            component={lazy(() => import('./pages/PublishJob'))}
          />
          <AppRoute
            isPrivate
            exact
            path={getAppRoutes().jobs}
            component={lazy(() => import('./pages/Jobs'))}
          />
          <AppRoute
            isPrivate
            exact
            path={getAppRoutes().applications}
            component={lazy(() => import('./pages/Applications'))}
          />
          <Route
            exact
            path={getAppRoutes().jobDetails}
            component={lazy(() => import('./pages/JobDetails'))}
          />
          <Route
            exact
            path={getAppRoutes().search}
            component={lazy(() => import('./pages/Search'))}
          />
          <Route
            exact
            path={getAppRoutes().categories}
            component={lazy(() => import('./pages/Categories'))}
          />
          <Route
            path={getAppRoutes().home}
            component={lazy(() => import('./pages/Home'))}
          />
        </Switch>
      </Layout>
    </Suspense>
  );
};

export default Routes;
