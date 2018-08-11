import { toNanoDate } from 'influx'

export function dateToNanoDate(date) {
  return toNanoDate(`${date.valueOf()}000000`)
}
