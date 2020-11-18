const VotingSystem = require("./voting_system");

const checkArguments = () => {
    // Check for invalid usage
    if (process.argv.length < 3) {
        console.error('Usage: node plurality [candidate...]');
        process.exit(1);
    }
};

const main = () => {
    checkArguments();
    VotingSystem.run();
}

main();
