// Obtener datos de la tabla partyroom
function ConsultaSalones(){

	$.ajax({    
		url : 'http://152.70.127.102:8080/api/Partyroom/all',
		//url : 'http://localhost:8080/api/Partyroom/all',
		type : 'GET',
		dataType : 'json',
		contentType: "application/json; charset=utf-8",
		success : function(res) {
			$("#TablaSalones").empty();
			let tr = '';
			for (i=0; i<res.length; i++){
				tr += '<tr>';
				tr += '<td>'+ res[i].id+ '</td>';
				tr += '<td>'+ res[i].name+ '</td>';
				tr += '<td>'+ res[i].owner+ '</td>';
				tr += '<td>'+ res[i].capacity+ '</td>';
				tr += '<td>'+ res[i].description+ '</td>';
				tr += '<td><button class="btn btn-info btn-sm text-white" onclick="EditaDato('+res[i].id+')">Detalle</button>';
				tr += '<button class="btn btn-danger btn-sm" onclick="EliminaDato('+res[i].id+')">Eliminar</button></td>';
				tr += '</tr>';
			}
			$("#TablaSalones").append(tr);
		}
	});

}

// Guarda datos a la tabla partyroom
function GuardaDatos(){

	var datos={
		id:$("#id").val(),
		owner:$("#owner").val(),
		capacity:$("#capacity").val(),		
		name:$("#name").val(),
		description:$("#description").val()
	};

	if (datos.owner=='' || datos.capacity=='' || datos.category_id=='' || datos.name=='' || datos.description==''){
		alert("Todos los campos son obligatorios");
	}
	else{
		let datosJson=JSON.stringify(datos);
		$.ajax({
			url:'http://152.70.127.102:8080/api/Partyroom/save',
			//url:'http://localhost:8080/api/Partyroom/save',
			data:datosJson,
			type:'POST',
			dataType: 'json',
			contentType: "application/json; charset=utf-8",
			statusCode: {
				201: function () {
					alert("La sala se agrego exitosamente");
					ConsultaSalones();
				}
			}
		});
		limpiarCampos();
	}
}

// Alista datos para ser editados
function EditaDato(id){

	$.ajax({    
		url : 'http://152.70.127.102:8080/api/Partyroom/'+id,
		//url : 'http://localhost:8080/api/Partyroom/'+id,
		type : 'GET',
		dataType : 'json',
		contentType: "application/json; charset=utf-8",
		success : function(res) {
			$("#id").val(res.id);
			$("#owner").val(res.owner);
			$("#capacity").val(res.capacity);
			$("#name").val(res.name);
			$("#description").val(res.description);
			$("#id").attr('disabled', true);}, error : function(xhr, status) {alert('ha sucedido un problema:'+ status + json);
		}
	});

}

// Actualiza dato en partyroom
function ActualizaDato(){

	var datos={
		id:$("#id").val(),
		owner:$("#owner").val(),
		capacity:$("#capacity").val(),		
		name:$("#name").val(),
        description:$("#description").val()
	};

	if (datos.owner=='' || datos.capacity=='' || datos.category=='' || datos.name=='' || datos.description==''){
		alert("Todos los campos son obligatorios");
	}else{

	let datosJson = JSON.stringify(datos);

	$.ajax(    
    	'http://152.70.127.102:8080/api/Partyroom/update',
		//'http://localhost:8080/api/Partyroom/update',
		{
			data: datosJson,
    		type : 'PUT',
    		dataType : 'json',
    		contentType: "application/json; charset=utf-8",
    		statusCode : {
				201 :  function() {
				alert("La sala se actualizo exitosamente");
				$("#id").attr('disabled', false);
        		ConsultaSalones();
				}
			}
		});
	limpiarCampos();

}}

