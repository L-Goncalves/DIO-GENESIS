let order = [];
let clickedOrder = [];
let score = 0;

//0 - verde
//1 - vermelho


const url = `https://www.istoedinheiro.com.br/wp-content/uploads/sites/17/2021/09/espaco-1280x720.jpeg`
var element = document.querySelector('body');
element.style.backgroundImage = "url(" + url + ")";
//2 - amarelo
//3 - azul

const blue = document.querySelector('.blue');
const red = document.querySelector('.red');
const green = document.querySelector('.green');
const yellow = document.querySelector('.yellow');
myAudio = document.getElementById('player')
const shuffleOrder = () => {
    let colorOrder = Math.floor(Math.random() * 4);
    order[order.length] = colorOrder;
    clickedOrder = [];

    console.log(colorOrder)
    for(let i in order) {
        let elementColor = createColorElement(order[i]);
        lightColor(elementColor, Number(i) + 1);
    }
}

const lightColor = (element, number) => {
    number = number * 500;
    setTimeout(() => {
        element.classList.add('selected');
    }, number - 250);
    setInterval(() => {
       let divs = document.querySelectorAll('.selected').forEach((item) => {
           console.log(item)
           item.classList.remove('selected');
       }, 1000)
        console.log(divs)
        console.log('removing color: id', divs)
       
    }, 1000);
    element.classList.remove('selected');
}

const checkOrder = () => {
    for(let i in clickedOrder) {
        if(clickedOrder[i] != order[i]) {
            gameOver();
            break;
        }
    }
    if(clickedOrder.length == order.length) {
        setTimeout(() => {
            nextLevel();
           
        }, 1000);
    
    }
}

const click = (color) => {
    clickedOrder[clickedOrder.length] = color;
    createColorElement(color).classList.add('selected');

    setTimeout(() => {
        createColorElement(color).classList.remove('selected');
        checkOrder();
    },250);
}


const createColorElement = (color) => {
    if(color == 0) {
        return green;
    } else if(color == 1) {
        return red;
    } else if (color == 2) {
        return yellow;
    } else if (color == 3) {
        return blue;
    }
}


const nextLevel = () => {
   
 
    score++;
    shuffleOrder();
}

//funcao para game over
const gameOver = () => {
    alert(`Pontuação: ${score}!\nVocê perdeu o jogo!\nClique em OK para iniciar um novo jogo`);
    order = [];
    clickedOrder = [];
    myAudio.pause()
   
    myAudio.play()
    playGame();
}

//funcao de inicio do jogo
let playGame = () => {
    alert('Bem vindo ao Gênesis! Iniciando novo jogo!');
    score = 0;
   
    nextLevel();
}

//eventos de clique para as cores
green.onclick = () => click(0);
red.onclick = () => click(1);
yellow.onclick = () => click(2);
blue.onclick = () => click(3);


//inicio do jogo
playGame();



if (typeof myAudio.loop == 'boolean')
{
    myAudio.loop = true;
}
else
{
    myAudio.addEventListener('ended', function() {
        this.currentTime = 0;
        this.play();
    }, false);
}
myAudio.play();