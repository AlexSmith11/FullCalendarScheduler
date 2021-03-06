/**
 * Sort all objects by the start date parameter.
 * Need to do so by turning date strings in paremeters into Date() objs
 * @param {*} items
 */
export function sortEvents(items) {
    const sorted = items.sort(function compare(a, b) {
      var dateA = new Date(a.start);
      var dateB = new Date(b.start);
      console.log(dateA - dateB)
      return dateA - dateB;
    });
    return sorted;
  }
  