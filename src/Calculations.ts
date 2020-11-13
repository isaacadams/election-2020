export function ProcessData(response: any): any {
  console.log(response);
  let timeseries = response.data.races[0].timeseries;

  console.log(timeseries);

  return removeAnamoly(timeseries);
}

function removeAnamoly(timeseries: any): any {
  // removing datapoint where votes go down to zero
  let firstDateThatIsNotZero = new Date(
    timeseries.find((s) => s.votes != 0).timestamp
  );

  return timeseries.filter(
    (s) => new Date(s.timestamp) > firstDateThatIsNotZero && s.votes != 0
  );
}
