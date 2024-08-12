import { useBasenamesLaunchTime } from 'apps/web/src/hooks/useBasenamesLaunchTime';
import { useState } from 'react';
import { useInterval } from 'usehooks-ts';

const THIRTY_SIX_HOURS_IN_SECONDS = 36 * 60 * 60;

export function usePremiumEndDurationRemaining() {
  const [timeLeft, setTimeLeft] = useState<string | null>(null);
  const { data: launchTimeSeconds } = useBasenamesLaunchTime();

  useInterval(() => {
    if (!launchTimeSeconds) return;

    const now = Math.floor(Date.now() / 1000); // Current time in seconds
    const endTime = Number(launchTimeSeconds) + THIRTY_SIX_HOURS_IN_SECONDS;
    const difference = endTime - now;

    if (difference > 0) {
      const days = Math.floor(difference / (24 * 60 * 60));
      const hours = Math.floor((difference % (24 * 60 * 60)) / (60 * 60));
      const minutes = Math.floor((difference % (60 * 60)) / 60);
      const seconds = difference % 60;

      setTimeLeft(
        `${days.toString().padStart(2, '0')}:${hours.toString().padStart(2, '0')}:${minutes
          .toString()
          .padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`,
      );
    } else {
      setTimeLeft('00:00:00:00');
    }
  }, 1000);

  return timeLeft;
}
