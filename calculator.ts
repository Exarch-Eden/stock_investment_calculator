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
    // const numStocks = sanitizedStocksArr.length;
    const sumStockWeight = sanitizedStocksArr
        .map((stock) => stock.weight)
        .reduce((sumWeight, curWeight) => sumWeight + curWeight);

    const numWorkDaysRemaining = getRemainingWorkDaysAnnual(startTimestamp);

    return sanitizedStocksArr.map((stock) => {
        return {
            ...stock,
            investAmount: Math.floor(
                (annualBalance * stock.weight) /
                    (sumStockWeight * numWorkDaysRemaining)
            ),
        };
    });
};

export { calculateDailyAmount, calculateDailyAmountWeighted };
