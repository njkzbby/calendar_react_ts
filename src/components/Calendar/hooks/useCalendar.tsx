import React, { FC, PropsWithChildren, ReactNode, useCallback, useContext } from 'react';
import { createContext } from 'react';

import { getMonthesNames, createMonth, getWeekDaysNames, getMonthNumberOfDays, createDate } from '../../../utils/helpers/date';
import { SubmitDate } from '../../Modal/Modal';

interface UseCalendarParams {
    selectedDate: Date;
    firstWeekDayNumber?: number;
}

const DAYS_IN_WEEK = 7;

const getYearsInterval = (year: number) => {
    const startYear = Math.floor(year / 10) * 10;
    return [...Array(10)].map((_, index) => startYear + index);
};

const useCalendarStore = ({ selectedDate: date, firstWeekDayNumber = 2 }: UseCalendarParams) => {
    const [selectedDay, setSelectedDay] = React.useState(createDate({ date }));
    const [selectedMonth, setSelectedMonth] = React.useState(
        createMonth({
            date: new Date(selectedDay.year, selectedDay.monthIndex),
        })
    );
    const [selectedYear, setSelectedYear] = React.useState(selectedDay.year);
    const [selectedYearsInterval, setSelectedYearsInterval] = React.useState(getYearsInterval(selectedDay.year));

    const monthesNames = React.useMemo(() => getMonthesNames(), []);
    const weekDaysNames = React.useMemo(() => getWeekDaysNames(firstWeekDayNumber), []);

    const days = React.useMemo(() => selectedMonth.createMonthDays(), [selectedMonth, selectedYear]);

    const calendarDays = React.useMemo(() => {
        const monthNumberOfDays = getMonthNumberOfDays(selectedMonth.monthIndex, selectedYear);

        const prevMonthDays = createMonth({
            date: new Date(selectedYear, selectedMonth.monthIndex - 1),
        }).createMonthDays();

        const nextMonthDays = createMonth({
            date: new Date(selectedYear, selectedMonth.monthIndex + 1),
        }).createMonthDays();

        const firstDay = days[0];
        const lastDay = days[monthNumberOfDays - 1];

        const shiftIndex = firstWeekDayNumber - 1;
        const numberOfPrevDays =
            firstDay.dayNumberInWeek - 1 - shiftIndex < 0
                ? DAYS_IN_WEEK - (firstWeekDayNumber - firstDay.dayNumberInWeek)
                : firstDay.dayNumberInWeek - 1 - shiftIndex;

        const numberOfNextDays =
            DAYS_IN_WEEK - lastDay.dayNumberInWeek + shiftIndex > 6
                ? DAYS_IN_WEEK - lastDay.dayNumberInWeek - (DAYS_IN_WEEK - shiftIndex)
                : DAYS_IN_WEEK - lastDay.dayNumberInWeek + shiftIndex;

        const totalCalendarDays = days.length + numberOfPrevDays + numberOfNextDays;

        const result = [];

        for (let i = 0; i < numberOfPrevDays; i += 1) {
            const inverted = numberOfPrevDays - i;
            result[i] = prevMonthDays[prevMonthDays.length - inverted];
        }

        for (let i = numberOfPrevDays; i < totalCalendarDays - numberOfNextDays; i += 1) {
            result[i] = days[i - numberOfPrevDays];
        }

        for (let i = totalCalendarDays - numberOfNextDays; i < totalCalendarDays; i += 1) {
            result[i] = nextMonthDays[i - totalCalendarDays + numberOfNextDays];
        }

        return result;
    }, [selectedMonth.year, selectedMonth.monthIndex, selectedYear]);

    const onClickArrow = (direction: 'right' | 'left') => {
        const monthIndex = direction === 'left' ? selectedMonth.monthIndex - 1 : selectedMonth.monthIndex + 1;
        if (monthIndex === -1) {
            const year = selectedYear - 1;
            setSelectedYear(year);
            if (!selectedYearsInterval.includes(year)) setSelectedYearsInterval(getYearsInterval(year));
            return setSelectedMonth(createMonth({ date: new Date(selectedYear - 1, 11) }));
        }

        if (monthIndex === 12) {
            const year = selectedYear + 1;
            setSelectedYear(year);
            if (!selectedYearsInterval.includes(year)) setSelectedYearsInterval(getYearsInterval(year));
            return setSelectedMonth(createMonth({ date: new Date(year, 0) }));
        }

        setSelectedMonth(createMonth({ date: new Date(selectedYear, monthIndex) }));
    };

    const setSelectedMonthByIndex = (monthIndex: number) => {
        setSelectedMonth(createMonth({ date: new Date(selectedYear, monthIndex) }));
    };

    const getEventByDay = useCallback((day: number): SubmitDate | undefined => {
        const events = JSON.parse(localStorage.getItem('events') || '[]')
        return events.find((event: SubmitDate) => event.date === day)
    }, [localStorage])

    const getEventByNameOrParticipants = useCallback((text: string ): SubmitDate | undefined => {
        const events = JSON.parse(localStorage.getItem('events') || '[]')
        return events.find((event: SubmitDate) => event.name.includes(text) || event.participants.includes(text))
    }, [localStorage])

    return {
        state: {
            calendarDays,
            weekDaysNames,
            monthesNames,
            selectedDay,
            selectedMonth,
            selectedYear,
            selectedYearsInterval,
        },
        functions: {
            getEventByNameOrParticipants,
            getEventByDay,
            onClickArrow,
            setSelectedDay,
            setSelectedMonthByIndex,
            setSelectedYear,
            setSelectedYearsInterval,
        },
    };
};
type CalendarReturn = ReturnType<typeof useCalendarStore>;
type CalendarContextType = CalendarReturn | null;
type CalendarContextProps = PropsWithChildren<{ options: UseCalendarParams }>;
const CalendarContext = createContext<CalendarContextType>(null);
export const CalendarContextProvider: FC<CalendarContextProps> = ({ children, options }) => {
    const store = useCalendarStore(options);

    return <CalendarContext.Provider value={store}>{children}</CalendarContext.Provider>;
};
type Selector<T> = (state: T) => any;
const defaultSelector: Selector<CalendarContextType> = (v) => v;

export const useCalendar = (selector = defaultSelector) => selector(useContext<CalendarContextType>(CalendarContext));
