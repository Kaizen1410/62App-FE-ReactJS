import React from 'react'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid' // a plugin!

const Calendar = () => {
  
    return (
        <div className="border-2 py-4 px-4 my-64 mx-64   bg-white shadow-md rounded-lg m-2 text-sm ">
          <FullCalendar 
            plugins={[ dayGridPlugin ]}
            initialView="dayGridMonth"
          />
      </div>
    )
}

export default Calendar
