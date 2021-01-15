const {nextISSTimesForMyLocation} = require('./iss_promised');
const request = require('request-promise-native');


nextISSTimesForMyLocation()
  .then((timeObjs) => {
    for (let time of timeObjs) {
      console.log(`Next pass at ${Date(time.risetime)} for ${time.duration} seconds.`);
    }
  })
  .catch((error) => {
    console.log("It didn't work: ", error.message);
  })