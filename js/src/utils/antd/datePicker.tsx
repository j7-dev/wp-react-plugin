import { Dayjs } from 'dayjs'
import type { RangePickerProps } from 'antd/es/date-picker'

const range = (start: number, end: number) => {
  const result = []
  for (let i = start; i < end; i++) {
    result.push(i)
  }
  return result
}

export const disabledTime =
  ({
    type,
    watchStartTime,
    watchEndTime,
  }: {
    type: 'startTime' | 'endTime'
    watchStartTime: Dayjs
    watchEndTime: Dayjs
  }): any =>
  () => {
    if (!watchStartTime || !watchEndTime) return {}
    const startTimeDate = watchStartTime.format('YYYY-MM-DD')
    const endTimeDate = watchEndTime.format('YYYY-MM-DD')
    if (startTimeDate === endTimeDate) {
      const startTimeHour: number = parseInt(watchStartTime.format('HH'), 10)
      const startTimeMinute: number = parseInt(watchStartTime.format('mm'), 10)
      const endTimeHour: number = parseInt(watchEndTime.format('HH'), 10)
      const endTimeMinute: number = parseInt(watchEndTime.format('mm'), 10)

      if (type === 'startTime') {
        return {
          disabledHours: () => range(endTimeHour + 1, 24),
          disabledMinutes: (selectedHour: number) => {
            if (selectedHour === endTimeHour) {
              return range(endTimeMinute, 60)
            }
          },
        }
      }

      if (type === 'endTime') {
        return {
          disabledHours: () => range(0, startTimeHour),
          disabledMinutes: (selectedHour: number) => {
            if (selectedHour === startTimeHour) {
              return range(0, startTimeMinute + 1)
            }
          },
        }
      }
    }

    return {}
  }

export const disabledDate =
  ({
    type,
    watchStartTime,
    watchEndTime,
  }: {
    type: 'startTime' | 'endTime'
    watchStartTime: Dayjs
    watchEndTime: Dayjs
  }): RangePickerProps['disabledDate'] =>
  (current: Dayjs) => {
    if (type === 'startTime') {
      if (!!watchEndTime) {
        return (
          current &&
          current.valueOf() > watchEndTime.startOf('day').add(1, 'd').valueOf()
        )
      }
      return false
    }

    if (type === 'endTime') {
      if (!!watchStartTime) {
        return (
          current && current.valueOf() < watchStartTime.startOf('day').valueOf()
        )
      }
      return false
    }
    return false
  }
