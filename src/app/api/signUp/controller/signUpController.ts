import fs from "fs";
import path from "path";
import bcrypt from "bcryptjs";
import { IUsers } from "../../login/types/login.types";

interface SignupInput {
  email: string;
  password: string;
  phoneNumber: number | string;
  address: string;
}

export async function signupUser(data: SignupInput) {
  const usersPath = path.join(process.cwd(), "data/users.json");
  const users: IUsers[] = JSON.parse(fs.readFileSync(usersPath, "utf-8"));

  if (users.find((u) => u.email === data.email)) {
    return { error: "Email already exists" };
  }

  const hashedPassword = await bcrypt.hash(data.password, 10);
  const newUser: IUsers = {
    id: Date.now(),
    email: data.email,
    password: hashedPassword,
    phoneNumber: data.phoneNumber,
    address: data.address,
  };

  users.push(newUser);
  fs.writeFileSync(usersPath, JSON.stringify(users, null, 2));

  return { success: true };
}
