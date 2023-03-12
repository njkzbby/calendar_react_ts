import React from 'react';

import { Calendar } from './components';

import './static/css/global.css';
import { CalendarContextProvider } from './components/Calendar/hooks/useCalendar';

export const App: React.FC = () => {
    const [selectedDate, setSelectedDay] = React.useState(new Date());

     return (
        <CalendarContextProvider options={{ selectedDate, firstWeekDayNumber: 2 }}>
            <div className="app__container">
                <Calendar selectedDate={selectedDate} selectDate={(date: Date) => setSelectedDay(date)} />
            </div>
        </CalendarContextProvider>
    );
};

// TODO
// 1 / удалить locale отовсюду +-
// 2 / сделать модалку универсальной
// 3 / модалка (опционально):
//     ивент на клик вне зоны (чтобы закрывалось или делало еще что-то)
//     react.createPortal - делаем модалку через него
// 4 / типизировать CalendarEvent date +++++++++++
// 5 / переписать форму на react-hook-form +
// 6 имплементация нескольких классов через clsx +
// [
//   "calendar__day",
//   isToday ? "calendar__today__item" : "",
//   isSelectedDay ? "calendar__selected__item" : "",
//   isAdditionalDay ? "calendar__additional__day" : "",
// ].join(" ")
// это можно будет заменить на
// cx({"calendar__today__item": isToday, "calendar__selected__item": isSelectedDay, "calendar__additional__day": isAdditionalDay})

export default App;
