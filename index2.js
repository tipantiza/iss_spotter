const {nextISSTimesForMyLocation} = require('./iss_promised');

nextISSTimesForMyLocation()
.then((passTime) => {
  console.log(passTime);
})
.catch((error) => {
  console.log('it didnt work', error.message);
})
