class Sistema {
  constructor() {
    this.usuarios = [];
    this.reservas = [];
    this.paseadores = [];
    this.usuarioLogueado = null;
  }

  loginUsuario(_Nombre, _Password) {
    let errores = [];
    if (_Nombre === "") {
      errores.push("El nombre de usuario es obligatorio");
    }
    if (_Password === "") {
      errores.push("La contraseña es obligatoria");
    }

    if (errores.length > 0) {
      return errores;
    }

    let unUsuario = this.buscarUnUsuarioPorNombre(_Nombre);

    if (unUsuario !== null && unUsuario.password === _Password) {
      this.usuarioLogueado = unUsuario;
      return [];
    } else {
      errores.push("Usuario o contraseña incorrectos");
      return errores;
    }
  }

  logout() {
    this.usuarioLogueado = null;
  }

  precargarDatos() {
    // Usuarios Clientes
    // Se agrega edad a los usuarios (Defensa)
    this.usuarios.push(
      new Usuario("Luis", "Rex", "S", "Luis@123", false));
    this.usuarios[this.usuarios.length - 1].edad = 18;
    this.usuarios.push(
      new Usuario("Sofia", "Toby", "M", "Sofi@123", false));
    this.usuarios[this.usuarios.length - 1].edad = 29;
    this.usuarios.push(
      new Usuario("Juan", "Luna", "G", "Juan#123", false));
    this.usuarios[this.usuarios.length - 1].edad = 21;
    this.usuarios.push(
      new Usuario("Mati", "Max", "M", "Mati&321", false));
    this.usuarios[this.usuarios.length - 1].edad = 20;
    this.usuarios.push(
      new Usuario("Anita", "Rocky", "S", "Ana@654", false));
    this.usuarios[this.usuarios.length - 1].edad = 27;
    this.usuarios.push(
      new Usuario("Carlos", "Simba", "G", "Car1o$C", false));
    this.usuarios[this.usuarios.length - 1].edad = 32;
    this.usuarios.push(
      new Usuario("Valen", "Bruno", "G", "Val3n#Dog", false));
    this.usuarios[this.usuarios.length - 1].edad = 44;
    this.usuarios.push(
      new Usuario("Julia", "Milo", "S", "JuLia$12", false));
    this.usuarios[this.usuarios.length - 1].edad = 34;
    this.usuarios.push(
      new Usuario("Pedrito", "Zeus", "M", "Pedr1t0$", false));
    this.usuarios[this.usuarios.length - 1].edad = 30;
    this.usuarios.push(
      new Usuario("Luci", "Chispa", "G", "Luc1a&C9", false));
    this.usuarios[this.usuarios.length - 1].edad = 39;
    this.usuarios.push(
      new Usuario("Nico", "Bobby", "S", "Nico#202", false));
    this.usuarios[this.usuarios.length - 1].edad = 22;
    this.usuarios.push(
      new Usuario("Flor", "Daisy", "M", "Flor$321", false));
    this.usuarios[this.usuarios.length - 1].edad = 21;
    this.usuarios.push(
      new Usuario("Tomas", "Coco", "G", "Tom@sC44", false));
    this.usuarios[this.usuarios.length - 1].edad = 55;
    this.usuarios.push(
      new Usuario("Martina", "Lola", "S", "Mart1n@C", false));
    this.usuarios[this.usuarios.length - 1].edad = 47;
    this.usuarios.push(
      new Usuario("Agus", "Rocco", "M", "Agus$555", false));
    this.usuarios[this.usuarios.length - 1].edad = 44;
    this.usuarios.push(
      new Usuario("Santi", "Thor", "G", "Santi#77", false));
    this.usuarios[this.usuarios.length - 1].edad = 52;
    this.usuarios.push(
      new Usuario("Paula", "Nina", "S", "Paul@C88", false));
    this.usuarios[this.usuarios.length - 1].edad = 68;
    this.usuarios.push(
      new Usuario("Diego", "Jazz", "M", "Dieg0$99", false));
    this.usuarios[this.usuarios.length - 1].edad = 54;
    this.usuarios.push(
      new Usuario("Mica", "Fiona", "G", "Mica%123", false));
    this.usuarios[this.usuarios.length - 1].edad = 23;
    this.usuarios.push(
      new Usuario("Rocio", "Tina", "S", "Roci0&C7", false));
    this.usuarios[this.usuarios.length - 1].edad = 25;

    // Usuarios Paseadores
    // Se agrega edad a los usuarios (Defensa)
    this.usuarios.push(
      new Usuario("Rodrigo", "null", "null", "Rodr1g0$", true)
    );
    this.usuarios[this.usuarios.length - 1].cupos = 10;
    this.usuarios[this.usuarios.length - 1].edad = 21;

    this.usuarios.push(new Usuario("Pedro", "null", "null", "Pedr0#456", true));
    this.usuarios[this.usuarios.length - 1].cupos = 10;
    this.usuarios[this.usuarios.length - 1].edad = 22;

    this.usuarios.push(
      new Usuario("Matias", "null", "null", "Mat1as$789", true)
    );
    this.usuarios[this.usuarios.length - 1].cupos = 10;
    this.usuarios[this.usuarios.length - 1].edad = 25;

    this.usuarios.push(new Usuario("Ana", "null", "null", "Ana@159", true));
    this.usuarios[this.usuarios.length - 1].cupos = 10;
    this.usuarios[this.usuarios.length - 1].edad = 29;

    this.usuarios.push(new Usuario("Lucia", "null", "null", "Lucia&654", true));
    this.usuarios[this.usuarios.length - 1].cupos = 10;
    this.usuarios[this.usuarios.length - 1].edad = 24;

    // Reservas
    this.reservas.push(
      new Reserva(this.usuarios[0], this.usuarios[20]),
      new Reserva(this.usuarios[1], this.usuarios[21]),
      new Reserva(this.usuarios[2], this.usuarios[22]),
      new Reserva(this.usuarios[3], this.usuarios[23]),
      new Reserva(this.usuarios[4], this.usuarios[24]),
      new Reserva(this.usuarios[5], this.usuarios[20]),
      new Reserva(this.usuarios[6], this.usuarios[21]),
      new Reserva(this.usuarios[7], this.usuarios[22]),
      new Reserva(this.usuarios[8], this.usuarios[23]),
      new Reserva(this.usuarios[9], this.usuarios[24])
    );



    this.cambiarEstadoReserva(1, "APROBADA", "Reserva aprobada por paseador");
    this.cambiarEstadoReserva(3, "APROBADA", "Reserva aprobada por paseador");
    this.cambiarEstadoReserva(4, "CANCELADO", "Cancelada por el paseador");
    this.cambiarEstadoReserva(6, "RECHAZADA", "No hay cupos suficientes");
    this.cambiarEstadoReserva(7, "APROBADA", "Reserva aprobada por paseador");
    this.cambiarEstadoReserva(9, "APROBADA", "Reserva aprobada por paseador");
  }

