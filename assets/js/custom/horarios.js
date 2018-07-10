// INICIAR FUNCIONES //
table_body();
$('.yearselect').yearselect();

// FORMATO RUT //
$(function () {
    $("input#rut").rut({ formatOn: 'keyup' });
});

// FUNCION YEAR SELECT//
$('.yearselect').yearselect({
    start: 1970,
    end: 2018,
    order: 'desc'
});

// FORZAR NUMEROS EN INPUT NUMBER //

function forceNumeric() {
    var $input = $(this);
    $input.val($input.val().replace(/[^\d]+/g, ''));
    if (this.value.length > 11) {
        this.value = this.value.slice(0, 11);
    }
}
$('body').on('propertychange input', 'input[type="number"]', forceNumeric);

// FORMATO A NUMEROS //
function dar_formato(num) {
    var cadena = ""; var aux;
    var cont = 1, m, k;
    if (num < 0) aux = 1; else aux = 0;
    num = num.toString();
    for (m = num.length - 1; m >= 0; m--) {
        cadena = num.charAt(m) + cadena;
        if (cont % 3 == 0 && m > aux) cadena = "." + cadena; else cadena = cadena;
        if (cont == 3) cont = 1; else cont++;
    }
    cadena = cadena.replace(/.,/, ",");
    return cadena;
}

// CARGAR TABLAS //

// table body //
function table_body() {
    var count = 0;
    $("#table_body").empty();
    var url = 'https://www.rendicionsostenedor.cl/list_horarios';
    $.getJSON(url, function (result) {
        $.each(result, function (i, o) {
            count++;
            var fil = "<tr>";
            fil += "<td style='display:none'>" + o.id_horario + "</td>";
            fil += "<td>" + o.codigo + "</td>";
            fil += "<td>" + o.hora_inicio + " a " + o.hora_termino + "</td>";
            fil += "<td>" + o.fecha.substring(8, 10) + "-" + o.fecha.substring(5, 7) + "-" + o.fecha.substring(0, 4) + " al " + o.vigencia.substring(8, 10) + "-" + o.vigencia.substring(5, 7) + "-" + o.vigencia.substring(0, 4) + "</td>";
            fil += "<td>" + o.observacion + "</td>";
            fil += "<td>" + ((o.estado === "1") ? "ACTIVO" : "INACTIVO") + "</td>";
            fil += "<td align='right'><div class='dropdown show'>";
            fil += "<a class='dropdown' href='#' role='button' id='dropdownMenuLink' data-toggle='dropdown' aria-haspopup='true' aria-expanded='false' style='color:grey;'><i class='fas fa-ellipsis-v'></i></a>";
            fil += "<div class='dropdown-menu' aria-labelledby='dropdownMenuLink'>";
            fil += "<a id='btn_modal_editar_horario' class='dropdown-item' data-toggle='modal' data-target='#modal_editar_horario' href='#'>Editar</a>";
            fil += "<a id='btn_delete' class='dropdown-item' href='#'>Eliminar</a>";
            fil += "</div>";
            fil += "</div>";
            fil += "</td>";
            fil += "</tr>";
            $("#table_body").append(fil);
        });
        if (count == 0) {
            var fil = "<tr>";
            fil += "<td class='text-center' colspan='5' rowspan='2'>No hay registros</td>";
            fil += "</tr>";
            $("#table_body").append(fil);
        }
    });
}

// CARGAR MODALES //

// modal nueva linea //
$("#btn_modal_nuevo_horario").on("click", function (e) {
    e.preventDefault();
    $("#codigo").val("");
    $("#observacion").val("");
    $('#list_estado').val(1);
    $("#hora_inicio").val("");
    $("#hora_termino").val("");
    $("#fecha_inicio").val("");
    $("#fecha_termino").val("");
    $("#msg_nofify_add").val("");
    $("#msg_nofify_edit").val("");
    $("#msg_nofify").val("");
});

// modal editar linea //
$("body").on("click", "#btn_modal_editar_horario", function (e) {
    e.preventDefault();
    var id_horario = $(this).parents("tr").find("td").html();

    var url = 'https://www.rendicionsostenedor.cl/list_horarios';
    $.getJSON(url, function (result) {
        $.each(result, function (i, o) {
            if (o.id_horario = id_horario) {
                $("#id_horario").val(o.id_horario);
                $("#new_codigo").val(o.codigo);
                $("#new_observacion").val(o.observacion);
                $('#new_list_estado').val(o.estado);
                $("#new_hora_inicio").val(o.hora_inicio);
                $("#new_hora_termino").val(o.hora_termino);
                $("#new_fecha_inicio").val(o.fecha);
                $("#new_fecha_termino").val(o.vigencia);
            }
        });
    });
    $("#msg_nofify_add").val("");
    $("#msg_nofify_edit").val("");
    $("#msg_nofify").val("");
});

// BOTONES //

