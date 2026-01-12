import {
  numeric,
  pgTable,
  serial,
  text,
  timestamp,
  unique,
  uuid,
  varchar,
} from "drizzle-orm/pg-core";

export const users = pgTable(
  "users",
  {
    id: serial().primaryKey().notNull(),
    email: varchar({ length: 255 }).notNull(),
    password: text().notNull(),
    nombre: varchar({ length: 100 }).notNull(),
    rol: varchar({ length: 50 }).default("user"),
    fechaCreacion: timestamp("fecha_creacion", { mode: "string" })
      .defaultNow()
      .notNull(),
  },
  (table) => [unique("users_email_unique").on(table.email)]
);

export const gastos = pgTable("gastos", {
  id: uuid().primaryKey().notNull(),
  fecha: timestamp({ withTimezone: true, mode: "string" }).notNull(),
  categoria: varchar({ length: 100 }).notNull(),
  monto: numeric({ precision: 10, scale: 2 }).notNull(),
  descripcion: varchar({ length: 255 }),
  deletedAt: timestamp({ withTimezone: true, mode: "string" }),
  createdAt: timestamp({ withTimezone: true, mode: "string" }).notNull(),
  updatedAt: timestamp({ withTimezone: true, mode: "string" }).notNull(),
});

export const ventas = pgTable("ventas", {
  id: uuid().primaryKey().notNull(),
  fecha: timestamp({ withTimezone: true, mode: "string" }).notNull(),
  categoria: varchar({ length: 100 }).notNull(),
  monto: numeric({ precision: 10, scale: 2 }).notNull(),
  descripcion: varchar({ length: 255 }),
  deletedAt: timestamp({ withTimezone: true, mode: "string" }),
  createdAt: timestamp({ withTimezone: true, mode: "string" }).notNull(),
  updatedAt: timestamp({ withTimezone: true, mode: "string" }).notNull(),
});
