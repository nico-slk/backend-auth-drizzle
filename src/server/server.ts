import cors from "cors";
import "dotenv/config";
import express, { Application } from "express";

// Importa tus rutas (asumiendo que crearás este archivo luego)
// import userRoutes from './routes/user.routes';

export class Server {
  private app: Application;
  private port: string;

  constructor() {
    this.app = express();
    this.port = process.env.PORT || "3000";

    // Métodos iniciales
    this.middlewares();
    this.routes();
  }

  middlewares() {
    // CORS: Permite que otros dominios se conecten a tu API
    this.app.use(cors());

    // Lectura y parseo del body (JSON)
    this.app.use(express.json());

    // Carpeta pública (opcional)
    this.app.use(express.static("public"));
  }

  routes() {
    // Aquí definirás tus endpoints
    // this.app.use('/api/users', userRoutes);

    // Ruta de prueba
    this.app.get("/ping", (_req, res) => {
      res.json({ msg: "API de Autenticación funcionando" });
    });
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log(`🚀 Servidor corriendo en puerto: ${this.port}`);
    });
  }
}
