import bcrypt from "bcrypt";
import { eq } from "drizzle-orm";
import jwt from "jsonwebtoken";
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

  async login(email: string, password: string) {
    const user = await db
      .select()
      .from(users)
      .where(eq(users.email, email))
      .limit(1);

    if (user.length === 0 && user[0] === undefined) {
      throw new ConflictError("USER_NOT_FOUND");
    }

    const isMatch = await bcrypt.compare(password, user[0]!.password);

    if (!isMatch) {
      throw new ConflictError("INVALID_CREDENTIALS");
    }

    const token = jwt.sign(
      {
        id: user[0]!.id,
        rol: user[0]!.rol,
      },
      process.env.JWT_SECRET!
    );

    const [foundUser] = user;
    return { ...foundUser, token };
  }
}