// agregar //
$("#btn_add").on("click", function (e) {
    e.preventDefault();
    var codigo = $("#codigo").val();
    var observacion = $("#observacion").val();
    var list_estado = $('#list_estado').val();
    var hora_inicio = $("#hora_inicio").val();
    var hora_termino = $("#hora_termino").val();
    var fecha_inicio = $("#fecha_inicio").val();
    var fecha_termino = $("#fecha_termino").val();
    var paso = true;

    if (codigo == "" || observacion == "" || list_estado == "" || hora_inicio == "" || hora_termino == "" || fecha_inicio == "" || fecha_termino == "") {
        $("#msg_nofify_add").css({ color: "red" });
        $("#msg_nofify_add").val("Debe completar todos los campos")
    } else {
        var url = 'https://www.rendicionsostenedor.cl/list_horarios';
        $.getJSON(url, function (result) {
            $.each(result, function (i, h) {
                if (h.codigo == codigo) {
                    paso = false;
                }
            });
            if (paso == false) {
                $("#msg_nofify_add").css({ color: "red" });
                $("#msg_nofify_add").val("El codigo ya se encuentra registrado")
            } else {
                $.ajax({
                    url: 'https://www.rendicionsostenedor.cl/add_horarios',
                    type: 'post',
                    dataType: 'json',
                    data: { codigo: codigo, observacion: observacion, list_estado: list_estado, hora_inicio: hora_inicio, hora_termino: hora_termino, fecha_inicio: fecha_inicio, fecha_termino: fecha_termino },
                    success: function (o) {
                        if (o.msg == "1") {
                            table_body();
                            $("#codigo").val("");
                            $("#observacion").val("");
                            $('#list_estado').val(1);
                            $("#hora_inicio").val("");
                            $("#hora_termino").val("");
                            $("#fecha_inicio").val("");
                            $("#fecha_termino").val("");
                            $("#msg_nofify_add").val("");
                            $("#msg_nofify_edit").val("");
                            $("#msg_nofify").val("");
                            $('#modal_nuevo_horario').modal('hide');
                        } else {
                            $("#msg_nofify_add").css({ color: "red" });
                            $("#msg_nofify_add").val("No se pudo agregar, disculpe las molestias");
                        }
                    },
                    error: function (e) {
                        $("#msg_nofify_add").css({ color: "red" });
                        $("#msg_nofify_add").val("Error de conexión, disculpe las molestias");
                    }
                });
            }
        });
    }
});

// editar //
$("#btn_edit").on("click", function (e) {
    e.preventDefault();
    var id_horario = $("#id_horario").val();
    var codigo = $("#new_codigo").val();
    var observacion = $("#new_observacion").val();
    var list_estado = $('#new_list_estado').val();
    var hora_inicio = $("#new_hora_inicio").val();
    var hora_termino = $("#new_hora_termino").val();
    var fecha_inicio = $("#new_fecha_inicio").val();
    var fecha_termino = $("#new_fecha_termino").val();
    var paso = true;

    console.log(codigo + " | " + observacion + " | " + list_estado + " | " + hora_inicio + " | " + hora_termino + " | " + fecha_inicio + " | " + fecha_termino);

    if (codigo == "" || observacion == "" || list_estado == "" || hora_inicio == "" || hora_termino == "" || fecha_inicio == "" || fecha_termino == "") {
        $("#msg_nofify_add").css({ color: "red" });
        $("#msg_nofify_add").val("Debe completar todos los campos")
    } else {
        var url = 'https://www.rendicionsostenedor.cl/list_horarios';
        $.getJSON(url, function (result) {
            $.each(result, function (i, h) {
                if (h.codigo == codigo && h.id_horario != id_horario) {
                    paso = false;
                }
            });
            if (paso == false) {
                $("#msg_nofify_edit").css({ color: "red" });
                $("#msg_nofify_edit").val("El codigo ya se encuentra registrado")
            } else {
                $.ajax({
                    url: 'https://www.rendicionsostenedor.cl/edit_horarios',
                    type: 'post',
                    dataType: 'json',
                    data: { id_horario: id_horario, codigo: codigo, observacion: observacion, list_estado: list_estado, hora_inicio: hora_inicio, hora_termino: hora_termino, fecha_inicio: fecha_inicio, fecha_termino: fecha_termino },
                    success: function (o) {
                        if (o.msg == "1") {
                            table_body();
                            $("#new_codigo").val("");
                            $("#new_observacion").val("");
                            $('#new_list_estado').val(1);
                            $("#new_hora_inicio").val("");
                            $("#new_hora_termino").val("");
                            $("#new_fecha_inicio").val("");
                            $("#new_fecha_termino").val("");
                            $("#msg_nofify_add").val("");
                            $("#msg_nofify_edit").val("");
                            $("#msg_nofify").val("");
                            $('#modal_editar_horario').modal('hide');
                        } else {
                            $("#msg_nofify_edit").css({ color: "red" });
                            $("#msg_nofify_edit").val("No se pudo editar, disculpe las molestias");
                        }
                    },
                    error: function (e) {
                        $("#msg_nofify_edit").css({ color: "red" });
                        $("#msg_nofify_edit").val("Error de conexión, disculpe las molestias");
                    }
                });
            }
        });
    }
});

// eliminar //
$("body").on("click", "#btn_delete", function (e) {
    e.preventDefault();
    var id_horario = $(this).parents("tr").find("td").html();

    swal({
        title: "¿Esta Seguro?",
        text: "Se eliminará la micro",
        icon: "warning",
        buttons: ["Cancelar", "Si"],
        dangerMode: true,
    })
        .then((willDelete) => {
            if (willDelete) {
                $.ajax({
                    url: 'https://www.rendicionsostenedor.cl/delete_horarios',
                    type: 'post',
                    dataType: 'json',
                    data: { id_horario: id_horario },
                    success: function (o) {
                        if (o.msg == "1") {
                            $("#msg_nofify").css({ color: "green" });
                            $("#msg_nofify").val("Horario eliminado con exito");
                            table_body();
                        } else {
                            $("#msg_nofify").css({ color: "red" });
                            $("#msg_nofify").val("El horario esta siendo usado actualmente");
                        }
                    },
                    error: function () {
                        $("#msg_nofify").css({ color: "red" });
                        $("#msg_nofify").val("Error de conexión, disculpe las molestias");
                    }
                });
            }
        });
});