const getMonthBoundaries = (year, month) => {
    // month is 1-12
    const startDate = new Date(Date.UTC(year, month - 1, 1, 0, 0, 0, 0));
    const lastDay = new Date(Date.UTC(year, month, 0)).getDate();
    const endDate = new Date(Date.UTC(year, month - 1, lastDay, 23, 59, 59, 999));
    return { startDate, endDate };
};
// // normalize to day-only UTC
const normalizeDate = (input) => {
    const d = new Date(input);
    return new Date(Date.UTC(
        d.getUTCFullYear(),
        d.getUTCMonth(),
        d.getUTCDate(),
        0, 0, 0, 0
    ));
};

module.exports = {
    normalizeDate,
    getMonthBoundaries
};
