import * as React from 'react';
import {Col, Container, Row} from 'react-bootstrap';
import rawStatesData from './states';
import {IStateModel} from './IStateModel';
import {UseSelect} from './UseSelect';
import {UseChart} from './UseChart';
import {VoteChangesChart} from './VoteChangesChart';
import {UseElectionData} from './UseElectionData';

let states: IStateModel[] = rawStatesData.map((s) => ({
  name: s.state,
  code: s.code,
  abbrev: s.abbrev,
}));

export function SelectElectionData(props): JSX.Element {
  let race = UseSelect({
    options: ['president', 'senate', 'house'],
    name: 'race',
    defaultValue: 'president',
    className: 'form-control',
  });

  let state = UseSelect({
    options: states.map((s, i) => (
      <option value={s.name.toLowerCase()} key={i}>
        {s.name}
      </option>
    )),
    name: 'state',
    defaultValue: states[0].name.toLowerCase(),
    className: 'form-control',
  });

  let data = UseElectionData({state: state.selected, race: race.selected});

  return (
    <Container>
      <Row>
        <Col>{race.view}</Col>
        <Col>{state.view}</Col>
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
