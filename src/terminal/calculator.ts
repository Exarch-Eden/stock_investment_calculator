import { getRemainingWorkDaysAnnual } from "./date";
import { FinalizedDailyStockInvestment, Stock } from "./types";

const calculateDailyAmount = (
    numStocks: number,
    annualBalance: number,
    startTimestamp?: number
) => {
    const numWorkDaysRemaining = getRemainingWorkDaysAnnual(startTimestamp);

    return (annualBalance / (numStocks * numWorkDaysRemaining)).toFixed(2);
};

const calculateDailyAmountWeighted = (
    stocks: Stock[],
    annualBalance: number,
    startTimestamp?: number
): FinalizedDailyStockInvestment[] => {
    // prevents duplicates
    const stockMap = new Map(
        stocks.map((stock) => [
            stock.ticker,
            {
                ...stock,
                dividendYield: stock.dividendYield || 0,
                weight: stock.weight || 1,
            },
        ])
    );

    // sorted by highest dividend yield
    const sanitizedStocksArr = [...stockMap.values()].sort(
        (a, b) => b.dividendYield - a.dividendYield
    );

    const sumStockWeight = sanitizedStocksArr
        .map((stock) => stock.weight)
        .reduce((sumWeight, curWeight) => sumWeight + curWeight);

    const numWorkDaysRemaining = getRemainingWorkDaysAnnual(startTimestamp);

    return sanitizedStocksArr.map((stock) => {
        return {
            ...stock,
            investAmount: Number.parseFloat(
                (
                    (annualBalance * stock.weight) /
                    (sumStockWeight * numWorkDaysRemaining)
                ).toFixed(2)
            ),
            investPercentage: Number.parseFloat(
                (stock.weight / sumStockWeight).toFixed(2)
            ),
        };
    });
};

const calculateDailyAmountYieldWeighted = (
    stocks: Stock[],
    annualBalance: number,
    startTimestamp?: number
): FinalizedDailyStockInvestment[] => {
    const stocksWithYieldWeights = stocks.map((stock) => {
        return {
            ...stock,
            weight: stock.dividendYield,
        };
    });

    // NOTE: we are replacing all weight values for each stock with the dividend yield value
    return calculateDailyAmountWeighted(
        stocksWithYieldWeights,
        annualBalance,
        startTimestamp
    );
};

const calculateDailyAmountYieldAndCurrencyWeighted = (
    stocks: Stock[],
    annualBalance: number,
    cadCurrencyWeight = 0,
    usdCurrencyWeight = 0,
    startTimestamp?: number
) => {
    const stocksWithYieldWeights = stocks.map((stock) => {
        return {
            ...stock,
            weight:
                (stock.dividendYield || 0) *
                ((stock.currency === "CAD"
                    ? cadCurrencyWeight
                    : usdCurrencyWeight) || 1),
        };
    });

    return calculateDailyAmountWeighted(
        stocksWithYieldWeights,
        annualBalance,
        startTimestamp
    );
};

const calculateDailyAmountYieldCurrencyMedianPriceWeighted = (
    stocks: Stock[],
    annualBalance: number,
    cadCurrencyWeight = 0,
    usdCurrencyWeight = 0,
    startTimestamp?: number
) => {
    const sortedArr = stocks.sort((a, b) => a.price - b.price);
        
    // Get the middle index
    const middleIndex = Math.floor(sortedArr.length / 2);
        
    // If array length is odd, return the middle element
    // If array length is even, return the average of the two middle elements
    const medianStockPrice = sortedArr.length % 2 !== 0
        ? sortedArr[middleIndex].price
        : (sortedArr[middleIndex - 1].price + sortedArr[middleIndex].price) / 2

    // TESTING
    console.log("median stock price: ", medianStockPrice);

    const stocksWithYieldWeights = stocks.map((stock) => {
        return {
            ...stock,
            weight:
                (stock.dividendYield || 0) *
                ((stock.currency === "CAD"
                    ? cadCurrencyWeight
                    : usdCurrencyWeight) || 1) *
                (medianStockPrice / stock.price)
        };
    });

    return calculateDailyAmountWeighted(
        stocksWithYieldWeights,
        annualBalance,
        startTimestamp
    )
}

export {
    calculateDailyAmount,
    calculateDailyAmountWeighted,
    calculateDailyAmountYieldWeighted,
    calculateDailyAmountYieldAndCurrencyWeighted,
    calculateDailyAmountYieldCurrencyMedianPriceWeighted
};
