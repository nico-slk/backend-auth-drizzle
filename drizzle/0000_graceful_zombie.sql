-- Current sql file was generated after introspecting the database
-- If you want to run this migration please uncomment this code before executing migrations
/*
CREATE TABLE "users" (
	"id" serial PRIMARY KEY NOT NULL,
	"email" varchar(255) NOT NULL,
	"password" text NOT NULL,
	"nombre" varchar(100),
	"rol" varchar(50) DEFAULT 'user',
	"fecha_creacion" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
--> statement-breakpoint
CREATE TABLE "gastos" (
	"id" uuid PRIMARY KEY NOT NULL,
	"fecha" timestamp with time zone NOT NULL,
	"categoria" varchar(100) NOT NULL,
	"monto" numeric(10, 2) NOT NULL,
	"descripcion" varchar(255),
	"deletedAt" timestamp with time zone,
	"createdAt" timestamp with time zone NOT NULL,
	"updatedAt" timestamp with time zone NOT NULL
);
--> statement-breakpoint
CREATE TABLE "ventas" (
	"id" uuid PRIMARY KEY NOT NULL,
	"fecha" timestamp with time zone NOT NULL,
	"categoria" varchar(100) NOT NULL,
	"monto" numeric(10, 2) NOT NULL,
	"descripcion" varchar(255),
	"deletedAt" timestamp with time zone,
	"createdAt" timestamp with time zone NOT NULL,
	"updatedAt" timestamp with time zone NOT NULL
);

*/