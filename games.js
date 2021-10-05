let fly = true;
let randomx;
let randomy;
let coin = 0;
if (localStorage.getItem("coinRecord") === null) {
    localStorage.setItem("coinRecord", "")
}
setInterval(() => {
    if(fly == true) {
        randomx = Math.random() * (100 - 1) + 1;
        randomy = Math.random() * (100 - 1) + 1;
        document.querySelector('.ball').style.top = randomx + '%'
        document.querySelector('.ball').style.left = randomy + '%'
    }      
}, 300)
if(window.innerHeight < 500 || window.innerWidth < 900) {
    console.log('yes');
    document.querySelector('.gamestart').style.display = 'none'
    let info = document.createElement('p')
    info.textContent = 'you cant play this game on small screen'
    document.body.append(info)
}
let easy = document.querySelector('.easy')
let hard = document.querySelector('.hard')
let level = document.querySelector('.type')

const startloading = () => {
    document.querySelector('.gamestart').style.display = 'none'
    document.querySelector('.thegame').style.display = 'block'
    playerscore = 0;
    aiscore = 0;
    coin = 0;
}
easy.addEventListener('click', () => {
    hardse = 0.30
    level.textContent = 'Easy'
})
hard.addEventListener('click', () => {
    hardse = 0.50
    level.textContent = 'Hard'
})
document.querySelector('.startbut').addEventListener('click', () => {
    fly = false;
    startloading();
})

const coinSave = () => {
    let coinRecord = localStorage.getItem("coinRecord")
    document.querySelector('.coinrecord').textContent = coinRecord;
    if(coinRecord < coin) {
        coinString = coin.toString();
        localStorage.setItem('coinRecord', coinString);
    }
}
coinSave();

let canvas, canvasContext
let ballX = 20;
let ballY = 50;
let ballSpeedX = 5;
let ballSpeedY = 5;
let paddle1Y = 300
let paddle2Y = 300
let paddleHeight = 100
let paddleDist = 10;
let paddleWidth = 10;
let gamespeed = 6;
let gamehard = 35;
let playerscore = 0;
let aiscore = 0;
let hardse = 0.30
document.querySelector('.coinvalue').textContent = coin;

    window.onload = () => {
        canvas = document.querySelector('canvas')
        canvasContext = canvas.getContext('2d') 
        canvas.addEventListener('mousemove', (e) => {
            let mousePos = mousePosition(e)
            paddle1Y = mousePos.y - paddleHeight/2
        })
        setInterval(() => {
            moveMain();
            drawMain()
        },10)

        drawMain()

    }

    const ballReset = () => {
        ballSpeedX = -ballSpeedX
        ballX = canvas.width / 2
        ballY = canvas.height / 2
        ballSpeedY = 5;
        document.querySelector('.coinvalue').textContent = coin;
    }
    

    const mousePosition = (event) => {
        let gameRect = canvas.getBoundingClientRect()
        let mainDocument = document.documentElement;

         
        let mouseX = event.clientX - gameRect.left - mainDocument.scrollLeft
        let mouseY = event.clientY - gameRect.top - mainDocument.scrollTop

        return {x: mouseX, y: mouseY}
    }

    const AImovement = () => {
        let paddleCenter = paddle2Y + paddleHeight / 2
        if(paddleCenter < ballY - gamehard) {
            paddle2Y = paddle2Y + gamespeed
        }
        else if(paddleCenter > ballY + gamehard){
            paddle2Y = paddle2Y - gamespeed
        }
    }
    const moveMain = () => {
        AImovement()

        ballX = ballX + ballSpeedX;
        ballY = ballY + ballSpeedY
        if(ballX > canvas.width) {
            playerscore += 1;
            coinSave();
            coin += 1;
            console.log(`${playerscore}player`);
            ballReset();
        }
        else if(ballX < 0) {
            aiscore += 1;
            coinSave();
            coin -= 1;
            console.log(aiscore);
            ballReset();}
        if(ballY > canvas.height) {
            ballSpeedY = ballSpeedY * -1;
        }
        else if(ballY < 0) {
            ballSpeedY = ballSpeedY * -1;
        }


        let paddleTop = paddle1Y 
        let paddleBottom = paddle1Y + paddleHeight
        let paddleLeft = paddleDist
        let paddleRight = paddleDist + paddleWidth

        if (ballY >= paddleTop && ballY <= paddleBottom && ballX >= paddleLeft && ballX <= paddleRight) {
            ballSpeedX = -ballSpeedX
            let diffY = ballY - (paddle1Y + paddleHeight / 2)
            ballSpeedY = diffY * hardse
        }
        let AIpaddleTop = paddle2Y 
        let AIpaddleBottom = paddle2Y + paddleHeight
        let AIpaddleLeft = canvas.width - paddleDist - paddleWidth
        let AIpaddleRight = canvas.width - paddleDist
        
        if (ballY >= AIpaddleTop && ballY <= AIpaddleBottom && ballX >= AIpaddleLeft && ballX <= AIpaddleRight) {
            ballSpeedX = -ballSpeedX
            let diffY = ballY - (paddle2Y + paddleHeight / 2)
            ballSpeedY = diffY * hardse
        }
        coinSave();
    }
    
    const drawMain = () => {
        //table
        canvasCreate(0, 0, canvas.width, canvas.height, 'black')
        //ball
        circleCreate(ballX, ballY, 10, 'red')
        //rocket
        canvasCreate(paddleDist, paddle1Y, paddleWidth, paddleHeight, 'white')
        canvasCreate(canvas.width - paddleWidth - paddleDist, paddle2Y, paddleWidth, paddleHeight, 'white')
        //wyniik
        canvasContext.fillText(playerscore, 100, 100)
        canvasContext.fillText(aiscore, 700, 100)

    }
    const canvasCreate = (posX, posY, width, height, color) => {
        canvasContext.fillStyle = color;
        canvasContext.fillRect(posX, posY, width, height)
    }

    const circleCreate = (centerX, centerY, radius, color) => {
        canvasContext.fillStyle = color
        canvasContext.beginPath();
        canvasContext.arc(centerX, centerY, radius, 0, Math.PI * 2)
        canvasContext.fill()
    }
