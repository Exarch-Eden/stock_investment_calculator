import { parseArgs } from "./parse";
import {
    calculateDailyAmount,
    calculateDailyAmountWeighted,
    calculateDailyAmountYieldAndCurrencyWeighted,
    calculateDailyAmountYieldWeighted,
} from "./calculator";
import { writeToFileAsync } from "./write";
import { readStocksFromFile } from "./read";

const { balance, timestamp, cadWeight, usdWeight } = parseArgs();

// writeToFileAsync(
//     "./result.txt",
//     calculateDailyAmount(stocks, balance, timestamp)
// );

// TESTING
console.log("cadWeight: ", cadWeight);
console.log("usdWeight: ", usdWeight);

writeToFileAsync(
    "./result.json",
    JSON.stringify(
        // calculateDailyAmountWeighted(
        calculateDailyAmountYieldAndCurrencyWeighted(
            readStocksFromFile("./input.json"),
            balance,
            cadWeight,
            usdWeight,
            timestamp
        )
    )
);
