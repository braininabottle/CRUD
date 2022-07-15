//VARIABLES GLOBALES 
// formularioEnLaPagina = formulario que se ve por la parte del usuario.
// ListaHerramientasEnLaPagina = Lista de herramientas que se va a ver por la parte del usuario.
// arrayDeHerramientas = array que va almacenando las herramientas que se van creando.

const formularioEnLaPagina = document.getElementById("formulario");
const listaHerramientasEnLaPagina = document.getElementById("listaHerramientas");
let arrayDeHerramientas = []; 
let modoEdicion = false
//funciones

//Función CREATE

const crearHerramienta = herramienta => {
    
    let item = 
        {
            herramienta: herramienta, 
            estado: false
        }
   
        let elementoYaExiste = arrayDeHerramientas.find((element) => element.herramienta === herramienta)
        
        if(elementoYaExiste !== undefined){
           window.alert('Esta herramienta ya se encuentra en esta lista')
        }else{
           arrayDeHerramientas.push(item);
        }
        
    return item;

}


// función de Conversar datos

const preservarDatos = () => {

    localStorage.setItem('compras', JSON.stringify(arrayDeHerramientas));

    leerDatos();
}


// Función READ (leer los datos guardados en la base de datos)

const leerDatos = () => {

    listaHerramientasEnLaPagina.innerHTML = '';
    
    arrayDeHerramientas=JSON.parse(localStorage.getItem('compras'));
    
    if(arrayDeHerramientas === null){
        arrayDeHerramientas = [];
    }else{
        arrayDeHerramientas.map(herramienta => {
            listaHerramientasEnLaPagina.innerHTML += `<div class="alert alert-secondary" role="alert">
            <i class="icono-texto-alerta material-icons">home_repair_service</i>
            <b>${herramienta.herramienta}</b>
            <span class="contenedor-icono-editar-borrar"><i class="material-icons">drive_file_rename_outline</i>
            <i class="material-icons">delete_sweep</i></span></div>`
        });
       

    }

}

//función eliminar herramienta

const eliminarHerramienta = herramienta => {
    
    let indexArray;

   arrayDeHerramientas.map((element, index) => {
        
    if(element.herramienta === herramienta){
         
        indexArray = index;

    }

    
   
});

arrayDeHerramientas.splice(indexArray, 1);

preservarDatos();

} 

//editar herramienta 

const editarHerramienta = herramienta => {
   
    modoEdicion = true;
    document.getElementById("boton-multi-funcion").innerText = 'Confirmar'
    let herramientaEscritaUsuario = document.getElementById("herramienta");
    herramientaEscritaUsuario.value = herramienta
    herramientaEscritaUsuario.setAttribute('data-antiguo',herramienta)

}

//función guardar cambios

const guardarCambios = () => {
    let herramientaEscritaUsuario = document.getElementById("herramienta");
    let indexArray = arrayDeHerramientas.findIndex((element) => element.herramienta === herramientaEscritaUsuario.getAttribute('data-antiguo') );
    arrayDeHerramientas[indexArray].herramienta = herramientaEscritaUsuario.value
    preservarDatos();
    modoEdicion = false
    document.getElementById("boton-multi-funcion").innerText = 'Agregar'
}

//EventListener 
//evento= se crea para prevenir que la página se refresque 
//herramientaEscritaUsuario = Cuando el usuario ingresa una herramienta en el formulario.

formularioEnLaPagina.addEventListener('submit', (evento) => {
    
    evento.preventDefault();
    let herramientaEscritaUsuario = document.getElementById("herramienta").value; 
    if(modoEdicion === true ){
        guardarCambios();
    }else {
        crearHerramienta(herramientaEscritaUsuario);
    }
    
    preservarDatos();

    formularioEnLaPagina.reset();

})

document.addEventListener('DOMContentLoaded', leerDatos);

listaHerramientasEnLaPagina.addEventListener('click', (event) => {
    
    event.preventDefault();
     
    if(event.target.innerHTML === 'drive_file_rename_outline' || event.target.innerHTML === 'delete_sweep'){ 
        
        const rutadeEliminacion = event.path[2].childNodes[3].innerHTML;

        if(event.target.innerHTML === 'delete_sweep'){
           
            eliminarHerramienta(rutadeEliminacion);

        }
        if(event.target.innerHTML === 'drive_file_rename_outline'){

            editarHerramienta(rutadeEliminacion);
        }
    
    }
      
    
});



/*arrayDeHerramientas.map((element) => {
        
    if(element.herramienta === herramienta){
 
        arrayDeHerramientas = [];

    }else{

        return false
    } */
