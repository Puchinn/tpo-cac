/* DOMContentLoaded */
document.addEventListener("DOMContentLoaded",()=>{
  /* Obtener el body de la tabla donde se mostraran los paises */
  const bodyTablaPaises = document.querySelector("#body-tabla-paises")
  /* Obtener el formulario para crear un nuevo paise */
  const formCrearPais = document.querySelector("#form-crear-paises")

  // funcion para obtener los datos de nuestra API utilizando AXIOS

const fetchPaises = async ()=>{
try {
    const respuesta = await axios.get (`http://localhost:3030/paises/`)
/*     console.log(respuesta.data); */
const paises = respuesta.data
//limpiar la tabla antes de agregar los nuevos datos
bodyTablaPaises.innerHTML = "";
/* Iterar sobre los datos y agregar cada paise a la tabla */
paises.forEach(pais=>{
    // creo una nueva fila
    const fila = document.createElement("tr")
    //Crear celdas para nombre, apellido, correo y mensaje
    const celdaID = document.createElement("td")    
    const celdaNombre = document.createElement("td")
    const celdaCapital=document.createElement("td")
    const celdaPoblacion= document.createElement("td")
    const celdaAcciones= document.createElement("td")

    // asignar el contenido de las celdas
    celdaID.textContent = pais.id
    celdaNombre.textContent = pais.nombre
    celdaCapital.textContent = pais.capital
    celdaPoblacion.textContent = pais.poblacion
    
    console.log(bodyTablaPaises)

    // crear el boton de eliminar
    const botonEliminar = document.createElement("button")
    botonEliminar.textContent = "Eliminar"
    botonEliminar.addEventListener("click",()=>{borrarPais(pais.id)})

     // crear el boton para editar un pais
     const botonEditar = document.createElement("button")
     botonEditar.textContent = "Editar"
     botonEditar.addEventListener("click", ()=>{
        // Redirigir a la pagina de edicion  con el ID del post en la url
        window.location.href = `edit.html?id=${pais.id}`
     })
 // agregar los botones a la celda de acciones
 celdaAcciones.appendChild(botonEditar)    
 celdaAcciones.appendChild(botonEliminar)
     

// agregamos las celdas a la fila
fila.appendChild(celdaID)
fila.appendChild(celdaNombre)
fila.appendChild(celdaCapital)
fila.appendChild(celdaPoblacion)

// Agregar la fila al cuerpo de la tabla
bodyTablaPaises.appendChild(fila)
})
} catch (error) {
    console.error (`Error al obtener los paises : ${error}`)
}
}
// funcion para eliminar un pais
const borrarPais = async (id)=>{
    try {
        await axios.delete (`http://localhost:3030/paises/${id}`)
        // recargare la lista de paises despues de elminar
        fetchPaises()
    } catch (error) {
        console.error (`Error al eliminar el pais : ${error}`)
    }
}

// Funcion para crear un nuevo paise
if (formCrearPais) {
formCrearPais.addEventListener("submit", async function (evento){
    evento.preventDefault();
    const nuevoPais = {
        nombre:document.querySelector("#nuevo-nombre").value,
        capital:document.querySelector("#nuevo-capital").value, 
        poblacion:document.querySelector("#nuevo-poblacion").value,          
    };
    try {
        await axios.post(`http://localhost:3030/paises/`,nuevoPais)
        //limpiamos el formulario
        formCrearPais.reset()
        // recargue los paises actualizado
        fetchPaises()
        
    } catch (error) {
        console.error (`Error al postear: ${error}`)
    }
});
}

//llamar a la funcion para obtener y mostrar los paises cuando Carga la pagina
fetchPaises()
})