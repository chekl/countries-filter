export const setEnemy = () => {
    let enemyNumber = Math.floor(Math.random()*3);
    let enemy = 0;

    switch(enemyNumber) {
        case 0:
            enemy = 'Rock'
        break;
        case 1:
            enemy = 'Paper'
        break;
        case 2:
            enemy = 'Scissors'
        break;
    }
    return enemy;
}

export const gameResult = (won, losts) => {
    let result;
    if(won === 3) {
        result = 'You are won';
    } else if (losts === 3) {
        result = 'You are lost';
    } else return;

    return result;
}