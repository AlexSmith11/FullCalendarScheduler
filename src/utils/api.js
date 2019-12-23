import Axios from "axios";

/**
 * Axios API calls.
 * Wont work anymore, so you should return test objects or different API's, if you have then, instead.
 */
export const getEvents = () => {
  const events = [
    {
      "name": "Meeting with Marketing",
      "startTime": "2019-10-28 09:30:00",
      "endTime": "2019-10-28 10:30:00"
    },
    {
      "name": "Canidate Interview",
      "startTime": "2019-10-28 10:30:00",
      "endTime": "2019-10-28 12:00:00"
    },
    {
      "name": "FDSE SCRUM",
      "startTime": "2019-10-30 14:15:00",
      "endTime": "2019-10-28 14:45:00"
    },
    {
      "name": "Engineering Party",
      "startTime": "2019-10-31 22:00:00",
      "endTime": "2019-10-31 24:30:00"
    },
    {
      "name": "Coffee with Joe",
      "startTime": "2019-11-01 08:00:00",
      "endTime": "2019-11-01 10:00:00"
    }
  ]
  return events
};
export const getInvites = () => {
  const invites = [
    {
      "name": "Meeting with HR",
      "startTime": "2019-10-28 09:30:00",
      "endTime": "2019-10-28 10:30:00"
    },
    {
      "name": "Machine Learning TedTalk",
      "startTime": "2019-10-29 10:30:00",
      "endTime": "2019-10-29 12:30:00"
    },
    {
      "name": "Sales QBR",
      "startTime": "2019-10-30 16:00:00",
      "endTime": "2019-10-30 17:45:00"
    }
  ]
  return invites
};
