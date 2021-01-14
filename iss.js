const request = require('request');



const fetchMyIP = function(callback) {
  request('https://api.ipify.org/?format=json', (error, response, body) => {

    if (error) {
      callback(error, null);
      return;
    }
    
    // check response code
    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${body}`;
      callback(Error(msg), null); // Error() creates new error object to pass around
      return;
    }
    
    
    // parse the body
    const IP = JSON.parse(body).ip;
    callback(null, IP);
  });
};




const fetchCoordsByIP = function(ip, callback) {
  request(`https://freegeoip.app/json/${ip}`, (error, response, body) => {
    
    if (error) {
      callback(error, null);
      return;
    }

    // check response code
    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching Geo Info. Response: ${body}`;
      callback(msg, null); // Error() creates new error object to pass around
      return;
    }


    // parse the body
    const geoInfo = JSON.parse(body);
    const output = {
      latitude: geoInfo.latitude,
      longitude: geoInfo.longitude
    };

    callback(null, output);
  });
};




const fetchISSFlyOverTimes = function(coords, callback) {
  request(`http://api.open-notify.org/iss-pass.json?lat=${coords.latitude}&lon=${coords.longitude}`, (error, response, body) => {
    
    if (error) {
      callback(error, null);
      return;
    }

    // check response code
    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching Geo Info. Response: ${body}`;
      callback(msg, null); // Error() creates new error object to pass around
      return;
    }
  
    const returnedData = JSON.parse(body);
    if (returnedData.message === 'failure') {
      callback(returnedData.reason, null);
      return;
    }

    const output = returnedData.response;
    callback(null, output);

  });
};




const nextISSTimesForMyLocation = function(callback) {

  fetchMyIP( (error, IP) => {
    fetchCoordsByIP( IP, (error, coords) => {
      fetchISSFlyOverTimes( coords, (error, times) => {
        callback(error, times);
        return;
      })
    })
  });
};


// nextISSTimesForMyLocation( (times) => {
//   console.log(times);
// });

module.exports = {
  nextISSTimesForMyLocation
};