  buscarUnUsuarioPorNombre(_Nombre) {
    //comprueba si es paseador
    let usuarioEncontrado = null;
    let i = 0;

    while (usuarioEncontrado === null && i < this.usuarios.length) {
      if (this.usuarios[i].nombre.toUpperCase() === _Nombre.toUpperCase()) {
        usuarioEncontrado = this.usuarios[i];
      }
      i++;
    }

    return usuarioEncontrado;
  }

  logout() {
    this.usuarioLogueado = null;
  }

  agregarUsuario(_Nombre, _NombrePerro, _TamanhoPerro, _Password, _Paseador) {
    let errores = this.validarDatosPersona(
      _Nombre,
      _NombrePerro,
      _TamanhoPerro,
      _Password
    );

    if (errores.length === 0) {
      let unUsuario = new Usuario(
        _Nombre,
        _NombrePerro,
        _TamanhoPerro,
        _Password,
        _Paseador
      );
      this.usuarios.push(unUsuario);
      console.log(unUsuario); //Para recordar datos
    }
    return errores;
  }

  validarDatosPersona(_Nombre, _NombrePerro, _TamanhoPerro, _Password) {
    let errores = [];

    if (_Nombre === "") {
      errores.push("El nombre de usuario es obligatorio");
    }
    if (_NombrePerro === "") {
      errores.push("El nombre del perro es obligatorio");
    }
    if (_TamanhoPerro === "") {
      errores.push("Debe seleccionar el tamaño del perro");
    }
    if (_Password === "") {
      errores.push("La contraseña es obligatoria");
    }

    if (this.existeNombre(_Nombre)) {
      errores.push("El nombre de usuario no está disponible");
    }
    if (_Nombre.indexOf(" ") >= 0 || _NombrePerro.indexOf(" ") >= 0) {
      errores.push(
        "El nombre de usuario / nombre de perro no puede contener espacios"
      );
    }

    if (!this.passwordValido(_Password) && _Password !== "") {
      errores.push(
        "La contraseña tiene que tener al menos 1 numero, 1 mayúscula, 1 minúscula y 5 de largo como mínimo"
      );
    }
    return errores;
  }

