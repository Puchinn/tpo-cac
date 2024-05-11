// const mock = (object = {}) => {
//   return {
//     name: object.name.common,
//     capital: object.capital ? object.capital[0] : "",
//     flag: object.flags.svg,
//   };
// };

// const data = await fetch("https://restcountries.com/v3.1/all").then((d) =>
//   d.json()
// );
// const c = data.map((d) => mock(d));

const localData = [
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
  { name: "Niue", capital: "Alofi", flag: "https://flagcdn.com/nu.svg" },
];

// Definimos un array de objetos con la información de las banderas y sus países
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
  { name: "Niue", capital: "Alofi", flag: "https://flagcdn.com/nu.svg" },
];

// Función para obtener un conjunto aleatorio de países para cada nivel
function obtenerPaisesAleatorios(numeroPaises) {
  const paisesAleatorios = [];
  while (paisesAleatorios.length < numeroPaises) {
    const indiceAleatorio = Math.floor(Math.random() * paises.length);
    if (!paisesAleatorios.includes(indiceAleatorio)) {
      paisesAleatorios.push(indiceAleatorio);
    }
  }
  return paisesAleatorios;
}

// Función para iniciar un nivel de juego
function iniciarNivel(nivel) {
  const paisesAleatorios = obtenerPaisesAleatorios(4); // Obtenemos 4 países aleatorios para mostrar
  const respuestaCorrecta = Math.floor(Math.random() * 4); // Índice de la respuesta correcta

  console.log(`Nivel ${nivel}`);
  console.log("Adivina la bandera:");

  // Mostramos las opciones al jugador
  paisesAleatorios.forEach((indice, i) => {
    console.log(`${i + 1}. ${paises[indice].name}`);
  });

  // Lógica para verificar la respuesta del jugador
  const respuestaJugador = parseInt(
    prompt("Ingresa el número de la opción correcta:")
  );

  if (respuestaJugador === respuestaCorrecta + 1) {
    console.log("¡Respuesta correcta!");
    return true; // El jugador acertó
  } else {
    console.log(
      `Respuesta incorrecta. La respuesta correcta era ${
        respuestaCorrecta + 1
      }.`
    );
    return false; // El jugador falló
  }
}

// Función principal para iniciar el juego
function iniciarJuego() {
  let puntos = 0;
  const niveles = 10;

  for (let i = 1; i <= niveles; i++) {
    if (iniciarNivel(i)) {
      puntos++;
    }
  }

  console.log(`Juego terminado. Obuviste ${puntos} puntos.`);
}

// // Iniciamos el juego
// iniciarJuego();
