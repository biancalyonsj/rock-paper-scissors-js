// retrieve all button options
const selectionButtons = document.querySelectorAll('[data-selection]');
const finalColumn = document.querySelector('[data-final-column]');
const playerScore = document.querySelector('[data-player-score]');
const computerScore = document.querySelector('[data-computer-score]');
const SELECTIONS = [
    {
        name: 'rock',
        emoji: '✊',
        beats: 'scissors'
    },
    {
        name: 'paper',
        emoji: '✋',
        beats: 'rock'
    },
    {
        name: 'scissors',
        emoji: '✌',
        beats: 'paper'
    }
]

// assign an event listener to each button
selectionButtons.forEach(selectionButton => {
    selectionButton.addEventListener('click', e =>{
        // get the name of button that was clicked
        const selectionName = selectionButton.dataset.selection;
        // retrieve the object with the corresponding name the user selected
        const selection = SELECTIONS.find(selection => selection.name === selectionName);
        makeSelection(selection);
    })
})

/**
 * retrieves the player selection and
 * calls functions determine winner, update
 * results UI, and increase player score
 */
function makeSelection(selection){
    // get a random selection for the computer
    const computerSelection = randomSelection();
    // call function to determine the winner
    const playerWinner = isWinner(selection, computerSelection);
    const computerWinner = isWinner(computerSelection, selection);
    // display the results ui
    renderSelectionResults(computerSelection, computerWinner);
    renderSelectionResults(selection, playerWinner);
    // increase score of the winner
    if (computerWinner) incrementScore(computerScore);
    if (playerWinner) incrementScore(playerScore);
}

/**
 * increases the score of the winner by 1
 */
function incrementScore(scoreSpan){
    // retrieve the current text score, convert it to an integer, increase by 1
    scoreSpan.innerText = parseInt(scoreSpan.innerText) + 1;

}

/**
 * Display selected buttons as well as winner
 * below the You and Computer columns
 */
function renderSelectionResults(selection, winner){
    // create a new div container for results column
    const div = document.createElement('div');
    // display the emoji selected
    div.innerText = selection.emoji;
    // add class name for css style
    div.classList.add('result-selection');
    // update css styling for the winner
    if (winner) div.classList.add('winner');
    // display results of the round at the top of the column
    finalColumn.after(div);

}

/**
 * Performs an equality check to determine if 
 * the user's selection beat's the computer's selection
 * returns true or false
 */
function isWinner(selection, opponentSelection){
    // checks if the user's selection beat's the computer's selection
    return selection.beats === opponentSelection.name;
}


/**
 * Choose a random index in the Selections array 
 * to imitate a computer selection
 * returns an index in the Selections array
 */
function randomSelection(){
    const randomIndex = Math.floor(Math.random() * SELECTIONS.length);
    return SELECTIONS[randomIndex];
}