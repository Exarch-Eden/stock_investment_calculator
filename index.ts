import { parseArgs } from "./parse";
import {
    calculateDailyAmount,
    calculateDailyAmountWeighted,
} from "./calculator";
import { writeToFileAsync } from "./write";
import { readStocksFromFile } from "./read";

const { stocks, balance, timestamp } = parseArgs();

// writeToFileAsync(
//     "./result.txt",
//     calculateDailyAmount(stocks, balance, timestamp)
// );

writeToFileAsync(
    "./result.json",
    JSON.stringify(
        calculateDailyAmountWeighted(
            readStocksFromFile("./input.txt"),
            balance,
            timestamp
        )
    )
);