// Elimina datos de la tabla partyroom
function EliminaDato(id){

	$.ajax({    
    	url : 'http://152.70.127.102:8080/api/Partyroom/'+id,
		//url : 'http://localhost:8080/api/Partyroom/'+id,
    	type : 'DELETE',
    	dataType : 'json',
    	contentType: "application/json; charset=utf-8",
    	statusCode: {
			204: function () {
            	alert("La sala se elimino exitosamente!");
				ConsultaSalones();
        	}
    	}
	});

}

// Limpia los input de la pagina salones
function limpiarCampos(){

	$("#id").val(''),
	$("#owner").val(''),
	$("#capacity").val(''),
	$("#name").val(''),
	$("#description").val('')

}

// Consulta datos de la tabla cliente
function ConsultaClientes(){

	$.ajax({    
		url : 'http://152.70.127.102:8080/api/Client/all',
		//url : 'http://localhost:8080/api/Client/all',
		type : 'GET',
		dataType : 'json',
		contentType: "application/json; charset=utf-8",
		success : function(res) {
			$("#TablaC").empty();
			var tr = '';
			for (i=0; i<res.length; i++){
				tr += '<tr>';
				tr += '<td>'+ res[i].idClient+ '</td>';
				tr += '<td>'+ res[i].email+ '</td>';
				tr += '<td>'+ res[i].password+ '</td>';
				tr += '<td>'+ res[i].name+ '</td>';
				tr += '<td>'+ res[i].age+ '</td>';
				tr += '<td><button class="btn btn-info btn-sm text-white" onclick="EditarCliente(this,'+res[i].idClient+')">Detalle</button>';
				tr += '<button class="btn btn-danger btn-sm" onclick="EliminarCliente(this,'+res[i].idClient+')">Eliminar</button></td>';
				tr += '</tr>';
			}
			$("#TablaC").append(tr);
		},
	});

}

// Guarda nuevo ciente
function GuardaCliente(){

	var datos={
		idClient:$("#idClient").val(),
		email:$("#email").val(),
		password:$("#password").val(),
		name:$("#name").val(),
		age:$("#age").val()
	};

	if (datos.name=='' || datos.email=='' || datos.age=='' || datos.password==''){
		alert("Todos los campos son obligatorios");
	}else{

		let datosJson=JSON.stringify(datos);

		$.ajax({
			url:'http://152.70.127.102:8080/api/Client/save',
			//url:'http://localhost:8080/api/Client/save',
			data:datosJson,
			type:'POST',
			dataType: 'json',
			contentType: "application/json; charset=utf-8",
			statusCode: {
				201: function () {
					alert("El cliente se agrego exitosamente");
					ConsultaClientes();
				}
			}
		});
		LimpuiarCamposCliente();
	}

}

// Alista datos para ser editados
function EditarCliente(elem, idClient){

	$.ajax({    
		url : 'http://152.70.127.102:8080/api/Client/'+idClient,
		//url : 'http://localhost:8080/api/Client/'+idClient,
		type : 'GET',
		dataType : 'json',
		contentType: "application/json; charset=utf-8",
		success : function(respuesta) {
			$("#idClient").val(respuesta.idClient);
			$("#email").val(respuesta.email);
			$("#password").val(respuesta.password);
			$("#name").val(respuesta.name);
			$("#age").val(respuesta.age);
			$("#idClient").attr('disabled', true);
		},
		error : function(xhr, status) {
			alert('ha sucedido un problema:'+ status + json);
		}
	});

}

// Actualiza cliente
function ActualizaCliente(){

	var datos={
		idClient:$("#idClient").val(),
        email:$("#email").val(),
        password:$("#password").val(),
		name:$("#name").val(),
		age:$("#age").val()
	};

	if (datos.name=='' || datos.email=='' || datos.age=='' || datos.password==''){
		alert("Todos los campos son obligatorios");
	}else{
		let datosJson = JSON.stringify(datos);
		$.ajax(
			'http://152.70.127.102:8080/api/Client/update',
			//'http://localhost:8080/api/Client/update',
			{data: datosJson,
			type : 'PUT',
			dataType : 'json',
			contentType: "application/json; charset=utf-8",
			statusCode : {
				201 :  function() {
					alert("El cliente se actualizo exitosamente");
					$("#id").attr('disabled', false);
					ConsultaClientes();
					}
				}
			});
		LimpuiarCamposCliente();
	}
}

