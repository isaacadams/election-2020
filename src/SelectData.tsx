import * as React from 'react';
import {Col, Container, Row} from 'react-bootstrap';
import rawStatesData from './states';
import {IStateModel} from './IStateModel';
import {UseSelect} from './UseSelect';
import {UseChart} from './UseChart';
import {ProcessData} from './Calculations';

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

  let [series, setSeries] = React.useState(null);

  React.useEffect(() => {
    let url = `https://static01.nyt.com/elections-assets/2020/data/api/2020-11-03/race-page/${state.selected}/${race.selected}.json`;
    fetch(url)
      .then((r) => {
        if (!r.ok) return Promise.reject(r);
        return r.json();
      })
      .then((d) => {
        setSeries(ProcessData(d));
      })
      .catch(console.error);
  }, [race.selected, state.selected]);

  return (
    <Container>
      <Row>
        <Col>{race.view}</Col>
        <Col>{state.view}</Col>
      </Row>
      <Row className="mt-3">
        {series && (
          <Col>
            <UseChart
              time={series
                .map((s) => new Date(s.timestamp))
                .sort((a, b) => a.getTime() - b.getTime())}
              data={series
                .map((s) => [new Date(s.timestamp), s.votes])
                .sort((a, b) => a[0].getTime() - b[0].getTime())}
            />
          </Col>
        )}
      </Row>
    </Container>
  );
}
