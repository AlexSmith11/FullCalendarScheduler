/**
 * Creates a duration object
 * @param {array} timeGaps 
 * @param {int} i 
 * @param {String} startOfDuration 
 * @param {String} endOfDuration 
 * @param {String} gapDuration 
 */
export function createDuration(timeGaps, i, startOfDuration, endOfDuration, gapDuration) {
    timeGaps.push({
        id: i,
        startGapDuration: startOfDuration
          .format("YYYY-MM-DD hh:mm:ss")
          .toString(),
        endGapDuration: endOfDuration.format("YYYY-MM-DD hh:mm:ss").toString(),
        gapDuration: gapDuration
      });
      return timeGaps
}