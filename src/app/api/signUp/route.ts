import { NextRequest, NextResponse } from "next/server";
import { signupUser } from "./controller/signUpController";

export async function POST(req: NextRequest) {
  try {
    const { email, password, phoneNumber, address } = await req.json();

    const result = await signupUser({ email, password, phoneNumber, address });

    if ("error" in result) {
      return NextResponse.json({ message: result.error }, { status: 400 });
    }

    return NextResponse.json(
      { message: "User registered successfully" },
      { status: 200 },
    );
  } catch {
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 },
    );
  }
}
