import { useEffect, useState } from 'react';

// Deal with hydration error
export function useSafeClientValue(data: string | undefined = '', initialValue = ''): string {
  const [value, setValue] = useState(initialValue);
  useEffect(() => setValue(data), [data]);
  return value;
}
