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

  let formView = (
    <Container>
      <Row>
        <Col>{state.view}</Col>
      </Row>
      <Row>
        <Col>{race.view}</Col>
      </Row>
    </Container>
  );

  return {
    state: state.selected,
    race: race.selected,
    formView,
  };
}
