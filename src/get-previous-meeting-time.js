import dayjs from 'dayjs'

export const getPreviousMeetingTime = () => {
  const { MEETING_DAY = '1,2,3,4,5', MEETING_TIME = '10:00', MEETING_TIME_ZONE = '+08:00' } = process.env
  const queryDay = dayjs()
  
  const getMeetingDateTime = (date) => `${date.format('YYYY-MM-DD')}T${MEETING_TIME}:00${MEETING_TIME_ZONE}`
  
  if (queryDay.isBefore(getMeetingDateTime(queryDay))) {
    queryDay = queryDay.subtract(1, 'days')
  }
  const dayOfWeek = queryDay.day()

  const meetingDay = MEETING_DAY.split(',').sort((a, b) => b - a).map(c => +c)
  const meetingDiff = Array.from({ length: 7 }, (_, i) => {
    const diff = i - (meetingDay.find(m => m <= i) || meetingDay.find(m => m <= i + 7) || 0)
    return diff < 0 ? 7 + diff : diff
  })

  const previousMeetingDate = queryDay.subtract(meetingDiff[dayOfWeek], 'day')
  const isoDateTimeString = getMeetingDateTime(previousMeetingDate)

  return isoDateTimeString
}