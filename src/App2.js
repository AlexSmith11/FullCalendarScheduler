// import React, { useState } from "react";
// import { formatEvents } from "../utils";
// import FullCalendar from "@fullcalendar/react";
// import dayGridPlugin from "@fullcalendar/daygrid";
// import timeGridPlugin from "@fullcalendar/timegrid";

// import "./main.scss";
// import Axios from "axios";

// const url = "idk";
// const header = {
//   headers: { Authorization: undefined }
// };

// function ApiWrapper() {
//   const [events, setEvents] = useState([]);

//   getEvent = () => {
//     Axios.get(url, header)
//       .then(this.onEvents)
//       .catch(this.onEventsFail);
//   };

//   onEvents = ({ data }) => {
//     const formattedEvents = formatEvents(data);
//     setEvents([...events, formattedEvents]);

//     getEvent2();
//   };

//   onEventsFail = () => {
//     // Do something here
//   };
  
//   return (
//     <div className="demo-app">
//         <div className="demo-app-top">
//           <button onClick={this.toggleWeekends}>toggle weekends</button>&nbsp;
//           <button onClick={this.gotoPast}>go to a date in the past</button>
//         </div>
//         <div className="demo-app-calendar">
//           <FullCalendar
//             defaultView="timeGridWeek"
//             plugins={[dayGridPlugin, timeGridPlugin]}
//             ref={this.calendarComponentRef}
//             weekends={this.state.weekends}
//             allDaySlot={false}
//             height="parent"
//             events={this.state.calendarEvents}
//             header={{
//               left: "prev,next today",
//               center: "title",
//               right: "dayGridMonth,timeGridWeek,timeGridDay,listWeek"
//             }}
//           />
//         </div>
//       </div>
//   );
// }

// export default ApiWrapper;