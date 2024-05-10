const fraseAlMostrarPais = document.getElementById("frase");
const imagen = document.getElementById("img-flag");
const options = document.querySelectorAll(".option");
const btnReiniciar = document.getElementById("btnReiniciar");
const resultInfo = document.querySelector(".result-info");
const levels = document.querySelectorAll(".level");
const boxResult = document.querySelector(".result");

import data from "../data.json" with { type: "json" };

const frasesRandoms = [
  "¿Qué bandera es esta?",
  "¿Y esta bandera ?",
  "A ver, decime el nombre de esta banderita",
  "A que esta bandera no la sabes",
  "Seria muy malo que no conozcas esta",
  "A ver A ver, me dicen por ahi que no sabes el nombre de esta banderita",
];

const paises = data

function numeroRandom(rango) {
  return Math.trunc(Math.random() * rango);
}

let nivelInicial = 1;
let respuestaRandom = "";
let indicesAcertados = [];
let indiceCorrecto = 0;
let indicesMostrados = [];

function obtenerIndicesDePaisesAleatorios() {
  const indicesAleatorios = [];
  const generarIndices = () => {
    const indiceRandom = numeroRandom(paises.length);
    if (indicesAleatorios.length === 4) {
      if (indicesAleatorios.every((n) => indicesMostrados.includes(n))) {
        const indicesNoMostrados = paises.filter(
          (n, i) => !indicesMostrados.includes(i)
        );
        indicesAleatorios[0] = paises.indexOf(indicesNoMostrados[0]);
        return;
      }
      return;
    }

    if (!indicesAleatorios.includes(indiceRandom)) {
      indicesAleatorios.push(indiceRandom);
    }
    return generarIndices();
  };
  generarIndices();
  return indicesAleatorios;
}

function respuestaAleatoria(paisesAleatorios) {
  const indicesNoMostrados = paisesAleatorios.filter(
    (p) => !indicesMostrados.includes(p)
  );

  return indicesNoMostrados[numeroRandom(indicesNoMostrados.length)];
}

function nuevoNivel(e) {
  const valorSeleccionado = e.target.textContent;
  if (valorSeleccionado === respuestaRandom) {
    if (!indicesAcertados.includes(indiceCorrecto)) {
      indicesAcertados.push(indiceCorrecto);
      levels[nivelInicial - 1].classList.add("Correcto");
    }
  } else {
    levels[nivelInicial - 1].classList.add("Incorrecto");
  }

  if (nivelInicial === 10) {
    mostrarResultados();
    return;
  }
  nivelInicial++;
  iniciarNivel();
}

function iniciarNivel() {
  const paisesAleatorios = obtenerIndicesDePaisesAleatorios();
  const respuestaCorrecta = respuestaAleatoria(paisesAleatorios);
  const fraseRandom = frasesRandoms[numeroRandom(frasesRandoms.length)];

  indicesMostrados.push(respuestaCorrecta);
  respuestaRandom = paises[respuestaCorrecta].name;
  indiceCorrecto = respuestaCorrecta;

  frase.innerHTML = fraseRandom;
  imagen.src = paises[respuestaCorrecta].flag;

  paisesAleatorios.forEach((indice, i) => {
    options[i].innerHTML = paises[indice].name;
    options[i].removeEventListener("click", nuevoNivel); // Remove previous event listeners
    options[i].addEventListener("click", nuevoNivel);
  });
  levels[nivelInicial - 1].classList.toggle("active-phase");
  levels[nivelInicial - 2]?.classList.toggle("checked");
}

function mostrarResultados() {
  const niveles = Array.from(levels)
    .map((level, i) => {
      const clase = level.classList.contains("Correcto")
        ? "Correcto"
        : "Incorrecto";
      return `<div class="level ${clase}">${i + 1}</div>`;
    })
    .join("");

  const resultadoNiveles = `<div class="levels">${niveles}</div>`;

  resultInfo.innerHTML = `
    ${resultadoNiveles}
    <p>Banderas acertadas: ${indicesAcertados.length} / 10</p>
    <p>Nombres de las banderas acertadas: ${
      indicesAcertados.map((e) => paises[e].name).join(", ") || 0
    } </p>
    <p>Banderas erradas: ${
      indicesMostrados
        .filter((e) => !indicesAcertados.includes(e))
        .map((e) => paises[e].name)
        .join(", ") || 0
    } </p>
  `;
  boxResult.style.display = "block";
}

function reiniciarJuego() {
  nivelInicial = 1;
  respuestaRandom = "";
  indicesAcertados = [];
  indiceCorrecto = 0;
  indicesMostrados = [];
  resultInfo.innerHTML = "";
  levels.forEach((e) =>
    e.classList.remove("checked", "active-phase", "Correcto", "Incorrecto")
  );
  boxResult.style.display = "none";
  iniciarNivel();
}

btnReiniciar.addEventListener("click", reiniciarJuego);
iniciarNivel();
