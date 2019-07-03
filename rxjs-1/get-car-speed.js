const Rx = require('rxjs');
const RxOp = require('rxjs/operators');

function getCarSpeed(race, carName) {
    return Rx.fromEvent(race, 'data').pipe(
        RxOp.filter(data => data.carName === carName),
        RxOp.bufferTime(200),
        RxOp.map(values => {
            var oldest = values[0];
            var latest = values[values.length - 1];
            return 1000*(latest.xLocation - oldest.xLocation)/(latest.time - oldest.time);
        })
  );
}

module.exports = {
    getCarSpeed
};