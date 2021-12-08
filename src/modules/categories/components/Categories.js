// @flow
import React, { useCallback, useState } from 'react';
import { Button, Col, Container, Row } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { resolveDynamicPath } from '../../../utils';
import { getAppRoutes } from '../../../utils/contentProviders';

type PropTypes = {
  professions: Array<Object>,
};

const Categories = ({ professions }: PropTypes): React$Node => {
  const { t } = useTranslation();

  const [show, setShow] = useState(false);

  const showComplete = useCallback(() => {
    setShow(true);
  }, []);

  return (
    <Container className="pt-5 text-center">
      <Row className="pt-4">
        <Col>
          <h1 className="text-primary">{t('Hire candidates')}</h1>
          <p className="lead">
            {t('Candidates are available in 100+ categories including')}
          </p>
        </Col>
      </Row>
      <Row className="mt-4">
        <Col>
          {(show ? professions : professions.slice(0, 20)).map(
            ({ label, value }) => (
              <Button
                key={value}
                as={Link}
                to={`${resolveDynamicPath(
                  getAppRoutes().search,
                  value,
                )}?p=${label}`}
                className="m-2 px-4 rounded-pill"
                variant="primary">
                {label}
              </Button>
            ),
          )}
        </Col>
      </Row>
      {show ? null : (
        <Row>
          <Col>
            <Button
              size="lg"
              className="m-2 px-4 rounded-pill"
              variant="outline-primary"
              onClick={showComplete}>
              {t('80+ more')}
            </Button>
          </Col>
        </Row>
      )}
    </Container>
  );
};

export default Categories;
