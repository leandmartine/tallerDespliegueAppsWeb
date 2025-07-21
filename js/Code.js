const SISTEMA = new Sistema();
SISTEMA.precargarDatos();

document
  .querySelector("#btnRegistrarUsuario")
  .addEventListener("click", paginaRegistrarUsuario);
document.querySelector("#ingresoUsuarios").addEventListener("click", login);
document.querySelector("#btnLogout").addEventListener("click", logout);
document.querySelector("#volverAlLogin").addEventListener("click", logout);
document
  .querySelector("#confirmarAgenda")
  .addEventListener("click", confirmarReserva);
// funcion estadistica (Defensa)
document.querySelector("#estadisticasEdades").addEventListener("click", mostrarEstadisticas)
document.querySelector("#paginaEstadistica").style.display = "none"

habilitarBotonesParaNavegar();

const CLASS_NAV_PASEADOR = "nav-perfil-paseador";
const CLASS_NAV_USUARIO = "nav-perfil-usuario";

const CLASS_DIV_PASEADOR = "div-perfil-paseador";
const CLASS_DIV_USUARIO = "div-perfil-usuario";

ocultarEtiquetasPorClase(CLASS_NAV_PASEADOR);
ocultarEtiquetasPorClase(CLASS_NAV_USUARIO);
ocultarEtiquetasPorClase(CLASS_DIV_PASEADOR);
ocultarEtiquetasPorClase(CLASS_DIV_USUARIO);

function login() {
  document.querySelector("#mensajesDeLogin").innerHTML = "";

  let usuarioIngresado = document.querySelector("#txtUsuario").value;
  let contrasenhaIngresada = document.querySelector("#txtPassIngresada").value;

  let erroresLogin = SISTEMA.loginUsuario(
    usuarioIngresado,
    contrasenhaIngresada
  );

  if (erroresLogin.length === 0) {
    loginExitoso(usuarioIngresado);
  } else {
    let mensaje = "";
    for (let i = 0; i < erroresLogin.length; i++) {
      mensaje += erroresLogin[i] + "<br>";
    }
    document.querySelector("#mensajesDeLogin").innerHTML = mensaje;
  }

  document.querySelector("#txtPassIngresada").value = "";
}

function logout() {
  SISTEMA.logout();
  ocultarEtiquetasPorClase(CLASS_NAV_USUARIO);
  ocultarEtiquetasPorClase(CLASS_NAV_PASEADOR);
  ocultarEtiquetasPorClase(CLASS_DIV_PASEADOR);
  ocultarEtiquetasPorClase(CLASS_DIV_USUARIO);

  document.querySelector("#txtUsuario").value = "";
  document.querySelector("#txtPassIngresada").value = "";
  document.querySelector("#mensajesDeLogin").innerHTML = "";

  document.querySelector("#mostrarLogin").style.display = "block";
}

function paginaRegistrarUsuario() {
  document.querySelector("#txtNombre").value = "";
  document.querySelector("#txtPerro").value = "";
  document.querySelector("#slcOpciones").value = "";
  document.querySelector("#txtPass").value = "";
  document.querySelector("#mensajesDeRegistro").innerHTML = "";
  document.querySelector("#mostrarLogin").style.display = "none";
  document.querySelector("#mostrarRegistro").style.display = "block";
}
document
  .querySelector("#btnRegistrarse")
  .addEventListener("click", registrarUsuario);

function registrarUsuario() {
  document.querySelector("#mensajesDeLogin").innerHTML = "";
  let nombreUsuario = document.querySelector("#txtNombre").value;
  let nombrePerro = document.querySelector("#txtPerro").value;
  let tamanhoDelPerro = document.querySelector("#slcOpciones").value;
  let contrasenha = document.querySelector("#txtPass").value;

  let erroresRegistro = SISTEMA.agregarUsuario(
    nombreUsuario,
    nombrePerro,
    tamanhoDelPerro,
    contrasenha,
    false
  );

  if (erroresRegistro.length === 0) {
    document.querySelector(
      "#mensajesDeRegistro"
    ).innerHTML = `Se ha registrado correctamente <br> <a id="btnIngresar" href="#">Ingresar</a>`;
    document
      .querySelector("#btnIngresar")
      .addEventListener("click", ingresoDeUsuarios);
  } else {
    let mensaje = "";
    for (let i = 0; i < erroresRegistro.length; i++) {
      mensaje += erroresRegistro[i] + "<br>";
    }
    document.querySelector("#mensajesDeRegistro").innerHTML = mensaje;
  }
}

function ingresoDeUsuarios() {
  document.querySelector("#mostrarRegistro").style.display = "none";
  document.querySelector("#mostrarLogin").style.display = "block";
}

