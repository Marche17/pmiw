// Variables globales
let estadoJuego = 'inicio'; // 'inicio', 'jugando', 'creditos', 'perdido'
let jugador;
let obstaculos = [];
let puntuacion = 0;
let objetivoPuntuacion = 10;
let mejorPuntuacion = 0;
let botonInicio, botonReiniciar;
let imagenJugador, imagenObstaculo1, imagenportada, imagenperdiste, imagenganaste, imagenfondo, imagenObstaculo2;

function preload() {
  imagenJugador = loadImage('data/walle.png');
  imagenObstaculo1 = loadImage('data/basura.png');
  imagenObstaculo2 = loadImage('data/basura2.png');
  imagenportada = loadImage('data/portada.png');
  imagenperdiste = loadImage('data/perdiste.png');
  imagenganaste = loadImage('data/ganaste.png');
  imagenfondo = loadImage('data/fondojuego.png');
}

function setup() {
  createCanvas(640, 480);
  jugador = new Jugador();
  
  // Crear botones como instancias de la clase Boton
  botonInicio = new Boton('Inicio', width / 2 - 30, height / 2 + 50, iniciarJuego);
  botonReiniciar = new Boton('Reiniciar', width / 2 - 30, height / 2 + 100, reiniciarJuego);
}

function draw() {
  background(220);
  if (estadoJuego === 'inicio') {
    mostrarPantallaInicio();
  } else if (estadoJuego === 'jugando') {
    image(imagenfondo, 0, 0, width, height); // Mostrar fondo en el juego
    jugar();
  } else if (estadoJuego === 'creditos') {
    image(imagenfondo, 0, 0, width, height); // Mostrar fondo en los créditos
    mostrarCreditos();
  } else if (estadoJuego === 'perdido') {
    mostrarPantallaPerdido();
  }
}

function mostrarPantallaInicio() {
  image (imagenportada,0,0, width,height);
  fill(255);
  textAlign(CENTER);
  textSize(32);
  text('Minijuego de Salto', width / 2, height / 3);
  textSize(16);
  text(`Puntaje objetivo: ${objetivoPuntuacion}`, width / 2, height / 2);
  botonInicio.mostrar();
  botonReiniciar.ocultar();
}

function jugar() {
  botonInicio.ocultar();
  botonReiniciar.ocultar();
  jugador.actualizar();
  jugador.mostrar();

  if (frameCount % 60 === 0) {
    obstaculos.push(new Obstaculo());
  }

  for (let i = obstaculos.length - 1; i >= 0; i--) {
    obstaculos[i].mover();
    obstaculos[i].mostrar();

    if (verificarColision(jugador, obstaculos[i])) {
      estadoJuego = 'perdido';
      break;
    }

    if (obstaculos[i].x < -obstaculos[i].tamaño) {
      obstaculos.splice(i, 1);
      puntuacion++;
    }
  }

  textSize(16);
  text(`Puntuación: ${puntuacion}`,width / 2, 20);

  if (puntuacion >= objetivoPuntuacion) {
    estadoJuego = 'creditos';
    mejorPuntuacion = max(puntuacion, mejorPuntuacion);
  }
}

function mostrarCreditos() {
  image (imagenganaste,0,0, width,height);
  fill(0,255,0);
  textAlign(CENTER);
  textSize(32);
  text('¡Has ganado!', width / 2, height / 3);
  textSize(16);
  text(`Puntuación final: ${puntuacion}`, width / 2, height / 2);
  text(`Nuevo puntaje objetivo: ${mejorPuntuacion + 10}`, width / 2, height / 2 + 40);
  botonReiniciar.mostrar();
}

function mostrarPantallaPerdido() {
  image (imagenperdiste,0,0, width,height);
  fill(255,0,0);
  textAlign(CENTER);
  textSize(32);
  text('¡Perdiste!', width / 2, height / 3);
  textSize(16);
  text(`Puntuación: ${puntuacion}`, width / 2, height / 2);
  botonReiniciar.mostrar();
}

function verificarColision(jugador, obstaculo) {
  return (
    jugador.x + jugador.tamaño > obstaculo.x + 5 &&
    jugador.x < obstaculo.x + obstaculo.tamaño - 5 &&
    jugador.y + jugador.tamaño > obstaculo.y + 5 &&
    jugador.y < obstaculo.y + obstaculo.tamaño - 5
  );
}

function iniciarJuego() {
  estadoJuego = 'jugando';
  puntuacion = 0;
  obstaculos = [];
  objetivoPuntuacion = mejorPuntuacion + 10;
  botonInicio.ocultar();
}

function reiniciarJuego() {
  estadoJuego = 'inicio';
  puntuacion = 0;
  obstaculos = [];
}

function keyPressed() {
  if (key === ' ') jugador.saltar();
}
