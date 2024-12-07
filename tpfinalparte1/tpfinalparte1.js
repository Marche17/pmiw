////https://www.youtube.com/watch?v=iTXkC_PFxsU
//// Valentin Marchesi 93702/9

let pantalla = 0;
let on;
let imagenes = [];
let texto = [];
let textosPantallaUno = [];

function preload() {
  for (let i = 0; i < 15; i++) {
    imagenes[i] = loadImage('data/' + i + ".jpg");
  }
  texto = loadStrings("data/texto.txt");
}

function setup() {
  createCanvas(640,480);
  rectMode(CENTER);
  
  for (let i = 0; i < 14; i++) {
    imagenes[i].resize(width, height);
  }
  
  textSize(18);
  sonidoMusica = document.getElementById("sonido-musica");
}

function draw() {
  Pantallas();
}

function Pantallas() {
  image(imagenes[pantalla], 0, 0);
  let textoAjustado = ajustarTexto(texto[pantalla], width - 100); 
  let anchoTexto = textWidth(textoAjustado);
  let altoTexto = textoAjustado.split('\n').length * 24;

  fill(255, 255, 255, 150);  
  rect(320, 380, width - 80, altoTexto + 20);
  
  fill(0);
  text(textoAjustado, 50, 380);
  
  if (pantalla == 0) {
    fill(0, 255, 0);
    dibujarBoton("cuadrado", 320, 450, 60, 1, ">");
  } else if (pantalla == 1) {
    fill(0, 255, 0);
    dibujarBoton("cuadrado", 320, 450, 60, 2, ">");
  } else if (pantalla == 2) {
    fill(0, 255, 0);
    dibujarBoton("cuadrado", 320, 450, 60, 3, ">");
  } else if (pantalla == 3) {
    fill(0, 255, 0);
    dibujarBoton("cuadrado", 220, 450, 150, 4, "Toma el objeto"); 
    fill(255, 0, 0);
    dibujarBoton("cuadrado", 420, 450, 150, 11, "No toma el objeto"); 
    fill(0, 255, 0);
  } else if (pantalla == 4) {
    fill(0, 255, 0);
    dibujarBoton("cuadrado", 220, 450, 90, 5, "Se acerca"); 
    fill(255, 0, 0);
    dibujarBoton("cuadrado", 420, 450, 90, 9, "Se aleja"); 
    fill(0, 255, 0);
  } else if (pantalla == 5) {
    fill(0, 255, 0);
    dibujarBoton("cuadrado", 320, 450, 60, 6, ">");
  } else if (pantalla == 6) {
    fill(0, 255, 0);
    dibujarBoton("cuadrado", 320, 450, 60, 7, ">");
  } else if (pantalla == 7) {
    fill(0, 255, 0);
    dibujarBoton("cuadrado", 320, 450, 60, 8, ">");
  } else if (pantalla == 8) {
    fill(0, 255, 0);
    dibujarBoton("cuadrado", 320, 450, 60, 14, ">");
  } else if (pantalla == 9) {
    fill(0, 255, 0);
    dibujarBoton("cuadrado", 320, 450, 60, 10, ">");
  } else if (pantalla == 10) {
    fill(0, 255, 0);
    dibujarBoton("circulo", 320, 450, 60, 14, "Fin");
  } else if (pantalla == 11) {
    fill(0, 255, 0);
    dibujarBoton("cuadrado", 320, 450, 60, 12, ">");
  } else if (pantalla == 12) {
    fill(0, 255, 0);
    dibujarBoton("cuadrado", 320, 450, 60, 13, ">");
  } else if (pantalla == 13) {
    fill(0, 255, 0);
    dibujarBoton("circulo", 320, 450, 60, 14, "Fin");
  } else if (pantalla == 14) {
    fill(0, 255, 0);
    dibujarBoton("circulo", 320, 450, 60, 1, "Fin");
    
    fill(0, 255, 0);
    for (let j = 0; j < texto.length; j++) {
    }
  }
}

function ajustarTexto(textoOriginal, anchoMaximo) {
  let palabras = textoOriginal.split(" ");
  let resultado = "";
  let lineaActual = "";

  palabras.forEach(palabra => {
    if (textWidth(lineaActual + palabra + " ") < anchoMaximo) {
      lineaActual += palabra + " ";
    } else {
      resultado += lineaActual + "\n";
      lineaActual = palabra + " ";
    }
  });

  return resultado + lineaActual;
}

function dibujarBoton(forma, x, y, tam, siguiente, textoAMostrar) {
  push();
  
  if (forma === "circulo") {
    circle(x, y, tam);
    fill(0);
    textAlign(CENTER, CENTER);
    text(textoAMostrar, x, y);
    if (mouseIsPressed && on) {
      if (dist(mouseX, mouseY, x, y) < tam / 2) {
        pantalla = 0;
        on = false;
      }
    }
  } else if (forma === "cuadrado") {
    rect(x, y, tam, 60); 
    fill(0);
    textAlign(CENTER, CENTER);
    text(textoAMostrar, x, y);
    if (mouseIsPressed && on) {
      if (mouseX > x - tam / 2 &&
          mouseX < x + tam / 2 &&
          mouseY > y - 60 / 2 &&
          mouseY < y + 60 / 2) {
        pantalla = siguiente;
        on = false;
      }
    }
  }
  
  pop();
}
function mousePressed() {
    sonidoMusica.play();
}
function mouseMoved() {
  on = true;
}
