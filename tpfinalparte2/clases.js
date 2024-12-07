class Jugador {
  constructor() {
    this.x = 50;
    this.y = height - 100;
    this.tamaño = 100;
    this.velocidad = 0;
    this.gravedad = 0.6;
    this.salto = -15;
  }

  saltar() {
    if (this.y >= height - this.tamaño) {
      this.velocidad = this.salto;
    }
  }

  actualizar() {
    this.velocidad += this.gravedad;
    this.y += this.velocidad;
    if (this.y >= height - this.tamaño) {
      this.y = height - this.tamaño;
      this.velocidad = 0;
    }
  }

  mostrar() {
    image(imagenJugador, this.x, this.y, this.tamaño, this.tamaño);
  }
}

class Obstaculo {
  constructor() {
    this.x = width;
    this.y = height - 80;
    this.tamaño = 80;
    this.velocidad = 6;
    this.imagen = random([imagenObstaculo1, imagenObstaculo2]);
  }

  mover() {
    this.x -= this.velocidad;
  }

  mostrar() {
    image(this.imagen, this.x, this.y, this.tamaño, this.tamaño);
  }
}

class Boton {
  constructor(texto, x, y, accion) {
    this.texto = texto;
    this.x = x;
    this.y = y;
    this.ancho = 100;
    this.alto = 50;
    this.boton = createButton(this.texto);
    this.boton.position(this.x, this.y);
    this.boton.size(this.ancho, this.alto);
    this.boton.mousePressed(() => accion());
    this.ocultar(); 
  }

  mostrar() {
    this.boton.show();
  }

  ocultar() {
    this.boton.hide();
  }
}


class Potenciador {
  constructor() {
    this.tamaño = 30; 
    this.x = width; 
    this.y = random(height - 100, height - 50); 
    this.velocidad = 3; 
    this.imagen = loadImage('data/bonus.png'); 
  }

  mover() {
    this.x -= this.velocidad; 
  }

  mostrar() {
    image(this.imagen, this.x, this.y, this.tamaño, this.tamaño); 
  }

  recolectado(jugador) {

    return (
      jugador.x < this.x + this.tamaño &&
      jugador.x + jugador.tamaño > this.x &&
      jugador.y < this.y + this.tamaño &&
      jugador.y + jugador.tamaño > this.y
    );
  }
}

class Juego {
  constructor() {
    this.estadoJuego = 'inicio';
    this.jugador = new Jugador();
    this.obstaculos = [];
    this.potenciadores = [];
    this.puntuacion = 0;
    this.objetivoPuntuacion = 10;
    this.mejorPuntuacion = 0;
    
    this.botonInicio = new Boton('Inicio', width / 2 - 50, height / 2 + 50, () => this.iniciarJuego());
    this.botonReiniciar = new Boton('Reiniciar', width / 2 - 50, height / 2 + 100, () => this.reiniciarJuego());
  }

  mostrarPantallaInicio() {
    image(imagenportada, 0, 0, width, height);
    fill(255);
    textAlign(CENTER);
    textSize(32);
    text('Minijuego de Salto', width / 2, height / 3);
    textSize(16);
    text(`Puntaje objetivo: ${this.objetivoPuntuacion}`, width / 2, height / 2);
    this.botonInicio.mostrar();
    this.botonReiniciar.ocultar();
  }

  jugar() {
    this.botonInicio.ocultar();
    this.botonReiniciar.ocultar();
    image(imagenfondo, 0, 0, width, height);

    // Actualización del jugador
    this.jugador.actualizar();
    this.jugador.mostrar();

    // Creación de obstáculos cada 60 frames
    if (frameCount % 60 === 0) {
      this.obstaculos.push(new Obstaculo());
    }

    // Creación de potenciadores cada 180 frames
    if (frameCount % 400 === 0) {
      this.potenciadores.push(new Potenciador());
    }

    // Actualización y eliminación de obstáculos
    for (let i = this.obstaculos.length - 1; i >= 0; i--) {
      this.obstaculos[i].mover();
      this.obstaculos[i].mostrar();

      if (this.verificarColision(this.jugador, this.obstaculos[i])) {
        this.estadoJuego = 'perdido';
        break;
      }

      if (this.obstaculos[i].x < -this.obstaculos[i].tamaño) {
        this.obstaculos.splice(i, 1);
        this.puntuacion++;
      }
    }

    for (let i = this.potenciadores.length - 1; i >= 0; i--) {
      this.potenciadores[i].mover();
      this.potenciadores[i].mostrar();

      // Verificar si el jugador recoge el potenciador
      if (this.potenciadores[i].recolectado(this.jugador)) {
        this.puntuacion += 2;  // Se puede ajustar la cantidad que aumenta el puntaje
        this.potenciadores.splice(i, 1);  // Eliminar el potenciador
        continue;
      }

      // Si el potenciador se sale de la pantalla, eliminarlo
      if (this.potenciadores[i].x < -this.potenciadores[i].tamaño) {
        this.potenciadores.splice(i, 1);
      }
    }

    // Mostrar puntuación
    textSize(16);
    text(`Puntuación: ${this.puntuacion}`, width / 2, 20);
    
    if (this.puntuacion >= this.objetivoPuntuacion) {
      this.estadoJuego = 'creditos';
      this.mejorPuntuacion = max(this.puntuacion, this.mejorPuntuacion);
    }
  }

  mostrarCreditos() {
    image(imagenganaste, 0, 0, width, height);  // Mostrar la imagen de fondo de créditos
    fill(0, 255, 0);
    textAlign(CENTER);
    textSize(32);
    text('¡Has ganado!', width / 2, height / 3);
    textSize(16);
    text(`Puntuación final: ${this.puntuacion}`, width / 2, height / 2);
    text(`Nuevo puntaje objetivo: ${this.mejorPuntuacion + 10}`, width / 2, height / 2 + 40);
    this.botonReiniciar.mostrar();  // Mostrar el botón para reiniciar el juego
  }

  mostrarPantallaPerdido() {
    image(imagenperdiste, 0, 0, width, height);
    fill(255, 0, 0);
    textAlign(CENTER);
    textSize(32);
    text('¡Perdiste!', width / 2, height / 3);
    textSize(16);
    text(`Puntuación: ${this.puntuacion}`, width / 2, height / 2);
    this.botonReiniciar.mostrar();
  }

  verificarColision(jugador, objeto) {
    return (
      jugador.x + jugador.tamaño > objeto.x &&
      jugador.x < objeto.x + objeto.tamaño &&
      jugador.y + jugador.tamaño > objeto.y &&
      jugador.y < objeto.y + objeto.tamaño
    );
  }

  iniciarJuego() {
    this.estadoJuego = 'jugando';
    this.puntuacion = 0;
    this.obstaculos = [];
    this.objetivoPuntuacion = this.mejorPuntuacion + 10;
    this.botonInicio.ocultar();
  }

  reiniciarJuego() {
    this.estadoJuego = 'inicio';
    this.puntuacion = 0;
    this.obstaculos = [];
  }
}
