import moment from "moment";
/**
 * Re-format invites to use correct key names
 * Adds addional params (origS/E) in order to compare between the curr/next events.
 * Need these as the 'end/start' params values will change after one reschedule pass.
 * If we then used the changed values and compared between objects, we would not know
 * if they were originally identical and therefore needed to be removed.
 * 
 * @param {object} invites
 */
export function formatParamNamesInvite(invites) {
  return invites.map(invite => ({
    title: invite.name,
    end: moment(invite.endTime),
    start: moment(invite.startTime),
    origStart: moment(invite.startTime),
    origEnd: moment(invite.endTime),
    isEvent: false,
  }));
}

/**
 * Re-format events to use correct key names
 * 
 * @param {object} events 
 */
export function formatParamNamesEvent(events) {
  return events.map(event => ({
    title: event.name,
    end: moment(event.endTime),
    start: moment(event.startTime),
    isEvent: true,
  }));
}