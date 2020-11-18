const printName = (candidate) => {
    console.log(`Winner: ${candidate.name}`);
}

const printWinners = (candidates, winner) => {
    for (let i = 0, n = 0; n < winner.count; i++) {
        const cand = candidates[i];

        if (cand.votes == winner.votes) {
            printName(cand);
            n++;
        }
    }
}

const printWinner = (vs) => {
    const winner = vs.getWinner();

    if (winner.count == 1) {
        printName(winner.lastCandidate);
    } else {
        printWinners(vs.candidates, winner);
    }
}

module.exports.printWinner = printWinner;
