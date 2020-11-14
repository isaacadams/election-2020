import * as React from 'react';
import {
  Charts,
  ChartContainer,
  ChartRow,
  YAxis,
  LineChart,
} from 'react-timeseries-charts';
import {TimeSeries} from 'pondjs';
import {IVoteUpdate, sortByDate} from './Calculations';

interface IProps {
  data: IVoteUpdate[];
}

export function UseChart({data}: IProps): JSX.Element {
  let series = new TimeSeries({
    name: 'votes',
    //collection: ,
    columns: ['time', 'votes'],
    //events: '',
    points: sortByDate<any>(
      data.map((s) => [new Date(s.timestamp), s.votes]),
      (s) => s[0]
    ),
  });

  let votes = data.map((d) => d.votes);
  return (
    <ChartContainer timeRange={series.timerange()} width={800}>
      <ChartRow height="200">
        <YAxis
          id="axis1"
          label="votes"
          min={Math.min(...votes)}
          max={Math.max(...votes)}
          width="60"
          type="linear"
          //format="$,.2f"
        />
        <Charts>
          <LineChart axis="axis1" series={series} columns={['votes']} />
        </Charts>
      </ChartRow>
    </ChartContainer>
  );
}
