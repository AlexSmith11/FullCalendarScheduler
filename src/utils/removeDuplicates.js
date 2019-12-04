/**
 * Remove duplicate calendar objects via filter
 * This avoids inefficient isEqual() solutions
 * Closures are interesting.
 * @param {*} events
 */
export function removeDuplicates(events) {
  // Filter by one obj param:
  // var result = events.filter(function({title}, {start}) {
  // 	return !this[title] && (this[title] = title)
  // }, {})

  // Filter via all obj params - In this case, use all 3
  // const keys = ["title", "start", "end"];
  // const duplicatesRemoved = events.filter(
  //   (outer => obj =>
  //     (inner => !outer.has(inner) && outer.add(inner))(
  //       keys.map(inner => obj[inner]).join("|")
  //     ))(new Set())
  // );
  // return duplicatesRemoved

  // Waaay better, least time consuming, far more readable:
  //eventsMatch().

  
}



/**
 * Explanation on using closures and Set:
 * outer called with new Set.
 * outer is available until the filtering is complete (scope-wise, in closure).
 * the inner func responsible for the filtering, and
 * then is called with every obj and returns a bool.
 * It's 3am don't ask. js is weird.
 * */
