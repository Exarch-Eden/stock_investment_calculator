// Parse command line arguments
const parseArgs = () => {
    const args = process.argv.slice(2);
    // let stocks = 0;
    let balance = 0;
    let timestamp = 0;
    let cadWeight = 0;
    let usdWeight = 0;

    for (let i = 0; i < args.length; i++) {
        // if (args[i] === "--stocks" || args[i] === "-s") {
        //     stocks = Number(args[i + 1]);
        //     i++;
        // } else if (args[i] === "--balance" || args[i] === "-b") {
        if (args[i] === "--balance" || args[i] === "-b") {
            balance = Number(args[i + 1]);
            i++;
        } else if (args[i] === "--timestamp" || args[i] === "-t") {
            timestamp = Number(args[i + 1]);
            i++;
        } else if (args[i] === "--cadWeight" || args[i] === "-cad") {
            cadWeight = Number(args[i + 1]);
            i++;
        } else if (args[i] === "--usdWeight" || args[i] === "-usd") {
            usdWeight = Number(args[i + 1]);
            i++;
        }
    }

    // return { stocks, balance, timestamp, cadWeight, usdWeight };
    return { balance, timestamp, cadWeight, usdWeight };
};

export { parseArgs };
