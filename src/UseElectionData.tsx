import * as React from 'react';
import {IVoteUpdate, ProcessData} from './Calculations';

export function UseElectionData({state, race}): IVoteUpdate[] {
  let [data, setData] = React.useState<IVoteUpdate[]>(null);
  React.useEffect(() => {
    let url = `https://static01.nyt.com/elections-assets/2020/data/api/2020-11-03/race-page/${state}/${race}.json`;
    fetch(url)
      .then((r) => {
        if (!r.ok) {
          setData(null);
          return Promise.reject(r);
        }
        return r.json();
      })
      .then((d) => {
        setData(ProcessData(d));
      })
      .catch(console.error);
  }, [race, state]);

  return data;
}
