// @flow
import React from 'react';
import CategoriesContainer from '../modules/categories';
import { Col, Container, Row } from 'react-bootstrap';

const Categories = (): React$Node => {
  return (
    <div className="min-vh-100 py-5 bg-light">
      <Container>
        <Row>
          <Col>
            <CategoriesContainer />
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Categories;
