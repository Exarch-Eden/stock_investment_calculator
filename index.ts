import { parseArgs } from "./parse";
import { calculateDailyAmountYieldAndCurrencyWeighted } from "./calculator";
import { writeToFileAsync } from "./write";
import { readStocksFromFile } from "./read";

const { balance, timestamp, cadWeight, usdWeight } = parseArgs();

writeToFileAsync(
    "./result.json",
    JSON.stringify(
        calculateDailyAmountYieldAndCurrencyWeighted(
            readStocksFromFile("./input.json"),
            balance,
            cadWeight,
            usdWeight,
            timestamp
        )
    )
);
