//namespacing
//criar uma variável de nome menor para referir a algo de nome maior
const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Body = Matter.Body;
const Constraint = Matter.Constraint


//variaveis
var engine;
var world;
var solo, bola;
var parado;
var mexendo;
var b1;
var conexao;
var botaoImg, fundoImg, coelhoImg, corda;
var blink, sad, eat;
var coelho;
var somComer, somCorte, somFundo, somAr;
var mutarImg, balaoImg;

function preload(){
    fundoImg = loadImage("planodefundo.png");
    frutaImg = loadImage("fruta.png");
    coelhoImg = loadImage("coelho.png");

    blink = loadAnimation("piscar1.png", "piscar2.png", "piscar3.png");
    sad = loadAnimation("triste1.png","triste2.png","triste3.png");
    eat = loadAnimation("comer1.png","comer2.png","comer3.png","comer4.png","comer5.png")

}

function setup() {
    createCanvas(500, 700);
    //cria o motor
    engine = Engine.create();
    world = engine.world;

    blink.looping = true;
    blink.frameDelay = 20;

    sad.playing = true;
    sad.looping = false;
    sad.frameDelay = 20;

    eat.looping = false;
    eat.frameDelay = 20;


    var parado = {isStatic:true};
    //cria corpo retangular
    solo = Bodies.rectangle(400,690,800,20, parado);  
    //adiciona no mundo
    World.add(world, solo);

    //criar um objeto da classe Bola
    bola = new Bola(100);
    corda = new Corda({x:250,y:80},bola.body);
    
    botaoImg = createImg("cortar.png");
    botaoImg.size(60,60);
    botaoImg.position(220,40);
    botaoImg.mouseClicked(cortar);
   

    coelho = createSprite(250,640);
   // coelho.addImage(coelhoImg);
    coelho.addAnimation("blinking", blink);
    coelho.addAnimation("eating", eat);
    coelho.addAnimation("sad", sad);
    coelho.scale = 0.2

    rectMode(CENTER);
    ellipseMode(RADIUS);
    imageMode(CENTER);

}


function draw() {
    
    background("cyan");    
    image(fundoImg, 250, 350,500,700);
    //atualiza o motor
    Engine.update(engine);

    //pinta o solo
    fill("brown")
    //desenha o retângulo no corpo
    rect (solo.position.x, solo.position.y, 800,20);
    
    drawSprites()

    corda.show();
    bola.show();

  
   
}

function cortar(){
    corda.cut();
}

function detectarColisao(corpo, sprite){
    if(bola.body !== null){
        //calcula a distância e guarda o resultado
        var distancia = dist(corpo.position.x,corpo.position.y,sprite.position.x,sprite.position.y);
        if(distancia<=80){
            return true;
        }else{
            return false;
        }
    }
    
}