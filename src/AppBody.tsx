import * as React from 'react';
import {Col, Container, Row} from 'react-bootstrap';
import {UseChart} from './UseChart';
import {VoteChangesChart} from './VoteChangesChart';
import {UseElectionData} from './UseElectionData';
import {SelectElectionDataForm} from './SelectElectionDataForm';

export function AppBody(props): JSX.Element {
  let {state, race, formView} = SelectElectionDataForm({});
  let data = UseElectionData({state, race});

  return (
    <Container>
      <Row>
        <Col>{formView}</Col>
      </Row>
      <Row className="mt-3">
        {data && (
          <Col>
            <UseChart data={data} />
          </Col>
        )}
      </Row>
      <Row className="mt-3">
        {data && (
          <Col>
            <VoteChangesChart data={data} />
          </Col>
        )}
      </Row>
    </Container>
  );
}