// Elimina cliente
function EliminarCliente(element, idClient){
	$.ajax({    
		url : 'http://152.70.127.102:8080/api/Client/'+idClient,
		//url : 'http://localhost:8080/api/Client/'+idClient,
		type : 'DELETE',
		dataType : 'json',
		contentType: "application/json; charset=utf-8",
		statusCode:
			{204: function () {
				 alert("El cliente se elimino exitosamente!");
				 ConsultaClientes();
				}
			}
    });
}

// Limpia inputs pagina clientes
function LimpuiarCamposCliente(){
	$("#idClient").val(''),
	$("#name").val(''),
	$("#email").val(''),
	$("#age").val(''),
	$("#password").val('')
}

// Consulta datos mensajes
function ConsultaMensajes(){

	$.ajax({    
		url : 'http://152.70.127.102:8080/api/Message/all',
		//url : 'http://localhost:8080/api/Message/all',
		type : 'GET',
		dataType : 'json',
		contentType: "application/json; charset=utf-8",
		success : function(res) {
			$("#TablaM").empty();
			let tr = '';
			for (i=0; i<res.length; i++){
				tr += '<tr>';
				tr += '<td>'+ res[i].idMessage+ '</td>';
				tr += '<td>'+ res[i].messageText+ '</td>';
				tr += '<td><button class="btn btn-info btn-sm text-white" onclick="EditarMensaje('+res[i].idMessage+')">Detalle</button>';
				tr += '<button class="btn btn-danger btn-sm" onclick="EliminarMensaje('+res[i].idMessage+')">Eliminar</button></td>';
				tr += '</tr>';
			}
			$("#TablaM").append(tr);
		},
	});

}

// Guarda mensajes
function GuardaMensajes(){

	let datos ={
		idMessage:$("#idMessage").val(),
		messageText:$("#messageText").val()
	};

	if (datos.messagetext=='' || datos.partyroom=='' || datos.client==''){
		alert("Todos los campos son obligatorios");
	}else{
		let datosJson=JSON.stringify(datos);
		$.ajax({
			url:'http://152.70.127.102:8080/api/Message/save',
			//url:'http://localhost:8080/api/Message/save',
			data:datosJson,
			type:'POST',
			dataType: 'json',
			contentType: "application/json; charset=utf-8",
			statusCode: {
				201: function () {
					alert("El mensaje se agrego exitosamente");
					ConsultaMensajes();
				}
			}
		});
		limpiarCamposM();
	}

}

// Alista para editar mensaje
function EditarMensaje(idMessage){

	$.ajax({    
		url : 'http://152.70.127.102:8080/api/Message/'+idMessage,
		//url : 'http://localhost:8080/api/Message/'+idMessage,
		type : 'GET',
		dataType : 'json',
		contentType: "application/json; charset=utf-8",
		success : function(respuesta) {
			$("#idMessage").val(respuesta.idMessage);
			$("#messageText").val(respuesta.messageText);;
			$("#idMessage").attr('disabled', true);
			$("#messageText").attr('disabled', true);
		},
		error : function(xhr, status) {
			alert('ha sucedido un problema:'+ status + json);
		}
	});

}

// Actualizar Mensaje
function ActulizarMensaje(){

	let datos={
		idMessage:$("#idMessage").val(),
		messageText:$("#messageText").val(),
	};

	if (datos.messagetext==''){
		alert("Todos los campos son obligatorios");
	}else{
		let datosJson = JSON.stringify(datos);
		$.ajax(
		'http://152.70.127.102:8080/api/Message/update',
		//'http://localhost:8080/api/Message/update',
		{data: datosJson,
		type : 'PUT',
		dataType : 'json',
		contentType: "application/json; charset=utf-8",
		statusCode : {
			201 :  function() {
				alert("El mensaje se actualizo exitosamente");
				$("#id").attr('disabled', false);
				$("#messagetext").attr('disabled', false);
				ConsultaMensajes();
				}
			}
		});
		limpiarCamposM();
	}

}

