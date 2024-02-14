export function getDate(d?: string): string {
  const date = d ? new Date(d) : new Date();
  return `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`;
}
