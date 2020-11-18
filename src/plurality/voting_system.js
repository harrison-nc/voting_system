const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
});

// Candidates have name and vote count
class Candidate {
    constructor(name) {
        this.name = name;
        this.votes = 0;
    }
}

// Winner class containing highest vote,
// the last candidate, and number of candidates
class Winner {
    constructor(candidate, votes, count) {
        this.lastCandidate = candidate;
        this.votes = votes;
        this.count = count;
    }
}

const vote = (candidates, name) => {
    let count = candidates.length;

    for (let i = 0; i < count; i++) {
        const cand = candidates[i];

        if (cand.name == name) {
            cand.votes++;
            return true;
        }
    }

    // Candidate not found
    return false;
}

const getWinner = (candidates) => {
    let highestVotes = 0;
    let winnerCount = 0;
    let count = candidates.length;

    // The last candidate with the highest votes is the winner
    let lastCandidate;

    for (let i = 0; i < count; i++) {
        const cand = candidates[i];

        if (cand.votes == highestVotes) {
            lastCandidate = cand;
            winnerCount++;
        }
        else if (cand.votes > highestVotes) {
            highestVotes = cand.votes;
            lastCandidate = cand;
            winnerCount = 1;
        }
    }

    // Return the winner
    const winner = new Winner(lastCandidate,
        highestVotes,
        winnerCount);

    return winner;
}

const getVote = () => {
    const promise = new Promise((fulfill, _) => {
        readline.question("Votes: ", name => {
            fulfill(name);
            readline.pause();
        });
    });

    return promise;
}

const getNumberOfVoters = async () => {
    const promise = new Promise((fulfill, _) => {
        readline.question('Number of voters: ', n => {
            fulfill(n);
            readline.pause();
        });
    });

    return promise;
};

const run = async () => {
    const candidates = initializeCandidate();

    const count = await getNumberOfVoters();

    for (let i = 0; i < count; i++) {

        const name = await getVote();

        if (!vote(candidates, name)) {
            console.log('Invalid vote.');
        }
    }

    // Print the winner
    const winner = getWinner(candidates);

    printWinner(candidates, winner);

    // Close resource
    readline.close();
};

const numberOfCandidate = () => {
    return process.argv.length - 2;
}

const initializeCandidate = () => {
    const count = numberOfCandidate();

    const candidates = [];

    for (let i = 0; i < count; i++) {
        const name = process.argv[2 + i];
        const candidate = new Candidate(name);
        candidates[i] = candidate;
    }

    return candidates;
}

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

const printWinner = (candidates, winner) => {
    if (winner.count == 1) {
        printName(winner.lastCandidate);
    } else {
        printWinners(candidates, winner);
    }
}

module.exports.run = run;
