//VARIABLES GLOBALES 
// formularioEnLaPagina = formulario que se ve por la parte del usuario.
// ListaHerramientasEnLaPagina = Lista de herramientas que se va a ver por la parte del usuario.
// arrayDeHerramientas = array que va almacenando las herramientas que se van creando.

const formularioEnLaPagina = document.getElementById("formulario");
const listaHerramientasEnLaPagina = document.getElementById("listaHerramientas");
let arrayDeHerramientas = []; 

//funciones

//Función CREATE

const crearHerramienta = (herramienta) => {
    
    let item = 
        {
            herramienta: herramienta, 
            estado: false
        }

    arrayDeHerramientas.push(item);

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
        arrayDeHerramientas.map((herramienta) => {
            listaHerramientasEnLaPagina.innerHTML += `<div class="alert alert-secondary" role="alert">
            <i class="icono-texto-alerta material-icons">home_repair_service</i>
            <b>${herramienta.herramienta}</b> - ${herramienta.estado === true?'disponible':'agotado'}
            <span class="contenedor-icono-editar-borrar"><i class="material-icons">drive_file_rename_outline</i>
            <i class="material-icons">delete_sweep</i></span></div>`
        });

    }

}

//función eliminar herramienta

const eliminarHerramienta = (herramienta) => {
    
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

const editarHerramienta = (herramienta) =>  {
    
}

//EventListener 
//evento= se crea para prevenir que la página se refresque 
//herramientaEscritaUsuario = Cuando el usuario ingresa una herramienta en el formulario.

formularioEnLaPagina.addEventListener('submit', (evento) => {
    
    evento.preventDefault();
    let herramientaEscritaUsuario = document.getElementById("herramienta").value; 

    crearHerramienta(herramientaEscritaUsuario);
    preservarDatos();

    formularioEnLaPagina.reset();

})

document.addEventListener('DOMContentLoaded', leerDatos);

listaHerramientasEnLaPagina.addEventListener('click', (event) => {
    
    event.preventDefault();
     
    if(event.target.innerHTML === 'drive_file_rename_outline' || event.target.innerHTML === 'delete_sweep'){ 
        
        const rutadeEliminación = event.path[2].childNodes[3].innerHTML;

        if(event.target.innerHTML === 'delete_sweep'){
           
            eliminarHerramienta(rutadeEliminación);

        }
        if(event.target.innerHTML === 'drive_file_rename_outline'){

        }
    
    }
      
    
});/*|| event.target.innerHTML === 'delete_sweep') {
    
        let rutadeEliminacion = event.path[2].childNodes[3].innerHTML;
    
        if(event.target.innerHTML === 'delete_sweep'){
       
            eliminar(rutadeEliminacion);
     }
    
        if(event.target.innerHTML === 'drive_file_rename_outline'){

     }
    }

});   */