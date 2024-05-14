    function validarFormulario(event) {
    
      event.preventDefault(); // Prevenir el comportamiento predeterminado del envío del formulario
      // Eliminar cualquier mensaje de alerta existente
      eliminarAlerta();

      var nombre = document.getElementById('nombre').value;
      var apellido = document.getElementById('apellido').value;
      var correo = document.getElementById('correo').value;
      var mensaje = document.getElementById('mensaje').value;

      // Validar que los campos no estén vacíos
      if (nombre.trim() === '') {
        mostrarAlerta('Por favor, ingrese su nombre.')
        return false;
      }

      if (apellido.trim() === '') {
        mostrarAlerta('Por favor, ingrese su apellido.')
        return false;
      }

      if (correo.trim() === '' ) {
        mostrarAlerta('Por favor, ingrese su correo.')
        return false;
      }

      if (mensaje.trim() === '') {
        mostrarAlerta('Por favor, ingrese algun comentario o mensaje.')
        return false;
      }

      // Validar formato de correo electrónico
      var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(correo)) {
        mostrarAlerta('Por favor, introduzca una dirección de correo electrónico válida.')
        return false;
       }
       // Si todas las validaciones pasan, enviar el formulario
        enviarFormulario();
        return false; // Evitar el envío del formulario
      }
    
      function enviarFormulario() {
             
        // Mostrar alerta de éxito
        mostrarAlertaExitosa('Datos enviados con éxito.');
      
        // Después del envío exitoso, puedes limpiar los campos del formulario si lo deseas
        document.getElementById('nombre').value = '';
        document.getElementById('apellido').value = '';
        document.getElementById('correo').value = '';
        document.getElementById('mensaje').value = '';      
    }


    function mostrarAlerta(mensaje) {
        // Crear un elemento de div para la alerta
        var alerta = document.createElement('div');
        alerta.className = 'alerta'; // Agregar la clase CSS para estilizar la alerta
        alerta.textContent = mensaje;
      
        // Insertar la alerta antes del formulario
        var formulario = document.querySelector('form');
        formulario.parentNode.insertBefore(alerta, formulario);         
      // Detener el envío del formulario
        return false;
    }

     function mostrarAlertaExitosa(mensaje) {
            // Crear un elemento de div para la alerta exitosa
            var alertaExitosa = document.createElement('div');
            alertaExitosa.className = 'alerta-exitosa'; // Agregar clase CSS para estilizar la alerta exitosa
            alertaExitosa.textContent = mensaje;
        
            // Insertar la alerta exitosa antes del formulario
            var formulario = document.querySelector('form');
            formulario.parentNode.insertBefore(alertaExitosa, formulario);            
    }

    function eliminarAlerta() {
        var alertas = document.querySelectorAll('.alerta, .alerta-exitosa');
        alertas.forEach(function(alerta) {
            alerta.remove();
        });
          }

    
