import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import { useSearchParams } from 'react-router-dom'

const Calendar = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  console.log(searchParams.get('date'))

  return (
    <div className="border-2 py-4 px-4 bg-white shadow-md dark:bg-gray-800 dark:text-gray-50 rounded-lg m-2 text-sm ">
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin]}
        initialView="dayGridMonth"
        initialDate={undefined}
        selectable={true}
        headerToolbar={{
          left: 'prev,next today',
          center: 'title',
          right: 'dayGridMonth,timeGridWeek,timeGridDay',
        }}
        // dateClick={(info) => {
        //   alert('clicked ' + info.dateStr);
        // }}
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
