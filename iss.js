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
    }
    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching our IP. Response: ${body}`;
      callback(Error(msg), null);
      return;
    } else {
      const longitude = JSON.parse(body).data.longitude;
      const latitude =  JSON.parse(body).data.latitude;
    
      const obj = {
        latitude: latitude,
        longitude: longitude
      };

      if (obj) {
        callback(null, obj);
      } else {
        callback("error cant find ip adress", null);
      }
    }
  });
};

module.exports = {fetchMyIP, fetchCoordsByIP};