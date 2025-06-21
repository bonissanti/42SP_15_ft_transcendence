import { t } from '../i18n'; // Importa a função de tradução

type Choice = 'rock' | 'paper' | 'scissors';
type Outcome = 'win' | 'lose' | 'draw';

const choices: Choice[] = ['rock', 'paper', 'scissors'];
const winRules: Record<Choice, Choice> = {
  rock: 'scissors', paper: 'rock', scissors: 'paper',
};
const choiceEmojis: Record<Choice, string> = {
  rock: '🗿', paper: '📄', scissors: '✂️',
};

let playerScore = 0;
let computerScore = 0;

let playerScoreEl: HTMLSpanElement, computerScoreEl: HTMLSpanElement, resultTextEl: HTMLParagraphElement, choicesDisplayEl: HTMLDivElement;

function getComputerChoice(): Choice {
  return choices[Math.floor(Math.random() * choices.length)];
}

function updateScore(outcome: Outcome) {
  const texts = t(); // Pega os textos do idioma atual
  if (outcome === 'win') {
    playerScore++;
    resultTextEl.textContent = texts.win;
    resultTextEl.className = 'text-2xl font-semibold h-8 mt-2 text-green-400';
  } else if (outcome === 'lose') {
    computerScore++;
    resultTextEl.textContent = texts.lose;
    resultTextEl.className = 'text-2xl font-semibold h-8 mt-2 text-red-400';
  } else {
    resultTextEl.textContent = texts.draw;
    resultTextEl.className = 'text-2xl font-semibold h-8 mt-2 text-gray-400';
  }
  playerScoreEl.textContent = playerScore.toString();
  computerScoreEl.textContent = computerScore.toString();
}

function handlePlayerChoice(event: Event) {
  const target = event.currentTarget as HTMLButtonElement;
  const playerChoice = target.dataset.choice as Choice;
  const computerChoice = getComputerChoice();
  const outcome = (playerChoice === computerChoice) ? 'draw' : (winRules[playerChoice] === computerChoice ? 'win' : 'lose');
  
  choicesDisplayEl.innerHTML = `Você: <span class="text-2xl">${choiceEmojis[playerChoice]}</span> vs CPU: <span class="text-2xl">${choiceEmojis[computerChoice]}</span>`;
  updateScore(outcome);
}

export function initRpsGame() {
  playerScore = 0;
  computerScore = 0;
  
  playerScoreEl = document.getElementById('player-score') as HTMLSpanElement;
  computerScoreEl = document.getElementById('computer-score') as HTMLSpanElement;
  resultTextEl = document.getElementById('result-text') as HTMLParagraphElement;
  choicesDisplayEl = document.getElementById('choices-display') as HTMLDivElement;

  document.querySelectorAll('.choice-btn').forEach(button => {
    button.addEventListener('click', handlePlayerChoice);
  });
}