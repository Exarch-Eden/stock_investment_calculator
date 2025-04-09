import { getRemainingWorkDaysAnnual } from "./date";
import { Stock } from "./types";

const calculateDailyAmount = (numStocks: number, annualBalance: number, startTimestamp?: number) => {
    const numWorkDaysRemaining = getRemainingWorkDaysAnnual(startTimestamp)

    return (annualBalance / (numStocks * numWorkDaysRemaining)).toFixed(2)
}

const calculateDailyAmountWeighted = (stocks: Stock[], annualBalance: number, startTimestamp?: number) => {
    
}

export {
    calculateDailyAmount
}