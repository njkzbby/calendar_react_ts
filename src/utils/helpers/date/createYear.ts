import { createDate } from './createDate';
import { createMonth } from './createMonth';

interface CreateYearParams {
    year?: number;

    monthNumber?: number;
}

export const createYear = (params?: CreateYearParams) => {
    const monthCount = 12;
    const today = createDate();

    const year = params?.year ?? today.year;
    const monthNumber = params?.monthNumber ?? today.monthNumber;

    const month = createMonth({ date: new Date(year, monthNumber - 1) });

    const getMonthDays = (monthIndex: number) => createMonth({ date: new Date(year, monthIndex) }).createMonthDays();

    const createYearMonthes = () => {
        const monthes = [];

        for (let i = 0; i <= monthCount - 1; i += 1) {
            monthes[i] = getMonthDays(i);
        }

        return monthes;
    };

    return {
        createYearMonthes,
        month,
        year,
    };
};
