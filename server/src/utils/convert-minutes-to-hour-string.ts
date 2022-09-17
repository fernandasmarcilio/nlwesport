// 1100 -> 18:20

export function convertMinuteToHourString(minutesAmount: number) {
  const hours = Math.floor(minutesAmount / 60)
  const minutes = minutesAmount % 60

  // 9:05 -> 09:05
  const formattedHours = String(hours).padStart(2, '0')
  const formattedMinutes = String(minutes).padStart(2, '0')

  return `${formattedHours}:${formattedMinutes}`
}