import { db } from "@/config/db";
import { usersTable } from "@/config/schema";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";
import { z } from "zod";

const UserSchema = z.object({
    email: z.string().email(),
    name: z.string().min(3),
});

export async function POST(req) {
    try {
        const body = await req.json();

        const validation = UserSchema.safeParse(body);
        if (!validation.success) {
            return NextResponse.json(
                { error: "Invalid Input", details: validation.error.flatten().fieldErrors },
                { status: 400 }
            );
        }

        const { email, name } = validation.data;

        // If user already exists
        const existingUser = await db.query.usersTable.findFirst({
            where: eq(usersTable.email, email),
        });

        if (existingUser) {
            return NextResponse.json(
                { message: "User already exists", user: existingUser },
                { status: 200 }
            );
        }

        // Create new user
        const newUser = await db.insert(usersTable)
            .values({ name, email })
            .returning();

        return NextResponse.json(
            { message: "User created successfully", user: newUser[0] },
            { status: 201 }
        );
    } catch (error) {
        console.error("User creation error: ", error)
        return NextResponse.json(
            { message: "Internal Server Error" },
            { status: 500 }
        );
    }
}
