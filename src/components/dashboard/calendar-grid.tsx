import { generateCalendar } from '../../utils/calendar';

interface Props {
  currentDate: Date;
}

const weekDays = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];

export default function CalendarGrid({ currentDate }: Props) {
  const days = generateCalendar(currentDate);

  return (
    <div className='p-4'>
      <div className='grid grid-cols-7 gap-2'>
        {weekDays.map((day) => (
          <div
            key={day}
            className='text-center text-sm font-semibold text-slate-400'
          >
            {day}
          </div>
        ))}

        {days.map((day) => (
          <button
            key={day.date.toISOString()}
            className={`
              relative aspect-square rounded-md transition

              ${
                day.today
                  ? 'bg-indigo-600 text-white shadow-lg ring-4 ring-indigo-200'
                  : ''
              }

              ${
                day.currentMonth
                  ? 'text-slate-800 hover:bg-slate-100'
                  : 'text-slate-300'
              }
            `}
          >
            {day.day}

            {!day.today && day.day % 5 === 0 && day.currentMonth && (
              <span className='absolute bottom-2 left-1/2 h-2 w-2 -translate-x-1/2 rounded-md bg-indigo-500' />
            )}
          </button>
        ))}
      </div>
    </div>
  );
}
