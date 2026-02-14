const getMonthBoundaries = (year, month) => {
    // month is 1-12
    const startDate = new Date(Date.UTC(year, month - 1, 1, 0, 0, 0, 0));
    const lastDay = new Date(Date.UTC(year, month, 0)).getDate();
    const endDate = new Date(Date.UTC(year, month - 1, lastDay, 23, 59, 59, 999));
    return { startDate, endDate };
};

const normalizeDate = (input) => {
    let year, month, date;
    
    if (typeof input === 'string') {
        
        const parts = input.split('-');
        year = parseInt(parts[0], 10);
        month = parseInt(parts[1], 10) - 1; 
        date = parseInt(parts[2], 10);
    } else {
       
        const d = new Date(input);
        year = d.getUTCFullYear();
        month = d.getUTCMonth();
        date = d.getUTCDate();
    }
    
    return new Date(Date.UTC(year, month, date, 0, 0, 0, 0));
};

module.exports = {
    normalizeDate,
    getMonthBoundaries
};
