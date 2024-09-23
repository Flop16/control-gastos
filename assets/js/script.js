let listaNombresGastos = [];
let listaValoresGastos = [];
let listaDescripcionesGastos = []; 
let posicionModificar = -1;  // Variable para rastrear el índice a modificar

function checkEnter(event) {
    if (event.key === "Enter") {
        clickBoton();  // Llama a la función clickBoton al presionar Enter
    }
}

function clickBoton() {
    let nombreGasto = document.getElementById('nombreGasto').value;
    let valorGasto = document.getElementById('valorGasto').value;
    let descripcionGasto = document.getElementById('descripcionGasto').value;

    // Advertencia si el gasto supera los 150 USD
    if (Number(valorGasto) > 150) {
        alert("Advertencia: El gasto supera los 150 USD");
    }

    if (posicionModificar === -1) {  // Si no estamos en modo modificación
        listaNombresGastos.push(nombreGasto);
        listaValoresGastos.push(valorGasto);
        listaDescripcionesGastos.push(descripcionGasto);  // Agregar descripción
    } else {
        // Si estamos modificando un gasto existente
        listaNombresGastos[posicionModificar] = nombreGasto;
        listaValoresGastos[posicionModificar] = valorGasto;
        listaDescripcionesGastos[posicionModificar] = descripcionGasto;  

        posicionModificar = -1;  // Resetear la variable de modificación
        document.getElementById('botonGasto').textContent = 'Agregar Gasto';  // Cambiar texto del botón
    }

    actualizarListaGastos();
}



function actualizarListaGastos() {
    const listaElementos = document.getElementById('listaDeGastos');
    const totalElementos = document.getElementById('totalGastos');
    let htmlLista = '';
    let totalGastos = 0;
    listaNombresGastos.forEach((elemento, posicion) => {
        const valorGasto = Number(listaValoresGastos[posicion]);
        const descripcionGasto = listaDescripcionesGastos[posicion]; 
        htmlLista +=  `<li>
                            <div class="gasto-info">
                                <strong>${elemento}</strong> 
                                <span class="descripcion">(${descripcionGasto})</span>
                            </div>
                            <span class="valor-gasto">USD ${valorGasto.toFixed(2)}</span>
                            <div class="botones">
                                <button onclick="modificarGasto(${posicion});" style="border:none; background:none;">
                                    <i class="bi bi-pencil" style="color:white;"></i>
                                </button>
                                <button onclick="eliminarGasto(${posicion});" style="border:none; background:none;">
                                    <i class="bi bi-trash" style="color:red;"></i>
                                </button>
                            </div>
                        </li>`;

        // Calcular el total de los gastos
        totalGastos += Number(valorGasto);
    });
    listaElementos.innerHTML = htmlLista;
    totalElementos.innerHTML = totalGastos.toFixed(2);
    limpiar();
}


function limpiar() {
    document.getElementById('nombreGasto').value = '';
    document.getElementById('valorGasto').value = '';
    document.getElementById('descripcionGasto').value = ''; 
}


function modificarGasto(posicion) {
    // Colocar el nombre, valor y descripción del gasto en los campos de entrada
    document.getElementById('nombreGasto').value = listaNombresGastos[posicion];
    document.getElementById('valorGasto').value = listaValoresGastos[posicion];
    document.getElementById('descripcionGasto').value = listaDescripcionesGastos[posicion];

    // Cambiar el texto del botón a "Actualizar Gasto"
    document.getElementById('botonGasto').textContent = 'Actualizar Gasto';

    // Guardar la posición del gasto que se va a modificar
    posicionModificar = posicion;
}

function eliminarGasto(posicion) {
    listaNombresGastos.splice(posicion, 1);
    listaValoresGastos.splice(posicion, 1);
    listaDescripcionesGastos.splice(posicion, 1);
    actualizarListaGastos();
}

