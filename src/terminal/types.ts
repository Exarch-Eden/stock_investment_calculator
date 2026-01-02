interface Stock {
    // the uuid
    ticker: string;
    price: number;
    currency: "USD" | "CAD";
    dividendYield?: number;
    // NOTE: user-defined values
    weight?: number;
    cadConvertedPrice?: number;
}

// determined by the calculation
interface FinalizedDailyStockInvestment extends Stock {
    investAmount: number;
    // relative to whole
    investPercentage: number;
    cadConvertedPrice?: number;
}

export { type Stock, type FinalizedDailyStockInvestment };
