import * as React from 'react';
import rawStatesData from '../states.json';
import {IStateModel} from './IStateModel';
import {UseSelect} from './UseSelect';

let states: IStateModel[] = rawStatesData.map((s) => ({
  name: s.state,
  code: s.code,
  abbrev: s.abbrev,
}));

export function SelectElectionData({}) {
  let race = UseSelect({
    values: ['president', 'senate', 'house'],
    name: 'race',
    defaultValue: 'president',
  });

  let state = UseSelect({
    values: states.map((s) => s.name.toLowerCase()),
    name: 'state',
    defaultValue: states[0].name,
  });

  React.useEffect(() => {
    let url = `https://static01.nyt.com/elections-assets/2020/data/api/2020-11-03/race-page/${state.selected}/${race.selected}.json`;
    fetch(url)
      .then((r) => {
        if (!r.ok) return Promise.reject(r);
        return r.json();
      })
      .then(console.log)
      .catch(console.error);
  }, [race.selected, state.selected]);
  return (
    <div>
      {race.view}
      {state.view}
    </div>
  );
}
