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
			$("#hit-items").append('<li class="list-group-item list-hit" id="hits-item" onclick="removeHit(\'' + $(this).context.id + '\')">' + $(this).context.id + '</li>');
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
	"170": "t20, t20, db",	  			   	
	"167": "t20, t19, db",	   				  	
	"164": "t20, t18, db",    				       		
	"161": "t20, t17, db",	       	
	"160": "t20, t20, d20",		  				  	
	"158": "t20, t20, d19",	   		
	"157": "t20, t19, d20",	   		
	"156": "t20, t20, d18",	   		
	"155": "t20, t15, db",   		
	"154": "t20, t18, d20",	   		
	"153": "t20, t19, d18",	   		
	"152": "t20, t20, d16",	   		
	"151": "t20, t17, d20",	   		
	"150": "t20, t18, d18",	  		
	"149": "t20, t19, d16",	  		
	"148": "t20, t16, d20",	  		
	"147": "t20, t17, d18",	   		
	"146": "t20, t18, d16",	   		
	"145": "t20, t15, d20",	   		
	"144": "t20, t20, d12",	   		
	"143": "t20, t17, d16",	   		
	"142": "t20, t14, d20",	   		
	"141": "t20, t15, d18",	   		
	"140": "t20, t16, d16",	   		
	"139": "t20, t13, d20",			
	"138": "t20, t14, d18",	
	"137": "t17, t18, d16",
	"136": "t20, t20, d8",	
	"135": "t20, t15, d15",	
	"134": "t20, t14, d16",	
	"133": "t20, t19, d8",	
	"132": "t20, t20, d6",	
	"131": "t20, t13, d16",	
	"130": "t20, t18, d8",	
	"129": "t19, t20, d6",	
	"128": "t18, t14, d16",	
	"127": "t19, t18, d8",	
	"126": "t19, t19, d6",	
	"125": "b, t20, d20",	
	"124": "t20, d16, d16",	
	"123": "t19, t16, d9",	
	"122": "t18, t20, d4",	
	"121": "t20, t15, d8",	
	"120": "t20, 20, d20",	
	"119": "t19, t10, d16",	
	"118": "t20, 18, d20",	
	"117": "t20, 17, d20",	
	"116": "t20, 16, d20",	
	"115": "t20, 15, d20",	
	"114": "t20, 14, d20",	
	"113": "t20, 13, d20",	
	"112": "t20, 20, d16",	
	"111": "t20, 19, d16",	
	"110": "t20, 18, d16",	
	"109": "t20, 17, d16",	
	"108": "t20, 16, d16",	
	"107": "t19, 18, d16",	
	"106": "t20, 14, d16",	
	"105": "t20, 13, d16",
	"104": "t18, 18, d16",
	"103": "t20, 11, d16",
	"102": "t20, 10, d16",
	"101": "t17 18, d16",
	"100": "t20, d20",	
	"99": "t19, 10, d16",
	"98": "t20, d19",		
	"97": "t19, d20",		
	"96": "t20, d18",		
	"95": "t15, 18, d16",
	"94": "t18, d20",		
	"93": "t19, d18",		
	"92": "t20, d16",		
	"91": "t17, d20",		
	"90": "t18, d18",		
	"89": "t19, d16",		
	"88": "t16, d20",		
	"87": "t17, d18",		
	"86": "t18, d16",		
	"85": "t15, d20",		
	"84": "t20, d12",		
	"83": "t17, d16",		
	"82": "t14, d20",		
	"81": "t15, d18",		
	"80": "t16, d16",		
	"79": "t13, d20",		
	"78": "t14, d18",		
	"77": "t15, d16",		
	"76": "t20, d8",		
	"75": "t15, d15",		
	"74": "t14, d16",		
	"73": "t19, d8",		
	"72": "t20, d6",
	"71": "t13, d16",
	"70": "t18, d8",
	"69": "t19, d6",
	"68": "t16, d10",
	"67": "t17, d8",
	"66": "t10, d18",
	"65": "t15, d10",
	"64": "d16, d16",
	"63": "t13, d12",
	"62": "t10, d16",
	"61": "t15, d8",
	"60": "20, d20",
	"59": "19, d20",
	"58": "18, d20",
	"57": "17, d20",
	"56": "16, d20",
	"55": "15, d20",
	"54": "14, d20",
	"53": "13, d20",
	"52": "20, d16",
	"51": "19, d16",
	"50": "18, d16",
	"49": "17, d16",
	"48": "16, d16",
	"47": "15, d16",
	"46": "14, d16",
	"45": "13, d16",
	"44": "12, d16",
	"43": "11, d16",
	"42": "10, d16",
	"41": "9, d16",
	"40": "d20"	
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

	if(score > 182){
		return "t20, t20, t20";
	}else if(score > 170 && score < 182){
		if(score % 2 == 0){
			return "t20, t20, d20";
		}else{
			return "t20, t20, t15";
		}
	}else if(typeof out != 'undefined'){
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
		$("#hit-items").append('<li class="list-group-item list-hit" onclick="removeHit(\'' + hits[i] + '\')" id="hits-item">' + hits[i] + '</li>');
	}

	$("#total-score").html(calculateScore().toString());
}

