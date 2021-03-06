/**
 * Return true if all parameters of the two objects match each other
 * @param {a} items
 * @param {b} items
 */
export function invitesMatch(a, b) {
  return (
    a.title === b.title && a.origStart.isSame(b.origStart) && a.origEnd.isSame(b.origEnd)
  );
}