import bcryptjs from "bcryptjs";
import { db } from "@/lib/db";
import { users } from "@/lib/db/schema";
import { eq } from "drizzle-orm";

const SALT_ROUNDS = 12;

export async function hashPassword(password: string): Promise<string> {
  return bcryptjs.hash(password, SALT_ROUNDS);
}

export async function verifyPassword(password: string, hashedPassword: string): Promise<boolean> {
  return bcryptjs.compare(password, hashedPassword);
}

export async function createUser(data: {
  email: string;
  password: string;
  name: string;
}) {
  const existingUser = await db
    .select()
    .from(users)
    .where(eq(users.email, data.email))
    .limit(1);

  if (existingUser.length > 0) {
    throw new Error("User already exists");
  }

  const hashedPassword = await hashPassword(data.password);

  const newUser = await db
    .insert(users)
    .values({
      email: data.email,
      password: hashedPassword,
      name: data.name,
      role: "user",
    })
    .returning();

  return {
    id: newUser[0].id,
    email: newUser[0].email,
    name: newUser[0].name,
    role: newUser[0].role,
  };
}

export async function getUserByEmail(email: string) {
  const user = await db
    .select()
    .from(users)
    .where(eq(users.email, email))
    .limit(1);

  return user[0] || null;
}

export async function updateUserRole(userId: string, role: "admin" | "editor" | "viewer" | "user") {
  const updatedUser = await db
    .update(users)
    .set({ role, updatedAt: new Date() })
    .where(eq(users.id, userId))
    .returning();

  return updatedUser[0];
}