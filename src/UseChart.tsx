import * as React from 'react';
import {
  Charts,
  ChartContainer,
  ChartRow,
  YAxis,
  LineChart,
} from 'react-timeseries-charts';
import {TimeSeries} from 'pondjs';

interface IProps {
  time: string[];
  data: number[];
}

export function UseChart({time, data}: IProps): JSX.Element {
  //console.log(time);
  //console.log(data);
  let series = new TimeSeries({
    name: 'votes',
    //collection: ,
    columns: ['time', 'votes'],
    //events: '',
    points: data,
  });

  let votes = data.map((d) => parseInt(d[1]));
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
