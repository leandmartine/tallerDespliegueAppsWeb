let idUltimaReserva = 0;

class Reserva {
  constructor(_Usuario, _Paseador) {
    this.id = idUltimaReserva++;
    this.usuario = _Usuario;
    this.paseador = _Paseador;
    this.estado = "PENDIENTE";
    this.motivo = "";
  }
}
