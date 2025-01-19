export function formatDateAsEpoch(date: Date) {
  // Ensure the input is a Date object
  const parsedDate = typeof date === "string" ? new Date(date) : date;

  // Check if the date is valid

  // Convert to epoch time (seconds)
  return Math.floor(parsedDate.getTime() / 1000);
}
