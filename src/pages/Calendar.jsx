import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'

const Calendar = () => {

  return (
    <div className="border-2 py-4 px-4 bg-white shadow-md rounded-lg m-2 text-sm ">
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin]}
        initialView="dayGridMonth"
        selectable={true}
        headerToolbar={{
          left: 'prev,next today',
          center: 'title',
          right: 'dayGridMonth,timeGridWeek,timeGridDay',
        }}
        dateClick={(info) => {
          alert('clicked ' + info.dateStr);
        }}
        select={(info) => {
          alert(
            'selected ' + info.startStr + ' to ' + info.endStr
          );
        }}
      />
    </div>
  )
}

export default Calendar
