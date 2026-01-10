export interface User {
  id: number;
  email: string;
  password: string;
  nombre: string | null;
  rol: string;
  fechaCreacion: Date;
}
