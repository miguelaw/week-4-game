
//Variables
var wins = 0;
var losses = 0;
var guessesLeft = 0;
var gameOver = false;
var gameOn = false;
var maxComputerNumber = 120;
var minComputerNumber = 19;
var computerRandomNumber = 0;
var maxCrystalNumber = 12;
var minCrystalNumber = 1;
var currentTotal = 0;
var currentBalance = 0;
var crystals = {
	'crystal1': 0,
	'crystal2': 0,
	'crystal3': 0,
	'crystal4': 0
};

$(document).ready(function(){
    //Game starts with "Start Button".
	$("#startBtn").on("click", function(event)
	{
		if(!gameOn)
		{
			reset();		
			gameOn = true;
			genComputerRandomNumber();
			genCrystalsRandomNumbers();
		}
	});

    //Resets game.
	$("#resetBtn").on("click", function(event)
	{
		reset();
	});

    //Resets game scoreboard.
	$("#resetScoreBtn").on("click", function(event)
	{
		reset();
		resetScoreboard();
	});

    //Adds value to the crystals, only if the game is running.
	$(".crystals button").on("click", function(event)
	{
		if(gameOn)
		{
			gameRound($(this));
			if(!gameOn)
			{
				seeWhoWon();
				displaySummaryStats();
			}
		}
		else{
			$("#startErrorMessage").css("display", "block");
		}
	});
});  

//Creates a random number, between 19 - 120, for the "computer chooses" value.
function genComputerRandomNumber()
{
	var multiplier = maxComputerNumber - minComputerNumber + 1;
	computerRandomNumber = Math.floor(Math.random() * multiplier) + minComputerNumber;
	$("#computerNumber").html(computerRandomNumber);
}

//Creates a random number, between 1 - 12, for the crystal value. 
function genCrystalsRandomNumbers()
{
	var multiplier = maxCrystalNumber - minCrystalNumber + 1;
	$(".information button").each(function(){
		var id = $(this).attr('id');
		var crystalRandomNumber = Math.floor(Math.random() * multiplier) + minCrystalNumber;
		crystals[id] = crystalRandomNumber;
	});
}

//Notifies the player when they won or lost.
function showResults(message)
	{
		var where = $("#results");
		if(message == "won")
		{
			where.html("Congratulations! You won!");
		}
		else
		{
			where.html("Sorry! You lost, Try again!");
		}
	}

	function gameRound($this) //$this --> variable holds the result from $(this)
	{
		var worth = crystals[$this.attr("id")];
		currentTotal += worth;
		currentBalance = computerRandomNumber - currentTotal;
		$("#currentTotal").html(currentTotal);
		$("#balance").html(currentBalance);
		gameOn = (currentTotal < computerRandomNumber);

	}

	function seeWhoWon()
	{
		if(currentTotal == computerRandomNumber)
		{
			wins++;
			showResults("won");
		}
		else
		{
			losses++;
			showResults("lost");
		}
	}

	function displaySummaryStats()
	{
		$("#wins").html(wins);	
		$("#losses").html(losses);	
		$("#total").html(wins+losses);		
	}

	function reset()
	{
		guessesLeft = 0;
		computerRandomNumber = 0;
		currentTotal = 0;
		currentBalance = 0;
		gameOver = false;
		gameOn = false;
		$("#computerNumber").html("");
		$("#currentTotal").html("0");
		$("#balance").html("0");
		$("#results").html("");
		$("#startErrorMessage").css("display", "none");
	}

	function resetScoreboard()
	{
		wins = 0;
		losses = 0;
		$("#wins").html("0");	
		$("#losses").html("0");	
		$("#total").html("0");	
	}
