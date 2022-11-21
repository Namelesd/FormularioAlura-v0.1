export function valida(input){
 const tipodeInput = input.dataset.tipo
    if(validadores[tipodeInput]){
        validadores[tipodeInput](input)
    }


    if(input.validity.valid){
        input.parentElement.classList.remove("input-container--invalid");
        input.parentElement.querySelector(".input-message-error").innerHTML = "";

    }else{
        input.parentElement.classList.add("input-container--invalid"); 
        input.parentElement.querySelector(".input-message-error").innerHTML = mostrarMensajedeError(tipodeInput, input);

}

}
const tipodeErrores = [

    "valueMissing",
    "typeMismatch",
    "patternMismatch",
    "customError",
];



const MensajesdeError = {
    nombre:{
        valueMissing:"Este campo nombre no puede estar vacio",        
    },

    email:{
        valueMissing:"Este campo correo no puede estar vacio",
        typeMismatch: "El correo no es valido",
    },

    password:{
        valueMissing:"Este campo contrasena no puede estar vacio",
        patternMismatch:"Entre 6 y 11 caracteres, debe contener una letra Mayuzcula, minuscula, numero y un caracter especial",
    },

    nacimiento:{
        valueMissing:"La fecha no puede estar vacia",
        customError:"Debes de tener mas de 18",
    },
    numero:{
        patternMismatch:"El formato requerido es xx-xx-xxxxxx 10 numeros"

    },
    direccion:{
        patternMismatch:"Debes de escribir una direccion con minimo 10 letras y maximo 40",
        valueMissing:"La direccion no puede estar vacia",
    },
    ciudad:{
        patternMismatch:"Debes de escribir una ciudad con minimo 3 letras y maximo 25",
        valueMissing:"La ciudad no puede estar vacia",

    },
    estado:{
        patternMismatch:"Debes de escribir un estado con minimo 5 letras y maximo 25",
        valueMissing:"El estado no puede estar vacia",
    }



};


const validadores = {
    nacimiento: input=> validarNacimiento(input),



};

function mostrarMensajedeError(tipodeInput,input){
    let mensaje="";

    tipodeErrores.forEach((error) =>{

        if(input.validity[error]){
            console.log(input.validity[error]);
            console.log(tipodeInput, error);
            console.log(MensajesdeError[tipodeInput][error]);
            mensaje= MensajesdeError[tipodeInput][error];

        }

    })

    return mensaje;
}

function validarNacimiento(input){
     const fechaUsuario = new Date(input.value);
     console.log(fechaUsuario);
    mayordeEdad(fechaUsuario);

    let mensaje="";

    if(!mayordeEdad(fechaUsuario)){

        mensaje="Debes de tener mas de 18";

    } 
    
    input.setCustomValidity(mensaje);

}




function mayordeEdad(fecha){
    const fechaActual = new Date();
    const diferenciaFechas = new Date(fecha.getUTCFullYear()+18, fecha.getUTCMonth(), fecha.getUTCDate())
    return diferenciaFechas<=fechaActual;

}