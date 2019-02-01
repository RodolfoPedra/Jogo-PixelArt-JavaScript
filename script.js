// criação do canvas
const canvas = document.createElement('canvas');
//contexto de criação da dimensão do jogo apontando para o canvas
const context = canvas.getContext('2d');
//definição de largura e alguta do quadro
canvas.width = 512;
canvas.height = 480;
//adicionando os dados ao corpo do canvas
document.body.appendChild(canvas);

//adicionando imagem de fundo 
let background = false;//declaração para apontar se o carregamento esta pront
const backgroundImage = new Image();//instanciando para receber imagem 
backgroundImage.onload = function(){
    background = true;
    /*método para atribuir true ao realizar carregamento 
    completo da imagem*/
};
backgroundImage.src="./images/background.png";

//imagem do personagem 1
let heroGame = false;
const heroImage = new Image();
heroImage.onload = function(){
    heroGame = true;
}
heroImage.src = "./images/hero.png";

//Imagem do mostro
let monsterGame = false;
const monsterImage = new Image();
monsterImage.onload = function(){
    monsterGame = true;
}
monsterImage.src = "./images/monster.png";    

//Objetos/Personagens do jogo
const hero = {
    speed: 256 //movimento executado em pixels por segundo 
};
const monster = {};
let monsterCapture = 0;

//Comandos para controle do teclado
const keysDown = {};
window.addEventListener('keydown', function(event){
    keysDown[event.keyCode] = true;
}, false);

window.addEventListener('keyup', function(event){
    delete keysDown[event.keyCode];
}, false);

//Reseta o herói ao centro do cenário quando capturar o monstro
const reset = function(){
    hero.x = canvas.width / 2;
    hero.y = canvas.height / 2;

// Para posicionar o monstro randomicamente no cenário
    monster.x = 32 + (Math.random() * (canvas.width - 64));
    monster.y = 32 + (Math.random() * (canvas.height - 64));
};

// Atualiza os objetos do jogo
const update = function(modifier){
    if(38 in keysDown){ // Pressionando a seta para cima
        hero.y -= hero.speed * modifier;
    }
    if(40 in keysDown){// Pressionando a seta para baixo
        hero.y += hero.speed * modifier;
    }
    if(37 in keysDown){// Pressionando a seta a esquerda
        hero.x -= hero.speed * modifier;
    }
    if(39 in keysDown){// Pressionando a seta para a direita
        hero.x += hero.speed * modifier;
    }

    // Verificar se os personagens se encostaram no cenário 
    if (
        hero.x <= (monster.x + 32)
        && monster.x <= (hero.x + 32)
        && hero.y <= (monster.y + 32)
        && monster.y <= (hero.y + 32)
    ){
        monsterCapture++;
        reset();
    }
};

//Renderizar objetos no jogo
const render = function(){
    if(background){
        context.drawImage(backgroundImage, 0, 0);
    }

    if(heroGame){
        context.drawImage(heroImage, hero.x, hero.y);
    }

    if(monsterGame){
        context.drawImage(monsterImage, monster.x, monster.y);
    }

    context.fillStyle = 'rgb(250,250,250)';
    context.font = '24px Helvetica';
    context.textAlign = 'left';
    context.textBaseline = 'top';
    context.fillText('Monstro capturados: ' + monsterCapture, 32, 32);
};

// Controlar o loop do jogo
const loopins = function(){
    const now = Date.now(); 
    const timeNow = now - then;
    update(timeNow / 1000);
    render();
    then = now;
    requestAnimationFrame(loopins);
};
    //Suporte cross-browser para requestAnimationFrame 
const w = window;
const requestAnimationFrame = w.requestAnimationFrame || w.webkitRequestAnimationFrame || w.msRequestAnimationFrame || w.mozRequestAnimationFrame;


let then = Date.now();
reset();
loopins();
