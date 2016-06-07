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

	$("#dartboard #areas g").children().mousedown(function(){

		if(hits.length < 3 && typeof game != 'undefined'){
			hits.push($(this).context.id);
			//$(this).css("fill", "#BDE7F5");
			$("#hit-items").append('<li class="list-group-item list-hit" id="hits-item">' + $(this).context.id + '<button type"button" onclick="removeHit(\'' + $(this).context.id + '\')" class="btn-remove-hit pull-right">X</button></li>');
			$("#total-score").html(calculateScore().toString());
		}else if(typeof game == 'undefined'){
			//window.alert("Tryck på den blåa användarknappen för att lägga till spelare, eller den gröna play-knappen för att starta ett nytt spel!");
			$("#managePlayers").addClass("btn-primary");
			$("#openStart").addClass("btn-success");
		}else{
			//window.alert("Du har redan 3 markerade träffar, ta bort från panelen till vänster för att göra ändringar.");  
		}


		showHits();
	});

});

players.push(new Player("Simon", false, 0, []));
players.push(new Player("Jari", false, 0, []));
players.push(new Player("Kim", false, 0, []));
players.push(new Player("Erik", false, 0, []));
players.push(new Player("Jonas", false, 0, []));
players.push(new Player("Karl", false, 0, []));
players.push(new Player("Peter", false, 0, []));
players.push(new Player("Erik", false, 0, []));
players.push(new Player("Hugo", false, 0, []));

var outs = {
	"170": "T20, T20, DB",	  			   	
	"167": "T20, T19, DB",	   				  	
	"164": "T20, T18, DB",    				       		
	"161": "T20, T17, DB",	       	
	"160": "T20, T20, D20",		  				  	
	"158": "T20, T20, D19",	   		
	"157": "T20, T19, D20",	   		
	"156": "T20, T20, D18",	   		
	"155": "T20, T15, DB",   		
	"154": "T20, T18, D20",	   		
	"153": "T20, T19, D18",	   		
	"152": "T20, T20, D16",	   		
	"151": "T20, T17, D20",	   		
	"150": "T20, T18, D18",	  		
	"149": "T20, T19, D16",	  		
	"148": "T20, T16, D20",	  		
	"147": "T20, T17, D18",	   		
	"146": "T20, T18, D16",	   		
	"145": "T20, T15, D20",	   		
	"144": "T20, T20, D12",	   		
	"143": "T20, T17, D16",	   		
	"142": "T20, T14, D20",	   		
	"141": "T20, T15, D18",	   		
	"140": "T20, T16, D16",	   		
	"139": "T20, T13, D20",			
	"138": "T20, T14, D18",	
	"137": "T17, T18, D16",
	"136": "T20, T20, D8",	
	"135": "T20, T15, D15",	
	"134": "T20, T14, D16",	
	"133": "T20, T19, D8",	
	"132": "T20, T20, D6",	
	"131": "T20, T13, D16",	
	"130": "T20, T18, D8",	
	"129": "T19, T20, D6",	
	"128": "T18, T14, D16",	
	"127": "T19, T18, D8",	
	"126": "T19, T19, D6",	
	"125": "B, T20, D20",	
	"124": "T20, D16, D16",	
	"123": "T19, T16, D9",	
	"122": "T18, T20, D4",	
	"121": "T20, T15, D8",	
	"120": "T20, 20, D20",	
	"119": "T19, T10, D16",	
	"118": "T20, 18, D20",	
	"117": "T20, 17, D20",	
	"116": "T20, 16, D20",	
	"115": "T20, 15, D20",	
	"114": "T20, 14, D20",	
	"113": "T20, 13, D20",	
	"112": "T20, 20, D16",	
	"111": "T20, 19, D16",	
	"110": "T20, 18, D16",	
	"109": "T20, 17, D16",	
	"108": "T20, 16, D16",	
	"107": "T19, 18, D16",	
	"106": "T20, 14, D16",	
	"105": "T20, 13, D16",
	"104": "T18, 18, D16",
	"103": "T20, 11, D16",
	"102": "T20, 10, D16",
	"101": "T17 18, D16",
	"100": "T20, D20",	
	"99": "T19, 10, D16",
	"98": "T20, D19",		
	"97": "T19, D20",		
	"96": "T20, D18",		
	"95": "T15, 18, D16",
	"94": "T18, D20",		
	"93": "T19, D18",		
	"92": "T20, D16",		
	"91": "T17, D20",		
	"90": "T18, D18",		
	"89": "T19, D16",		
	"88": "T16, D20",		
	"87": "T17, D18",		
	"86": "T18, D16",		
	"85": "T15, D20",		
	"84": "T20, D12",		
	"83": "T17, D16",		
	"82": "T14, D20",		
	"81": "T15, D18",		
	"80": "T16, D16",		
	"79": "T13, D20",		
	"78": "T14, D18",		
	"77": "T15, D16",		
	"76": "T20, D8",		
	"75": "T15, D15",		
	"74": "T14, D16",		
	"73": "T19, D8",		
	"72": "T20, D6",
	"71": "T13, D16",
	"70": "T18, D8",
	"69": "T19, D6",
	"68": "T16, D10",
	"67": "T17, D8",
	"66": "T10, D18",
	"65": "T15, D10",
	"64": "D16, D16",
	"63": "T13, D12",
	"62": "T10, D16",
	"61": "T15, D8",
	"60": "20, D20",
	"59": "19, D20",
	"58": "18, D20",
	"57": "17, D20",
	"56": "16, D20",
	"55": "15, D20",
	"54": "14, D20",
	"53": "13, D20",
	"52": "20, D16",
	"51": "19, D16",
	"50": "18, D16",
	"49": "17, D16",
	"48": "16, D16",
	"47": "15, D16",
	"46": "14, D16",
	"45": "13, D16",
	"44": "12, D16",
	"43": "11, D16",
	"42": "10, D16",
	"41": "9, D16",
	"40": "D20"	
};

