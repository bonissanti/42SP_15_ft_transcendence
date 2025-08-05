import { t } from '../i18n';
import { sendMatchHistory, getUserProfile, getCachoraoProfile } from '../pong/common';

type Choice = 'rock' | 'paper' | 'scissors';
type Outcome = 'win' | 'lose' | 'draw';

const WIN_SCORE = 5;

const choices: Choice[] = ['rock', 'paper', 'scissors'];
const winRules: Record<Choice, Choice> = {
  rock: 'scissors',
  paper: 'rock',
  scissors: 'paper',
};
const choiceEmojis: Record<Choice, string> = {
  rock: '🗿',
  paper: '📄',
  scissors: '✂️',
};

let playerScore = 0;
let computerScore = 0;
let gameActive = true;

let playerScoreEl: HTMLSpanElement, computerScoreEl: HTMLSpanElement, resultTextEl: HTMLParagraphElement, choicesDisplayEl: HTMLDivElement;

function getComputerChoice(): Choice {
  return choices[Math.floor(Math.random() * choices.length)];
}

function stopRpsGame() {
  gameActive = false;
  document.querySelectorAll('.choice-btn').forEach(button => {
    const newButton = button.cloneNode(true);
    button.parentNode?.replaceChild(newButton, button);
  });
}

async function checkWinCondition() {
  if (playerScore < WIN_SCORE && computerScore < WIN_SCORE) return;

  stopRpsGame();

  const [playerProfile, cachoraoProfile] = await Promise.all([
    getUserProfile(),
    getCachoraoProfile()
  ]);

  let winnerProfile;

  if (playerScore >= WIN_SCORE) {
    winnerProfile = playerProfile;
    await sendMatchHistory("RPS", "RPS", playerProfile.username, playerScore, cachoraoProfile.username, computerScore);
  } else {
    winnerProfile = cachoraoProfile;
    await sendMatchHistory("RPS", "RPS", cachoraoProfile.username, computerScore, playerProfile.username, playerScore);
  }

  const path = `/winner?username=${encodeURIComponent(winnerProfile.username)}&profilePic=${encodeURIComponent(winnerProfile.profilePic)}`;
  history.pushState({}, '', path);
  window.dispatchEvent(new PopStateEvent('popstate'));
}

function updateScore(outcome: Outcome) {
  const texts = t();
  if (outcome === 'win') {
    playerScore++;
    resultTextEl.textContent = texts.win;
    resultTextEl.className = 'text-2xl font-semibold mt-2 text-green-400';
  } else if (outcome === 'lose') {
    computerScore++;
    resultTextEl.textContent = texts.lose;
    resultTextEl.className = 'text-2xl font-semibold mt-2 text-red-400';
  } else {
    resultTextEl.textContent = texts.draw;
    resultTextEl.className = 'text-2xl font-semibold mt-2 text-gray-400';
  }
  playerScoreEl.textContent = playerScore.toString();
  computerScoreEl.textContent = computerScore.toString();
}

function handlePlayerChoice(event: Event) {
  if (!gameActive) return;

  const target = event.currentTarget as HTMLButtonElement;
  const playerChoice = target.dataset.choice as Choice;
  const computerChoice = getComputerChoice();
  const outcome = (playerChoice === computerChoice) ? 'draw' : (winRules[playerChoice] === computerChoice ? 'win' : 'lose');

  choicesDisplayEl.innerHTML = `Você: <span class="text-2xl">${choiceEmojis[playerChoice]}</span> vs Cachorrao: <span class="text-2xl">${choiceEmojis[computerChoice]}</span>`;
  updateScore(outcome);
  checkWinCondition();
}

export function initRpsGame() {
  playerScore = 0;
  computerScore = 0;
  gameActive = true;

  playerScoreEl = document.getElementById('player-score') as HTMLSpanElement;
  computerScoreEl = document.getElementById('computer-score') as HTMLSpanElement;
  resultTextEl = document.getElementById('result-text') as HTMLParagraphElement;
  choicesDisplayEl = document.getElementById('choices-display') as HTMLDivElement;

  playerScoreEl.textContent = '0';
  computerScoreEl.textContent = '0';
  choicesDisplayEl.textContent = '';

  document.querySelectorAll('.choice-btn').forEach(button => {
    button.addEventListener('click', handlePlayerChoice);
  });
}
