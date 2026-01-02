import { readFileSync } from "fs";
import { Stock } from "./types";

/**
 * Reads a text file containing an array of Stock items in JSON format
 * @param filePath - Path to the text file
 * @returns Array of Stock objects
 * @throws Error if file can't be read or content isn't valid
 */
const readStocksFromFile = (filePath: string): { stocks: Stock[], balance: number, timestamp: number, usdToCadCurrencyConversion: number, cadWeight?: number, usdWeight?: number } => {
    try {
        // Read the file as text
        const fileContent = readFileSync(filePath, "utf-8");

        // Parse the text content as JSON
        const { stocks: parsedStocks, balance, timestamp, cadWeight, usdWeight, usdToCadCurrencyConversion } = JSON.parse(fileContent);

        // Validate the parsed content is an array
        if (!Array.isArray(parsedStocks)) {
            throw new Error("File content is not a valid array");
        }

        // Validate each item in the array conforms to the Stock interface
        const validatedStocks: Stock[] = parsedStocks.map((stock, index) => {
            if (!stock.ticker || typeof stock.ticker !== "string") {
                throw new Error(`Stock at index ${index} has invalid ticker`);
            }
            if (typeof stock.price !== "number" || isNaN(stock.price)) {
                throw new Error(`Stock at index ${index} has invalid price`);
            }
            if (!stock.currency || (stock.currency !== "USD" && stock.currency !== "CAD")) {
                throw new Error(`Stock at index ${index} has invalid currency`);
            }
            if (
                stock.dividendYield !== undefined &&
                (typeof stock.dividendYield !== "number" ||
                    isNaN(stock.dividendYield))
            ) {
                throw new Error(
                    `Stock at index ${index} has invalid dividendYield`
                );
            }
            if (
                stock.weight !== undefined &&
                (typeof stock.weight !== "number" || isNaN(stock.weight))
            ) {
                throw new Error(`Stock at index ${index} has invalid weight`);
            }

            return {
                ticker: stock.ticker,
                price: stock.price,
                currency: stock.currency,
                dividendYield: stock.dividendYield,
                weight: stock.weight,
            };
        });

        return { stocks: validatedStocks, balance, timestamp, cadWeight, usdWeight, usdToCadCurrencyConversion };
    } catch (error) {
        if (error instanceof Error) {
            throw new Error(`Failed to read stocks file: ${error.message}`);
        }
        throw new Error("Failed to read stocks file");
    }
};

export { readStocksFromFile };
