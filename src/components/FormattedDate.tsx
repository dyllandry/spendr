import React from 'react'

export default function FormattedDate({
  itemDate,
  nowDate,
  className = ''
}: {
  itemDate: Date,
  nowDate: Date,
  className?: string
}) {
  const dateString = getFormattedDateString(itemDate, nowDate)
  return (
    <span className={className}>
      <span aria-hidden='true'>
        {dateString}
      </span>
      <span className='screen-reader-only'>
        {'Received on: ' + getAriaReadableDate(itemDate)}
      </span>
    </span>
  )
}

const Months= [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December'
]

/**
 * Converst a date into a more aria readable format: "January 1 1970 12:00 AM"
 * @param {Date} date The date to format.
 * @returns {string} The formatted string.
 */
function getAriaReadableDate(date: Date): string {
  return `${Months[date.getMonth()]}` 
    + ` ${date.getDate()} ${date.getFullYear()}` 
    + ` at ` + getPostMeridiem(date)
}

/**
 * Formats a date into a time using Post Meridiem (PM/AM) system.
 * @param {Date} date The date to convert.
 * @returns {string} The resulting string in Post Meridiem.
 */
function getPostMeridiem (date: Date): string {
  const hours = (date.getHours() + 12) % 12
  const minutes = date.getMinutes() < 10 
    ? '0' + date.getMinutes()
    : date.getMinutes()
  const suffix = date.getHours() > 12 ? 'PM' : 'AM'
  return `${hours}:${minutes} ${suffix}`
}

/**
 * Returns a formatted date string, either in day/month/year or a 00:00 am/pm
 * time if the transaction's date is today.
 * @param tDate {Date} Date of transaction.
 * @param now {Date} Date now.
 * @returns {string} Formatted date string.
 */
function getFormattedDateString(tDate: Date, now: Date): string {
  if (tDate.getDate() === now.getDate()) return getPostMeridiem(tDate)
  else return `${tDate.getDate()}/${tDate.getMonth() + 1}/${tDate.getFullYear()}`
}
