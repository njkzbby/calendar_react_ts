import cx from 'clsx';
import React, { useState } from 'react';
import { checkDateIsEqual, checkIsToday } from '../../utils/helpers/date';
import { Modal } from '../Modal/Modal';
import { useCalendar } from './hooks/useCalendar';

export interface Day {
    date: Date;
    day: number;
    monthIndex: number;
    dayNumber: number;
}

export const CalendarItem = ({
                                 day,
                                 dayIndex,
                                 selectDate,
                                 active,
                                 setActive
                             }: {
    day: Day;
    dayIndex: any;
    selectDate: any;
    active: boolean;
    setActive: any;
}) => {
    const { state, functions } = useCalendar();
    const { getEventByDay, setSelectedDay } = functions;
    const isToday = checkIsToday(day.date);
    const isSelectedDay = checkDateIsEqual(day.date, state.selectedDay.date);
    const isAdditionalDay = day.monthIndex !== state.selectedMonth.monthIndex;
    const [modalActive, setModalActive] = useState(false);

    const event = getEventByDay(new Date(day.date).getTime()) || {};
    return (
        <div
            aria-hidden
            onClick={() => {
                setSelectedDay(day);
                selectDate(day.date);
                setModalActive(true);
            }}
            className={
                // 'calendar__day',
                // isToday ? 'calendar__today__item' : '',
                // isSelectedDay ? 'calendar__selected__item' : '',
                // isAdditionalDay ? 'calendar__additional__day' : '',
                cx('calendar__day', {
                    calendar__today__item: isToday,
                    calendar__selected__item: isSelectedDay,
                    calendar__additional__day: isAdditionalDay
                })
            }
        >
            {dayIndex < 7 && day.day + `, `}
            {day.dayNumber}
            {/* {(day.date = retrivedEvents[0].date ? retrivedEvents[0].descripthion : retrivedEvents[0].name)} */}
            <div>
                <h2>{event.name}</h2>
                <h4>{event.description}</h4>
                <h4>{event.participants}</h4>
            </div>
            <Modal active={modalActive} setActive={setModalActive} date={day}></Modal>
        </div>
    );
};
