let race: 'president' | 'senate' | 'house' = 'president';
let state = 'pennsylvania';

let url = `https://static01.nyt.com/elections-assets/2020/data/api/2020-11-03/race-page/${state}/${race}.json`;
fetch(url).then(r => r.json()).then(console.log);