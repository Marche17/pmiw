//https://youtu.be/cyPVRu_0Hpg
//Valentin Marchesi 94702/9


let EfectoVisual;
let desactivarEfecto = true;

function setup() {
  createCanvas(800, 400);
  EfectoVisual = loadImage("EfectoVisual.png");
}

function draw() {
  image(EfectoVisual, 0, 0, 400, 400);

  noStroke();
  rectMode(CORNER);
  fill(191, 54, 72);
  rect(700, 0, 100, 100);
  rect(400, 300, 100, 100);
  fill(190, 220, 115);
  rect(400, 0, 100, 300);
  rect(500, 0, 200, 100);
  fill(112, 202, 200);
  rect(500, 100, 100, 200);
  rect(700, 100, 100, 200);
  rect(500, 300, 800, 100);

  stroke(255, 0, 0);

  for (let tamaño = 299; tamaño > 0; tamaño -= 10) {
    fill(0, 0, 0, 0);
    rectMode(CENTER);
    rect(650, 250, tamaño, tamaño);
  }

  noStroke();
  rectMode(CORNER);
  fill(190, 220, 115);
  rect(600, 100, 100, 200);

  stroke(255, 0, 0);

  modulo();

  noStroke();
  fill(112, 202, 200);
  rect(550, 200, 100, 200);

  stroke(255, 0, 0);
  for (let x = 505; x <= 595; x += 5) {
    for (let y = 100; y <= 310; y += 10) {
      line(x, y, x, y + 10);
    }
  }

  noStroke();
  fill(112, 202, 200);
  triangle(500, 100, 600, 100, 600, 200);

  stroke(255, 0, 0);
  for (let i = 105; i <= 195; i += 5) {
    line(505 + (i - 105), i, 598, i);
  }

  if (desactivarEfecto && movimientomouse(650, 250, 300, 300)) {
    for (let tamaño = 299; tamaño > 0; tamaño -= 15) {
      fill(0, 0, random(255));
      rect(650, 250, tamaño, tamaño);
    }
  }

  if (desactivarEfecto && movimientomouse(550, 150, 300, 400)) {
    for (let tamaño = 299; tamaño > 0; tamaño -= 15) {
      fill(0, random(255), 0);
      rect(550, 150, tamaño, tamaño);
    }
  }
}

function modulo() {
  for (let tamaño = 299; tamaño > 0; tamaño -= 10) {
    fill(0, 0, 0, 0);
    rectMode(CENTER);
    fill(190, 220, 115);
    rect(550, 150, tamaño, tamaño);
  }
}

function mouseClicked() {
  desactivarEfecto = !desactivarEfecto;
}

function movimientomouse(x, y, x2, y2) {
  return (
    mouseX >= x - x2 / 2 &&
    mouseX <= x + x2 / 2 &&
    mouseY >= y - y2 / 2 &&
    mouseY <= y + y2 / 2
  );
}
