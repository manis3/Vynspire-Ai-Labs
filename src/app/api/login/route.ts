import { NextRequest, NextResponse } from "next/server";
import { authenticateUser } from "./controller/loginController";

export async function POST(req: NextRequest) {
  const { email, password } = await req.json();

  const result = await authenticateUser(email, password);

  if ("error" in result) {
    return NextResponse.json({ message: result.error }, { status: 401 });
  }

  return NextResponse.json({ accessToken: result.accessToken });
}