function loginExitoso(_Nombre) {
  document.querySelector("#txtUsuario").value = "";
  document.querySelector("#txtPassIngresada").value = "";
  document.querySelector("#mostrarLogin").style.display = "none";

  if (SISTEMA.perfilPaseador(_Nombre)) {
    ocultarEtiquetasPorClase(CLASS_NAV_USUARIO);
    mostrarEtiquetasPorClase(CLASS_NAV_PASEADOR);
    mostrarElementoPorID("#divPaginaPaseador");
    completarTablaAgendasPendientesPaseador();
    completarTablaListadoPerros();
    document.querySelector("#mensajeCancelacionAutomatica").innerHTML = "";
  } else {
    ocultarEtiquetasPorClase(CLASS_NAV_PASEADOR);
    mostrarEtiquetasPorClase(CLASS_NAV_USUARIO);
    mostrarElementoPorID("#divPaginaUsuario");
    selectDePaseadoresDisponibles();
    completarTablaAgendasPendientes();
    completarTablaHistorialAgendas();
    document.querySelector("#mensajesDeErrorAgenda").innerHTML = "";
  }
}

function ocultarEtiquetasPorClase(clase) {
  let elementosParaOcultar = document.querySelectorAll("." + clase);

  for (let i = 0; i < elementosParaOcultar.length; i++) {
    elementosParaOcultar[i].style.display = "none";
  }
}

function mostrarEtiquetasPorClase(clase) {
  let elementosParaMostrar = document.querySelectorAll("." + clase);

  for (let i = 0; i < elementosParaMostrar.length; i++) {
    elementosParaMostrar[i].style.display = "block";
  }
}

function mostrarElementoPorID(id) {
  ocultarEtiquetasPorClase(CLASS_DIV_PASEADOR);
  ocultarEtiquetasPorClase(CLASS_DIV_USUARIO);
  document.querySelector(id).style.display = "block";
}

function habilitarBotonesParaNavegar() {
  let botones = document.querySelectorAll(".btn-nav");
  for (let i = 0; i < botones.length; i++) {
    let boton = botones[i];
    boton.addEventListener("click", mostrarPaginaDelBoton);
  }
}

function mostrarPaginaDelBoton() {
  let boton = this;
  let idDePaginaQueQuieroMostrar = boton.getAttribute(
    "data-seccion-para-mostrar"
  );
  if (idDePaginaQueQuieroMostrar !== null) {
    mostrarElementoPorID("#" + idDePaginaQueQuieroMostrar);
  }
}

function selectDePaseadoresDisponibles() {
  let paseadores = SISTEMA.usuariosPaseadores();
  let selectPaseadores = document.querySelector("#slcSeleccionarPaseadores");
  let optionsSelect = "";
  for (let i = 0; i < paseadores.length; i++) {
    let item = paseadores[i];
    optionsSelect = `<option value="${item.nombre}">${item.nombre}</option>`;
    selectPaseadores.innerHTML += optionsSelect;
  }
}

function confirmarReserva() {
  document.querySelector("#mensajeCancelacionReserva").innerHTML = "";
  let nombrePaseador = document.querySelector(
    "#slcSeleccionarPaseadores"
  ).value;

  let paseador = SISTEMA.buscarUnUsuarioPorNombre(nombrePaseador);
  let usuario = SISTEMA.usuarioLogueado;
  let reservasPendientesUsuario =
    SISTEMA.obtenerRervasDelUsuarioLogueadoPorEstado("PENDIENTE");

  if (reservasPendientesUsuario.length > 0) {
    document.querySelector(
      "#mensajesDeErrorAgenda"
    ).innerHTML = `Ya contás con una reserva pendiente`;
    return;
  }

  let cuposNuevos = SISTEMA.resolverCuposNecesarios(usuario.tamanho);

  if (paseador.cupos < cuposNuevos) {
    document.querySelector("#mensajesDeErrorAgenda").innerHTML =
      "No hay cupos suficientes para este paseador";
    return;
  }

  if (
    !SISTEMA.elTamanhoEsCompatibleConElRestoDeLosPerrosParaPaseador(
      usuario.tamanho,
      paseador
    )
  ) {
    document.querySelector("#mensajesDeErrorAgenda").innerHTML =
      "El tamaño de su perro no es compatible con los perros asignados al paseador";
    return;
  }

  SISTEMA.agregarReserva(usuario, paseador);
  ocultarEtiquetasPorClase(CLASS_DIV_USUARIO);
  mostrarElementoPorID("#consultarReservas");
  completarTablaAgendasPendientes();
}

