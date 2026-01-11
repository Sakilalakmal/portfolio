/**
 * Formats a date into a 24-hour time string (e.g., "14:30")
 */
export const formatTime = (date: Date): string => {
  return new Intl.DateTimeFormat("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).format(date);
};

/**
 * Formats a date into a full date string (e.g., "Wed, Jan 11, 2026")
 * Matching the Windows 98 / classic system feel.
 */
export const formatDate = (date: Date): string => {
  return new Intl.DateTimeFormat("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(date);
};