function showHits(){
	if(hits.length < 1){
		$("#hits-container").addClass("hidden");
	}else{
		$("#hits-container").removeClass("hidden");
	}
}

function abortCurrentGame(){
	var abort;
	abort = confirm("Är du säker på att du vill avsluta pågående spel?");

	if(abort){
		console.log("Spel avslutat");
		game = [];


		for(var i = 0; i < players.length; i++){
			players[i].active = false;
		}

		updatePlayerList();
		hits = [];
		/*
		$("#hit-items").html("");
		$("#abort-button").toggleClass("hidden");
		$("#total-score").html("");
		$("#ongoing-game-table").html("");
		$("#button-panel").toggleClass("hidden");
		*/

		location.reload();
	}
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

		//Create game with variables: Players[], round(int), turn(int), victor(string)
		game = new Game(activePlayers, 1, 1, "");
		for(var i = 0; i < game.players.length; i++){
			game.players[i].score = gamemode;
		}
		console.log("Spel startat, game mode: " + gamemode);
		
		$("#abort-button").toggleClass("hidden");
		$("#button-panel").toggleClass("hidden");

		gameManager(game);
	}
	
}

function addScore(){
	if((game.players[game.turn - 1].score - calculateScore()) < 0 || (game.players[game.turn - 1].score - calculateScore()) == 1){
		console.log("Fet");
		game.players[game.turn - 1].hits.push(hits);
	}else if((game.players[game.turn - 1].score - calculateScore()) == 0){
		if(typeof hits != 'undefined'){
			if(hits[hits.length - 1].substring(0,1) == "d" || hits[hits.length - 1].substring(0,4) == "Bull"){
				game.players[game.turn - 1].score -= calculateScore();
				game.players[game.turn - 1].hits.push(hits);
				game.victor = game.players[game.turn - 1].name;
				window.alert(game.victor + " är segraren!");
			}
		}
		
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

	showHits();
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

	$("#hit-items").html("");

	for(var i = 0; i < hits.length; i++){
		$("#hit-items").append('<li class="list-group-item list-hit" id="hits-item">' + hits[i] + '<button type"button" onclick="removeHit(\'' + hits[i] + '\')" class="btn-remove-hit pull-right">X</button></li>');
	}

	if(calculateScore() > game.players[game.turn - 1].score || (game.players[game.turn - 1].score - calculateScore()) == 1){

	}else{
		game.players[game.turn - 1].score += calculateScore();
	}

	gameManager(game);

	showHits();
}

function getOut(score){

	console.log("söker efter out från " + score);

	var out = outs[score];

	console.log(out + " ?");

	if(typeof out != 'undefined'){
		return out;
	}else{
		return "";
	}
}

function gameManager(gameobj){
	$("#ongoing-game-table").html("");

	for(var i = 0; i < gameobj.players.length; i++){

		var lastHits = [];
		var lastHitsString = "";

		if(typeof gameobj.players[i].hits[gameobj.players[i].hits.length - 1] != 'undefined'){
			lastHits.push(gameobj.players[i].hits[gameobj.players[i].hits.length - 1]);

			for(var x = 0; x < lastHits.length; x++){
				lastHitsString += lastHits[x] + ", ";
			}

			lastHitsString = lastHitsString.substring(0, lastHitsString.length - 2);
		}

		$("#ongoing-game-table").append("<tr><th>" + (i + 1) + "</th><td>" + gameobj.players[i].name + "</td><td>" + gameobj.players[i].score + "</td><td>" + getOut(gameobj.players[i].score) + "</td><td>" + lastHitsString +  "</td></tr>");
	}

	$("#ongoing-game-table tr:nth-child(" + gameobj.turn + ")").toggleClass("active");

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

