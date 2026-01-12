import { eq } from "drizzle-orm";
import { db } from "../db";
import { users } from "../db/schema";
import { ConflictError } from "../handlers/error.handler";

interface IUserResponse {
  id: number;
  email: string;
  nombre: string;
  rol: string | null;
  fechaCreacion: Date;
}

export class UserService {
  async getUserById(userId: string): Promise<IUserResponse | null> {
    try {
      const user = await db
        .select({
          id: users.id,
          nombre: users.nombre,
          email: users.email,
          rol: users.rol,
          fechaCreacion: users.fechaCreacion,
        })
        .from(users)
        .where(eq(users.id, parseInt(userId, 10)))
        .limit(1);

      if (user.length <= 0) {
        throw new ConflictError("USER_EXISTS");
      }

      return user[0] || null;
    } catch (error) {
      throw error;
    }
  }
}
