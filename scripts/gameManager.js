
let startGameWindow = null;
let endGameWindow = null;
let pauseGameWindow = null;

let nameInputWindow = null;
let nameInput = null;
let nameInputHeader = null;

let player1 = null;
let player2 = null;

let ball = null;

let walls = null;

let collisionNodes = [];

const winScore = 11;
const ball_speed = 300;
const ball_start_x = 411;
const ball_start_y = 204.5;
const platforms_start_y = 173;
const platform_left_start_x = 126;
const platform_right_start_x = 696;

let bgAudio = new Audio('sounds/8_bit_Adventure.mp3');
bgAudio.autoplay = true;
bgAudio.loop = true;
bgAudio.volume = 0.4;

let scoreAudio = new Audio("sounds/Pong_Score.mp3");

let canResetBall = false;
let lastBallStartX = ball_start_x;
let lastBallStartY = ball_start_y;
let lastStartType = 0;

let paused = false;

function randomValue(min, max) {
    return Math.floor(Math.random() * (max-min) + min);
}

function initNameInput() {
    nameInputWindow = new SVGNode("#Player_Name_Input");
    nameInputWindow.set("class", "");

    nameInputHeader = new TextNode("#Player_Name_Input_Info_Text");
    nameInputHeader.text = "Player 1 Name:";

    nameInput = new Input("#Player_Name_Input_Text", new SVGNode("#Player_Name_Input_Handler"), "Enter name...");
    nameInput.setPlaceHolderColor("#888888");
    nameInput.textValue = "";
    nameInput.focused = true;
    nameInput.onEnter = () => changeInputWindow(player1);
}

function initAllStaticColliders() {
    let rightWall = new BoxCollider(714.5, 210, 3, 400, "rightWall");
    rightWall.onCollisionEnter = (collider) => onScoreWallCollision(collider, "right");
    
    let leftWall = new BoxCollider(117.5, 210, 3, 400, "leftWall");
    leftWall.onCollisionEnter = (collider) => onScoreWallCollision(collider, "left");

    walls = new CollisionNode("#Background");
    walls.addBoxColider(new BoxCollider(416, 409.5, 600, 3, "bottomWall"));
    walls.addBoxColider(new BoxCollider(416, 10.5, 600, 3, "topWall"));
    walls.addBoxColider(rightWall);
    walls.addBoxColider(leftWall);

    collisionNodes.push(walls);
}

function initPlayers() {
    player1 = new Player(new TextNode("#Player_1_Name_Text"), new TextNode("#Score_1_Text"), new PlayerPlatform("#Player_1_Platform", 1, "w", "s", ball_speed));
    player1.onScorePoint = () => onScorePoint(1);
    collisionNodes.push(player1.platform);

    player2 = new Player(new TextNode("#Player_2_Name_Text"), new TextNode("#Score_2_Text"), new PlayerPlatform("#Player_2_Platform", 2, "ArrowUp", "ArrowDown", ball_speed));
    player2.onScorePoint = () => onScorePoint(2);
    collisionNodes.push(player2.platform);
}

function changeInputWindow(player) {
    player.playerName = nameInput.textValue;
    if (player === player1){
        nameInputHeader.text = "Player 2 Name:";
        nameInput.focused = true;
        nameInput.onEnter = () => changeInputWindow(player2);
        nameInput.textValue = "";
    }
    else {
        nameInputWindow.set("class", "hidden");

        player1.reset(platform_left_start_x, platforms_start_y);
        player2.reset(platform_right_start_x, platforms_start_y);
        canResetBall = false;
        setTimeout(() => startGame(0), 1000);
    }
}

function startGame(startType) {
    lastStartType = startType;
    let angle = 0;
    if (startType == 0) {
        let quater = randomValue(0, 4);
        if (quater == 0) {
            angle = randomValue(20, 60);
        }
        else if (quater == 1) {
            angle = randomValue(120, 160);
        }
        else if (quater == 2) {
            angle = randomValue(-120, -160);
        }
        else if (quater == 3) {
            angle = randomValue(-20, -60);
        }
    }
    else if (startType == 1) {
        angle = randomValue(60, -60);
    }
    else if (startType == 2) {
        angle = randomValue(115, 245);
    }
    ball.setAngleVelocity(ball_speed, angle);
    canResetBall = true;
    canPause = true;
}

function rematch() {
    player1.reset(platform_left_start_x, platforms_start_y);
    player2.reset(platform_right_start_x, platforms_start_y);
    
    canResetBall = false;
    canPause = false;
    setTimeout(() => startGame(0), 1000);
}

function pause() {
    paused = true;
    pauseGameWindow.set("class", "");
}

