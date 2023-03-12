import React, { useState } from 'react';
import { useCalendar } from './hooks/useCalendar';

import './Calendar.css';
import { CalendarItem, Day } from './CalendarItem';
import { SubmitDate } from '../Modal/Modal';

export const Calendar: React.FC<{ selectDate: any; selectedDate: any }> = ({ selectDate, selectedDate }) => {
    const { functions, state } = useCalendar();
    const [searchText, setSearchText] = useState('');
    // const { getEventByNameOrParticipants } = functions;
    const events: SubmitDate[] = JSON.parse(localStorage.getItem('events') || '[]');
    const filteredEvents = events.filter((event) => {
        return Boolean(searchText) && (event.name.includes(searchText) || event.participants.includes(searchText));
    });

    return (
        <>
            <div className="header">
                <div className="container">
                    <div className="control">
                        <div className="buttons">
                            <button className="c-button">Добавить</button>
                            <button className="c-button refresh-button">Обновить</button>
                        </div>
                        <form>
                            <input type="text" value={searchText} onChange={(e) => setSearchText(e.target.value)} />
                            <ul className="search_box">
                                {filteredEvents.map((event) => (
                                    <li key={event.participants}>
                                        {event.name} <br /> {event.participants}
                                    </li>
                                ))}
                            </ul>
                        </form>
                    </div>
                </div>
            </div>
            <div className="container">
                <div className="calendar">
                    <div className="calendar__header">
                        <div aria-hidden className="calendar__header__arrow__left" onClick={() => functions.onClickArrow('left')} />

                        <div aria-hidden className="month">
                            {state.monthesNames[state.selectedMonth.monthIndex].month} {state.selectedYear}
                        </div>

                        <div aria-hidden className="calendar__header__arrow__right" onClick={() => functions.onClickArrow('right')} />
                    </div>
                    <div className="calendar__body">
                        <div className="calendar__days">
                            {/*// todo: типизировать day*/}
                            {state.calendarDays.map((day: Day, dayIndex: number) => (
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
