import * as React from 'react';
import {Col, Container, Row} from 'react-bootstrap';
import {UseSelect} from './UseSelect';
import rawStatesData from './states';
import {IStateModel} from './IStateModel';

let states: IStateModel[] = rawStatesData.map((s) => ({
  name: s.state,
  code: s.code,
  abbrev: s.abbrev,
}));

interface IReturn {
  state: string | number | readonly string[];
  race: string | number | readonly string[];
  chart: string | number | readonly string[];
  formView: JSX.Element;
}

export function SelectElectionDataForm(props): IReturn {
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

  let charts = UseSelect({
    options: ['total votes', 'change in votes'],
    name: 'chart',
    defaultValue: 'total votes',
    className: 'form-control',
  });

  let formView = (
    <Container>
      <Row>
        <Col>
          <label>Choose a state</label>
          {state.view}
        </Col>
      </Row>
      <Row className="mt-3">
        <Col>
          <label>Choose a race</label>
          {race.view}
        </Col>
      </Row>
      <Row className="mt-3">
        <Col>
          <label>Choose a chart</label>
          {charts.view}
        </Col>
      </Row>
    </Container>
  );

  return {
    state: state.selected,
    race: race.selected,
    chart: charts.selected,
    formView,
  };
}
