import { db } from "@/config/db";
import { coursesTable } from "@/config/schema";
import { currentUser } from "@clerk/nextjs/server";
import { desc, eq, sql } from "drizzle-orm";
import { NextResponse } from "next/server";



export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const courseId = searchParams?.get('courseId');
    const user = await currentUser();

    if (courseId === "0") {
      const result = await db
        .select()
        .from(coursesTable)
        .where(sql`${coursesTable.courseContent} is not null and ${coursesTable.courseContent}::jsonb != '{}'::jsonb`);
      return NextResponse.json(result);
    }

    if (courseId) {
      const result = await db
        .select()
        .from(coursesTable)
        .where(eq(coursesTable.cid, courseId));
      
      return NextResponse.json(result[0] || null);
    } 
    
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const email = user.primaryEmailAddress?.emailAddress;
    if (!email) {
      return NextResponse.json({ error: "User email not found" }, { status: 400 });
    }

    const result = await db
      .select()
      .from(coursesTable)
      .where(eq(coursesTable.userEmail, email))
      .orderBy(desc(coursesTable.id));

    return NextResponse.json(result);
  } catch (error) {
    console.error("API Error in courses route:", error);
    return NextResponse.json({ 
      error: "Internal Server Error", 
      details: error.message 
    }, { status: 500 });
  }
}