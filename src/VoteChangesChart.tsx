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
import {Button} from 'react-bootstrap';

const style = styler([
  {key: 'biden', color: '#A5C8E1', selected: '#2CB1CF'},
  {key: 'trump', color: '#FFCC9E', selected: '#2CB1CF'},
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

  let series = new TimeSeries({
    name: 'votes',
    utc: false,
    columns: ['index', 'trump', 'biden'],
    points: dataTransform,
    //collection: ,
    //events: '',
  });

  const [globalMin, globalMax] = [
    Math.min(...allChangeVotes),
    Math.max(...allChangeVotes),
  ];
  let [max, setMax] = React.useState(globalMax);
  let [min, setMin] = React.useState(globalMin);
  let [timeRange, setTimeRange] = React.useState(series.timerange());
  let [selected, setSelected] = React.useState(null);
  let [highlight, setHighlight] = React.useState(null);

  return (
    <>
      <div className="d-flex justify-content-end">
        <Button
          className="mb-2"
          variant="outline-secondary"
          onClick={() => {
            setTimeRange(series.timerange());
            setMax(globalMax);
          }}
        >
          Zoom Out
        </Button>
      </div>
      <ChartContainer
        enableDragZoom
        utc={false}
        timeRange={timeRange}
        width={800}
        onTimeRangeChanged={(time) => {
          setTimeRange(time);
          let croppedSeries = series.crop(time);
          let localMax = Math.max(
            croppedSeries.max('biden'),
            croppedSeries.max('trump')
          );
          setMax(localMax);

          let localMin = Math.min(
            croppedSeries.min('biden'),
            croppedSeries.min('trump')
          );
          setMin(localMin);
        }}
        /* maxTime={series.range().end()}
        minTime={series.range().begin()} */
        //format="day"
        onBackgroundClick={() => {
          setSelected(null);
        }}
      >
        <ChartRow height="600">
          <YAxis
            id="vote-change"
            label="change of votes"
            //classed="traffic-in"
            min={min}
            max={max}
            width="70"
            type="linear"
          />
          <Charts>
            <BarChart
              axis="vote-change"
              style={style}
              size={10}
              offset={5.5}
              columns={['trump']}
              series={series}
              infoTimeFormat="%m/%d/%y %H:%M:%S"
              info={[{label: 'trump', value: 'hello world'}]}
              selected={selected}
              onSelectionChange={setSelected}
              highlighted={highlight}
              onHighlightChange={setHighlight}
            />
            <BarChart
              axis="vote-change"
              style={style}
              size={10}
              offset={-5.5}
              columns={['biden']}
              series={series}
              infoTimeFormat="%m/%d/%y %H:%M:%S"
              info={[{label: 'biden', value: 'hello world'}]}
              selected={selected}
              onSelectionChange={setSelected}
              highlighted={highlight}
              onHighlightChange={setHighlight}
            />
          </Charts>
        </ChartRow>
      </ChartContainer>
    </>
  );
}
