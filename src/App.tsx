import React from "react";

import { Calendar } from "./components";
import { formatDate } from "./utils/helpers/date";

import "./static/css/global.css";
import { CalendarContextProvider } from "./components/Calendar/hooks/useCalendar";

export const App: React.FC = () => {
  const [selectedDate, setSelectedDay] = React.useState(new Date());

  return (
    <CalendarContextProvider
      options={{ locale: "default", selectedDate, firstWeekDayNumber: 2 }}
    >
      <div className="app__container">
        {/* <div className="date__container">
          {formatDate(selectedDate, "DDD DD MMM YYYY")}
        </div> */}

        <Calendar
          selectedDate={selectedDate}
          selectDate={(date: Date) => setSelectedDay(date)}
        />
      </div>
    </CalendarContextProvider>
  );
};

export default App;
