// 365 days in year * 5/7 (work days per week ratio) - 10 (holidays) == approx. 251
const NUM_TRADING_DAYS_ANNUALLY = 251

// milliseconds in a day
const MS_IN_DAY = 3600 * 24 * 1000

module.exports = {
    NUM_TRADING_DAYS_ANNUALLY,
    MS_IN_DAY
}