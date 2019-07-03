const Rx = require('rxjs');
const RxOp = require('rxjs/operators');

function getCarSpeed(race, carName) {
    return Rx.fromEvent(race, 'data').pipe(
        RxOp.filter(data => data.carName === carName),
        
  );
}

module.exports = {
    getCarSpeed
};