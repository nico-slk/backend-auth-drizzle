import { users } from "../db/schema";

declare global {
  namespace Express {
    interface Request {
      user?: typeof users.$inferSelect; // Esto tipa automáticamente al usuario según Drizzle
    }
  }
}
