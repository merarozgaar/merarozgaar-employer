// @flow
import React, { Fragment } from 'react';
import { Card, Col, Container, Row } from 'react-bootstrap';
import { Link, Route, Switch } from 'react-router-dom';
import { getAppRoutes } from '../utils/contentProviders';
import SignupContainer from '../modules/signup';
import LoginContainer from '../modules/login';
import EditProfileContainer from '../modules/edit-profile';
import AppRoute from '../containers/AppRoute';
import { useTranslation } from 'react-i18next';

const Auth = (): React$Node => {
  const { t } = useTranslation();

  return (
    <div className="d-flex align-items-center min-vh-100 bg-light">
      <Container>
        <Row className="align-items-center">
          <Col className="d-none d-md-block" md={{ span: 5 }}>
            <h1 className="mt-0 text-primary">
              {t('Find a Perfect Job Match')}
            </h1>
            <p className="lead">
              {t('Find your dream job with Mera Rozgaar app.')}
            </p>
            <img src="/assets/signup.svg" className="w-100" />
          </Col>
          <Col md={{ span: 6, offset: 1 }}>
            <Card className="mt-5 p-5 border-0 shadow-sm">
              <Card.Body>
                <Switch>
                  <AppRoute
                    isPrivate
                    exact
                    path={getAppRoutes().onboarding}
                    component={() => (
                      <Fragment>
                        <h1 className="mb-4 h3 text-primary">
                          Complete your profile
                        </h1>
                        {/*<p>Enter your information below to continue.</p>*/}
                        <EditProfileContainer />
                      </Fragment>
                    )}
                  />
                  <Route exact path={getAppRoutes().signUp}>
                    <Fragment>
                      <h1 className="h3 text-primary">{t('sign up')}</h1>
                      <p>{t('Enter your information below to continue.')}</p>
                      <SignupContainer />
                      <small className="d-block py-3 text-muted">
                        {t(
                          'By clicking Proceed, you agree to our Terms & Conditions and Privacy Policy.',
                        )}
                      </small>
                      <p className="mb-0">
                        {t('Already registered')}?{' '}
                        <Link to={getAppRoutes().signIn}>{t('Login now')}</Link>
                      </p>
                    </Fragment>
                  </Route>
                  <Route>
                    <Fragment>
                      <h1 className="h3 text-primary">
                        {t('Login to continue')}
                      </h1>
                      <p>
                        {t(
                          'We will send you a 6 digit OTP on this mobile number.',
                        )}
                      </p>
                      <LoginContainer />
                      <p className="mb-0 pt-4">
                        {t("Don't have an account")}?{' '}
                        <Link to={getAppRoutes().signUp}>
                          {t('Register now')}
                        </Link>
                      </p>
                    </Fragment>
                  </Route>
                </Switch>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Auth;
