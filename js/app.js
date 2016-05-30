var players = [];
var hits = [];

var Player = function(NAME, ACTIVE, SCORE, HITS){
	this.name = NAME;
	this.active = ACTIVE;
	this.score = SCORE;
	this.hits = HITS;
}

var Game = function(PLAYERS, ROUND, TURN, VICTOR){
	this.players = PLAYERS;
	this.round = ROUND;
	this.turn = TURN;
	this.victor = VICTOR;
}

var game;

$(document).ready(function(){

	$("#dartboard #areas g").children().hover(
		function(){
			$(this).css("opacity","0.6");
		},
		function(){
			$(this).css("opacity","1");
		}
	)

	$("#dartboard #areas g").children().mousedown(function(){

		if(hits.length < 3 && typeof game != 'undefined'){
			hits.push($(this).context.id);
			$(this).css("fill", "#BDE7F5");
			$("#hit-items").append('<li class="list-group-item list-hit" id="hits-item">' + $(this).context.id + '<button type"button" onclick="removeHit(\'' + $(this).context.id + '\')" class="btn-remove-hit pull-right">X</button></li>');
			$("#total-score").html(calculateScore().toString());
		}else if(typeof game == 'undefined'){
			window.alert("Tryck på den blåa användarknappen för att lägga till spelare, eller den gröna play-knappen för att starta ett nytt spel!");
			$("#managePlayers").addClass("btn-primary");
			$("#openStart").addClass("btn-success");
		}else{
			window.alert("Du har redan 3 markerade träffar, ta bort från panelen till vänster för att göra ändringar.");
		}
		
	});

	$("#dartboard #areas g").children().mouseup(function(){
			$(this).css("fill", "");
	});

	players.push(new Player("Simon", false, 0, []));
	players.push(new Player("Jari", false, 0, []));
	players.push(new Player("Kim", false, 0, []));
	players.push(new Player("Erik", false, 0, []));

});

function showHits(){

}

function calculateScore(){
	var score = 0;

	for(var i = 0; i < hits.length; i++){
		if(hits[i].substring(0,1) == "s"){
			score += parseInt(hits[i].substring(1, hits[i].length));
		}else if(hits[i].substring(0,1) == "d"){
			score += parseInt(hits[i].substring(1, hits[i].length)) * 2;
		}else if(hits[i].substring(0,1) == "t"){
			score += parseInt(hits[i].substring(1, hits[i].length)) * 3;
		}else if(hits[i] == "Bull"){
			score += 50;
		}else if(hits[i] == "Outer"){
			score += 25;
		}

	}

	return score;
}

function clearFields(){
	$("#new-player-name").val("");
}

function updatePlayerList(){
	$("#player-table-body").html("");
	$("#managePlayers").removeClass("btn-primary");
	for(var i = 0; i < players.length; i++){
		$("#player-table-body").append("<tr><td>" + players[i].name + "</td><td class='pull-right'><button type='button' class='btn btn-danger btn-toggle' onclick='removePlayer("+ i + ")'><i class='fa fa-times' aria-hidden='true'></i></button></td></tr>");
	}
}



function newPlayer(){
	var name = $("#new-player-name").val();

	console.log("Ny spelare: " + name);

	players.push(new Player(name, false, 0, []));

	updatePlayerList();
	clearFields();
}

function removePlayer(id){
	players.splice(id, 1);
	updatePlayerList();
}

function newGamePlayerList(){
	$("#new-game-players").html("");

	for(var i = 0; i < players.length; i++){
		if(players[i].active){
			$("#new-game-players").append("<tr class='active'><td>" + players[i].name + "</td><td><button type='button' class='btn btn-danger btn-toggle pull-right' onclick='togglePlayerActive(" + i + ")'><i class='fa fa-minus' aria-hidden='true'></i></button></td></tr>");
		}else{
			$("#new-game-players").append("<tr><td>" + players[i].name + "</td><td><button type='button' class='btn btn-success btn-toggle pull-right' onclick='togglePlayerActive(" + i + ")'><i class='fa fa-plus' aria-hidden='true'></i></button></td></tr>");
		}
		
	}
}

function togglePlayerActive(id){
	players[id].active = !players[id].active;

	newGamePlayerList();
}

