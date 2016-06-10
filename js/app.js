var players = [];
var hits = [];

var Player = function(NAME, ACTIVE, SCORE, HITS){
	this.name = NAME;
	this.active = ACTIVE;
	this.score = SCORE;
	this.hits = HITS;
}

var Game = function(PLAYERS, ROUND, TURN, VICTOR, MODE, FORCED){
	this.players = PLAYERS;
	this.round = ROUND;
	this.turn = TURN;
	this.victor = VICTOR;
	this.mode = MODE;
	this.forceD = FORCED;
}

var game;

$(document).click(function(event) {
	if(hits.length < 3 && typeof game != 'undefined'){
		if(event.target.id === "dartboard-container" || event.target.id === "dartboard"){
			hits.push("Miss");
			$("#hit-items").append('<li class="list-group-item list-hit" id="hits-item" onclick="removeHit(\'' + "Miss" + '\')">' + "Miss" + '</li>');
		}
	}else if(typeof game == 'undefined'){
		$("#managePlayers").addClass("btn-primary");
		$("#openStart").addClass("btn-success");
	}else{

	}
	
	showHits();
});

$(document).ready(function(){

	$("#dartboard #areas g").children().mousedown(function(){

		if(hits.length < 3 && typeof game != 'undefined'){
			hits.push($(this).context.id);
			$(this).css("fill", "#BDE7F5");
			$("#hit-items").append('<li class="list-group-item list-hit" id="hits-item" onclick="removeHit(\'' + $(this).context.id + '\')">' + $(this).context.id + '</li>');
			//$("#total-score").html(calculateScore().toString());
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


players.push(new Player("Anna", false, 0, []));
players.push(new Player("Emanuel", false, 0, []));
players.push(new Player("Erik", false, 0, []));
players.push(new Player("Hugo", false, 0, []));
players.push(new Player("Jari", false, 0, []));
players.push(new Player("Jonas", false, 0, []));
players.push(new Player("Karl", false, 0, []));
players.push(new Player("Kim", false, 0, []));
players.push(new Player("Oscar", false, 0, []));
players.push(new Player("Peter", false, 0, []));
players.push(new Player("Simon", false, 0, []));

var outs = {
	"170": "Triple 20, Triple 20, Bullseye",	  			   	
	"167": "Triple 20, Triple 19, Bullseye",	   				  	
	"164": "Triple 20, Triple 18, Bullseye",    				       		
	"161": "Triple 20, Triple 17, Bullseye",	       	
	"160": "Triple 20, Triple 20, Double 20",		  				  	
	"158": "Triple 20, Triple 20, Double 19",	   		
	"157": "Triple 20, Triple 19, Double 20",	   		
	"156": "Triple 20, Triple 20, Double 18",	   		
	"155": "Triple 20, Triple 15, Bullseye",   		
	"154": "Triple 20, Triple 18, Double 20",	   		
	"153": "Triple 20, Triple 19, Double 18",	   		
	"152": "Triple 20, Triple 20, Double 16",	   		
	"151": "Triple 20, Triple 17, Double 20",	   		
	"150": "Triple 20, Triple 18, Double 18",	  		
	"149": "Triple 20, Triple 19, Double 16",	  		
	"148": "Triple 20, Triple 16, Double 20",	  		
	"147": "Triple 20, Triple 17, Double 18",	   		
	"146": "Triple 20, Triple 18, Double 16",	   		
	"145": "Triple 20, Triple 15, Double 20",	   		
	"144": "Triple 20, Triple 20, Double 12",	   		
	"143": "Triple 20, Triple 17, Double 16",	   		
	"142": "Triple 20, Triple 14, Double 20",	   		
	"141": "Triple 20, Triple 15, Double 18",	   		
	"140": "Triple 20, Triple 16, Double 16",	   		
	"139": "Triple 20, Triple 13, Double 20",			
	"138": "Triple 20, Triple 14, Double 18",	
	"137": "Triple 17, Triple 18, Double 16",
	"136": "Triple 20, Triple 20, Double 8",	
	"135": "Triple 20, Triple 15, Double 15",	
	"134": "Triple 20, Triple 14, Double 16",	
	"133": "Triple 20, Triple 19, Double 8",	
	"132": "Triple 20, Triple 20, Double 6",	
	"131": "Triple 20, Triple 13, Double 16",	
	"130": "Triple 20, Triple 18, Double 8",	
	"129": "Triple 19, Triple 20, Double 6",	
	"128": "Triple 18, Triple 14, Double 16",	
	"127": "Triple 19, Triple 18, Double 8",	
	"126": "Triple 19, Triple 19, Double 6",	
	"125": "Bullseye, Triple 20, Double 20",	
	"124": "Triple 20, Double 16, Double 16",	
	"123": "Triple 19, Triple 16, Double 9",	
	"122": "Triple 18, Triple 20, Double 4",	
	"121": "Triple 20, Triple 15, Double 8",	
	"120": "Triple 20, 20, Double 20",	
	"119": "Triple 19, Triple 10, Double 16",	
	"118": "Triple 20, 18, Double 20",	
	"117": "Triple 20, 17, Double 20",	
	"116": "Triple 20, 16, Double 20",	
	"115": "Triple 20, 15, Double 20",	
	"114": "Triple 20, 14, Double 20",	
	"113": "Triple 20, 13, Double 20",	
	"112": "Triple 20, 20, Double 16",	
	"111": "Triple 20, 19, Double 16",	
	"110": "Triple 20, 18, Double 16",	
	"109": "Triple 20, 17, Double 16",	
	"108": "Triple 20, 16, Double 16",	
	"107": "Triple 19, 18, Double 16",	
	"106": "Triple 20, 14, Double 16",	
	"105": "Triple 20, 13, Double 16",
	"104": "Triple 18, 18, Double 16",
	"103": "Triple 20, 11, Double 16",
	"102": "Triple 20, 10, Double 16",
	"101": "Triple 17, 18, Double 16",
	"100": "Triple 20, Double 20",	
	"99": "Triple 19, 10, Double 16",
	"98": "Triple 20, Double 19",		
	"97": "Triple 19, Double 20",		
	"96": "Triple 20, Double 18",		
	"95": "Triple 15, 18, Double 16",
	"94": "Triple 18, Double 20",		
	"93": "Triple 19, Double 18",		
	"92": "Triple 20, Double 16",		
	"91": "Triple 17, Double 20",		
	"90": "Triple 18, Double 18",		
	"89": "Triple 19, Double 16",		
	"88": "Triple 16, Double 20",		
	"87": "Triple 17, Double 18",		
	"86": "Triple 18, Double 16",		
	"85": "Triple 15, Double 20",		
	"84": "Triple 20, Double 12",		
	"83": "Triple 17, Double 16",		
	"82": "Triple 14, Double 20",		
	"81": "Triple 15, Double 18",		
	"80": "Triple 16, Double 16",		
	"79": "Triple 13, Double 20",		
	"78": "Triple 14, Double 18",		
	"77": "Triple 15, Double 16",		
	"76": "Triple 20, Double 8",		
	"75": "Triple 15, Double 15",		
	"74": "Triple 14, Double 16",		
	"73": "Triple 19, Double 8",		
	"72": "Triple 20, Double 6",
	"71": "Triple 13, Double 16",
	"70": "Triple 18, Double 8",
	"69": "Triple 19, Double 6",
	"68": "Triple 16, Double 10",
	"67": "Triple 17, Double 8",
	"66": "Triple 10, Double 18",
	"65": "Triple 15, Double 10",
	"64": "Double 16, Double 16",
	"63": "Triple 13, Double 12",
	"62": "Triple 10, Double 16",
	"61": "Triple 15, Double 8",
	"60": "20, Double 20",
	"59": "19, Double 20",
	"58": "18, Double 20",
	"57": "17, Double 20",
	"56": "16, Double 20",
	"55": "15, Double 20",
	"54": "14, Double 20",
	"53": "13, Double 20",
	"52": "20, Double 16",
	"51": "19, Double 16",
	"50": "18, Double 16",
	"49": "17, Double 16",
	"48": "16, Double 16",
	"47": "15, Double 16",
	"46": "14, Double 16",
	"45": "13, Double 16",
	"44": "12, Double 16",
	"43": "11, Double 16",
	"42": "10, Double 16",
	"41": "9, Double 16",
	"40": "Double 20",
	"39": "s7, Double 16",
	"38": "Double 19",
	"37": "s5, Double 16",
	"36": "Double 18",
	"35": "s3, Double 16",
	"34": "Double 17",
	"33": "1, Double 16",
	"32": "Double 16",
	"31": "1, Double 15",
	"30": "Double 15",
	"29": "1, Double 14",
	"28": "Double 14",
	"27": "1, Double 13",
	"26": "Double 13",
	"25": "1, Double 12",
	"24": "Double 12",
	"23": "1, Double 11",
	"22": "Double 11",
	"21": "1, Double 10",
	"20": "Double 10",
	"19": "1, Double 9",
	"18": "Double 9",
	"17": "1, Double 8",
	"16": "Double 8",
	"15": "1, Double 7",
	"14": "Double 7",
	"13": "1, Double 6",
	"12": "Double 6",
	"11": "1, Double 5",
	"10": "Double 5",
	"9": "1, Double 4",
	"8": "Double 4",
	"7": "1, Double 3",
	"6": "Double 3",
	"5": "1, Double 2",
	"4": "Double 2",
	"3": "1, Double 1",
	"2": "Double 1"
};

function showHits(){
	if(hits.length < 1){
		$("#hits-container").addClass("hidden");
	}else{
		$("#hits-container").removeClass("hidden");
		calculateScore();
	}
}

function toggleLivePlayerActive(id, active){
	if(active){
		for(var i = 0; i < players.length; i++){
			if(game.players[id].name == players[i].name){

				if(game.players.length == 1){
					$("#liveAddRemove").modal('hide');
					window.alert("Leave " + game.players[0].name + " alone! :(");
					return liveAddRemoveList();
				}
				players[i].active = false;
				game.players.splice(id, 1);

				//Om jag tar bort spelare vars tur det är MEN det är sista spelaren i listan
				if(id == game.turn - 1 && typeof game.players[game.turn - 1] == 'undefined'){
					game.turn = 1;
					game.round++;
					return liveAddRemoveList();
				//Om jag tar bort spelare vars tur det är
				}else if(id == game.turn - 1){
					return liveAddRemoveList();
				//Om jag tar bort spelare före spelarens var tur det är
				}else if(id < game.turn){
					game.turn--;
					return liveAddRemoveList();
				}

				return liveAddRemoveList();
			}
		}
	}else{
		players[id].active = true;
		players[id].score = game.mode;
		game.players.push(players[id]);
		liveAddRemoveList();
	}

}

function liveAddRemoveList(){

	$("#current-game-players").html("");

	for(var i = 0; i < game.players.length; i++){
		$("#current-game-players").append("<tr class='active'><td>" + game.players[i].name + "</td><td><button type='button' class='btn btn-danger btn-toggle pull-right' onclick='toggleLivePlayerActive(" + i + "," + true + ")'><i class='fa fa-minus' aria-hidden='true'></i></button></td></tr>");
	}

	for(var x = 0; x < players.length; x++){
		if(!players[x].active){
			$("#current-game-players").append("<tr><td>" + players[x].name + "</td><td><button type='button' class='btn btn-success btn-toggle pull-right' onclick='toggleLivePlayerActive(" + x + "," + false + ")'><i class='fa fa-plus' aria-hidden='true'></i></button></td></tr>");	
		}
		
	}

}


function applyAndResume(){
	gameManager(game);
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

	$("#ongoing-game-table tr.active td:nth-child(3)").html(game.players[game.turn - 1].score + " (" + (game.players[game.turn - 1].score - score) + ")");
	$("#ongoing-game-table tr.active td:nth-child(4)").html(getOut(game.players[game.turn - 1].score - score));

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
	var forceDouble;

	if($("#mode_101").prop("checked")){
		gamemode = 101;
	}else if($("#mode_301").prop("checked")){
		gamemode = 301;
	}else if($("#mode_501").prop("checked")){
		gamemode = 501;
	}

	forceDouble = $(".switch-input").prop("checked");

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
		game = new Game(activePlayers, 1, 1, "", gamemode, forceDouble);
		for(var i = 0; i < game.players.length; i++){
			game.players[i].score = gamemode;
		}
		console.log("Spel startat, game mode: " + gamemode);
		
		$("#abort-button").toggleClass("hidden");
		$("#button-panel").toggleClass("hidden");
		$("#last-minute").toggleClass("hidden");

		gameManager(game);
	}
	
}

function addScore(){
	if((game.players[game.turn - 1].score - calculateScore()) < 0 || (game.players[game.turn - 1].score - calculateScore()) == 1){
		console.log("Fet");
		game.players[game.turn - 1].hits.push(hits);

		game.turn += 1;

		if(game.turn > game.players.length){
			game.turn = 1;
			game.round++;
		}

	}else if((game.players[game.turn - 1].score - calculateScore()) == 0){
		if(typeof hits != 'undefined'){
			if(game.forceD){
				if(hits[hits.length - 1].substring(0,1) == "d" || hits[hits.length - 1].substring(0,4) == "Bull"){
					game.players[game.turn - 1].score -= calculateScore();
					game.players[game.turn - 1].hits.push(hits);
					game.victor = game.players[game.turn - 1].name;
					window.alert(game.victor + " är segraren!");
					$("#abort-button").toggleClass("hidden");
					$("#replay-button").toggleClass("hidden");
				}else{
					game.turn += 1;

					if(game.turn > game.players.length){
						game.turn = 1;
						game.round++;
					}
				}
			}else{
				game.players[game.turn - 1].score -= calculateScore();
				game.players[game.turn - 1].hits.push(hits);
				game.victor = game.players[game.turn - 1].name;
				window.alert(game.victor + " är segraren!");
				$("#abort-button").toggleClass("hidden");
				$("#replay-button").toggleClass("hidden");
			}
			
		}
		
	}else{
		game.players[game.turn - 1].score -= calculateScore();
		game.players[game.turn - 1].hits.push(hits);

		game.turn += 1;

		if(game.turn > game.players.length){
			game.turn = 1;
			game.round++;
		}
	}
	
	hits = [];
	$("#hit-items").html("");

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
		$("#hit-items").append('<li class="list-group-item list-hit" onclick="removeHit(\'' + hits[i] + '\')" id="hits-item">' + hits[i] + '</li>');
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
		return "Triple 20, Triple 20, Triple 20";
	}else if(score > 170 && score < 182){
		if(score % 2 == 0){
			return "Triple 20, Triple 20, Double 20";
		}else{
			return "Triple 20, Triple 20, Triple 15";
		}
	}else if(typeof out != 'undefined'){
		return out;
	}else{
		return "";
	}
}

function gameManager(gameobj){
	$("#dartboard #areas g").children().css("fill", "");
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

function replayGame(){
	shuffle(game.players);
	game.turn = 1;
	game.round = 1;
	game.victor = 1;

	for(var i = 0; i < game.players.length; i++){
		game.players[i].score = game.mode;
		game.players[i].hits = [];
	}

	gameManager(game);
}

function removeHit(hitId){

	//Locates and splices out matching hit from hits array
	for(var i = 0; i < hits.length; i++){
		if(hitId === hits[i]){
			$("#" + hitId).css("fill", "");
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

