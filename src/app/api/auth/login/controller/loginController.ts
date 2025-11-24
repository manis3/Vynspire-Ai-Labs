import fs from "fs";
import path from "path";
import bcrypt from "bcryptjs";
import { IUsers } from "../types/login.types";
import jwt from "jsonwebtoken";
import { AUTH_SECRET } from "@/secrets/secrets";

const errorMessage = { message: "Invalid email and password", status: 404 };

export async function authenticateUser(email: string, password: string) {
  const usersPath = path.join(process.cwd(), "data/users/users.json");
  const users = JSON.parse(fs.readFileSync(usersPath, "utf-8"));

  const user = users.find((user: IUsers) => user.email === email);
  if (!user) return { error: errorMessage };

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return { error: errorMessage };

  const token = jwt.sign({ id: user.id, email: user.email }, AUTH_SECRET!, {
    expiresIn: "1h",
  });

  return { accessToken: token };
}
