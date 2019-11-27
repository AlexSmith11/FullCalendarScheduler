import React from 'react';
import FullCalendar from '@fullcalendar/react'
import timeGridPlugin from '@fullcalendar/timegrid';

import './main.scss'

function App() {
  return (
    <FullCalendar 
      defaultView="timeGridWeek"
      plugins={[timeGridPlugin]}
      weekends={false}
      allDaySlot={false}
      height="parent"
      events='https://fullcalendar.io/demo-events.json'
    />
  );
}

export default App;