function completarTablaAgendasPendientes() {
  let tabla = document.querySelector("#tbodyReservasPendientes");
  let mostrarTabla = "";

  let reservasPendientesDelUsuario =
    SISTEMA.obtenerRervasDelUsuarioLogueadoPorEstado("PENDIENTE");

  for (let i = 0; i < reservasPendientesDelUsuario.length; i++) {
    let item = reservasPendientesDelUsuario[i];
    mostrarTabla += `<tr>
        <td>${item.paseador.nombre}</td>
        <td>${item.estado}</td>`;

    if (item.estado === "PENDIENTE") {
      mostrarTabla += `<td><button class="btn-cancelar-reserva" data-id-reserva="${item.id}">CANCELAR</button></td>`;
    } else {
      mostrarTabla += `<td></td>`;
    }

    mostrarTabla += `
      </tr>`;
  }

  if (mostrarTabla === "") {
    mostrarTabla = "<tr><td colspan='3'>SIN RESERVAS PARA MOSTRAR</td></tr>";
  }

  tabla.innerHTML = mostrarTabla;
  darEventoBotonesCancelarReserva();
}

function darEventoBotonesCancelarReserva() {
  let botonesCancelar = document.querySelectorAll(".btn-cancelar-reserva");

  for (let i = 0; i < botonesCancelar.length; i++) {
    botonesCancelar[i].addEventListener("click", cancelarUnaReserva);
  }
}

function cancelarUnaReserva() {
  let idReserva = Number(this.getAttribute("data-id-reserva"));
  SISTEMA.cambiarEstadoReserva(
    idReserva,
    "CANCELADO",
    "Ud ha cancelado esta reserva"
  );

  document.querySelector("#mensajesDeErrorAgenda").innerHTML = "";
  document.querySelector("#mensajeCancelacionReserva").innerHTML =
    "Su reserva fue cancelada exitosamente";
  completarTablaAgendasPendientes();
  completarTablaHistorialAgendas();
  completarTablaAgendasPendientesPaseador();
  completarTablaListadoPerros();
}

function completarTablaHistorialAgendas() {
  let tabla = document.querySelector("#tbodyHistorialDeReservas");
  let reservasCanceladasDelUsuario =
    SISTEMA.obtenerRervasDelUsuarioLogueadoPorEstado("CANCELADO");
  let reservasRechazadas =
    SISTEMA.obtenerRervasDelUsuarioLogueadoPorEstado("RECHAZADA");
  let reservasAprobadaDelUsuario =
    SISTEMA.obtenerRervasDelUsuarioLogueadoPorEstado("APROBADA");

  let mostrarTabla = "";

  mostrarTabla += agregarFilasReservas(reservasCanceladasDelUsuario);
  mostrarTabla += agregarFilasReservas(reservasRechazadas);
  mostrarTabla += agregarFilasReservas(reservasAprobadaDelUsuario);

  if (mostrarTabla === "") {
    mostrarTabla = "<tr><td colspan='4'>SIN HISTORIAL PARA MOSTRAR</td></tr>";
  }

  tabla.innerHTML = mostrarTabla;
}

function agregarFilasReservas(reservas) {
  let rows = "";
  for (let i = 0; i < reservas.length; i++) {
    let item = reservas[i];
    rows += `<tr>
      <td>${item.id}</td>
      <td>${item.paseador.nombre}</td>
      <td>${item.estado}</td>
      <td>${item.motivo}</td>
    </tr>`;
  }
  return rows;
}

function completarTablaAgendasPendientesPaseador() {
  let tabla = document.querySelector("#tbodyReservasPendientesPaseador");
  let mostrarTabla = "";

  let reservasPendientesDelUsuario =
    SISTEMA.obtenerRervasDelPaseadorLogeadoPorEstado("PENDIENTE");

  for (let i = 0; i < reservasPendientesDelUsuario.length; i++) {
    let item = reservasPendientesDelUsuario[i];
    mostrarTabla += `<tr>
        <td>${item.id}</td>
        <td>${item.usuario.nombrePerro}</td>
        <td>${item.usuario.tamanho}</td>
        <td>${item.estado}</td>`;

    if (item.estado === "PENDIENTE") {
      mostrarTabla += `<td><button class="btn-cancelar-reserva" data-id-reserva="${item.id}">CANCELAR</button><br><br><button class="btn-aprobar-reserva" data-id-reserva="${item.id}">APROBAR</button></td>`;
    } else {
      mostrarTabla += `<td></td>`;
    }

    mostrarTabla += `</tr>`;
  }

  if (mostrarTabla === "") {
    mostrarTabla =
      "<tr><td colspan='5'>SIN AGENDA PENDIENTES PARA MOSTRAR</td></tr>";
  }

  tabla.innerHTML = mostrarTabla;
  darEventoBotonesCancelarReserva();
  darEventoBotonesAprobarReserva();
}

