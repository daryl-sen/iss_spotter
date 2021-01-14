const request = require('request');

const fetchMyIP = function(callback) {
  request('https://api.ipify.org/?format=json', (error, response, body) => {

    // parse the body
    const IP = JSON.parse(body).ip;
    
    // check response code
    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${body}`;
      callback(Error(msg), null); // Error() creates new error object to pass around
      return;
    }

    if (error) {
      callback(error, null);
      return;
    }

    callback(null, IP);
  });
};

module.exports = { fetchMyIP };

// fetchMyIP((error, IP) => console.log(error, IP));