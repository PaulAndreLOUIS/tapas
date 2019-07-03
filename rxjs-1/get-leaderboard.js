const Rx = require('rxjs');
const RxOp = require('rxjs/operators');
const { annotateSpeed } = require('./get-car-speed');

function comparePosition(a, b){
    if (a.xLocation < b.xLocation) return 1;
    if (b.xLocation < a.xLocation) return -1;
    return 0;
  }

function computeLeaderboard(values) {
    var sorted = values.sort(comparePosition);
    return sorted.map((item, index) => ({
        carName: item.carName,
        position: index + 1,
        leaderGapDistance: sorted[0].xLocation - item.xLocation,
        leaderGapTime: (sorted[0].xLocation - item.xLocation)/item.speed,
    }));
}

function getLeaderBoard(race) {
    return Rx.combineLatest(race.getCars().map(car => annotateSpeed(race, car))).pipe(
        RxOp.map(computeLeaderboard)
    );
}

module.exports = {
    getLeaderBoard
};