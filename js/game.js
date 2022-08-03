import { setEnemy, gameResult } from "./start";
    let score = document.getElementById('result');
    let button = document.querySelectorAll('input');
    
let won = 0;
let losts = 0;

export const resetGame = () => {
    won = 0;
    losts = 0;
    score.innerHTML = '';
    button.forEach( btn => btn.disabled = '')
}

export const newGame = (choise) => {

    let enemy = setEnemy();
    let player = choise.target.value;
    let resultRound;

    switch(true) {
        case player === enemy:
            resultRound = 'Draw';
        break; 
        case (player === 'Scissors' && enemy === 'Paper') 
             || (player === 'Paper' && enemy === 'Rock')
             || (player === 'Rock' && enemy === 'Scissors'):
                resultRound = 'Win';
                won++;
        break;
        default:
            resultRound = 'Lost';
            losts++;
        break;
    }
    score.insertAdjacentHTML("afterBegin",`<p>${player} vs ${enemy} -> ${resultRound}</p>`)
   
    let result = gameResult(won, losts);
    if(result) {
        score.innerHTML = result;
        button.forEach( btn => btn.disabled = 'true')
    } 
}