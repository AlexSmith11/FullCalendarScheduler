import Axios from "axios";

export const getEvents = async () => {
  return Axios.get(
    "https://dyhm3xstr8.execute-api.us-east-2.amazonaws.com/dev/events/get",
    { headers: { Authorization: "c31912bb-0b58-42d1-a9a0-c521ecc98cdf" } }
  ).then(response => {
    return response;
  });
};
export const getInvites = async () => {
  return Axios.get(
    "https://dyhm3xstr8.execute-api.us-east-2.amazonaws.com/dev/invites/get",
    { headers: { Authorization: "c31912bb-0b58-42d1-a9a0-c521ecc98cdf" } }
  ).then(response => {
    return response;
  });
};
