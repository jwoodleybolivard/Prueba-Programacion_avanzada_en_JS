// Importaciones de módulos
import { Aguila, Serpiente, Oso, Lobo, Leon } from "./modulos.js";

// Asociación de nombres de clase
const nombreClaseAsociacion = { leon: Leon, lobo: Lobo, oso: Oso, serpiente: Serpiente, aguila: Aguila };
let nombreClase = null;

(async function cargarData() {
  try {
    // Carga de datos desde animales.json
    const responseObject = await fetch("./animales.json");
    const { animales } = await responseObject.json();

    // Construcción del objeto con clases asociadas
    nombreClase = animales.reduce((obj, elem) => {
      obj[elem.name] = { clase: nombreClaseAsociacion[elem.name], img: `./assets/imgs/${elem.imagen}`, sound: `./assets/sounds/${elem.sonido}` };
      return obj;
    }, {});
  } catch (error) {
    console.log(error);
  }
})();

$(function () {
  // Selección de elementos del DOM
  const formTag = $("#form");
  const selectAnimal = $("#animal");
  const selectEdad = $("#edad");
  const textAreaComentarios = $("#comentarios");

  // Manejo del evento submit del formulario
  formTag.submit(function (eventObj) {
    eventObj.preventDefault();
    try {
      // Creación del objeto Animal
      const { clase, img, sound } = nombreClase[selectAnimal.val()];
      const objeto = new clase(selectAnimal.val(), selectEdad.val(), img, textAreaComentarios.val(), sound);

      // Operaciones con el objeto
      resetearFormulario(selectAnimal, selectEdad, textAreaComentarios);
      const elementoAgregado = mostrarAnimalAgregado(objeto);
      controlEliminarAnimal(elementoAgregado);
      reproducirSonido(elementoAgregado);
      cargarModal(elementoAgregado, objeto);
    } catch (error) {
      console.log(error);
    }
  });

  // Manejo del cambio en el select de animal
  selectAnimal.change(function () {
    try {
      const { img } = nombreClase[selectAnimal.val()];
      cargarImagen(img);
    } catch (error) {
      console.log(error);
    }
  });
});

// Función asíncrona para cargar una imagen
const cargarImagen = async function (srcImage) {
  try {
    const img = $("#preview");
    img.attr("src", srcImage);
    await img.on("load");
  } catch (error) {
    console.log("Ha ocurrido un error en la carga de la imagen");
  }
};

// Función para mostrar un animal agregado
function mostrarAnimalAgregado(objetoAnimal) {
  const imagenAnimal = objetoAnimal.img;
  const contenedorAnimales = $(".contenedor_animales");
  const contenedorAnimal = $("<div>").addClass("animal_insertado").html(`
        <div class="animal_insertado_close" title='Haz click aquí para eliminar el elemento'>
            <i class="fa-solid fa-circle-xmark"></i>
        </div>
        <img src=${imagenAnimal} alt=${objetoAnimal.nombre} title='Haz click aquí para mostrar un modal'/>
        <button class="boton_sonido" type="button" title="Haz click aquí para reproducir el sonido" data-sonido=${objetoAnimal.sonido}>
            <i class="fa-solid fa-volume-high"></i>
        </button>
    `);
  contenedorAnimales.append(contenedorAnimal);
  return contenedorAnimal;
}

// Función para reproducir el sonido de un animal
const reproducirSonido = (elementoAgregado) => {
  const botonSonido = elementoAgregado.find(".boton_sonido");

  botonSonido.on("click", function () {
    const audioTag = $("#player");
    audioTag.html(`<source src=${$(this).attr("data-sonido")} type="audio/mpeg">  
      Tu navegador no soporta la etiqueta de audio.
      `);
    audioTag[0].load();
    audioTag.on("loadedmetadata", () => {
      audioTag[0].play();
    });
  });
};

// Función para resetear el formulario
function resetearFormulario(selectAnimal, selectEdad, textAreaComentarios) {
  selectAnimal.val("");
  selectEdad.val("");
  textAreaComentarios.val("");
  const img = $("#preview");
  img.attr("src", "./assets/imgs/lion.svg");
}

// Función para controlar la eliminación de un animal
const controlEliminarAnimal = (elementoAgregado) => {
  const botonClose = elementoAgregado.find(".animal_insertado_close");
  botonClose.on("click", () => {
    elementoAgregado.remove();
  });
};

// Función para cargar el modal
function cargarModal(elementoAgregado, objeto) {
  const imgTag = elementoAgregado.find("img");
  imgTag.on("click", function () {
    const modalTag = $("#Modal");

    modalTag.find(".modal-body").html(`
    <img src=${imgTag.attr("src")} alt='imagen animal'>
    <p>Edad: ${objeto.edad}</p>
    <h3 class='modal-body_comentarios_titulo'>Comentarios</h3>
    <p class='modal-body_comentarios_contenido'>${objeto.comentarios}</p>
    `);

    const modalObj = new bootstrap.Modal(modalTag[0]);
    modalObj.show();
  });
};
