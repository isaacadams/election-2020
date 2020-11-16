import * as React from 'react';
import {
  Charts,
  ChartContainer,
  ChartRow,
  YAxis,
  BarChart,
  Resizable,
  styler,
} from 'react-timeseries-charts';
import {Index, TimeSeries} from 'pondjs';
import {calculateVoteDifferences, IVoteUpdate} from './Calculations';

const style = styler([
  {key: 'trump', color: '#A5C8E1', selected: '#2CB1CF'},
  {key: 'biden', color: '#FFCC9E', selected: '#2CB1CF'},
  /* {
    key: netTrafficColumnNames[1],
    color: '#A5C8E1',
    selected: '#2CB1CF',
  },
  {
    key: netTrafficColumnNames[2],
    color: '#FFCC9E',
    selected: '#2CB1CF',
  },
  {
    key: netTrafficColumnNames[3],
    color: '#DEB887',
    selected: '#2CB1CF',
  }, */
]);

interface IProps {
  data: IVoteUpdate[];
}

export function VoteChangesChart({data}: IProps): JSX.Element {
  let voteDifferences = calculateVoteDifferences(data);
  let dataTransform = voteDifferences.map((s) => [
    Index.getIndexString('1s', new Date(s.timestamp)),
    s.trump.change,
    s.biden.change,
  ]);

  let allChangeVotes = voteDifferences.reduce<number[]>(
    (p, c) => [...p, c.biden.change, c.trump.change],
    []
  );

  const [min, globalMax] = [
    Math.min(...allChangeVotes),
    Math.max(...allChangeVotes),
  ];
  let [max, setMax] = React.useState(globalMax);

  let series = new TimeSeries({
    name: 'votes',
    utc: false,
    //collection: ,
    columns: ['index', 'trump', 'biden'],
    //events: '',
    points: dataTransform,
  });

  let [timeRange, setTimeRange] = React.useState(series.timerange());

  return (
    <Resizable>
      <ChartContainer
        enableDragZoom
        utc={false}
        timeRange={timeRange}
        onTimeRangeChanged={(time) => {
          setTimeRange(time);
          let croppedSeries = series.crop(time);
          let localMax = Math.max(
            croppedSeries.max('biden'),
            croppedSeries.max('trump')
          );
          setMax(localMax);
        }}
        /* maxTime={series.range().end()}
        minTime={series.range().begin()} */
        //format="day"
        onBackgroundClick={() => {
          setTimeRange(series.timerange());
          setMax(globalMax);
        }}
      >
        <ChartRow height="150">
          <YAxis
            id="traffic-volume"
            label="change of votes"
            //classed="traffic-in"
            min={min}
            max={max}
            width="70"
            type="linear"
          />
          <Charts>
            <BarChart
              axis="traffic-volume"
              style={style}
              size={10}
              offset={5.5}
              columns={['trump']}
              series={series}
              /* highlighted={this.state.highlight}
              info={infoValues}
              infoTimeFormat="%m/%d/%y"
              onHighlightChange={(highlight) => this.setState({highlight})}
              selected={this.state.selection}
              onSelectionChange={(selection) => this.setState({selection})} */
            />
            <BarChart
              axis="traffic-volume"
              style={style}
              size={10}
              offset={-5.5}
              columns={['biden']}
              series={series}
              //info={[{label: 'Traffic', value: 'hello world'}]}
              /* info={infoValues}
              highlighted={this.state.highlight}
              onHighlightChange={(highlight) => this.setState({highlight})}
              selected={this.state.selection}
              onSelectionChange={(selection) => this.setState({selection})} */
            />
          </Charts>
        </ChartRow>
      </ChartContainer>
    </Resizable>
  );
}
