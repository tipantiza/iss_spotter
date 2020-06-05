const { fetchMyIP } = require('./iss');
const { fetchCoordsByIP} = require('./iss');

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
