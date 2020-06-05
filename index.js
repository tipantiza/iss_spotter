// const { fetchMyIP } = require('./iss');
// const { fetchCoordsByIP } = require('./iss');
// const { fetchISSFlyOverTimes } = require('./iss');
const { nextISSTimesForMyLocation } = require('./iss');


nextISSTimesForMyLocation((error, passTime) => {
  if (error) {
    return console.log("It didn't work!", error);
  }
  for (const pass of passTime) {
    const datetime = new Date(0);
    datetime.setUTCSeconds(pass.risetime);
    const duration = pass.duration;
    console.log(`Next pass at ${datetime} for ${duration} seconds!`);
  }
});

// fetchISSFlyOverTimes({ latitude: '52.11330', longitude: '-106.72350' }, (err, data) => {
//   console.log(err);
//   console.log(data);
// });


// fetchCoordsByIP('71.17.109.97', (error, Data) => {
//   console.log(error);
//   console.log(Data);
// });

// fetchMyIP((error, ip) => {
//   if (error) {
//     console.log("It didn't work!" , error);
//     return;
//   }

//   console.log('It worked! Returned IP:' , ip);
// });
