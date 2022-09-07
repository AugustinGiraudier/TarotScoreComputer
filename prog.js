var players = [];
var game = [];
var screen = 'scores';


function onBodyLoad(){

    document.getElementById('inp-new-player').addEventListener("keyup", ({key}) => {
        if (key === "Enter") {
            addPlayer();
        }
    })
    
    let partieDiv = document.getElementById('switch-partie');
    let scoreDiv = document.getElementById('switch-score');

    partieDiv.addEventListener("click", function(){ 
        if(screen == 'scores'){
            screen = 'partie';
            clickSwitch('partie');
        }
    });
    scoreDiv.addEventListener("click", function(){ 
        if(screen == 'partie'){
            screen = 'scores';
            clickSwitch('scores');
        }
    });

}

function addPlayer(){
    let inp = document.getElementById("inp-new-player");
    let name = inp.value.toLowerCase();
    inp.value = "";
    
    if(name.length == 0 || players.includes(name))
        return;

    players.push(name);

    if(players.length == 1)
        document.getElementById('txt-no-player').classList.add('remove');
    else if(players.length == 3)
        document.getElementById('div-btn-start-game').classList.remove('remove');

    document.getElementById('player-contener').innerHTML += getPlayerTicket(name);
}

function removePlayer(pName){
    document.getElementById(pName + "-ticket").remove();
    players.pop(pName);
    if(players.length == 0)
        document.getElementById('txt-no-player').classList.remove('remove');
    if(players.length < 3)
        document.getElementById('div-btn-start-game').classList.add('remove');
}

function getPlayerTicket(pName){
    let pId = pName.replace("'","///");
    let degree = (Math.random() * (6))-3;
    return `
    <div class="player-ticket" style="transform: rotate(`+ degree +`deg);" onmouseenter="mouseEnterTicket('`+ pId +`')" onmouseleave="mouseLeaveTicket('`+ pId +`')" id="`+ pId +`-ticket">
        <div class="player-name">
            <p>`+ pName +`</p>
        </div>
        <img class="btn-cross grow invisible" onclick="removePlayer('`+ pId +`')" id="`+ pId +`-cross" src="Assets/btn-cross.svg" alt="">
    </div>
    `
}

function mouseEnterTicket(pName){
    document.getElementById(pName + '-cross').classList.remove('invisible');
}
function mouseLeaveTicket(pName){
    document.getElementById(pName + '-cross').classList.add('invisible');
}

function startGame(){

    // Build the score tab :
    let strPlayersOptions = '';
    for(let player of players){
        game.push({"player":player,"score":0});
        strPlayersOptions += "<option value='"+ player +"'>"+ player +"</option>";
    }
    document.getElementById('joueurs').innerHTML = strPlayersOptions;

    // Put player names in the score tab
    let playersStr = '';
    for(let player of game)
        playersStr += "<th><p class='text-white text-sm'>"+ player['player'] +"</p></th>"
    document.getElementById('table-players-encart').innerHTML = playersStr;

    // put a first game with 0 score
    addLineWithScores();


    // display right screens
    document.getElementById('game-part').classList.remove('remove');
    document.getElementById('start-part').classList.add('remove');

    
    console.log(game);

}

function clickSwitch(btn){
    switchButtons();

    if(btn == 'scores'){
        document.getElementById('scores-part').classList.remove('remove');
        document.getElementById('partie-part').classList.add('remove');
    }
    else{
        document.getElementById('partie-part').classList.remove('remove');
        document.getElementById('scores-part').classList.add('remove');
    }
}

function switchButtons(){
    let partieDiv = document.getElementById('switch-partie');
    let scoreDiv = document.getElementById('switch-score');
    let A;
    let B;

    if(partieDiv.classList.contains('switch-off')){
        partieDiv.src = "Assets/btn-partie.svg";
        scoreDiv.src = "Assets/btn-scores-off.svg";
        A = partieDiv;
        B = scoreDiv;
    }
    else{
        partieDiv.src = "Assets/btn-partie-off.svg";
        scoreDiv.src = "Assets/btn-scores.svg";
        B = partieDiv;
        A = scoreDiv;
    }

    A.classList.remove('switch-off');
    A.classList.add('grow','pointable');
    B.classList.add('switch-off');
    B.classList.remove('grow','pointable');
}
function addLineWithScores(){

    let strScores = '<tr>';

    for(let player of game){
        strScores += "<td>"+ player['score'] +"</td>"
    }
    strScores += "</tr>";

    document.getElementById('table-score-encart').innerHTML += strScores;
}

function computeNewGame(){

    let joueur = document.getElementById('joueurs').value;
    let score = document.getElementById('inp-game-score').value;
    let annonce = document.getElementById('annonces').value;
    let bouts = document.getElementById('bouts').value;

    if(score == '')
        return;


    addLineWithScores();
}