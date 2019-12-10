import moment from "moment";
/**
 * Settings for the renaming of events
 * @param {*} items 
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

export function formatParamNamesEvent(events) {
  return events.map(event => ({
    title: event.name,
    end: moment(event.endTime),
    start: moment(event.startTime),
    isEvent: true,
  }));
}