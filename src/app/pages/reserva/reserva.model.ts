export enum EstadoReserva {
  PROCESANDO = "procesando",
  ACEPTADA = "aceptada",
  RECHAZADA = "rechazada"
}

export interface Reserva {
  name: string | undefined;
  surname: string | undefined;
  email: string | undefined;
  phone: number | undefined;
  llegada: Date | undefined;
  salida: Date | undefined;
  adultos: number | undefined;
  niños?: number | undefined;
  estado: EstadoReserva;
}
