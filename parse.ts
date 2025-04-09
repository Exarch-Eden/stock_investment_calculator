// Parse command line arguments
const parseArgs = () => {
    const args = process.argv.slice(2);
    let balance = 0;
    let timestamp = 0;
    let cadWeight = 0;
    let usdWeight = 0;

    for (let i = 0; i < args.length; i++) {
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

    return { balance, timestamp, cadWeight, usdWeight };
};

export { parseArgs };
