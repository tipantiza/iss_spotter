const request = require('request-promise-native');


const fetchMyIP = function () {
  return request('https://api.ipify.org/?format=json')
}

const fetchCoordsByIP = function(body){
  const ip = JSON.parse(body).ip
  return request(`https://ipvigilsante.com/json/${ip}`)
}

const fetchISSFlyOverTimes = function(body){
  const longitude = JSON.parse(body).data.longitude;
  const latitude = JSON.parse(body).data.latitude;
  return request(`http://api.open-notify.org/iss-pass.json?lat=${latitude}&lon=${longitude}`)
}

const nextISSTimesForMyLocation = function() {
  return fetchMyIP()
  .then(fetchCoordsByIP)
  .then(fetchISSFlyOverTimes)
  .then((data) => {
    const response = JSON.parse(data).response;
    return response;
  })
}


module.exports = { nextISSTimesForMyLocation }