//VARIABLES GLOBALES 
// formularioEnLaPagina = formulario que se ve por la parte del usuario.
// ListaHerramientasEnLaPagina = Lista de herramientas que se va a ver por la parte del usuario.
// arrayDeHerramientas = array que va almacenando las herramientas que se van creando.
const formularioEnLaPagina = document.getElementById("formulario");
const listaHerramientasEnLaPagina = document.getElementById("listaHerramientas");
const inputVacio = document.getElementById("herramienta");
let arrayDeHerramientas = []; 
let modoEdicion = false //modo edición siempre va a comnenzar en falso porque debe obedecer a una condición de un evento.
//funciones
//Función CREATE, crea la herramienta y luego le da un push al array de herramientas, que inicialmente esta vacío.
const crearHerramienta = herramienta => {
    if(inputVacio.value === '' ){
        window.alert('Debe ingresar el nombre de la herramienta que desea comprar')
    }else{
        let item = 
        {
            herramienta: herramienta, 
        }
        let elementoYaExiste = arrayDeHerramientas.find((element) => element.herramienta === herramienta)
        if(elementoYaExiste !== undefined){
           window.alert('Esta herramienta ya se encuentra en esta lista')
        }else{
           arrayDeHerramientas.push(item);
        }
}
}
// función que  almacena los  datos en el local Storage para que no se pierda la información en caso de actualizar la página. 
//Solo desaparece la info cuando usuario elimiina esta misma.
const almacenarDatosLS = () => {
    localStorage.setItem('compras', JSON.stringify(arrayDeHerramientas)); //JSON.STRINGIFY convierte el array a un string ya que setItem() solo recibe valores de string.
    TrasladarDatosAlmacenadosEnLSaSitioWeb();
}
// Función READ, crea el elemento de manera dinamica.
const TrasladarDatosAlmacenadosEnLSaSitioWeb = () => {
    listaHerramientasEnLaPagina.innerHTML = '';
    arrayDeHerramientas=JSON.parse(localStorage.getItem('compras'));
    if(arrayDeHerramientas === null){
        arrayDeHerramientas = [];
    }else{
        arrayDeHerramientas.map(herramienta => {
            listaHerramientasEnLaPagina.innerHTML += `<div class="alert alert-secondary" role="alert">
            <i class="icono-texto-alerta material-icons">home_repair_service</i>
            <b class="texto-herramienta">${herramienta.herramienta}</b>
            <span class="contenedor-icono-editar-borrar"><i class="material-icons" id=${herramienta.herramienta}>drive_file_rename_outline</i>
            <i class="material-icons" id=${herramienta.herramienta}>delete_sweep</i></span></div>`
        });
    }
}
//función eliminar herramienta
const eliminarHerramienta = herramienta => {
let indiceArray = arrayDeHerramientas.findIndex((element) => element.herramienta === herramienta)
arrayDeHerramientas.splice(indiceArray, 1);
almacenarDatosLS();
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
    almacenarDatosLS();
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
    almacenarDatosLS();
    formularioEnLaPagina.reset();
})
document.addEventListener('DOMContentLoaded', TrasladarDatosAlmacenadosEnLSaSitioWeb);
listaHerramientasEnLaPagina.addEventListener('click', (event) => {
    event.preventDefault();
    if(event.target.innerHTML === 'drive_file_rename_outline' || event.target.innerHTML === 'delete_sweep'){ 
        let rutaIconos = event.target.id;
        if(event.target.innerHTML === 'delete_sweep'){
            eliminarHerramienta(rutaIconos);
        }
        if(event.target.innerHTML === 'drive_file_rename_outline'){
            editarHerramienta(rutaIconos);
        }
    }
});

