// VALENTIN MARCHESI 94702/9

//CLASES
//CLASES
let juego;

function preload() {
  imagenJugador = loadImage('data/walle.png');
  imagenObstaculo1 = loadImage('data/asteroide.png');
  imagenObstaculo2 = loadImage('data/basura.png');
  imagenportada = loadImage('data/portada.png');
  imagenperdiste = loadImage('data/perdiste.png');
  imagenganaste = loadImage('data/ganaste.png');
  imagenfondo = loadImage('data/fondojuego.png');
}

function setup() {
  createCanvas(640, 480);
  sonidoMusica = document.getElementById("sonido-musica");
  juego = new Juego();
} 

function draw() {
  if (juego.estadoJuego === 'inicio') {
    juego.mostrarPantallaInicio();
  } else if (juego.estadoJuego === 'jugando') {
    juego.jugar();
  } else if (juego.estadoJuego === 'perdido') {
    juego.mostrarPantallaPerdido();
  } else if (juego.estadoJuego === 'creditos') {
    juego.mostrarCreditos();
  }
}

function mousePressed() {
  sonidoMusica.play();
}

function keyPressed() {
  if (key === ' ') juego.jugador.saltar();
}