// Eliminar mensajes
function EliminarMensaje(idMessage){

	$.ajax({    
		url : 'http://152.70.127.102:8080/api/Message/'+idMessage,
		//url : 'http://localhost:8080/api/Message/'+idMessage,
		type : 'DELETE',
		dataType : 'json',
		contentType: "application/json; charset=utf-8",
		statusCode: {
			204: function () {
				alert("El mensaje se elimino exitosamente!");
				ConsultaMensajes();
			}
		}
	});

}

function limpiarCamposM(){
    $("#idMessage").val(''),
    $("#messageText").val('')
}

function DesbloqueaCampo(){
	$("#idMessage").attr('disabled', false);
	$("#messageText").attr('disabled', false);
	limpiarCamposM();
}


//METODOS GET POST PUT Y DELETE DE CATEGORY
function CargarCat(){
	$.ajax({    
		url : 'http://152.70.127.102:8080/api/Category/all',
		//url : 'http://localhost:8080/api/Category/all',
		type : 'GET',
		dataType : 'json',
		contentType: "application/json; charset=utf-8",
	  
		success : function(respuesta) {
			$("#TablaSalones").empty();
			var Tablaprin = '';
			for (i=0; i<respuesta.length; i++){
				Tablaprin += '<tr>';
				Tablaprin += '<td>'+ respuesta[i].id+ '</td>';
				Tablaprin += '<td>'+ respuesta[i].name+ '</td>';
				Tablaprin += '<td>'+ respuesta[i].description+ '</td>';
				Tablaprin += '<td><button class="btn btn-info btn-sm text-white" onclick="editarRegistroCat('+respuesta[i].id+')">Detalle</button>';
				Tablaprin += '<button class="btn btn-danger btn-sm" onclick="eliminarCat('+respuesta[i].id+')">Eliminar</button></td>';
				Tablaprin += '</tr>';
			}
			$("#TablaSalones").append(Tablaprin);
		}
	});
}

function ingresarDatosCat(){
	let datos={
		id:$("#id").val(),		
		name:$("#name").val(),
                description:$("#description").val(),
	};
	if (datos.name=='' || datos.description==''){
		alert("Todos los campos son obligatorios");
	}
	else{
		let datosJson=JSON.stringify(datos);
		$.ajax({
		url:'http://152.70.127.102:8080/api/Category/save',
		//url:'http://localhost:8080/api/Category/save',
		data:datosJson,
		type:'POST',
		dataType: 'json',
		contentType: "application/json; charset=utf-8",
		statusCode: {
			201: function () {
				alert("La categoria se agrego exitosamente");
				CargarCat();
			}
		}
		});
	limpiarCamposCat();
	}
}

function editarRegistroCat (id){
	$.ajax({    
		url : 'http://152.70.127.102:8080/api/Category/'+id,
		//url : 'http://localhost:8080/api/Category/'+id,
		type : 'GET',
		dataType : 'json',
		contentType: "application/json; charset=utf-8",
		success : function(respuesta) {
				$("#id").val(respuesta.id);
				$("#name").val(respuesta.name);
				$("#description").val(respuesta.description);
				$("#id").attr('disabled', true);
		},
		error : function(xhr, status) {
			alert('ha sucedido un problema:'+ status + json);
		}
	});
}

