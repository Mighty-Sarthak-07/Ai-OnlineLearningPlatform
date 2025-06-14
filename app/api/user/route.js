import { db } from "@/config/db";
import { usersTable } from "@/config/schema";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function POST(req) {
    try {
        const { email, name } = await req.json();

        // Validate required fields
        if (!email || !name) {
            return NextResponse.json(
                { error: "Email and name are required" },
                { status: 400 }
            );
        }

        // Check if user already exists
        const existingUser = await db
            .select()
            .from(usersTable)
            .where(eq(usersTable.email, email));

        // If user exists, return the user
        if (existingUser?.length > 0) {
            return NextResponse.json(existingUser[0]);
        }

        // Create new user
        const newUser = await db
            .insert(usersTable)
            .values({
                name,
                email,
            })
            .returning(usersTable);

        return NextResponse.json(newUser[0]);

    } catch (error) {
        console.error('Error in user API:', error);
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
}
