import dayjs from 'dayjs';

export function ShortDateThai(date: string) {
  return dayjs(date).toDate().toLocaleDateString('th-TH', {
    year: '2-digit',
    month: 'short',
    day: 'numeric',
  });
}
