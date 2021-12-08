// @flow
import React, { Fragment } from 'react';
import { Button, Container, Nav, Navbar } from 'react-bootstrap';
import { useWindowScroll } from 'react-use';
import { Link } from 'react-router-dom';
import { getAppRoutes } from '../../utils/contentProviders';
import { setupAppLanguage } from '../../redux/modules/app';
import { useDispatch, useSelector } from 'react-redux';
import { appLanguageSelector } from '../../redux/selectors/app';
import i18next from 'i18next';
import { useTranslation } from 'react-i18next';

type LayoutType = ({
  children: React$Node,
  isLoggedIn: boolean,
  onSignOut: Function,
}) => React$Node;

const Layout: LayoutType = ({ children, isLoggedIn, onSignOut }) => {
  const { y } = useWindowScroll();

  const dispatch = useDispatch();

  const selected = localStorage.getItem('i18nextLng') || 'en';

  const { t } = useTranslation();

  const appLanguage = useSelector(appLanguageSelector);

  const onChange = ({ target: { value } }) => {
    dispatch(setupAppLanguage(value));

    i18next.changeLanguage(value);
    localStorage.setItem('i18nextLng', value);

    setTimeout(() => {
      window.location.reload();
    }, 1000);
  };

  return (
    <Fragment>
      <header className="">
        <Navbar
          fixed="top"
          expand="md"
          className={`bg-white ${y > 25 ? 'shadow-sm' : 0} shadow-sm`}>
          <Container fluid>
            <Navbar.Brand
              as={Link}
              to={getAppRoutes().home}
              className="d-flex align-items-center">
              <img src="/assets/logo.png" width="55px" className="mr-3" />
              {/*<span className="font-weight-bold">{t('Mera Rozgaar')}</span>*/}
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="align-items-md-center ml-auto">
                {isLoggedIn ? (
                  <Fragment>
                    <Nav.Item>
                      <Nav.Link
                        as={Link}
                        className="font-weight-bold text-primary"
                        to={getAppRoutes().createJob}>
                        {t('Post a job')}
                      </Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                      <Nav.Link
                        as={Link}
                        className="font-weight-bold text-primary"
                        to={getAppRoutes().categories}>
                        {t('Hire candidates')}
                      </Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                      <Nav.Link
                        as={Link}
                        className="font-weight-bold text-primary"
                        to={getAppRoutes().jobs}>
                        {t('Job postings')}
                      </Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                      <Nav.Link
                        className="font-weight-bold text-primary"
                        as={Button}
                        variant="link"
                        onClick={onSignOut}>
                        {t('Logout')}
                      </Nav.Link>
                    </Nav.Item>
                  </Fragment>
                ) : (
                  <Fragment>
                    <Nav.Item>
                      <Nav.Link
                        as={Link}
                        className="font-weight-bold text-primary"
                        to={getAppRoutes().signIn}>
                        {t('login')}
                      </Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                      <Nav.Link
                        as={Link}
                        className="font-weight-bold text-primary"
                        to={getAppRoutes().signUp}>
                        {t('Register now')}
                      </Nav.Link>
                    </Nav.Item>
                  </Fragment>
                )}
                <Nav.Item>
                  <div className="mb-0 form-group nav-link">
                    <select
                      onChange={onChange}
                      value={selected}
                      className="form-control form-control-sm">
                      <option value="hi">हिंदी</option>
                      <option value="en">English</option>
                    </select>
                  </div>
                </Nav.Item>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </header>
      <main className="min-vh-100">{children}</main>
    </Fragment>
  );
};

export default Layout;
