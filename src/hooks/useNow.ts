import { useState, useEffect } from "react";

export const useNow = () => {
  const [now, setNow] = useState<Date | null>(null);

  useEffect(() => {
    // Set initial time to avoid hydration mismatch if possible,
    // or start with null and handle loading state.
    // For a desktop gadget, we want to match client time immediately.
    setNow(new Date());

    const interval = setInterval(() => {
      setNow(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return now;
};
