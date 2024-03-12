// Clase base Animal que representa características generales de los animales
class Animal {
  constructor(nombre, edad, img, comentarios, sonido) {
    this._nombre = nombre; // Nombre del animal (string)
    this._edad = edad; // Edad estimada del animal (string)
    this._img = img; // Ruta de la imagen del animal (string)
    this._comentarios = comentarios; // Comentarios sobre el animal (string)
    this._sonido = sonido; // Ruta del sonido del animal (string)
  }

  // Getters para acceder a las propiedades privadas de la clase
  get nombre() {
    return this._nombre;
  }

  get edad() {
    return this._edad;
  }

  get img() {
    return this._img;
  }

  get comentarios() {
    return this._comentarios;
  }

  // Setter para actualizar los comentarios del animal
  set comentarios(comentarios) {
    this._comentarios = comentarios;
  }

  get sonido() {
    return this._sonido;
  }
}

// Clases específicas para cada tipo de animal que heredan de la clase base Animal

// Clase para representar un León
class Leon extends Animal {
  constructor(nombre, edad, img, comentarios, sonido) {
    super(nombre, edad, img, comentarios, sonido);
  }

  // Método específico para el León: Rugir
  rugir() {
    return this.sonido;
  }
}

// Clase para representar un Lobo
class Lobo extends Animal {
  constructor(nombre, edad, img, comentarios, sonido) {
    super(nombre, edad, img, comentarios, sonido);
  }

  // Método específico para el Lobo: Aullar
  aullar() {
    return this.sonido;
  }
}

// Clase para representar un Oso
class Oso extends Animal {
  constructor(nombre, edad, img, comentarios, sonido) {
    super(nombre, edad, img, comentarios, sonido);
  }

  // Método específico para el Oso: Grunir
  grunir() {
    return this.sonido;
  }
}

// Clase para representar una Serpiente
class Serpiente extends Animal {
  constructor(nombre, edad, img, comentarios, sonido) {
    super(nombre, edad, img, comentarios, sonido);
  }

  // Método específico para la Serpiente: Sisear
  sisear() {
    return this.sonido;
  }
}

// Clase para representar un Águila
class Aguila extends Animal {
  constructor(nombre, edad, img, comentarios, sonido) {
    super(nombre, edad, img, comentarios, sonido);
  }

  // Método específico para el Águila: Chillar
  chillar() {
    return this.sonido;
  }
}

// Exportación de las clases para que estén disponibles en otros archivos
export { Aguila, Serpiente, Oso, Lobo, Leon };