function darEventoBotonesAprobarReserva() {
  let botonesAprobar = document.querySelectorAll(".btn-aprobar-reserva");

  for (let i = 0; i < botonesAprobar.length; i++) {
    botonesAprobar[i].addEventListener("click", aprobarUnaReserva);
  }
}

function aprobarUnaReserva() {
  let idReserva = Number(this.getAttribute("data-id-reserva"));
  let reserva = SISTEMA.obtenerReservaPorId(idReserva);
  let motivoCancelacion = puedeAprobarReserva(reserva);
  if (motivoCancelacion === "") {
    SISTEMA.cambiarEstadoReserva(
      idReserva,
      "APROBADA",
      "Reserva aprobada por paseador"
    );
    SISTEMA.usuarioLogueado.cupos -= SISTEMA.resolverCuposNecesarios(
      reserva.usuario.tamanho
    );

    let mensajeCancelacion = SISTEMA.cancelacionAutumatica();
    if (mensajeCancelacion !== "") {
      document.querySelector("#mensajeCancelacionAutomatica").innerHTML =
        mensajeCancelacion;
    } else {
      document.querySelector("#mensajeCancelacionAutomatica").innerHTML = "";
    }
  } else {
    SISTEMA.cambiarEstadoReserva(idReserva, "RECHAZADA", motivoCancelacion);
    document.querySelector(
      "#mensajeCancelacionAutomatica"
    ).innerHTML = `Se ha rechazado la reserva numero: ${idReserva}, por incompatibilidad con perros asignados o limite de cupos.`;
  }

  document.querySelector("#mensajesDeErrorAgenda").innerHTML = "";
  completarTablaAgendasPendientesPaseador();
  completarTablaListadoPerros();
}

function completarTablaListadoPerros() {
  let tabla = document.querySelector("#tbodyListadoPerros");
  let reservasAprobadasDelPaseador =
    SISTEMA.obtenerRervasDelPaseadorLogeadoPorEstado("APROBADA");

  let mostrarTabla = "";

  for (let i = 0; i < reservasAprobadasDelPaseador.length; i++) {
    let item = reservasAprobadasDelPaseador[i];
    mostrarTabla += `<tr>
      <td>${item.id}</td>
      <td>${item.usuario.nombrePerro}</td>
      <td>${item.usuario.tamanho}</td>
    </tr>`;
  }

  if (mostrarTabla === "") {
    mostrarTabla = "<tr><td colspan='3'>SIN PERROS PARA MOSTRAR</td></tr>";
  }

  tabla.innerHTML = mostrarTabla;
  let cuposPaseador = SISTEMA.usuarioLogueado.cupos;
  document.querySelector(
    "#cuposDiponiblesPaseador"
  ).innerHTML = `Cupos diponibles: ${cuposPaseador}`;
  document.querySelector(
    "#cuposMaximosPaseador"
  ).innerHTML = `<br>Cupos maximos: 10`;
  document.querySelector(
    "#porsentajeCuposOcupados"
  ).innerHTML = `Cupos ocupados: ${(cuposPaseador * 100) / 10}%`;
}

function puedeAprobarReserva(nuevaReserva) {
  let cuposNuevos = SISTEMA.resolverCuposNecesarios(
    nuevaReserva.usuario.tamanho
  );

  let paseador = SISTEMA.usuarioLogueado;

  if (paseador.cupos < cuposNuevos) {
    return "No hay cupos suficientes para este paseador";
  }

  if (
    !SISTEMA.elTamanhoEsCompatibleConElRestoDeLosPerros(
      nuevaReserva.usuario.tamanho
    )
  ) {
    return "El tamaño de su perro no es compatible con los perros asignados al paseador";
  }

  return "";
}


// funcion estadistica (Defensa)
function mostrarEstadisticas() {
  document.querySelector("#mostrarLogin").style.display = "none";
  document.querySelector("#paginaEstadistica").style.display = "block"
  let clientes = SISTEMA.usuariosClientes();
  let promedioEdadClientes = SISTEMA.promedioEdades(clientes);
  let paseadores = SISTEMA.usuariosPaseadores();
  let promedioEdadPaseadores = SISTEMA.promedioEdades(paseadores);
  let edadPaseadorMasJoven = SISTEMA.hallarUsuarioMasJoven(paseadores);
  let edadClienteMasJoven = SISTEMA.hallarUsuarioMasJoven(clientes);

  document.querySelector("#textoEstadisticas").innerHTML = `El promedio de edad de clientes es: ${promedioEdadClientes}<br>El promedio de edad de paseadores es: ${promedioEdadPaseadores}<br>El paseador mas joven es: ${edadPaseadorMasJoven} y el cliente mas joven es: ${edadClienteMasJoven}`
}