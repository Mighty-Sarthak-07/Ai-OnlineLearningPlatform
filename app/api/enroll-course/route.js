import { db } from "@/config/db";
import { coursesTable, enrollCoursesTable } from "@/config/schema";
import { currentUser } from "@clerk/nextjs/server";
import { and, desc, eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function POST(req) {
    try {
    const { cid } = await req.json();
    const user = await currentUser();
    const enrollCourses = await db.select().from(enrollCoursesTable).where(and(eq(enrollCoursesTable.userEmail, user.primaryEmailAddress?.emailAddress), eq(enrollCoursesTable.cid, cid)));

    if (enrollCourses?.length == 0) {
        const result = await db.insert(enrollCoursesTable).values({
            cid,
            userEmail: user.primaryEmailAddress?.emailAddress,
        }).returning(enrollCoursesTable);
        return NextResponse.json({ message: "Course enrolled successfully", data: result }, { status: 200 });
    } else {
        return NextResponse.json({ message: "Course already enrolled" }, { status: 400 });
    }
} catch (error) {
    return NextResponse.json({ message: "Server Error" }, { status: 500 });
}
}

export async function GET(req) {
    const user = await currentUser();
   const result = await db.select().from(coursesTable).innerJoin(enrollCoursesTable,eq(coursesTable.cid,enrollCoursesTable.cid)).where(eq(enrollCoursesTable.userEmail, user.primaryEmailAddress?.emailAddress)).orderBy(desc(coursesTable.id));

   return NextResponse.json({ message: "Enroll Courses", data: result });
}