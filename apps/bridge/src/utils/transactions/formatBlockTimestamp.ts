type FormattedTimestamp = {
  date: string;
  shortDate: string;
  time: string;
};

export function formatTimestamp(timestamp: string): FormattedTimestamp {
  const date = new Date(Number(timestamp) * 1000).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });

  const shortDate = new Date(Number(timestamp) * 1000).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
  });

  const time = new Date(Number(timestamp) * 1000).toLocaleTimeString('en-US', {
    timeStyle: 'short',
  });

  return { date, shortDate, time };
}
