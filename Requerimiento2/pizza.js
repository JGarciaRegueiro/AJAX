const URL_DESTINO = "http://localhost:5500/Requerimiento2/json/"
const RECURSO = "datos.json"

    //Funcion AJAX que podemos usar en la mayoría de los casos
    function enviarPeticionAsincrona() {
        
        //Formamos el objeto XMLHttpRequest
        let xmlHttp = new XMLHttpRequest()

        //xmlHttp.open (método (str), url (str), asíncrono/síncrono (true/false) )
        xmlHttp.open ('GET', URL_DESTINO +  RECURSO, true)
        xmlHttp.send()//Lo que queremos que vaya en el BODY del mensaje HTTP REQUEST
                      //lo pasamos como parámetro a la función send, en este caso nada
                      //ya que GET no debe llevar BODY

        //Esta función de callback se ejecutará cuando se haya procesado la respuesta HTTP
        xmlHttp.onload = function(){
            procesarRespuesta(this.responseText)
        }

        //Se ejecutará si hay algún error
        xmlHttp.onerror = function(){
            alert("ERROR")
        }
    }

    //Funcion que cargará de manera dinámica parte de los datos, concretamente de los tamaños e ingredientes de la pizza
    function procesarRespuesta(jsonDoc) {
        //Convertimos respuesta 'jsonDoc' a objeto de tipo JSON
        var objetoJson = JSON.parse(jsonDoc);

        //Guardamos en arrayTamaños, los datos del objeto JSON correspondiente a tamaño
        var arrayTamaños = objetoJson.datos.tamaño;

        for (var tam of arrayTamaños){
            var fieldset = document.getElementById("tamaños");
            var textoAMostrar = tam.tamaño + " " + tam.precio + "€";

            //Radio
            //Crear nodo de tipo Element labelRadio1
            var labelRadio = document.createElement("label");
            //Añadir el nodo Element labelRadio1 como hijo del nodo Element fieldset
            fieldset.appendChild(labelRadio);
            //Crear nodo de tipo Element radio1
            var radio = document.createElement("input");
            radio.type = "radio";   
            radio.name = "tamaño";   
            radio.id = tam.tamaño;   
            radio.value = tam.tamaño;
            //Añadir el nodo Element radio1 como hijo del nodo Element labelRadio1
            labelRadio.appendChild(radio);
            //Crear nodo de tipo Text textoRadio1
            var textoRadio = document.createTextNode(textoAMostrar);
            //Añadir el nodo Texto textoRadio1 como hijo del nodo Element labelRadio1
            labelRadio.appendChild(textoRadio);
        }
        
        //Guardamos en arrayIngredientes, los datos del objeto JSON correspondiente a ingrediente
        var arrayIngredientes = objetoJson.datos.ingrediente;

        for (var ing of arrayIngredientes){
            var fieldset = document.getElementById("ingredientes");
            var textoAMostrar = ing.nombre + " " + ing.precio + "€";

            //Radio
            //Crear nodo de tipo Element labelRadio1
            var labelRadio = document.createElement("label");
            //Añadir el nodo Element labelRadio1 como hijo del nodo Element fieldset
            fieldset.appendChild(labelRadio);
            //Crear nodo de tipo Element radio1
            var radio = document.createElement("input");
            radio.type = "checkbox";   
            radio.name = "ingrediente";   
            radio.id = ing.nombre;   
            radio.value = ing.nombre;
            //Añadir el nodo Element radio1 como hijo del nodo Element labelRadio1
            labelRadio.appendChild(radio);
            //Crear nodo de tipo Text textoRadio1
            var textoRadio = document.createTextNode(textoAMostrar);
            //Añadir el nodo Texto textoRadio1 como hijo del nodo Element labelRadio1
            labelRadio.appendChild(textoRadio);
        }
    }

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
 * -->1€ para el Tomate
 * -->2€ para el Queso
 * -->3€ para el Bacon
 * -->4€ para el Atún
 * */ 
function calcularPrecio (){
    //COMPROBAMOS QUE LA FUNCIÓN VALIDAR SE HA REALIZADO CORRECTAMENTE
    if (validar ()){   
        
        //Formamos el objeto XMLHttpRequest
        let xmlHttp = new XMLHttpRequest()
       
        //xmlHttp.open (método (str), url (str), asíncrono/síncrono (true/false) )
        xmlHttp.open ('GET', URL_DESTINO +  RECURSO, true)
        xmlHttp.send()//Lo que queremos que vaya en el BODY del mensaje HTTP REQUEST
                      //lo pasamos como parámetro a la función send, en este caso nada
                      //ya que GET no debe llevar BODY

        //Esta función de callback se ejecutará cuando se haya procesado la respuesta HTTP
        xmlHttp.onload = function(){
            procesarRespuesta2(this.responseText)
        }
            
        //Se ejecutará si hay algún error
        xmlHttp.onerror = function(){
            alert("ERROR FATAL MUERTE Y DESTRUCCÓN")
        }
        
        function procesarRespuesta2(jsonDoc){
            var objetoJson = JSON.parse(jsonDoc);
            var arrayTamaños = objetoJson.datos.tamaño;
            var arrayIngredientes = objetoJson.datos.ingrediente;
        
            for (k=0; k<tamaño.length;k++){
                //SE CHEQUEA EL TAMAÑO DE LA PIZZA ELEGIDA, Y GUARDAMOS SU VALUE "pequeña,mediana o grande" EN LA VARIABLE precioPorTamaño
                if (tamaño[k].checked){
                    var precioPorTamaño = tamaño[k].value;
                }
            }
            for (var tam of arrayTamaños){
                //SI ES 'pequeña' SUMA 5€ AL PRECIO TOTAL
                if (precioPorTamaño == tam.tamaño){
                    precio=precio+tam.precio;
                } 
            }
            for (h=0; h<ingrediente.length;h++){
                //SE CHEQUEA EL INGREDIENTE ELEGIDO, Y GUARDAMOS SU VALUE "Tomate,Queso,Bacon,Atún" en la variable precioPorIngrediente
                if (ingrediente[h].checked ){
                    var precioPorIngrediente=ingrediente[h].value;
                    for (var ing of arrayIngredientes){
                        //Según el nombre del ingrediente se le suma el precio correspondiente de ese ingrediente
                        if (precioPorIngrediente == ing.nombre){
                            precio=precio+ing.precio;
                        } 
                    }
                }
            } 
            
            //AL FINALIZAR SE DEVUELVE UNA ALERTA CON EL PRECIO TOTAL DEL PEDIDO.
            alert("El precio total del pedido es " + precio +"€") 
        }
    }
    //Esta línea nos permite controlar si ante un campo vacío se tiene que refrescar el formulario o mantener los datos a la espera de introducir los correctos
    else return false
}