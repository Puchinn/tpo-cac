/* DOMContentLoaded */
document.addEventListener("DOMContentLoaded",()=>{
  /* Obtener el body de la tabla donde se mostraran los feedbacks */
  const bodyTablaFeedbacks = document.querySelector("#body-tabla-feedbacks")
  /* Obtener el formulario para crear un nuevo feedback */
  const formCrearFeedback = document.querySelector("#form-crear-feedback")

  // funcion para obtener los datos de nuestra API utilizando AXIOS

const fetchFeedbacks = async ()=>{
try {
    const respuesta = await axios.get (`http://localhost:3030/feedbacks/`)
/*     console.log(respuesta.data); */
const feedbacks = respuesta.data
//limpiar la tabla antes de agregar los nuevos datos
bodyTablaFeedbacks.innerHTML = "";
/* Iterar sobre los datos y agregar cada feedback a la tabla */
feedbacks.forEach(feedback=>{
    // creo una nueva fila
    const fila = document.createElement("tr")
    //Crear celdas para nombre, apellido, correo y mensaje
    const celdaID = document.createElement("td")
    const celdaNombre = document.createElement("td")
    const celdaApellido=document.createElement("td")
    const celdaCorreo= document.createElement("td")
    const celdaMensaje= document.createElement("td")
    const celdaAcciones= document.createElement("td")

    // asignar el contenido de las celdas
    celdaID.textContent = feedback.id
    celdaNombre.textContent = feedback.nombre
    celdaApellido.textContent = feedback.apellido
    celdaCorreo.textContent = feedback.correo
    celdaMensaje.textContent = feedback.mensaje

    console.log(bodyTablaFeedbacks)

    // crear el boton de eliminar
    const botonEliminar = document.createElement("button")
    botonEliminar.textContent = "Eliminar"
    botonEliminar.addEventListener("click",()=>{borrarFeedback(feedback.id)})

     // crear el boton para editar un feedback
     const botonEditar = document.createElement("button")
     botonEditar.textContent = "Editar"
     botonEditar.addEventListener("click", ()=>{
        // Redirigir a la pagina de edicion  con el ID del post en la url
        window.location.href = `edit.html?id=${feedback.id}`
     })
 // agregar los botones a la celda de acciones
 celdaAcciones.appendChild(botonEditar)    
 celdaAcciones.appendChild(botonEliminar)
     

// agregamos las celdas a la fila
fila.appendChild(celdaID)
fila.appendChild(celdaNombre)
fila.appendChild(celdaApellido)
fila.appendChild(celdaCorreo)
fila.appendChild(celdaMensaje)

// Agregar la fila al cuerpo de la tabla
bodyTablaFeedbacks.appendChild(fila)
})
} catch (error) {
    console.error (`Error al obtener los feedback : ${error}`)
}
}
// funcion para eliminar un feedback
const borrarFeedback = async (id)=>{
    try {
        await axios.delete (`http://localhost:3030/feedbacks/${id}`)
        // recargare la lista de feedbacks despues de elminar
        fetchFeedbacks()
    } catch (error) {
        console.error (`Error al eliminar el feedback : ${error}`)
    }
}

// Funcion para crear un nuevo feedback
if (formCrearFeedback) {
formCrearFeedback.addEventListener("submit", async function (evento){
    evento.preventDefault();
    const nuevoFeedback = {
        nombre:document.querySelector("#nuevo-nombre").value,
        apellido:document.querySelector("#nuevo-apellido").value, 
        correo:document.querySelector("#nuevo-correo").value, 
        mensaje:document.querySelector("#nuevo-mensaje").value 
    };
    try {
        await axios.post(`http://localhost:3030/feedbacks/`,nuevoFeedback)
        //limpiamos el formulario
        formCrearFeedback.reset()
        // recargue los feedbacks actualizado
        fetchFeedbacks()
        
    } catch (error) {
        console.error (`Error al postear: ${error}`)
    }
});
}

//llamar a la funcion para obtener y mostrar los feedbacks cuando Carga la pagina
fetchFeedbacks()
})