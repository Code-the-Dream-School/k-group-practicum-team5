
//Calendar date utilities (UTC-safe)
// Normalize any date to UTC midnight

const normalizeDate = (date) => {
    const d = new Date(date);
    d.setUTCHours(0, 0, 0, 0);
    return d;
};

// Get UTC start and end of a given month (month = 1–12)
const getMonthBoundaries = (year, month) => {
    const startDate = new Date(Date.UTC(year, month - 1, 1, 0, 0, 0, 0));

    const lastDay = new Date(Date.UTC(year, month, 0)).getUTCDate();
    const endDate = new Date(
        Date.UTC(year, month - 1, lastDay, 23, 59, 59, 999)
    );

    return { startDate, endDate };
};

module.exports = {
    normalizeDate,
    getMonthBoundaries
};
