import { format, formatDistanceToNow, parseISO, isAfter, isBefore, differenceInDays } from 'date-fns';

export const formatDate = (date: string, pattern: string = 'MMMM d, yyyy'): string => {
  return format(parseISO(date), pattern);
};

export const formatShortDate = (date: string): string => {
  return format(parseISO(date), 'MMM d, yyyy');
};

export const formatTime = (date: string): string => {
  return format(parseISO(date), 'h:mm a');
};

export const getRelativeTime = (date: string): string => {
  return formatDistanceToNow(parseISO(date), { addSuffix: true });
};

export const isUpcoming = (date: string): boolean => {
  return isAfter(parseISO(date), new Date());
};

export const isPast = (date: string): boolean => {
  return isBefore(parseISO(date), new Date());
};

export const getDaysUntil = (date: string): number => {
  return differenceInDays(parseISO(date), new Date());
};

export const getMonthDay = (date: string): { month: string; day: string } => {
  const parsed = parseISO(date);
  return {
    month: format(parsed, 'MMM'),
    day: format(parsed, 'd'),
  };
};
