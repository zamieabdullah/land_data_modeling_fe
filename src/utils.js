export const getMonthName = (monthNumber) => {
    const date = new Date();
    date.setMonth(monthNumber - 1);
    return date.toLocaleString('default', { month: 'long' });
};

export const reformat = (original) => {
    return original?.toLowerCase().replace(/ /g, '_');
}