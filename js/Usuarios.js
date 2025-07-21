let idUltimoUsuario = 0;

class Usuario {
  constructor(_Nombre, _NombrePerro, _TamanhoPerro, _Password, _Paseador) {
    this.id = idUltimoUsuario++;
    this.nombre = _Nombre;
    this.nombrePerro = _NombrePerro;
    this.tamanho = _TamanhoPerro;
    this.password = _Password;
    this.esPaseador = _Paseador;
    this.cupos = 0;
    // Se agrega propidad (Defensa)
    this.edad = 0;
  }
}
