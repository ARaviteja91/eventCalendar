import React, { useState } from 'react';
import './Calendar.css';

const Calendar = ({ events }) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedEvent, setSelectedEvent] = useState(null);

  // Function to get the number of days in a month
  const getDaysInMonth = (year, month) => {
    return new Date(year, month + 1, 0).getDate();
  };

  // Function to get the first day of the month
  const getFirstDayOfMonth = (year, month) => {
    return new Date(year, month, 1).getDay();
  };

  // Function to generate an array of days in the month
  const generateDaysArray = (year, month) => {
    const daysInMonth = getDaysInMonth(year, month);
    const firstDay = getFirstDayOfMonth(year, month);
    const daysArray = [];

    // Add empty placeholders for days before the first day of the month
    for (let i = 0; i < firstDay; i++) {
      daysArray.push(null);
    }

    // Add days of the month
    for (let i = 1; i <= daysInMonth; i++) {
      daysArray.push(i);
    }

    return daysArray;
  };

  // Function to format month and day numbers with leading zeros
  const formatNumber = num => {
    return num < 10 ? `0${num}` : num;
  };

  // Function to format date string (YYYY-MM-DD)
  const formatDate = (year, month, day) => {
    return `${year}-${formatNumber(month + 1)}-${formatNumber(day)}`;
  };

  // Function to handle date click
  const handleDateClick = (day) => {
    const eventOnDay = events.find(event => {
      const eventDate = new Date(event.date);
      return eventDate.getFullYear() === currentDate.getFullYear() &&
             eventDate.getMonth() === currentDate.getMonth() &&
             eventDate.getDate() === day;
    });

    setSelectedEvent(eventOnDay);
  };

  // Function to handle previous month button click
  const goToPreviousMonth = () => {
    const previousMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1);
    setCurrentDate(previousMonth);
  };

  // Function to handle next month button click
  const goToNextMonth = () => {
    const nextMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1);
    setCurrentDate(nextMonth);
  };

  // Days in the month
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth();
  const daysArray = generateDaysArray(currentYear, currentMonth);

  return (
    <div className="calendar">
      <div className="calendar-header">
        <button className='chevron' onClick={goToPreviousMonth}>&#8249;</button>
        <h2>{`${currentDate.toLocaleString('default', { month: 'long' })} ${currentYear}`}</h2>
        <button className='chevron' onClick={goToNextMonth}>&#8250;</button>
      </div>
      <div className="days">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
          <div key={day} className="day-label">{day}</div>
        ))}
        {daysArray.map((day, index) => (
          <div key={index} className={`day ${day ? 'active' : ''}`} onClick={() => handleDateClick(day)}>
            {day && (
              <span className="day-number">{day}</span>
            )}
            {events.map(event => {
              const eventDate = new Date(event.date);
              if (eventDate.getFullYear() === currentYear && eventDate.getMonth() === currentMonth && eventDate.getDate() === day) {
                return <div key={event.id} className="event">{event.title}</div>;
              }
              return null;
            })}
          </div>
        ))}
      </div>
      {selectedEvent && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={() => setSelectedEvent(null)}>&times;</span>
            <h2>{selectedEvent.title}</h2>
            <p>{selectedEvent.date}</p>
            <p>{selectedEvent.description}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Calendar;
