const { getRace } = require('./race');
const { getCarSpeed } = require('./get-car-speed');

const race = getRace();

const carName = `Lightning McQueen`;

const speed$ = getCarSpeed(race, carName);

// adding `\r` allows to overwrite the message in the same line
speed$.subscribe(speed => process.stdout.write(`Speed: ${speed}m/s\r`));

race.start();