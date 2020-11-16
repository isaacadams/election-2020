import * as React from 'react';
import * as ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Col, Container, Row} from 'react-bootstrap';
import {AppFooter} from './AppFooter';
import {AppBody} from './AppBody';
import {AppHeader} from './AppHeader';

function App(props): JSX.Element {
  return (
    <Container>
      <Row>
        <Col>
          <AppHeader />
        </Col>
      </Row>
      <Row>
        <Col>
          <AppBody />
        </Col>
      </Row>
      <Row>
        <Col>
          <AppFooter />
        </Col>
      </Row>
    </Container>
  );
}

ReactDOM.render(<App />, document.getElementById('app'));
