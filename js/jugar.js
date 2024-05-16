const fraseAlMostrarPais = document.getElementById("frase");
const imagen = document.getElementById("img-flag");
const options = document.querySelectorAll(".option");
const btnReiniciar = document.getElementById("btnReiniciar");
const resultInfo = document.querySelector(".result-info");
const levels = document.querySelectorAll(".level");
const boxResult = document.querySelector(".result");

const mock = (object = {}) => {
  return {
    name: object.name.common,
    capital: object.capital ? object.capital[0] : "",
    flag: object.flags.svg,
  };
};

const frasesRandoms = [
  "Que bandera es esta mi rey?",
  "Y esta bandera mi loco?",
  "a ver decime el nombre de esta banderita:",
  "Diez pe que no le acertas el nombre:",
  "malo si le erras a esta:",
  "opa opa, me dicen por ahi que no sabes el nombre de esta banderita: ",
];

// const data = await fetch("https://restcountries.com/v3.1/all").then((d) =>
//   d.json()
// );
// const c = data.map((d) => mock(d));

const paises = [
  { name: "Moldova", capital: "Chișinău", flag: "https://flagcdn.com/md.svg" },
  {
    name: "United States",
    capital: "Washington, D.C.",
    flag: "https://flagcdn.com/us.svg",
  },
  { name: "Mayotte", capital: "Mamoudzou", flag: "https://flagcdn.com/yt.svg" },
  { name: "Nauru", capital: "Yaren", flag: "https://flagcdn.com/nr.svg" },
  { name: "Mozambique", capital: "Maputo", flag: "https://flagcdn.com/mz.svg" },
  { name: "Brazil", capital: "Brasília", flag: "https://flagcdn.com/br.svg" },
  { name: "Cape Verde", capital: "Praia", flag: "https://flagcdn.com/cv.svg" },
  {
    name: "Equatorial Guinea",
    capital: "Malabo",
    flag: "https://flagcdn.com/gq.svg",
  },
  { name: "Albania", capital: "Tirana", flag: "https://flagcdn.com/al.svg" },
  {
    name: "United States Virgin Islands",
    capital: "Charlotte Amalie",
    flag: "https://flagcdn.com/vi.svg",
  },
];

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
    }
  }

  if (nivelInicial === 10) {
    resultInfo.innerHTML = `
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
    options[i].addEventListener("click", nuevoNivel);
  });
  console.log(nivelInicial);
  levels[nivelInicial - 1].classList.toggle("active-phase");
  levels[nivelInicial - 2]?.classList.toggle("checked");
}

function reiniciarJuego() {
  nivelInicial = 1;
  respuestaRandom = "";
  indicesAcertados = [];
  indiceCorrecto = 0;
  indicesMostrados = [];
  resultInfo.innerHTML = "";
  levels.forEach((e) => e.classList.remove("checked", "active-phase"));
  boxResult.style.display = "none";
  iniciarNivel();
}

btnReiniciar.addEventListener("click", reiniciarJuego);
iniciarNivel();
