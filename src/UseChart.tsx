import * as React from 'react';
import {
  Charts,
  ChartContainer,
  ChartRow,
  YAxis,
  LineChart,
  styler,
} from 'react-timeseries-charts';
import {TimeSeries} from 'pondjs';
import {IVoteUpdate, sortByDate} from './Calculations';

const style = styler([
  {key: 'votes', color: '#000000', selected: '#2CB1CF'},
  {key: 'biden', color: '#271ece', selected: '#2CB1CF'},
  {key: 'trump', color: '#f43207', selected: '#2CB1CF'},
]);

interface IProps {
  data: IVoteUpdate[];
}

export function UseChart({data}: IProps): JSX.Element {
  let series = new TimeSeries({
    name: 'votes',
    //collection: ,
    columns: ['time', 'votes', 'trump', 'biden'],
    //events: '',
    points: sortByDate<any>(
      data.map((s) => [
        new Date(s.timestamp),
        s.votes,
        s.votes * s.vote_shares.trumpd,
        s.votes * s.vote_shares.bidenj,
      ]),
      (s) => s[0]
    ),
  });

  let [highlight, setHighlight] = React.useState(null);
  let [info, setInfo] = React.useState(null);

  return (
    <ChartContainer timeRange={series.timerange()} width={800}>
      <ChartRow height="600">
        <YAxis
          id="axis1"
          label="votes"
          min={series.min('votes')}
          max={series.max('votes')}
          width="60"
          type="linear"
          //format="$,.2f"
        />
        <Charts>
          <LineChart
            axis="axis1"
            series={series}
            columns={['votes']}
            style={style}
            info={[info]}
            highlighted={highlight}
            onHighlightChange={onHighlightChange}
          />
          <LineChart
            axis="axis1"
            series={series}
            columns={['trump']}
            style={style}
            info={[info]}
            highlighted={highlight}
            onHighlightChange={onHighlightChange}
          />
          <LineChart
            axis="axis1"
            series={series}
            columns={['biden']}
            style={style}
            info={[info]}
            highlighted={highlight}
            onHighlightChange={onHighlightChange}
          />
        </Charts>
      </ChartRow>
    </ChartContainer>
  );

  function onHighlightChange(h) {
    setHighlight(h);
    setInfo({
      label: h?.column,
      value: getColumnHighlightValue(h)?.toLocaleString(undefined, {
        maximumFractionDigits: 0,
      }),
    });
  }

  function getColumnHighlightValue(h): number {
    console.log(h);
    return h?.event?.get(h?.column);
  }
}
