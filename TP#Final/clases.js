
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
    this.ocultar(); // Oculta el botón inicialmente
  }

  mostrar() {
    this.boton.show();
  }

  ocultar() {
    this.boton.hide();
  }
}
