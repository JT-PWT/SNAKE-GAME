let canvas = document.getElementById("snake");
let context = canvas.getContext("2d");

let box = 32;

let snake = [];

//posição inicial da snake
snake[0] = {
    x: 8 * box,
    y: 8 * box 
}

let direction = "right";

let food = {
    x: Math.floor(Math.random() *15 + 1) * box,
    y: Math.floor(Math.random() *15 + 1) * box
}

function criarBG(){
    context.fillStyle = "lightgreen";
    context.fillRect(0, 0, 16 * box, 16 * box); //context.fillrect(x,y,)
}

function criarCobrinha(){
    for(i=0; i < snake.length; i++){
        context.fillStyle = "green";
        context.fillRect(snake[i].x, snake[i].y, box, box)
    }
}

function drawFood(){
    context.fillStyle = "red";
    context.fillRect(food.x, food.y, box, box);
}

document.addEventListener("keydown", update);

function update(event) {
    if (event.keyCode == 37 && direction != "right") direction = "left"; // tecla para esquerda
    if (event.keyCode == 38 && direction != "down") direction = "up"; // tecla para cima
    if (event.keyCode == 39 && direction != "left") direction = "right"; // tecla para direita
    if (event.keyCode == 40 && direction != "up") direction = "down"; // tecla para baixo
}

function iniciarJogo(){
    if (snake[0].x > 15 * box && direction == "right") snake[0].x = 0;
    if (snake[0].x < 0 && direction == "left") snake[0].x = 16 * box;
    if (snake[0].x > 15 * box && direction == "down") snake[0].x = 0;
    if (snake[0].x < 0 && direction == "up") snake[0].x = 16 * box;

    //quando a cobra encostar nela mesma: Game over
    for(i = 1; i < snake.length; i++){
        if(snake[0].x == snake[1].x && snake[0].y == snake[1].y){
            clearInterval(jogo);
            alert("Game over");
        }
    }
    criarBG();
    criarCobrinha();
    drawFood();

    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

    if(direction == "right") snakeX += box;
    if(direction == "left") snakeX -= box;
    if(direction == "up") snakeY -= box;
    if(direction == "down") snakeY += box;

    if (snake != food.x || sankeY != food.y){
        snake.pop();
    } else {
        food.x = Math.floor(Math.random() * 15 + 1) * box;
        food.y = Math.floor(Math.random() * 15 + 1) * box;
    }

    let newHead = {
        x: snakeX,
        y: snakeY
    }
    snake.unshift(newHead);
    
}

let jogo = setInterval(iniciarJogo, 100);


