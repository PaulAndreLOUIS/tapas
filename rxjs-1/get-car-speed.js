const Rx = require('rxjs');
const RxOp = require('rxjs/operators');

function getCarSpeed(race, carName) {
    return annotateSpeed(race, carName).pipe(
        RxOp.map(value => value.speed)
  );
}

function annotateSpeed(race, carName) {
    return Rx.fromEvent(race, 'data').pipe(
        RxOp.filter(data => data.carName === carName),
        RxOp.bufferTime(200),
        RxOp.map(values => {
            var oldest = values[0];
            var latest = values[values.length - 1];
            return { ...latest, speed: 1000*(latest.xLocation - oldest.xLocation)/(latest.time - oldest.time) };
        })
  );
}

module.exports = {
    annotateSpeed,
    getCarSpeed
};