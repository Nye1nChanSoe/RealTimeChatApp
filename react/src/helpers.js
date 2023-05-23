export function diffForHumans(date)
{
  const _date = new Date(date);
  const now = new Date();

  const diff = Math.abs(now - _date);
  const minutes = Math.floor(diff / (1000 * 60));

  if(minutes < 1) {
    return 'Just now';
  } else if (minutes === 1) {
    return '1m';
  } else if (minutes < 60) {
    return `${minutes}m`;
  } else if (minutes < 1440) {
    return `${Math.floor(minutes / 60)}h`;
  } else {
    return `${Math.floor(minutes / 1440)}d`;
  }
}