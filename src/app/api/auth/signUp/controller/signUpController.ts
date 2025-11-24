import fs from "fs";
import path from "path";
import bcrypt from "bcryptjs";
import { IUsers } from "../../login/types/login.types";

interface SignupInput {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  phoneNumber: number | string;
  address: string;
}

export async function signupUser(data: SignupInput) {
  const usersPath = path.join(process.cwd(), "data/users/users.json");

  let users: IUsers[] = [];
  try {
    if (!fs.existsSync(usersPath)) {
      fs.mkdirSync(path.dirname(usersPath), { recursive: true });
      fs.writeFileSync(usersPath, "[]", "utf-8");
    }
    const fileData = fs.readFileSync(usersPath, "utf-8");
    users = JSON.parse(fileData || "[]");
  } catch (err) {
    console.error("Error reading users file:", err);
    return { error: "Internal server error while reading users file" };
  }

  if (users.find((u) => u.email === data.email)) {
    return { error: "Email already exists" };
  }

  if (data.password !== data.confirmPassword) {
    return { error: "Password does not match!" };
  }

  const hashedPassword = await bcrypt.hash(data.password, 10);

  const newUser: IUsers = {
    id: Date.now(),
    name: `${data.firstName} ${data.lastName}`,
    email: data.email,
    password: hashedPassword,
    phoneNumber: data.phoneNumber,
    address: data.address,
  };

  users.push(newUser);

  try {
    fs.writeFileSync(usersPath, JSON.stringify(users, null, 2), "utf-8");
  } catch (err) {
    console.error("Error writing users file:", err);
    return { error: "Internal server error while saving user" };
  }

  return { success: true };
}