function newGameSettings(){
	newGamePlayerList();
	$("#openStart").removeClass("btn-success");
}

function shuffle(a) {
    var j, x, i;
    for (i = a.length; i; i -= 1) {
        j = Math.floor(Math.random() * i);
        x = a[i - 1];
        a[i - 1] = a[j];
        a[j] = x;
    }
}

function startNewGame(){
	console.log("Startar spel");

	var gamemode;

	if($("#mode_101").prop("checked")){
		gamemode = 101;
	}else if($("#mode_301").prop("checked")){
		gamemode = 301;
	}else if($("#mode_501").prop("checked")){
		gamemode = 501;
	}else{
		return window.alert("Du har inte valt något game mode, gör om, gör rätt!");
	}


	var activePlayers = [];

	for(var i = 0; i < players.length; i++){
		if(players[i].active){
			activePlayers.push(players[i]);
		}
	}

	if(activePlayers.length < 1){
		return window.alert("Inte nog med spelare");
	}else{
		shuffle(activePlayers);
		game = new Game(activePlayers, 1, 1, "");
		for(var i = 0; i < game.players.length; i++){
			game.players[i].score = gamemode;
		}
		console.log("Spel startat, game mode: " + gamemode);
		gameManager(game);
	}
	
}

function addScore(){
	if((game.players[game.turn - 1].score - calculateScore()) < 0){
		console.log("Fet");
	}else if((game.players[game.turn - 1].score - calculateScore()) == 0){
		game.players[game.turn - 1].score -= calculateScore();
		game.players[game.turn - 1].hits.push(hits);
		game.victor = game.players[game.turn - 1].name;
		window.alert(game.victor + " är segraren!");
	}else{
		game.players[game.turn - 1].score -= calculateScore();
		game.players[game.turn - 1].hits.push(hits);
	}
	
	hits = [];
	$("#hit-items").html("");

	game.turn += 1;

	if(game.turn > game.players.length){
		game.turn = 1;
		game.round++;
	}

	gameManager(game);
	$("#total-score").html(calculateScore().toString());
}

function redoLastTurn(){

	if(game.round == 1 && game.turn == 1){
		return window.alert("Du kan inte backa här ifrån");
	}

	game.turn--;

	if(game.turn == 0){
		game.round--;
		game.turn = game.players.length;
	}

	console.log("Backat till spelare " + game.players[game.turn - 1].name);

	hits = game.players[game.turn - 1].hits[game.players[game.turn - 1].hits.length - 1];

	game.players[game.turn - 1].hits[game.players[game.turn - 1].hits.length - 1] = [];

	//console.log(hits);

	$("#hit-items").html("");

	for(var i = 0; i < hits.length; i++){
		$("#hit-items").append('<li class="list-group-item list-hit" id="hits-item">' + hits[i] + '<button type"button" onclick="removeHit(\'' + hits[i] + '\')" class="btn-remove-hit pull-right">X</button></li>');
	}

	game.players[game.turn - 1].score += calculateScore();

	$("#total-score").html(calculateScore().toString());

	gameManager(game);
}

function gameManager(gameobj){
	$("#ongoing-game-table").html("");

	for(var i = 0; i < gameobj.players.length; i++){
		$("#ongoing-game-table").append("<tr><th>" + (i + 1) + "</th><td>" + gameobj.players[i].name + "</td><td>" + gameobj.players[i].score + "</td><td>t20,t20,t20</td></tr>");
	}

	$("#ongoing-game-table tr:nth-child(" + gameobj.turn + ")").toggleClass("active")
}

function removeHit(hitId){

	//Located and splices out matching hit from hits array
	for(var i = 0; i < hits.length; i++){
		if(hitId === hits[i]){
			hits.splice(i, 1);
			break;
		}
	}

    	//Wipes and prints out all remaining hits
	$("#hit-items").html("");

	for(var i = 0; i < hits.length; i++){
		$("#hit-items").append('<li class="list-group-item list-hit" id="hits-item">' + hits[i] + '<button type"button" onclick="removeHit(\'' + hits[i] + '\')" class="btn-remove-hit pull-right">X</button></li>');
	}

	$("#total-score").html(calculateScore().toString());
}

