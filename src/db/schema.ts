import { pgTable, serial, text, timestamp, varchar } from "drizzle-orm/pg-core";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  email: varchar("email", { length: 255 }).notNull().unique(),
  password: text("password").notNull(), // Aquí guardarás el hash
  nombre: varchar("nombre", { length: 100 }),
  rol: varchar("rol", { length: 50 }).default("user"),
  fechaCreacion: timestamp("fecha_creacion").defaultNow().notNull(),
});
