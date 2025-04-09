import { parseArgs } from "./parse";
import { calculateDailyAmountYieldAndCurrencyWeighted, calculateDailyAmountYieldCurrencyMedianPriceWeighted } from "./calculator";
import { writeToFileAsync } from "./write";
import { readStocksFromFile } from "./read";

// const { balance, timestamp, cadWeight, usdWeight } = parseArgs();
const { stocks, balance, timestamp, cadWeight, usdWeight } = readStocksFromFile("./input.json")

writeToFileAsync(
    "./result.json",
    JSON.stringify(
        calculateDailyAmountYieldCurrencyMedianPriceWeighted(
            stocks,
            balance,
            cadWeight,
            usdWeight,
            timestamp
        )
    )
);
