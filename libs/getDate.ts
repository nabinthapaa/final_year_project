import { parseDate } from "./parseDate";

export function getDate(d?: string): string {
  const date = d ? new Date(d) : new Date();
  return parseDate(`${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`);
}