function actualizarCat(){
	var datos={
		id:$("#id").val(),	
		name:$("#name").val(),
        description:$("#description").val()
	};
	if (datos.id=='' || datos.name=='' || datos.description==''){
		alert("Todos los campos son obligatorios");
	}
	else{
		let datosJson = JSON.stringify(datos);
		$.ajax(
			'http://152.70.127.102:8080/api/Category/update',
			//'http://localhost:8080/api/Category/update',
			{data: datosJson,
			type : 'PUT',
			dataType : 'json',
			contentType: "application/json; charset=utf-8",
			statusCode : {
				201 :  function() {
					alert("La categoria se actualizo exitosamente");
					$("#id").attr('disabled', false);
					CargarCat();
					}
				}
			});
		limpiarCamposCat();
	}
}
function eliminarCat(id){
	$.ajax({    
		url : 'http://152.70.127.102:8080/api/Category/'+id,
		//url : 'http://localhost:8080/api/Category/'+id,
		type : 'DELETE',
		dataType : 'json',
		contentType: "application/json; charset=utf-8",
		statusCode: {
			204: function () {
				alert("La categoria se elimino exitosamente!");
				CargarCat();
			}
		}
	});
}

function limpiarCamposCat(){
	$("#id").val(''),
    $("#name").val(''),
    $("#description").val('')
}

//METODOS GET POST PUT Y DELETE DE RESERVATION
function CargarRes(){
	$.ajax({    
		url : 'http://152.70.127.102:8080/api/Reservation/all',
		//url : 'http://localhost:8080/api/Reservation/all',
		type : 'GET',
		dataType : 'json',
		contentType: "application/json; charset=utf-8",
	  
		success : function(respuesta) {
			$("#TablaSalones").empty();
			var Tablaprin = '';
			for (i=0; i<respuesta.length; i++){
				Tablaprin += '<tr>';
				Tablaprin += '<td>'+ respuesta[i].idReservation+ '</td>';
				Tablaprin += '<td>'+ respuesta[i].startDate+ '</td>';
				Tablaprin += '<td>'+ respuesta[i].devolutionDate+ '</td>';
				Tablaprin += '<td><button class="btn btn-danger btn-sm" onclick="eliminarRes('+respuesta[i].idReservation+')">Eliminar</button>';
				Tablaprin += '</tr>';
			}
			$("#TablaSalones").append(Tablaprin);
		}
	});
}

function ingresarDatosRes(){
	var datos={
		idReservation:$("#idReservation").val(),		
		startDate:$("#startDate").val(),
		devolutionDate:$("#devolutionDate").val()
	};
	if (datos.startDate=='' || datos.devolutionDate=='' || datos.partyroom=='' || datos.client=='' || datos.score==''){
		alert("Todos los campos son obligatorios");
	}
	else{
		let datosJson=JSON.stringify(datos);
		$.ajax({
			url:'http://152.70.127.102:8080/api/Reservation/save',
			//url:'http://localhost:8080/api/Reservation/save',
			data:datosJson,
			type:'POST',
			dataType: 'json',
			contentType: "application/json; charset=utf-8",
			statusCode: {
				201: function () {
					alert("La reserva se registro exitosamente");
					CargarRes();
				},
				555: function(){
					validarexistenciaRes(datos.id);
				}
			}
		});
		limpiarCamposRes();
	}
}

function eliminarRes(idReservation){
	$.ajax({    
		url : 'http://152.70.127.102:8080/api/Reservation/'+idReservation,
		//url : 'http://localhost:8080/api/Reservation/'+idReservation,
		type : 'DELETE',
		dataType : 'json',
		contentType: "application/json; charset=utf-8",
		statusCode: {
			204: function () {
			alert("La reserva se elimino exitosamente!");
			CargarRes();
			}
		}
    });
}
function limpiarCamposRes(){
        $("#idReservation").val(''),
        $("#startDate").val(''),
        $("#devolutionDate").val('')
}

