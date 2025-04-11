interface Stock {
    // the uuid
    ticker: string;
    price: number;
    currency: "USD" | "CAD";
    dividendYield?: number;
    // NOTE: user-defined values
    weight?: number;
}

// determined by the calculation
interface FinalizedDailyStockInvestment extends Stock {
    investAmount: number;
    // relative to whole
    investPercentage: number;
}

export { type Stock, type FinalizedDailyStockInvestment };
