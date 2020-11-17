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
    <Container>
      <Row>
        <Col>{formView}</Col>
        <Col>
          {data && chart === 'total votes' && <UseChart data={data} />}
          {data && chart === 'change in votes' && (
            <VoteChangesChart data={data} />
          )}
        </Col>
      </Row>
    </Container>
  );
}
