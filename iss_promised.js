const request = require('request-promise-native');

const fetchMyIP = function() {
  return request('https://api.ipify.org/?format=json');
};

const fetchCoordsByIP = function(body) {
  const IP = JSON.parse(body).ip;
  return request(`https://freegeoip.app/json/69.172.145.83`);
};

const fetchISSFlyOverTimes = function(geoInfo) {
  const { longitude, latitude } = JSON.parse(geoInfo); // shorthand for getting specific keys
  return request(`http://api.open-notify.org/iss-pass.json?lat=${latitude}&lon=${longitude}`);
}

const nextISSTimesForMyLocation = function() {

  return fetchMyIP()
    .then(fetchCoordsByIP)
    .then(fetchISSFlyOverTimes)
    .then((times) => {
      timeObjs = JSON.parse(times).response;
      return timeObjs;
  });
};

module.exports = {
  nextISSTimesForMyLocation
};