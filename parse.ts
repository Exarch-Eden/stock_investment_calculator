// Parse command line arguments
const parseArgs = () => {
    const args = process.argv.slice(2);
    let stocks = 0;
    let balance = 0;
    
    for (let i = 0; i < args.length; i++) {
        if (args[i] === '--stocks' || args[i] === '-s') {
            stocks = Number(args[i + 1]);
            i++;
        } else if (args[i] === '--balance' || args[i] === '-b') {
            balance = Number(args[i + 1]);
            i++;
        }
    }
    
    return { stocks, balance };
}

export {
    parseArgs
}