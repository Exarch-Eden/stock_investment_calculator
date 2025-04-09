import { parseArgs } from "./parse";
import { calculateDailyAmount } from "./calculator";
import { writeToFileAsync } from "./write";

const { stocks, balance, timestamp } = parseArgs();

writeToFileAsync(
    "./result.txt",
    calculateDailyAmount(stocks, balance, timestamp)
);
