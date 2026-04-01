import { db } from "@/config/db";
import { coursesTable, enrollCoursesTable, usersTable } from "@/config/schema";
import { currentUser } from "@clerk/nextjs/server";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const user = await currentUser();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const email = user.primaryEmailAddress?.emailAddress;

    // 1. Enrolled courses joined with course data
    const enrolled = await db
      .select()
      .from(enrollCoursesTable)
      .innerJoin(coursesTable, eq(coursesTable.cid, enrollCoursesTable.cid))
      .where(eq(enrollCoursesTable.userEmail, email));

    // 2. Courses created by this user
    const created = await db
      .select()
      .from(coursesTable)
      .where(eq(coursesTable.userEmail, email));

    // 3. Read persisted streak from users table
    const [dbUser] = await db
      .select()
      .from(usersTable)
      .where(eq(usersTable.email, email));

    // ── Compute stats ──────────────────────────────────────────────────────
    const enrolledCount = enrolled.length;

    // Completed = courses where all chapters are marked done
    const completedCount = enrolled.filter((row) => {
      const done = row.enrollcourses?.completedChapters ?? [];
      const chapters = row.courses?.courseJson?.course?.chapters ?? [];
      return chapters.length > 0 && done.length >= chapters.length;
    }).length;

    // Total completed chapters across all enrolled courses
    const totalCompletedChapters = enrolled.reduce((sum, row) => {
      return sum + (row.enrollcourses?.completedChapters?.length ?? 0);
    }, 0);

    // XP: 100 per completed chapter
    const xpEarned = totalCompletedChapters * 100;
    const xpDisplay =
      xpEarned >= 1000
        ? `${(xpEarned / 1000).toFixed(1).replace(/\.0$/, "")}K`
        : String(xpEarned);

    // Real streak — read from DB, 0 if no record yet
    const streak = dbUser?.streakDays ?? 0;

    return NextResponse.json({
      enrolledCount,
      completedCount,
      createdCount: created.length,
      xpEarned,
      xpDisplay,
      streak,
      totalCompletedChapters,
    });
  } catch (error) {
    console.error("Stats API error:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
