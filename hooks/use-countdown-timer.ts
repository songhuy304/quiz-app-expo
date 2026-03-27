import * as React from "react";

interface UseCountdownTimerParams {
  initialSeconds: number;
  isRunning?: boolean;
  onComplete?: () => void;
}

interface UseCountdownTimerReturn {
  timeLeft: number;
  elapsedSeconds: number;
  reset: () => void;
}

export function useCountdownTimer({
  initialSeconds,
  isRunning = true,
  onComplete,
}: UseCountdownTimerParams): UseCountdownTimerReturn {
  const [timeLeft, setTimeLeft] = React.useState(initialSeconds);
  const hasCompletedRef = React.useRef(false);

  React.useEffect(() => {
    if (!isRunning) return;
    if (timeLeft <= 0) {
      if (!hasCompletedRef.current) {
        hasCompletedRef.current = true;
        onComplete?.();
      }
      return;
    }

    const timeoutId = setTimeout(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearTimeout(timeoutId);
  }, [timeLeft, isRunning, onComplete]);

  const reset = React.useCallback(() => {
    hasCompletedRef.current = false;
    setTimeLeft(initialSeconds);
  }, [initialSeconds]);

  return {
    timeLeft,
    elapsedSeconds: initialSeconds - timeLeft,
    reset,
  };
}
