import React, { useState, useMemo, useCallback } from 'react';
import './Calendar.css';
import {
  format,
  getDaysInMonth,
  getMonth,
  getDate,
  getDay,
  setDate,
  addMonths,
  getYear,
} from 'date-fns';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faChevronLeft,
  faChevronRight,
  faCalendarAlt
} from '@fortawesome/free-solid-svg-icons';

const CalendarContext = React.createContext({
  monthYear: format(new Date(), 'MMMM, yyyy'),
});

function Calendar() {
  const [date, changeDate] = useState(new Date());
  const monthYear = useMemo(() => format(date, 'MMMM, yyyy'), [date]);
  const dayOfWeek = useMemo(() => format(date, 'EEEE'), [date]);
  const dayOfMonth = useMemo(() => format(date, 'LLL, dd'), [date]);
  const daysInMonth = useMemo(() => {
    const days = getDaysInMonth(date);
    const today = getDate(date);
    const newDate = setDate(date, 1);
    const thisMonth = getMonth(new Date());
    const month = getMonth(date);
    const thisYear = getYear(new Date());
    const year = getYear(date);
    let weekDay = getDay(newDate);
    weekDay = weekDay === 7 ? 1 : weekDay + 1;
    const result = [];
    for (let i = 0; i < days; i++) {
      const dayNumber = i + 1;
      result[i] = (
        <li
          key={dayNumber}
          className={`calenday__day ${
            i === 0 ? `calendar__offset${weekDay}` : ''
          } ${
            today === dayNumber && thisMonth === month && thisYear === year
              ? 'calendar__today'
              : ''
          }`}
        >
          <div>{dayNumber}</div>
        </li>
      );
    }
    return result;
  }, [date]);
  const prevDateClick = useCallback(
    () => changeDate(addMonths(date, -1)),
    [date]
  );
  const nextDateClick = useCallback(
    () => changeDate(addMonths(date, 1)),
    [date]
  );
  return (
    <CalendarContext.Provider value={{}}>
      <div className="calendar">
        <div className="calendar__content" style={{ gridArea: 'calendar' }}>
          <div className="calendar__monthSelector">
            <div
              className="calendar__prevBtn calendar__btn"
              onClick={prevDateClick}
            >
              <FontAwesomeIcon icon={faChevronLeft} />
            </div>
            <div className="calendar__monthYear">{monthYear}</div>
            <div
              className="calendar__nextBtn calendar__btn"
              onClick={nextDateClick}
            >
              <FontAwesomeIcon icon={faChevronRight} />
            </div>
          </div>
          <div className="calendar__daysGrid">
            <ol>
              <li className="calendar__dayName">sun</li>
              <li className="calendar__dayName">mon</li>
              <li className="calendar__dayName">tue</li>
              <li className="calendar__dayName">wed</li>
              <li className="calendar__dayName">thu</li>
              <li className="calendar__dayName">fri</li>
              <li className="calendar__dayName">sat</li>
              {daysInMonth}
            </ol>
          </div>
        </div>
        <div className="calendar__event" style={{ gridArea: 'event' }}>
          <div className="calendar__literalDate">
            <div>{dayOfWeek}</div>
            <div>{dayOfMonth}</div>
          </div>
          <div className="calendar__eventBoard">
            <FontAwesomeIcon icon={faCalendarAlt} color='#423185' size="10x" />
            <div className="calendar__eventBoardText">
              No events for this day
            </div>
          </div>
          <div className="calendar__addEventBtnContainer">
            <div className="calendar__addEventBtn">Add event</div>
          </div>
        </div>
      </div>
    </CalendarContext.Provider>
  );
}

export default Calendar;
