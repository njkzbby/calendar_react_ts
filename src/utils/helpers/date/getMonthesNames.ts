import { createDate } from './createDate';

export const getMonthesNames = () => {
    const monthesNames: {
        month: ReturnType<typeof createDate>['month'];
        monthShort: ReturnType<typeof createDate>['monthShort'];
        monthIndex: ReturnType<typeof createDate>['monthIndex'];
        date: ReturnType<typeof createDate>['date'];
    }[] = Array.from({ length: 12 });

    const d = new Date();

    monthesNames.forEach((_, i) => {
        const { month, monthIndex, monthShort, date } = createDate({
            date: new Date(d.getFullYear(), d.getMonth() + i, 1),
        });

        monthesNames[monthIndex] = { month, monthIndex, monthShort, date };
    });

    return monthesNames;
};
