// Define a function to format and print relative time
export function printRelativeTime(dateString: string) {
  const date = new Date(dateString);
  const now = new Date();
  const diff = now.getTime() - date.getTime();

  const rtf = new Intl.RelativeTimeFormat("en", { numeric: "auto" });

  // Convert milliseconds to days
  const daysDiff = Math.floor(diff / (1000 * 60 * 60 * 24));

  if (daysDiff < 1) {
    const hoursDiff = Math.floor(diff / (1000 * 60 * 60));
    if (hoursDiff < 1) {
      const minutesDiff = Math.floor(diff / (1000 * 60));
      return rtf.format(-minutesDiff, "minutes");
    } else {
      return rtf.format(-hoursDiff, "hours");
    }
  } else if (daysDiff < 30) {
    return rtf.format(-daysDiff, "days");
  } else {
    const monthsDiff = Math.floor(daysDiff / 30);
    if (monthsDiff < 12) {
      return rtf.format(-monthsDiff, "months");
    } else {
      const yearsDiff = Math.floor(monthsDiff / 12);
      return rtf.format(-yearsDiff, "years");
    }
  }
}
