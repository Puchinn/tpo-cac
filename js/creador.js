/* DOMContentLoaded */
document.addEventListener("DOMContentLoaded",()=>{
  /* Obtener el body de la tabla donde se mostraran los creadores */
  const bodyTablaCreadores = document.querySelector("#body-tabla-creadores")
  /* Obtener el formulario para crear un nuevo creadores */
  const formCrearCreador = document.querySelector("#form-crear-creadores")

  // funcion para obtener los datos de nuestra API utilizando AXIOS

const fetchCreadores = async ()=>{
try {
    const respuesta = await axios.get (`http://localhost:3030/creadores/`)
/*     console.log(respuesta.data); */
const creadores = respuesta.data
//limpiar la tabla antes de agregar los nuevos datos
bodyTablaCreadores.innerHTML = "";
/* Iterar sobre los datos y agregar cada creadore a la tabla */
creadores.forEach(creador=>{
    // creo una nueva fila
    const fila = document.createElement("tr")
    //Crear celdas para nombre, apellido, correo y mensaje
    const celdaID = document.createElement("td")
    const celdaNombreCompleto = document.createElement("td")
    const celdaAcerca=document.createElement("td")
    const celdaWebLink= document.createElement("td")    
    const celdaAcciones= document.createElement("td")

    // asignar el contenido de las celdas
    celdaID.textContent = creador.id    
    celdaNombreCompleto.textContent = creador.nombreCompleto
    celdaAcerca.textContent = creador.acerca
    celdaWebLink.textContent = creador.webLink

    console.log(bodyTablaCreadores)

    // crear el boton de eliminar
    const botonEliminar = document.createElement("button")
    botonEliminar.textContent = "Eliminar"
    botonEliminar.addEventListener("click",()=>{borrarCreador(creador.id)})

     // crear el boton para editar un creador
     const botonEditar = document.createElement("button")
     botonEditar.textContent = "Editar"
     botonEditar.addEventListener("click", ()=>{
        // Redirigir a la pagina de edicion  con el ID del post en la url
        window.location.href = `edit.html?id=${creador.id}`
     })
 // agregar los botones a la celda de acciones
 celdaAcciones.appendChild(botonEditar)    
 celdaAcciones.appendChild(botonEliminar)
     

// agregamos las celdas a la fila
fila.appendChild(celdaID)
fila.appendChild(celdaNombreCompleto)
fila.appendChild(celdaAcerca)
fila.appendChild(celdaWebLink)

// Agregar la fila al cuerpo de la tabla
bodyTablaCreadores.appendChild(fila)
})
} catch (error) {
    console.error (`Error al obtener los creadores : ${error}`)
}
}
// funcion para eliminar un creador
const borrarCreador = async (id)=>{
    try {
        await axios.delete (`http://localhost:3030/creadores/${id}`)
        // recargare la lista de creadores despues de elminar
        fetchCreadores()
    } catch (error) {
        console.error (`Error al eliminar el creador : ${error}`)
    }
}

// Funcion para crear un nuevo creador
if (formCrearCreador) {
    formCrearCreador.addEventListener("submit", async function (evento){
    evento.preventDefault();
    const nuevoCreador = {
        nombreCompleto:document.querySelector("#nuevo-nombreCompleto").value,
        acerca:document.querySelector("#nuevo-acerca").value, 
        webLink:document.querySelector("#nuevo-webLink").value,         
    };
    try {
        await axios.post(`http://localhost:3030/creadores/`,nuevoCreador)
        //limpiamos el formulario
        formCrearCreador.reset()
        // recargue los creadores actualizado
        fetchCreadores()
        
    } catch (error) {
        console.error (`Error al postear: ${error}`)
    }
});
}

//llamar a la funcion para obtener y mostrar los creadores cuando Carga la pagina
fetchCreadores()
})