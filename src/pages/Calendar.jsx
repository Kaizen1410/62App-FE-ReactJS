import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import { useLocation } from 'react-router-dom'
import { useEffect, useState } from 'react'
import Loading from '../components/Loading'
import { getLeavesCalendar } from '../api/ApiLeave'

const Calendar = () => {
  const [events, setEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const location = useLocation();

  useEffect(() => {
    getLeaves();
  }, []);

  // Retrieve Leaves data for calendar event
  const getLeaves = async () => {
    setIsLoading(true);

    const { data, error } = await getLeavesCalendar();
    if (error) {
      console.error(error);
    } else {
      const dataEvents = data.map(d => ({ title: d.employee?.name, date: d.date_leave }));
      setEvents(dataEvents);
    }
    setIsLoading(false);
  }

  return (
    <div className="border overflow-auto py-4 px-4 bg-white dark:bg-gray-800 dark:text-white shadow-md rounded-lg text-sm">
      {isLoading
        ? <div className='h-96'>
          <Loading size='xl' />
        </div>
        : <FullCalendar
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
          initialView="dayGridMonth"
          initialDate={location.state?.date || undefined}
          events={events}
          headerToolbar={{
            left: 'prev,next today',
            center: 'title',
            right: 'dayGridMonth,timeGridWeek,timeGridDay',
          }}
        />}
    </div>
  )
}

export default Calendar
