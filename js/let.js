import {newGame, resetGame} from './game'
import '../scss/start.scss'

let rock = document.getElementById('rock');
let paper = document.getElementById('paper');
let scissors = document.getElementById('scissors');
let reset = document.getElementById('reset');



reset.addEventListener('click', resetGame)
paper.addEventListener('click', newGame);
scissors.addEventListener('click', newGame);
rock.addEventListener('click', newGame);