//METODOS GET POST PUT Y DELETE DE ADMIN
function CargarAdm(){
	$.ajax({    
		url : 'http://152.70.127.102:8080/api/Admin/all',
		//url : 'http://localhost:8080/api/Admin/all',
		type : 'GET',
		dataType : 'json',
		contentType: "application/json; charset=utf-8",
		success : function(respuesta) {
			$("#TablaSalones").empty();
			var Tablaprin = '';
			for (i=0; i<respuesta.length; i++){
				Tablaprin += '<tr>';
				Tablaprin += '<td>'+ respuesta[i].idAdmin+ '</td>';
				Tablaprin += '<td>'+ respuesta[i].name+ '</td>';
				Tablaprin += '<td>'+ respuesta[i].email+ '</td>';
				Tablaprin += '<td>'+ respuesta[i].password+ '</td>';
				Tablaprin += '<td><button class="btn-info btn-sm text-white"  onclick="editarRegistroAdm('+respuesta[i].idAdmin+')">Detalle</button>';
				Tablaprin += '<button class="btn btn-danger btn-sm"  onclick="eliminarAdm('+respuesta[i].idAdmin+')">Eliminar</button></td>';
				Tablaprin += '</tr>';
			}
			$("#TablaSalones").append(Tablaprin);
		}
	});
}

function ingresarDatosAdm(){
	var datos={
		idAdmin:$("#idAdmin").val(),		
		name:$("#name").val(),
		email:$("#email").val(),
		password:$("#password").val()
	};
	if (datos.name=='' || datos.email=='' || datos.password==''){
		alert("Todos los campos son obligatorios");
	}
	else{
		let datosJson=JSON.stringify(datos);
		$.ajax({
			url:'http://152.70.127.102:8080/api/Admin/save',
			//url:'http://localhost:8080/api/Admin/save',
			data:datosJson,
			type:'POST',
			dataType: 'json',
			contentType: "application/json; charset=utf-8",
			statusCode: {
				201: function () {
					alert("El admin se resgistro exitosamente");
					CargarAdm();
				},
				555: function(){
					validarexistenciaRes(datos.id);
				}
			}
		});
		limpiarCamposAdm();
	}
}

function editarRegistroAdm (idAdmin){
	$.ajax({    
		url : 'http://152.70.127.102:8080/api/Admin/'+idAdmin,
		//url : 'http://localhost:8080/api/Admin/'+idAdmin,
		type : 'GET',
		dataType : 'json',
		contentType: "application/json; charset=utf-8",
		success : function(respuesta) {
				$("#idAdmin").val(respuesta.idAdmin);
				$("#name").val(respuesta.name);
				$("#email").val(respuesta.email);
				$("#password").val(respuesta.password);
				$("#idAdmin").attr('disabled', true);
		},
		error : function(xhr, status) {
			alert('ha sucedido un problema:'+ status + json);
		}
	});
}

function actualizarAdm(){
	var datos={
		idAdmin:$("#idAdmin").val(),		
		name:$("#name").val(),
		email:$("#email").val(),
		password:$("#password").val()
	};
	if (datos.name=='' || datos.email=='' || datos.password==''){
		alert("Todos los campos son obligatorios");
	}
	else{
		let datosJson = JSON.stringify(datos);
		$.ajax(
			'http://152.70.127.102:8080/api/Admin/update',
			//'http://localhost:8080/api/Admin/update',
			{data: datosJson,
			type : 'PUT',
			dataType : 'json',
			contentType: "application/json; charset=utf-8",
			statusCode : {
				201 :  function() {
					alert("El admin se actualizo exitosamente");
					$("#id").attr('disabled', false);
					CargarAdm();
				}
			}
		});
	limpiarCamposAdm();
	}
}

function eliminarAdm(idAdmin){
	$.ajax({    
		url : 'http://152.70.127.102:8080/api/Admin/'+idAdmin,
		//url : 'http://localhost/api/Admin/'+idAdmin,
		type : 'DELETE',
		dataType : 'json',
		contentType: "application/json; charset=utf-8",
		statusCode: {
			204: function () {
				alert("El admin se elimino exitosamente!");
				CargarAdm();
			}
		}
	});
}

function limpiarCamposAdm(){
        $("#idAdmin").val(''),
        $("#name").val(''),
        $("#email").val(''),
        $("#password").val('')
}