function resume() {
    paused = false;
    pauseGameWindow.set("class", "hidden");
}

function showStartGameWindow() {
    startGameWindow = new SVGNode("#Start_Game");
    startGameWindow.set("class", "");

    document.addEventListener("keydown", (event) => {
        if (event.key.toLowerCase() === "enter" && nameInputWindow == null) {
            playBGMusic();
            startGameWindow.set("class", "hidden");
            initNameInput();
        }
    });
}

function showEndGameWindow() {
    endGameWindow.set("class", "");

    let finnalScoreText = new TextNode("#Final_Score_Text")
    if (player1.score == winScore) {
        finnalScoreText.text = player1.playerName + " has scored " + winScore + " points";
    }
    else if (player2.score == winScore) {
        finnalScoreText.text = player2.playerName + " has scored " + winScore + " points";
    }
}

function playBGMusic() {
    bgAudio.load(); 
    bgAudio.play();
}

function onStart() {
    showStartGameWindow();

    initPlayers();

    ball = new Ball("#Ball");
    ball.setPos(ball_start_x, ball_start_y);
    collisionNodes.push(ball);

    initAllStaticColliders();

    endGameWindow = new SVGNode("#End_Game");
    endGameWindow.set("class", "hidden");

    pauseGameWindow = new SVGNode("#Pause_Menu");
    pauseGameWindow.set("class", "hidden");

    document.addEventListener("keydown", (event) => {
        if (event.key.toLowerCase() === 'r') {
            if (event.ctrlKey) {
                document.location.reload();
                return;
            }

            if (endGameWindow.get("class") === "") {
                endGameWindow.set("class", "hidden");
                rematch();
                return;
            }
            else if (canResetBall && !paused) {
                ball.setPos(lastBallStartX, lastBallStartY);
                ball.setVelocity(0,0);
                canResetBall = false;
                setTimeout(() => startGame(lastStartType), 1000);
                return;
            }
        }
        else if (event.key.toLowerCase() === 'p') {
            if (canResetBall) {
                if (paused) {
                    resume();
                }
                else {
                    pause();
                }
            }
        }
    });

    document.addEventListener('visibilitychange', (event) => {
        if (document.visibilityState != 'visible' && canResetBall) {
            pause();
        }
    });
}

function onScoreWallCollision(collider, wallSide) {
    if (collider.name === "ball"){
        if (wallSide === "right"){
            player1.addPoint();
        }
        else if (wallSide === "left"){
            player2.addPoint();
        }
    }
}

async function onUpdate() {
    newUpdateTime = new Date().getTime();
    let elapsedTime = (newUpdateTime - lastUpdateTime) / 1000;

    if (!paused) {
        onUpdateUI();

        onUpdatePhysics(elapsedTime);

        if (!document.hasFocus() && canResetBall){
            pause();
        }
    }

    lastUpdateTime = newUpdateTime;
    setTimeout(onUpdate, 0);
}

function onUpdateUI() {
    if (nameInput != null) {
        nameInput.updateUI();
    }

    player1.updateUI();
    player2.updateUI();
}

function onUpdatePhysics(elapsedTime) {
    onCollision();

    ball.move(elapsedTime);
    player1.platform.move(elapsedTime);
    player2.platform.move(elapsedTime);
}

function onCollision() {
    for (i = 0; i < collisionNodes.length; i++) {
        for (j = i + 1; j < collisionNodes.length; j++) {
            collisionNodes[i].checkCollision(collisionNodes[j]);
        }
    }
}

function onScorePoint(playerNum) {
    scoreAudio.load();
    scoreAudio.play();

    ball.setVelocity(0,0);
    let startPlayerNum = 0;
    if (playerNum == 1) {
        lastBallStartX = platform_right_start_x - 40;
        lastBallStartY = ball_start_y;
        startPlayerNum = 2;
    }
    else if (playerNum == 2) {
        lastBallStartX = platform_left_start_x + 40;
        lastBallStartY = ball_start_y;
        startPlayerNum = 1;
    }

    ball.setPos(lastBallStartX, lastBallStartY);

    if (player1.score != winScore && player2.score != winScore) {
        canResetBall = false;
        setTimeout(() => startGame(startPlayerNum), 1000);
    }
    else {
        lastBallStartX = ball_start_x;
        lastBallStartY = ball_start_y;

        ball.setPos(lastBallStartX, lastBallStartY);
        player1.platform.active = false;
        player2.platform.active = false;
        showEndGameWindow();
    }
}

onStart();
let newUpdateTime = new Date().getTime();
let lastUpdateTime = new Date().getTime();
onUpdate();