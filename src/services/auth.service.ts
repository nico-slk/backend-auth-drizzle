import { eq } from "drizzle-orm";
import { db } from "../db/index";
import { users } from "../db/schema";
import { ConflictError } from "../handlers/error.handler";
import { User } from "../interfaces/auth.interface";

export class AuthService {
  async register(userData: User) {
    return await db.transaction(async (tx) => {
      const existingUser = await tx
        .select()
        .from(users)
        .where(eq(users.email, userData.email))
        .limit(1);

      if (existingUser.length > 0) {
        throw new ConflictError("USER_EXISTS");
      }

      const [newUser] = await tx
        .insert(users)
        .values({
          nombre: userData.nombre,
          email: userData.email,
          password: userData.password,
        })
        .returning();

      return newUser;
    });
  }
}
