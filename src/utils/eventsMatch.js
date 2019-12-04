/**
 * Return true if all parameters of the two objects match each other
 * @param {*} items
 */
export function eventsMatch(a, b) {
    return (
      a.name === b.name && a.start === b.start && a.end === b.end
    );
  }