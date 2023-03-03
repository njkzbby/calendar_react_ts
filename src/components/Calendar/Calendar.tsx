import React from "react";
import { useCalendar } from "./hooks/useCalendar";

import "./Calendar.css";
import { CalendarItem } from "./CalendarItem";

console.log(window.localStorage);

export const Calendar: React.FC<{ selectDate: any; selectedDate: any }> = ({
  selectDate,
  selectedDate,
}) => {
  const { functions, state } = useCalendar();

  console.log(state.selectedMonth);
  return (
    <>
      <div className="header">
        <div className="container">
          <div className="control">
            <div className="buttons">
              <button className="c-button">Добавить</button>
              <button className="c-button refresh-button">Обновить</button>
            </div>

            <input
              type="text"
              placeholder="placeholder"
              className="placeholder"
            />
          </div>
        </div>
      </div>
      <div className="container">
        <div className="calendar">
          <div className="calendar__header">
            <div
              aria-hidden
              className="calendar__header__arrow__left"
              onClick={() => functions.onClickArrow("left")}
            />

            <div aria-hidden className="month">
              {state.monthesNames[state.selectedMonth.monthIndex].month}{" "}
              {state.selectedYear}
            </div>

            <div
              aria-hidden
              className="calendar__header__arrow__right"
              onClick={() => functions.onClickArrow("right")}
            />
          </div>
          <div className="calendar__body">
            <div className="calendar__days">
              {state.calendarDays.map((day, dayIndex) => (
                <CalendarItem
                  selectDate={selectDate}
                  day={day}
                  dayIndex={dayIndex}
                  key={`${day.dayNumber}-${day.monthIndex}`}
                  active={false}
                  setActive={undefined}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
