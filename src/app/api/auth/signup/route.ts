import { NextResponse } from "next/server";
import { createUser } from "@/lib/auth-helpers";
import { z } from "zod";

const signupSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8, "Password must be at least 8 characters"),
  name: z.string().min(2, "Name must be at least 2 characters"),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    const validation = signupSchema.safeParse(body);
    if (!validation.success) {
      return NextResponse.json(
        { error: validation.error.issues[0].message },
        { status: 400 }
      );
    }

    const user = await createUser(validation.data);
    
    return NextResponse.json(
      { 
        success: true, 
        message: "Account created successfully",
        user: {
          id: user.id,
          email: user.email,
          name: user.name,
        }
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Signup error:", error);
    
    if (error instanceof Error && error.message === "User already exists") {
      return NextResponse.json(
        { error: "Email already registered" },
        { status: 409 }
      );
    }
    
    return NextResponse.json(
      { error: "Failed to create account" },
      { status: 500 }
    );
  }
}