let urlRest = 'https://ge0eef664d9e3ed-db202110041501.adb.sa-santiago-1.oraclecloudapps.com/ords/admin/cantante/cantante';

$(document).ready(function () {
    cargarDatosTable();
});

$('#formularioCantante').on("click", function(event){
    event.preventDefault();
});

function cargarDatosTable() {
    $.ajax({
        url: urlRest,
        type: 'GET',
        datatype: 'JSON',
        success: function (response) {
            let myItems = response.items;
            let valor = '';
            for (i = 0; i < myItems.length; i++) {
                valor += '<tr>'+
                    '<td >'+ myItems[i].id+'</td >'+
                    '<td>'+ myItems[i].nombre+'</td>'+
                    '<td>'+ myItems[i].apellido+'</td>'+
                    '<td>'+ myItems[i].edad+'</td>'+
                    '<td>'+ myItems[i].genero_id+'</td>'+
                    '<td>'+
                        '<button class="btn btn-danger" onclick="borrarCantante('+ myItems[i].id+')">Borrar</button>'+
                        '<button class="btn btn-warning" onclick="detallesCantante('+ myItems[i].id+')">Detalles</button>'+
                    '</td>'+
                '</tr > ';
            }
            $('#tbodyCantante').html(valor);
        }
    });
}

function crearCantante() {
    let datosFormulario = {
        id: $('#myId').val(),
        nombre: $('#nombre').val(),
        apellido: $('#apellido').val(),
        edad: $('#edad').val(),
        genero_id: $('#genero_id').val()
    };

    let datosFormularioJson = JSON.stringify(datosFormulario);

    $.ajax({
        url: urlRest,
        type: 'POST',
        data: datosFormularioJson,
        datatype: 'JSON',
        contentType: 'application/json',
        success: function(response) {
            console.log(response);
            cargarDatosTable();
            limpiarFormulario();
        }
    });
}

function borrarCantante(idCantante) {
    let datosFormulario = {
        id: idCantante
    };

    let datosFormularioJson = JSON.stringify(datosFormulario);

    $.ajax({
        url: urlRest,
        type: 'DELETE',
        data: datosFormularioJson,
        datatype: 'JSON',
        contentType: 'application/json',
        success: function(response) {
            console.log(response);
            cargarDatosTable();
        }
    });
}

function detallesCantante(idCantante) {
    $.ajax({
        url: urlRest+'/'+idCantante,
        type: 'GET',
        datatype: 'JSON',
        success: function(response) {
            let myItem = response.items[0];
            let valor = '<strong>Id:</strong> '+ myItem.id+' <br>'+
                        '<strong>Nombre:</strong> '+ myItem.nombre+' <br>'+
                        '<strong>Apellido:</strong> '+ myItem.apellido+' <br>'+
                        '<strong>Edad:</strong> '+ myItem.edad+' <br>'+
                        '<strong>Genero_id:</strong> '+ myItem.genero_id+' <br>'+
                        '<button class="btn btn-warning" onclick="cargarFormulario('+ myItem.id+')">Editar</button>';
            
            $('#detallesCantante').html(valor);
            $('#detallesCantante').show();
        }
    });
}

function cargarFormulario(idCantante) {
    $.ajax({
        url: urlRest+'/'+idCantante,
        type: 'GET',
        datatype: 'JSON',
        success: function(response) {
            let myItem = response.items[0];
            $('#myId').val(myItem.id);
            $('#nombre').val(myItem.nombre);
            $('#apellido').val(myItem.apellido);
            $('#edad').val(myItem.edad);
            $('#genero_id').val(myItem.genero_id);


            let valor = '<input id="btnActualizar" type="submit" onclick="actualizarCantante('+myItem.id+')" value="Actualizar" class="btn btn-warning">';          
            $('#btnFormulario').html(valor);

            $('#myId').prop('disabled', true);
 
        }
    });
}

function actualizarCantante(idCantante) {
    let datosFormulario = {
        id: idCantante,
        nombre: $('#nombre').val(),
        apellido: $('#apellido').val(),
        edad: $('#edad').val(),
        genero_id: $('#genero_id').val()
    };

    let datosFormularioJson = JSON.stringify(datosFormulario);

    $.ajax({
        url: urlRest,
        type: 'PUT',
        data: datosFormularioJson,
        datatype: 'JSON',
        contentType: 'application/json',
        success: function(response) {
            console.log(response);
            cargarDatosTable();
            limpiarFormulario();
        }
    });
    let valor = '<input id="btnCrear" type="submit" onclick="crearCantante()" value="Crear" class="btn btn-primary"> ';          
    $('#btnFormulario').html(valor);

    $('#myId').prop('disabled', false);
    $('#detallesCantante').hide();
}

function limpiarFormulario() {
    $('#formularioCantante')[0].reset();
}