  existeNombre(_Nombre) {
    let unUsuario = this.buscarUnUsuarioPorNombre(_Nombre);
    return unUsuario !== null;
  }

  buscarUnUsuarioPorNombre(_Nombre) {
    let usuarioEncontrado = null;
    let i = 0;

    while (usuarioEncontrado === null && i < this.usuarios.length) {
      if (this.usuarios[i].nombre.toUpperCase() === _Nombre.toUpperCase()) {
        usuarioEncontrado = this.usuarios[i];
      }
      i++;
    }

    return usuarioEncontrado;
  }

  passwordValido(_Password) {
    let tieneNumero = false;
    let tieneMayuscula = false;
    let tieneMinuscula = false;
    let i = 0;

    while (
      (!tieneMayuscula || !tieneMinuscula || !tieneNumero) &&
      i < _Password.length
    ) {
      let char = _Password.charAt(i);
      if (_Password.charCodeAt(i) >= 48 && _Password.charCodeAt(i) <= 57) {
        tieneNumero = true;
      } else if (
        _Password.charCodeAt(i) >= 65 &&
        _Password.charCodeAt(i) <= 90
      ) {
        tieneMayuscula = true;
      } else if (
        _Password.charCodeAt(i) >= 97 &&
        _Password.charCodeAt(i) <= 122
      ) {
        tieneMinuscula = true;
      }
      i++;
    }

    return (
      tieneNumero && _Password.length >= 5 && tieneMayuscula && tieneMinuscula
    );
  }

  perfilPaseador(_Nombre) {
    let usuario = this.buscarUnUsuarioPorNombre(_Nombre);

    if (usuario !== null) {
      return usuario.esPaseador;
    } else {
      return false;
    }
  }

  usuariosPaseadores() {
    let paseadores = [];
    for (let i = 0; i < this.usuarios.length; i++) {
      let item = this.usuarios[i];
      if (item.esPaseador) {
        paseadores.push(item);
      }
    }
    return paseadores;
  }

  agregarReserva(_Usuario, _Paseador) {
    let nuevaReserva = new Reserva(_Usuario, _Paseador);
    this.reservas.push(nuevaReserva);
  }

  obtenerRervasDelUsuarioLogueadoPorEstado(_Estado) {
    let reservas = [];

    for (let i = 0; i < this.reservas.length; i++) {
      let item = this.reservas[i];
      if (
        item.usuario.id === this.usuarioLogueado.id &&
        item.estado === _Estado
      ) {
        reservas.push(item);
      }
    }
    return reservas;
  }

  obtenerRervasDelPaseadorLogeadoPorEstado(_Estado) {
    let reservas = [];

    for (let i = 0; i < this.reservas.length; i++) {
      let item = this.reservas[i];
      if (
        item.paseador.id === this.usuarioLogueado.id &&
        item.estado === _Estado
      ) {
        reservas.push(item);
      }
    }
    return reservas;
  }

  cambiarEstadoReserva(_IdReserva, _Nuevoestado, _MotivoNuevoEstado) {
    let reservaEncontrada = false;
    let i = 0;
    while (i < this.reservas.length && !reservaEncontrada) {
      if (this.reservas[i].id === _IdReserva) {
        this.reservas[i].estado = _Nuevoestado;
        this.reservas[i].motivo = _MotivoNuevoEstado;

        reservaEncontrada = true;
      }
      i++;
    }
  }

