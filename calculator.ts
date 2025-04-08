// const { MS_IN_DAY } = require("./constants")
// const { writeToFileAsync } = require("./write")
import { parseArgs } from "./parse";
import { writeToFileAsync } from "./write"

const calculateDailyAmount = (numStocks: number, annualBalance: number, startTimestamp?: number) => {
    const curDate = new Date()

    // Dec 31 at 23:59:59.999
    const yearEndTimestamp = new Date(curDate.getFullYear(), 11, 31, 23, 59, 59, 999).getTime()

    // TESTING
    console.log("yearEndTimestamp: ", yearEndTimestamp);

    // timestamp difference between today and last day of the year
    const diffTimestamp = yearEndTimestamp - (startTimestamp || curDate.getTime())

    const diffDays = Math.floor(diffTimestamp / (3600 * 24 * 1000))

    // TESTING
    console.log("diffDays: ", diffDays);

    // does not account for holidays
    const numWorkDaysRemaining = Math.floor(diffDays * (5/7))

    // TESTING
    console.log("num work days remaining: ", numWorkDaysRemaining);

    return (annualBalance / (numStocks * numWorkDaysRemaining)).toFixed(2)
}

// NOTE: update these values to see proper reuslts
const { stocks, balance } = parseArgs()

writeToFileAsync("./result.txt", calculateDailyAmount(stocks, balance))
