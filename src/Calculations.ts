export function ProcessData(response: any): any {
  console.log(response);
  let timeseries = response.data.races[0].timeseries as IVoteUpdate[];
  console.log(timeseries);

  let cleaned = removeAnamoly(timeseries);

  return prepareForChart(cleaned);
}

function removeAnamoly(timeseries: IVoteUpdate[]): IVoteUpdate[] {
  // removing datapoint where votes go down to zero
  let firstDateThatIsNotZero = new Date(
    timeseries.find((s) => s.votes != 0).timestamp
  );

  return timeseries.filter(
    (s) => new Date(s.timestamp) > firstDateThatIsNotZero && s.votes != 0
  );
}

function prepareForChart(series: IVoteUpdate[]): any {
  return sortByDate<any>(
    series.map((s) => [new Date(s.timestamp), s.votes]),
    (s) => s[0]
  );
}

function sortByDate<T>(data: T[], pointToDate: (d: T) => Date) {
  return data.sort(
    (a, b) => pointToDate(a).getTime() - pointToDate(b).getTime()
  );
}

interface IVoteUpdate {
  votes: number;
  eevp: number;
  eevp_source: string;
  timestamp: string;
  vote_shares: IVoteShares;
}

interface IVoteShares {
  bidenj: number;
  trumpd: number;
}
