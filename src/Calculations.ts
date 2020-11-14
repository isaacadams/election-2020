export function ProcessData(response: any): IVoteUpdate[] {
  console.log(response);
  let timeseries = response.data.races[0].timeseries as IVoteUpdate[];
  console.log(timeseries);

  let cleaned = removeAnamoly(timeseries);
  calculateVoteDifferences(cleaned);
  return cleaned;
  //return prepareForChart(cleaned);
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

export function prepareForChart(series: IVoteUpdate[]): any[] {
  return sortByDate<any>(
    series.map((s) => [new Date(s.timestamp), s.votes]),
    (s) => s[0]
  );
}

export function sortByDate<T>(data: T[], pointToDate: (d: T) => Date): T[] {
  return data.sort(
    (a, b) => pointToDate(a).getTime() - pointToDate(b).getTime()
  );
}

export interface IVoteUpdate {
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

export interface IVoteChange {
  timestamp: string;
  general: IVoteProgressModel;
  trump: IVoteProgressModel;
  biden: IVoteProgressModel;
}

export function calculateVoteDifferences(data: IVoteUpdate[]): IVoteChange[] {
  let voteChanges: IVoteChange[] = [];

  data.reduce<IVoteChange>((p, c, i, a) => {
    let change: IVoteChange = {
      timestamp: c.timestamp,
      general: getChangeFromPreviousModel(c.votes, p['general']),
      trump: getChangeFromPreviousModel(
        c.votes * c.vote_shares.trumpd,
        p['trump']
      ),
      biden: getChangeFromPreviousModel(
        c.votes * c.vote_shares.bidenj,
        p['biden']
      ),
    };
    voteChanges.push(change);
    return change;
  }, {});

  return voteChanges;
}

function getChangeFromPreviousModel(
  current: number,
  previous: IVoteProgressModel
): IVoteProgressModel {
  return !!previous ? getChange(current, previous.total) : getChange(0, 0);
}

function getChange(current: number, previous: number): IVoteProgressModel {
  return {
    total: current,
    previous,
    change: current - previous,
  };
}

interface IVoteProgressModel {
  total: number;
  previous: number;
  change: number;
}
