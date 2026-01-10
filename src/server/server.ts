import cors from "cors";
import "dotenv/config";
import express, { Application } from "express";
import { createServer, Server as ServerNode } from "http";
import { ApiPaths } from "../routes";

export class Server {
  private app: Application;
  private port: string;
  ServerNode: ServerNode;

  constructor() {
    this.app = express();
    this.port = process.env.PORT || "3000";

    // Métodos iniciales
    this.middlewares();
    this.routes();
    this.ServerNode = createServer(this.app);
  }

  middlewares() {
    this.app.use(
      cors({
        origin: "*",
        methods: ["GET", "POST", "PUT", "DELETE"],
        allowedHeaders: ["Content-Type", "Authorization"],
        credentials: true,
      })
    );
    this.app.use(express.json());
  }

  routes() {
    ApiPaths.forEach(({ url, router }) => {
      try {
        this.app.use(url, router);
        console.log(`✅ Ruta cargada: /api${url}`);
      } catch (error) {
        console.error(`❌ Error al cargar la ruta ${url}:`, error);
      }
    });
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log(`🚀 Servidor corriendo en puerto: ${this.port}`);
    });
  }
}
