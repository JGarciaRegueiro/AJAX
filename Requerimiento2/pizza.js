var nombre = document.getElementById("nombre");
var direccion = document.getElementById("direccion");
var telefono = document.getElementById("telefono");
var email = document.getElementById("email");
var tamaño = document.getElementsByName("tamaño");
var ingrediente = document.getElementsByName("ingrediente");
var checked = false;
//La variable precio, indica el precio total del pedido, se iniciliza a cero.
var precio = 0;

/** 
 * Función validar(), comprueba que los campos nombre, direccion, telefono y email no están vacíos y una vez que los valida,
 * chequea si se ha seleccionado tamaño y a continuación si se ha seleccionado al menos un ingrediente, en caso de que la información 
 * anterior falte, saltará una alerta en el navegador con el mensaje oportuno para solucionarlo, y realizar bien el pedido.
 * */ 
function validar (){
    //SI EL NOMBRE ESTÁ SIN RELLENAR MANDA UNA ALERTA
    if (nombre.value.trim() == ''){
        alert("El nombre es obligatorio")
        return false;
    }
    //SI LA DIRECCIÓN ESTÁ SIN RELLENAR MANDA UNA ALERTA
    if (direccion.value.trim() == ''){
        alert("La direccion es obligatoria")
        return false;
    }
    //SI EL TELÉFONO ESTÁ SIN RELLENAR MANDA UNA ALERTA
    if (telefono.value.trim() == ''){
        alert("El teléfono es obligatorio")
        return false;
    }
    //SI EL EMAIL ESTÁ SIN RELLENAR MANDA UNA ALERTA
    if (email.value.trim() == ''){
        alert("El email es obligatorio")
        return false;
    }
    //EL FOR CHEQUEA QUE SE HAYA ELEGIDO AL MENOS UNO DE LOS TAMAÑOS DE LA PIZZA ( PEQUEÑA, MEDIANA O GRANDE )
    for (i=0; i<tamaño.length;i++){
        if (tamaño[i].checked){
            checked = true;
            break;
        }
    }
    //SI EL FOR ANTERIOR NO ENCUENTRA NINGUNO DE LOS TAMAÑOS CHECKED, MANDA UNA ALERTA AL NAVEGADOR
    if (!checked){
        alert("El tamaño es obligatorio")
        return false;
    }

    checked = false;
    //EL FOR CHEQUEA QUE SE HAYA ELEGIDO AL MENOS UNO DE LOS INGREDIENTES DE LA PIZZA ( TOMATE, QUESO, BACON O ATÚN )
    for (j=0; j<ingrediente.length;j++){
        if (ingrediente[j].checked){
            checked = true;
            break;
        }
    }
    //SI EL FOR ANTERIOR NO ENCUENTRA NINGÚN INGREDIENTE CHECKED, MANDA UNA ALERTA AL NAVEGADOR
    if (!checked){
        alert("El ingrediente es obligatorio")
        return false;
    }

    else return true;
}

/** 
 * Función calcularPrecio(), si no ha saltado ninguna alerta en la función validar(), se calcula el precio total del pedido
 * en esta función. Teniendo en cuenta los siguientes parámetros:
 * -->5€ para la pizza pequeña
 * -->10€ para la pizza mediana
 * -->15€ para la pizza grande
 * -->Cada ingrediente elegido tendrá un valor de 1€
 * */ 
function calcularPrecio (){
    //COMPROBAMOS QUE LA FUNCIÓN VALIDAR SE HA REALIZADO CORRECTAMENTE
    if (validar ()){
        for (k=0; k<tamaño.length;k++){
            //SE CHEQUEA EL TAMAÑO DE LA PIZZA ELEGIDA, Y GUARDAMOS SU VALUE "pequeña,mediana o grande" EN LA VARIABLE precioPorTamaño
            if (tamaño[k].checked){
                var precioPorTamaño = tamaño[k].value;
            }
        }
        //SI ES 'pequeña' SUMA 5€ AL PRECIO TOTAL
        if (precioPorTamaño == 'pequeña'){
            precio=precio+5;
        }
        //SI ES 'mediana' SUMA 10€ AL PRECIO TOTAL
        if (precioPorTamaño == 'mediana'){
            precio=precio+10;
        }
        //SI ES 'grande' SUMA 15€ AL PRECIO TOTAL
        if (precioPorTamaño == 'grande'){
            precio=precio+15;
        }
        for (h=0; h<ingrediente.length;h++){
            //SE CHEQUEAN CUANTOS INGREDIENTE DE LA PIZZA SE HAN ELEGIDO, POR CADA INGREDIENTE ELEGIDO SE SUMA 1€ AL PRECIO TOTAL
            if (ingrediente[h].checked){
                precio=precio+1;
            }
        }
        //AL FINALIZAR SE DEVUELVE UNA ALERTA CON EL PRECIO TOTAL DEL PEDIDO.
        alert("El precio total del pedido es " + precio +"€") 
    }
    //Esta línea nos permite controlar si ante un campo vacío se tiene que refrescar el formulario o mantener los datos a la espera de introducir los correctos
   else return false
}
