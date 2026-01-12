export interface User {
  id: number;
  email: string;
  password: string;
  nombre: string;
  rol: string | null;
  fechaCreacion: Date;
}
