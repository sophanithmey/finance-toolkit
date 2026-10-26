import { generateCalendar } from '../../utils/calendar';

interface Props {
  currentDate: Date;
}

const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

export default function CalendarGrid({ currentDate }: Props) {
  const days = generateCalendar(currentDate);

  return (
    <div className='p-6'>
      <div className='grid grid-cols-7 gap-2'>
        {weekDays.map((day) => (
          <div
            key={day}
            className='pb-2 text-center text-xs font-bold uppercase tracking-wider text-slate-400'
          >
            {day}
          </div>
        ))}

        {days.map((day) => (
          <div
            key={day.date.toISOString()}
            className={`
              relative flex aspect-square flex-col items-center justify-center rounded-2xl text-xs sm:text-sm font-semibold transition-all duration-200
              ${
                day.today
                  ? 'bg-linear-to-tr from-indigo-600 to-blue-600 text-white shadow-lg shadow-indigo-500/30 scale-105'
                  : day.currentMonth
                    ? 'text-slate-700 hover:bg-indigo-50/70 hover:text-indigo-600 hover:scale-105'
                    : 'text-slate-300'
              }
            `}
          >
            <span>{day.day}</span>

            {!day.today && day.day % 5 === 0 && day.currentMonth && (
              <span className='absolute bottom-1.5 h-1.5 w-1.5 rounded-full bg-indigo-500' />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
