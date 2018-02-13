var currentNumber, playerWins = localStorage.getItem("playerWins") !== null? parseInt(localStorage.getItem("playerWins")): 0; comWins = localStorage.getItem("comWins") !== null? parseInt(localStorage.getItem("comWins")): 0;

function reset(){
	currentNumber = undefined;
	playerScore = null;
	comScore = null;
	document.getElementById('one').innerHTML = '';
	document.getElementById('ten').innerHTML = '';
	document.getElementById('hundred').innerHTML = '';
	document.getElementById('comone').innerHTML = '';
	document.getElementById('comten').innerHTML = '';
	document.getElementById('comhundred').innerHTML = '';
}

function random(){
	return Math.floor(Math.random() * 6)+1;
}

function roll(){
	currentNumber = random();
	window.alert("You rolled a "+currentNumber+ ". Press any of your buttons to place it.");
}

function evalScore(){
	var playerScore = parseInt(document.getElementById("hundred").innerHTML+document.getElementById("ten").innerHTML+document.getElementById("one").innerHTML),
		comScore = parseInt(document.getElementById("comhundred").innerHTML+document.getElementById("comten").innerHTML+document.getElementById("comone").innerHTML);
	if (playerScore > comScore){
		playerWins++;
		localStorage.setItem("playerWins", playerWins);
		window.alert('You win!');
	}else if (playerScore == comScore){
		window.alert('It\'s a tie!');
	}else{
		comWins++;
		localStorage.setItem("comWins", comWins);
		window.alert('You lost!');
	}
}

function computer(){
	setTimeout(function(){document.getElementById("comone").innerHTML = random();}, 1500);
	setTimeout(function(){document.getElementById("comten").innerHTML = random();}, 1000);
	setTimeout(function(){document.getElementById("comhundred").innerHTML = random();}, 1200);
	setTimeout(function(){evalScore();}, 3000);
}

function placeNumber(id){
	if (document.getElementById(id).innerHTML === ''){
		document.getElementById(id).innerHTML = currentNumber;
	}else{
		window.alert("You've already put a number there");
		return;
	}
	if ((document.getElementById('one').innerHTML == '') || (document.getElementById('ten').innerHTML == '') || (document.getElementById('hundred').innerHTML == '')){
		roll();
	}else{
		window.alert("Round end!");
		currentNumber = undefined;
		computer();
	}
}

window.setInterval(function(){
	document.getElementById('currentNumber').innerHTML = currentNumber !== undefined ? currentNumber : "None";
	document.getElementById('stats').innerHTML = playerWins >= comWins? "Overall winner: Player<br>Player Wins: "+playerWins+"<br>Computer Wins: "+comWins+"<br>Winrate: " + (Math.round(playerWins/(playerWins+comWins)*100))+"%"
	: "Overall winner: Computer<br>Player Wins: "+playerWins+"<br>Computer Wins: "+comWins+"<br>Winrate: " + (Math.round(playerWins/(playerWins+comWins)*100)) +"%";
}, 1000);