//METODOS GET POST PUT Y DELETE DE SCORE
function CargarScore(){
	$.ajax({    
		url : 'http://152.70.127.102:8080/api/Score/all',
		//url : 'http://localhost:8080/api/Score/all',
		type : 'GET',
		dataType : 'json',
		contentType: "application/json; charset=utf-8",
		success : function(respuesta) {
			$("#TablaSalones").empty();
			var Tablaprin = '';
			for (i=0; i<respuesta.length; i++){
				Tablaprin += '<tr>';
				Tablaprin += '<td>'+ respuesta[i].idScore+ '</td>';
				Tablaprin += '<td>'+ respuesta[i].calificacion+ '</td>';
				Tablaprin += '<td>'+ respuesta[i].mensaje+ '</td>';
				Tablaprin += '<td><button class="btn btn-danger btn-sm" onclick="eliminarScore('+respuesta[i].idScore+')">Eliminar</button>';
				Tablaprin += '</tr>';
			}
			$("#TablaSalones").append(Tablaprin);
		}
	});
}

function ingresarDatosScore(){
	var datos={
		idScore:$("#idScore").val(),		
		calificacion:$("#calificacion").val(),		
		mensaje:$("#mensaje").val(),
	};
	if (datos.mensaje=='' || datos.reserva=='' || datos.calificacion==''){
		alert("Todos los campos son obligatorios");
	}
	else{
		let datosJson=JSON.stringify(datos);
		$.ajax({
			url:'http://152.70.127.102:8080/api/Score/save',
			//url:'http://localhost:8080/api/Score/save',
			data:datosJson,
			type:'POST',
			dataType: 'json',
			contentType: "application/json; charset=utf-8",
			statusCode: {
				201: function () {
					alert("El puntaje se registro exitosamente");
					CargarScore();
				},
				555: function(){
					validarexistenciaScore(datos.id);
				}
			}
		});
		limpiarCamposScore();
	}
}

function editarRegistroScore (idScore){
	$.ajax({    
		url : 'http://152.70.127.102:8080/api/Score/'+idScore,
		//url : 'http://localhost:8080/api/Score/'+idScore,
		type : 'GET',
		dataType : 'json',
		contentType: "application/json; charset=utf-8",
		success : function(respuesta) {
				$("#idScore").val(respuesta.idScore);
				$("#calificacion").val(respuesta.calificacion);
				$("#mensaje").val(respuesta.mensaje);
				$("#idAdmin").attr('disabled', true);
		},
		error : function(xhr, status) {
			alert('ha sucedido un problema:'+ status + json);
		}
	});
}

function actualizarScore(){
	var datos={
		idScore:$("#idScore").val(),		
		calificacion:$("#calificacion").val(),		
		mensaje:$("#mensaje").val()
	};
	if (datos.mensaje=='' || datos.reserva=='' || datos.calificacion==''){
		alert("Todos los campos son obligatorios");
	}
	else{
		let datosJson = JSON.stringify(datos);
		$.ajax(
			'http://152.70.127.102:8080/api/Score/update',
			//'http://localhost:8080/api/Score/update',
			{data: datosJson,
			type : 'PUT',
			dataType : 'json',
			contentType: "application/json; charset=utf-8",
			statusCode : {
				201 :  function() {
					alert("El puntaje se actualizo exitosamente");
					$("#id").attr('disabled', false);
					CargarScore();
					}
				}
		});
		limpiarCamposAdm();
	}
}

function eliminarScore(idScore){
	$.ajax({    
		url : 'http://152.70.127.102:8080/api/Score/'+idScore,
		//url : 'http://localhost:8080/api/Score/'+idScore,
		type : 'DELETE',
		dataType : 'json',
		contentType: "application/json; charset=utf-8",
		statusCode: {
			204: function () {
				alert("El puntaje se elimino exitosamente!");
				CargarScore();
			}
		}
	});
}

function limpiarCamposScore(){
        $("#idScore").val(''),
        $("#calificacion").val(''),
        $("#mensaje").val('')
}