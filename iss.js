const request = require('request');


const fetchMyIP = function(callback) {
  request('https://api.ipify.org/?format=json',(err, response, body) => {
    if (err) {
      callback(err, null);
      return;
    }
    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${body}`;
      callback(Error(msg), null);
      return;
    } else {
      const data = JSON.parse(body).ip;
      if (data) {
        callback(null, data);
      } else {
        callback("error cant find ip adress", null);
      }
    }
  });
};



const fetchCoordsByIP = function(IP, callback) {
  request(`https://ipvigilante.com/json/${IP}`, (err, response, body) => {
    if (err) {
      callback(err, null);
      return;
    } else if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching our IPs. Response: ${body}`;
      callback(Error(msg), null);
      return;
    } else {
      const longitude = JSON.parse(body).data.longitude;
      const latitude =  JSON.parse(body).data.latitude;
    
      const coords = {
        latitude: latitude,
        longitude: longitude
      };

      if (coords) {
        callback(null, coords);
      } else {
        callback("error cant find ip adress", null);
      }
    }
  });
};


const fetchISSFlyOverTimes = function(coords, callback) {
  request(`http://api.open-notify.org/iss-pass.json?lat=${coords.latitude}&lon=${coords.longitude}`, (err, response, body) => {
    if (err) {
      callback(err, null);
      return;
    }
    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching our coordinates. Response: ${body}`;
      callback(Error(msg), null);
      return;
    } else {
      const flyOverTimes = JSON.parse(body).response;
      callback(null , flyOverTimes);
    }

  });
};


const nextISSTimesForMyLocation = function(callback) {
  fetchMyIP((err, IP) => {
    if (err) {
      return callback(err, null);
    }
    fetchCoordsByIP(IP, (err, coords) => {
      if (err) {
        return callback(err, null);
      }
      fetchISSFlyOverTimes(coords, (err, flyOverTimes) => {
        callback(err, flyOverTimes);
      });
    });
  });
};



module.exports = {fetchMyIP, fetchCoordsByIP, fetchISSFlyOverTimes, nextISSTimesForMyLocation};