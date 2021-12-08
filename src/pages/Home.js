// @flow
import React from 'react';
import { Button, Col, Container, Nav, Navbar, Row } from 'react-bootstrap';
import CandidatesContainer from '../modules/candidates';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { getAppRoutes } from '../utils/contentProviders';
import Icon from '../components/Icon';

const Home = (): React$Node => {
  const { t } = useTranslation();

  return (
    <div className="min-vh-100 mt-5 bg-light">
      <section className="py-5 bg-secondary">
        <Container className="py-3">
          <Row>
            <Col md={{ span: 8, offset: 2 }}>
              <h1 className="text-center text-primary">
                {t('What would you like to do?')}
              </h1>
              <div className="d-flex flex-wrap justify-content-center align-items-center mt-4 text-center">
                <Link
                  className="m-2 px-5 btn btn-primary btn-lg rounded-pill shadow"
                  to={getAppRoutes().createJob}>
                  {t('Post a job')}
                </Link>
                <Link
                  className="m-2 px-5 btn btn-primary btn-lg rounded-pill shadow"
                  to={getAppRoutes().categories}>
                  {t('Find candidates')}
                </Link>
              </div>
              {/*<div className="mt-4">*/}
              {/*  <div className="form-group">*/}
              {/*    <input*/}
              {/*      className="p-4 form-control form-control-lg border-0 shadow"*/}
              {/*      placeholder={t('Search for candidates')}*/}
              {/*    />*/}
              {/*  </div>*/}
              {/*</div>*/}
            </Col>
          </Row>
        </Container>
      </section>
      <section className="py-5">
        <Container className="">
          {/*<Row>*/}
          {/*  <Col md={{ span: 8, offset: 2 }}>*/}
          {/*    <Navbar className="mb-4">*/}
          {/*      <Navbar.Brand>*/}
          {/*        <h3>{t('Nearby candidates')}</h3>*/}
          {/*      </Navbar.Brand>*/}
          {/*      <Nav className="ml-auto">*/}
          {/*        <Nav.Item>*/}
          {/*          <Nav.Link as={Button} variant="link">*/}
          {/*            <Icon icon="map-marker-alt" />*/}
          {/*            <span className="d-inline-block ml-2">Location</span>*/}
          {/*          </Nav.Link>*/}
          {/*        </Nav.Item>*/}
          {/*      </Nav>*/}
          {/*    </Navbar>*/}
          {/*  </Col>*/}
          {/*</Row>*/}
          <CandidatesContainer />
        </Container>
      </section>
    </div>
  );
};

export default Home;
