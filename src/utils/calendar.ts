import {
  eachDayOfInterval,
  endOfMonth,
  endOfWeek,
  format,
  startOfMonth,
  startOfWeek,
} from "date-fns";

export interface CalendarDay {
  date: Date;
  day: number;
  currentMonth: boolean;
  today: boolean;
}

export function generateCalendar(date: Date): CalendarDay[] {
  const monthStart = startOfMonth(date);
  const monthEnd = endOfMonth(date);

  const calendarStart = startOfWeek(monthStart);
  const calendarEnd = endOfWeek(monthEnd);

  return eachDayOfInterval({
    start: calendarStart,
    end: calendarEnd,
  }).map((day) => ({
    date: day,
    day: Number(format(day, "d")),
    currentMonth: day.getMonth() === date.getMonth(),
    today: format(day, "yyyy-MM-dd") === format(new Date(), "yyyy-MM-dd"),
  }));
}