import * as React from 'react';
import {Col, Container, Row} from 'react-bootstrap';
import {UseChart} from './UseChart';
import {VoteChangesChart} from './VoteChangesChart';
import {UseElectionData} from './UseElectionData';
import {SelectElectionDataForm} from './SelectElectionDataForm';

export function AppBody(props): JSX.Element {
  let {state, race, chart, formView} = SelectElectionDataForm({});
  let data = UseElectionData({state, race});

  return (
    <Container fluid>
      <Row className="d-flex justify-content-center">
        <Col lg="auto" className="d-flex justify-content-center">
          {!data && <span>no data to display</span>}
          {data && chart === 'total votes' && <UseChart data={data} />}
          {data && chart === 'change in votes' && (
            <VoteChangesChart data={data} />
          )}
        </Col>
        <Col lg={2} md={12}>
          {formView}
        </Col>
      </Row>
    </Container>
  );
}
