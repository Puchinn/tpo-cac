/* DOMContentLoaded */
document.addEventListener("DOMContentLoaded",()=>{
  /* Obtener el body de la tabla donde se mostraran los Usuarios */
  const bodyTablaUsuarios = document.querySelector("#body-tabla-usuarios")
  /* Obtener el formulario para crear un nuevo usuario */
  const formCrearUsuario = document.querySelector("#form-crear-usuario")

  // funcion para obtener los datos de nuestra API utilizando AXIOS

const fetchUsuarios = async ()=>{
try {
    const respuesta = await axios.get (`http://localhost:3030/usuarios/`)
/*     console.log(respuesta.data); */
const usuarios = respuesta.data
//limpiar la tabla antes de agregar los nuevos datos
bodyTablaUsuarios.innerHTML = "";
/* Iterar sobre los datos y agregar cada usuario a la tabla */
usuarios.forEach(usuario=>{
    // creo una nueva fila
    const fila = document.createElement("tr")
    //Crear celdas para nombre, apellido, correo y mensaje
    const celdaID = document.createElement("td")
    const celdaNombre = document.createElement("td")
    const celdaClave=document.createElement("td")
    const celdaAcciones= document.createElement("td")

    // asignar el contenido de las celdas
    celdaID.textContent = usuario.id
    celdaNombre.textContent = usuario.nombreCompleto
    celdaClave.textContent = usuario.clave
    
    console.log(bodyTablaUsuarios)

    // crear el boton de eliminar
    const botonEliminar = document.createElement("button")
    botonEliminar.textContent = "Eliminar"
    botonEliminar.addEventListener("click",()=>{borrarUsuario(usuario.id)})

     // crear el boton para editar un usuario
     const botonEditar = document.createElement("button")
     botonEditar.textContent = "Editar"
     botonEditar.addEventListener("click", ()=>{
        // Redirigir a la pagina de edicion  con el ID del post en la url
        window.location.href = `edit.html?id=${usuario.id}`
     })
 // agregar los botones a la celda de acciones
 celdaAcciones.appendChild(botonEditar)    
 celdaAcciones.appendChild(botonEliminar)
     

// agregamos las celdas a la fila
fila.appendChild(celdaID)
fila.appendChild(celdaNombre)
fila.appendChild(celdaClave)

// Agregar la fila al cuerpo de la tabla
bodyTablaUsuarios.appendChild(fila)
})
} catch (error) {
    console.error (`Error al obtener los usuario : ${error}`)
}
}
// funcion para eliminar un usuario
const borrarUsuario = async (id)=>{
    try {
        await axios.delete (`http://localhost:3030/usuarios/${id}`)
        // recargare la lista de usuarios despues de elminar
        fetchUsuarios()
    } catch (error) {
        console.error (`Error al eliminar el usuario : ${error}`)
    }
}

// Funcion para crear un nuevo usuario
if (formCrearUsuario) {
formCrearUsuario.addEventListener("submit", async function (evento){
    evento.preventDefault();
    const nuevoUsuario = {
        nombre:document.querySelector("#nuevo-nombre").value,
        clave:document.querySelector("#nuevo-clave").value         
    };
    try {
        await axios.post(`http://localhost:3030/usuarios/`,nuevoUsuario)
        //limpiamos el formulario
        formCrearUsuario.reset()
        // recargue los usuarios actualizado
        fetchUsuarios()
        
    } catch (error) {
        console.error (`Error al postear: ${error}`)
    }
});
}

//llamar a la funcion para obtener y mostrar los usuarios cuando Carga la pagina
fetchUsuarios()
})