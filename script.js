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
myAudio = document.getElementById('player');

const shuffleOrder = () => {
    let colorOrder = Math.floor(Math.random() * 4);
    order[order.length] = colorOrder;
    clickedOrder = [];

    console.log(colorOrder)
    document.querySelector('.wait').innerHTML = `Aguarde...`
    for(let i in order) {
        let elementColor = createColorElement(order[i]);
        lightColor(elementColor, Number(i) + 1);
    }
    
}

const lightColor = async (element, number) => {
    number = number * 500;
    setTimeout(() => {
        element.classList.add('selected');
    }, number - 250);
   


     
  
    element.classList.remove('selected');
}

setInterval(() => {
    unlightAllColor()
}, 200);

const unlightAllColor =  () => {
    document.querySelectorAll('.selected').forEach( async(item) => {
        console.log(item)
         item.classList.remove('selected');
    })

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
        console.log('verde')
        return green;
    } else if(color == 1) {
        console.log('vermelho')
        return red;
    } else if (color == 2) {
        console.log('amarelo')
        return yellow;
    } else if (color == 3) {
        console.log('azul')
        return blue;
    }
}


const nextLevel = () => {
    document.querySelector('.wait').innerHTML = `Aguarde...`
    document.querySelectorAll('.selected').forEach( async(item) => {
        console.log(item)
         item.classList.remove('selected');
    })
    score++;
    
    document.querySelector('.score').innerHTML = `Pontuação: <b> ${score} <b>`
    shuffleOrder();
    document.querySelector('.wait').innerHTML = ``
}

//funcao para game over
const gameOver = () => {
    alert(`Pontuação: ${score-1}!\nVocê perdeu o jogo!\nClique em OK para iniciar um novo jogo\n`);
    order = [];
    score = 0;
    document.querySelector('.score').innerHTML = `Pontuação: <b> ${score} <b>`
    clickedOrder = [];
    // myAudio.pause()
   
    myAudio.play()
    playGame();
}

//funcao de inicio do jogo
let playGame = async () => {
    myAudio.play()
    score = 0;
    alert('Bem vindo ao Gênesis! Iniciando novo jogo!');
   
 
    nextLevel();
}

//eventos de clique para as cores
green.onclick = () => click(0);
red.onclick = () => click(1);
yellow.onclick = () => click(2);
blue.onclick = () => click(3);

myAudio.play()
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