import { generateCalendar } from '../../utils/calendar';

interface Props {
  currentDate: Date;
}

const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

export default function CalendarGrid({ currentDate }: Props) {
  const days = generateCalendar(currentDate);

  return (
    <div className='p-5'>
      <div className='grid grid-cols-7 gap-1.5'>
        {weekDays.map((day) => (
          <div
            key={day}
            className='pb-2 text-center text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500'
          >
            {day}
          </div>
        ))}

        {days.map((day) => (
          <div
            key={day.date.toISOString()}
            className={`
              relative flex aspect-square flex-col items-center justify-center rounded-xl text-xs font-semibold transition-colors
              ${
                day.today
                  ? 'bg-slate-900 text-white font-bold dark:bg-white dark:text-slate-900 shadow-2xs'
                  : day.currentMonth
                    ? 'text-slate-700 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800'
                    : 'text-slate-300 dark:text-slate-700'
              }
            `}
          >
            <span>{day.day}</span>
            {!day.today && day.day % 7 === 0 && day.currentMonth && (
              <span className='absolute bottom-1 h-1 w-1 rounded-full bg-indigo-500' />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
