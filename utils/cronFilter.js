
function currentWeek()
{
    const today = new Date();
    // today.setHours(0, 0, 0, 0);

    const prevWeek = new Date(today);
    prevWeek.setDate(today.getDate() - 7);

    return {
        start:prevWeek,
        end:today
    }

}


function currentMonth()
{
    const today = new Date()
    // today.setHours(0,0,0,0)

    const prevMonth = new Date(today)
    prevMonth.setMonth(today.getMonth() - 1)

    return {
        start:prevMonth,
        end:today
    }
}

function currentYear()
{
    const today = new Date()
    // today.setHours(0,0,0,0)

    const prevYear = new Date(today)
    prevYear.setFullYear(today.getFullYear() - 1)

    return {
        start:prevYear,
        end:today
    }
}
module.exports = {
    currentWeek,
    currentMonth,
    currentYear
}