  cambiarCuposPaseador() {
    let paseadores = [];
    if (SISTEMA.usuarios.esPaseador === true) {}
  }

  obtenerReservaPorId(idReserva) {
    let reserva = null;
    let i = 0;

    while (i < this.reservas.length && reserva === null) {
      let item = this.reservas[i];
      if (item.id === idReserva) {
        reserva = item;
      }
      i++;
    }
    return reserva;
  }

  elTamanhoEsCompatibleConElRestoDeLosPerros(tamanho) {
    let reservas = this.obtenerRervasDelPaseadorLogeadoPorEstado("APROBADA");

    let esCompatible = true;
    let i = 0;

    while (i < reservas.length && esCompatible) {
      let item = reservas[i];

      if (
        (tamanho === "S" && item.usuario.tamanho === "G") ||
        (tamanho === "G" && item.usuario.tamanho === "S")
      ) {
        esCompatible = false;
      }
      i++;
    }
    return esCompatible;
  }

  elTamanhoEsCompatibleConElRestoDeLosPerrosParaPaseador(tamanho, paseador) {
    let reservas = [];
    for (let i = 0; i < this.reservas.length; i++) {
      let item = this.reservas[i];
      if (item.paseador.id === paseador.id && item.estado === "APROBADA") {
        reservas.push(item);
      }
    }

    let esCompatible = true;
    let i = 0;

    while (i < reservas.length && esCompatible) {
      let item = reservas[i];
      if (
        (tamanho === "S" && item.usuario.tamanho === "G") ||
        (tamanho === "G" && item.usuario.tamanho === "S")
      ) {
        esCompatible = false;
      }
      i++;
    }
    return esCompatible;
  }

  resolverCuposNecesarios(tamanho) {
    if (tamanho === "S") return 1;
    if (tamanho === "M") return 2;
    if (tamanho === "G") return 4;
    return 0;
  }

  cancelacionAutumatica() {
    let reservasPendientes =
      this.obtenerRervasDelPaseadorLogeadoPorEstado("PENDIENTE");
    let cuposDisponibles = this.usuarioLogueado.cupos;
    let mensaje = "";

    for (let i = 0; i < reservasPendientes.length; i++) {
      let reserva = reservasPendientes[i];
      let cuposNecesarios = this.resolverCuposNecesarios(
        reserva.usuario.tamanho
      );
      let motivo = "";

      if (cuposDisponibles < cuposNecesarios) {
        motivo = "No hay cupos suficientes para esta reserva";
      } else if (
        !this.elTamanhoEsCompatibleConElRestoDeLosPerros(
          reserva.usuario.tamanho
        )
      ) {
        motivo =
          "El tamaño de su perro no es compatible con los perros asignados al paseador";
      }

      if (motivo !== "") {
        this.cambiarEstadoReserva(reserva.id, "RECHAZADA", motivo);
        mensaje += `Se ha rechazado automaticamente la reserva numero: ${reserva.id}<br>Por el motivo enviado al cliente: ${motivo}<br>`;
      }
    }
    return mensaje;
  }

  // funciones de la defensa

  usuariosClientes() {
    let clientes = [];
    for (let i = 0; i < this.usuarios.length; i++) {
      let item = this.usuarios[i];
      if (!item.esPaseador) {
        clientes.push(item);
      }
    }
    return clientes;
  }

  promedioEdades(usuarios) {
    let edades = 0;
    let cantidadDeUsuarios = 0
    let promedio = 0;
    for (let i = 0; i < usuarios.length; i++) {
      let item = usuarios[i];
      edades += item.edad
      cantidadDeUsuarios++;
    }
    promedio = edades / cantidadDeUsuarios;

    return promedio;
  }

  hallarUsuarioMasJoven(usuario) {
    let ultimaEdad = 100;
    let edadMenorAlMomento = 100;
    for (let i = 0; i < usuario.length; i++) {
      let item = usuario[i]
      ultimaEdad = item.edad
      if (ultimaEdad < edadMenorAlMomento) {
        edadMenorAlMomento = ultimaEdad;
      }
    }
    return edadMenorAlMomento;
  }



}