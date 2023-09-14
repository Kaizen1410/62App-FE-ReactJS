import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import { useLocation } from 'react-router-dom'
import { useEffect, useState } from 'react'
import fetchClient from '../utils/fetchClient'
import Loading from '../components/Loading'

const Calendar = () => {
  const [events, setEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const location = useLocation();
  const { date } = location.state;
  console.log(date)

  useEffect(() => {
    getLeavesMonth();
  }, []);

  const getLeavesMonth = async () => {
    setIsLoading(true);
    try {
      const res = await fetchClient.get('/api/leaves/calendar');
      const data = res.data.data.map(d => ({title: d.employee.name, date: d.date_leave}));
      setEvents(data);
    } catch (err) {;
      console.error(err)
    }
    setIsLoading(false);
  }

  return (
    <div className="border overflow-auto py-4 px-4 min-h-96 bg-white dark:bg-gray-800 dark:text-white shadow-md rounded-lg m-2 text-sm ">
      {isLoading
      ? <div className='h-96'>
        <Loading size='xl' />
      </div> 
      : <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        initialDate={date || undefined}
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
