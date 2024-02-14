export function parseDate(dateStr: string): string {
  const [year, month, day] = dateStr.split("-");
  const monthInt = parseInt(month, 10);
  const dayInt = parseInt(day, 10);
  const formattedMonth = monthInt > 9 ? month : month.padStart(2, "0");
  const formattedDay = dayInt > 9 ? day : day.padStart(2, "0");
  return `${year}-${formattedMonth}-${formattedDay}`;
}
