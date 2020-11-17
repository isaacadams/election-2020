import * as React from 'react';
import {
  EventMarker,
  Charts,
  ChartContainer,
  ChartRow,
  YAxis,
  LineChart,
  styler,
} from 'react-timeseries-charts';
import {TimeSeries} from 'pondjs';
import {IVoteUpdate, sortByDate} from './Calculations';
import {useWindowSize} from './useWindowSize';

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

  /* let size = useWindowSize();
  let styling =
    size === 'large'
      ? {}
      : {
          values: {
            'font-weight': '600',
            'font-size': '16px',
          },
        }; */

  let [highlight, setHighlight] = React.useState(null);
  let [info, setInfo] = React.useState(null);
  let [tracker, setTracker] = React.useState(null);

  return (
    <ChartContainer
      timeRange={series.timerange()}
      width={800}
      onTrackerChanged={onTrackerChanged}
      //timeAxisStyle={styling}
    >
      <ChartRow height="600">
        <YAxis
          id="axis1"
          label="votes"
          //style={styling}
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
          <EventMarker
            type="flag"
            axis="axis1"
            event={tracker}
            column={highlight}
            info={info}
            infoTimeFormat="%m/%d/%y %H:%M:%S"
            infoWidth={120}
            markerRadius={2}
            markerStyle={{fill: 'black'}}
          />
        </Charts>
      </ChartRow>
    </ChartContainer>
  );

  function onHighlightChange(h) {
    setHighlight(h);
  }

  function onTrackerChanged(t) {
    if (!t) return;

    let eventTracker = series.atTime(t);
    setTracker(eventTracker);
    let value = eventTracker?.get(highlight)?.toLocaleString(undefined, {
      maximumFractionDigits: 0,
    });

    if (!value) {
      setInfo(null);
      setTracker(null);
      return;
    }

    setInfo([
      {
        label: highlight,
        value,
      },
    ]);
  }
}
