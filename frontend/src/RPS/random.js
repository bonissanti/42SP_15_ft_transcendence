function playRPS(playerChoice) {
	const choices = ["pedra", "papel", "tesoura"];
	const botChoice = choices[Math.floor(Math.random() * choices.length)];
	
	let result = "";
  
	if (playerChoice === botChoice) {
	  result = "Empate!";
	} else if (
	  (playerChoice === "pedra" && botChoice === "tesoura") ||
	  (playerChoice === "papel" && botChoice === "pedra") ||
	  (playerChoice === "tesoura" && botChoice === "papel")
	) {
	  result = "Você ganhou!";
	} else {
	  result = "Você perdeu!";
	}
  
	document.getElementById("rps-result").textContent = `Você escolheu ${playerChoice}. Bot escolheu ${botChoice}. ${result}`;
  }
  