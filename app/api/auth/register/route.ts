import { db } from "@/lib/db";
import { signUpSchema } from "@/schema/signUpSchema";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";

export async function POST(request: Request) {
  const body: unknown = await request.json();
  const result = signUpSchema.safeParse(body);

  if (!result.success) {
    return NextResponse.json("Missing fields, Wrong Data", { status: 203 });
  }

  const { email, password, username } = result.data;
  try {
    const existedUsername = await db.user.findUnique({
      where: {
        username,
      },
    });
    if (existedUsername)
      return NextResponse.json("Username already exists", { status: 202 });

    const existedEmail = await db.user.findUnique({
      where: {
        email,
      },
    });
    if (existedEmail)
      return NextResponse.json("Email already exists", { status: 201 });

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await db.user.create({
      data: {
        username,
        email,
        hashedPassword,
      },
    });

    return NextResponse.json(newUser, { status: 200 });
  } catch (error) {
    return NextResponse.json("Something went wrong", { status: 204 });
  }
}
