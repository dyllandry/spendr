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
      {dateString}
    </span>
  )
}

/**
 * Returns a formatted date string, either in day/month/year or a 00:00 am/pm
 * time if the transaction's date is today.
 * @param tDate {Date} Date of transaction.
 * @param now {Date} Date now.
 * @returns {string} Formatted date string.
 */
function getFormattedDateString(tDate: Date, now: Date): string {
  if (tDate.getDate() === now.getDate()) return getFormattedTimeString(tDate)
  else return `${tDate.getDate()}/${tDate.getMonth() + 1}/${tDate.getFullYear()}`
}

/**
 * Returns a formatted string from a date object as a 00:00 am/pm format.
 * @param date {Date} 
 * @returns {Date} Formatted time.
 */
function getFormattedTimeString(date: Date): string {
  const hours = date.getHours() < 13 ? date.getHours() : date.getHours() % 12
  const minutes = date.getMinutes().toString().padStart(2, '0')
  const amPm = date.getHours() > 11 ? 'pm' : 'am'
  return `${hours}:${minutes} ${amPm}`
}