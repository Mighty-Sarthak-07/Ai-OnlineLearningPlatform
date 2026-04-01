import { db } from "@/config/db";
import { coursesTable, enrollCoursesTable, usersTable } from "@/config/schema";
import { currentUser } from "@clerk/nextjs/server";
import { and, desc, eq } from "drizzle-orm";
import { NextResponse } from "next/server";

// ── Streak helpers ────────────────────────────────────────────────────────────
function todayUTC() {
  return new Date().toISOString().slice(0, 10); // 'YYYY-MM-DD'
}

function yesterdayUTC() {
  const d = new Date();
  d.setUTCDate(d.getUTCDate() - 1);
  return d.toISOString().slice(0, 10);
}

/**
 * Computes new streak values given the user's existing state.
 *  - Same day        → no change (already counted today)
 *  - Yesterday       → consecutive day, streak + 1
 *  - Any earlier day → missed day, reset to 1
 */
function computeStreak(currentStreak, lastActiveDate) {
  const today = todayUTC();
  const yesterday = yesterdayUTC();

  if (lastActiveDate === today) {
    return { streakDays: currentStreak, lastActiveDate: today };
  } else if (lastActiveDate === yesterday) {
    return { streakDays: (currentStreak ?? 0) + 1, lastActiveDate: today };
  } else {
    return { streakDays: 1, lastActiveDate: today };
  }
}

// ── POST: enroll in a course ──────────────────────────────────────────────────
export async function POST(req) {
  try {
    const { cid } = await req.json();
    const user = await currentUser();
    const email = user?.primaryEmailAddress?.emailAddress;

    const existing = await db
      .select()
      .from(enrollCoursesTable)
      .where(
        and(
          eq(enrollCoursesTable.userEmail, email),
          eq(enrollCoursesTable.cid, cid)
        )
      );

    if (existing.length === 0) {
      const result = await db
        .insert(enrollCoursesTable)
        .values({ cid, userEmail: email })
        .returning(enrollCoursesTable);
      return NextResponse.json(
        { message: "Course enrolled successfully", data: result },
        { status: 200 }
      );
    } else {
      return NextResponse.json({ message: "Course already enrolled" }, { status: 400 });
    }
  } catch (error) {
    return NextResponse.json({ message: "Server Error" }, { status: 500 });
  }
}

// ── GET: fetch enrolled courses ───────────────────────────────────────────────
export async function GET(req) {
  try {
    const user = await currentUser();
    const email = user?.primaryEmailAddress?.emailAddress;
    const { searchParams } = new URL(req.url);
    const courseId = searchParams?.get('courseId');

    if (courseId) {
      const result = await db
        .select()
        .from(coursesTable)
        .innerJoin(enrollCoursesTable, eq(coursesTable.cid, enrollCoursesTable.cid))
        .where(
          and(
            eq(enrollCoursesTable.userEmail, email),
            eq(enrollCoursesTable.cid, courseId)
          )
        );
      return NextResponse.json({ message: "Enroll Course", data: result[0] });
    } else {
      const result = await db
        .select()
        .from(coursesTable)
        .innerJoin(enrollCoursesTable, eq(coursesTable.cid, enrollCoursesTable.cid))
        .where(eq(enrollCoursesTable.userEmail, email))
        .orderBy(desc(coursesTable.id));
      return NextResponse.json({ message: "Enroll Courses", data: result });
    }
  } catch (error) {
    return NextResponse.json({ message: "Server Error" }, { status: 500 });
  }
}

// ── PUT: mark chapter completed + update real streak ─────────────────────────
export async function PUT(req) {
  try {
    const { completedChapter, courseId } = await req.json();
    const user = await currentUser();
    const email = user?.primaryEmailAddress?.emailAddress;

    if (!user || !courseId || !Array.isArray(completedChapter)) {
      return NextResponse.json({ error: "Invalid request data" }, { status: 400 });
    }

    // 1. Save completed chapters
    const result = await db
      .update(enrollCoursesTable)
      .set({ completedChapters: Array.from(new Set(completedChapter)) })
      .where(
        and(
          eq(enrollCoursesTable.userEmail, email),
          eq(enrollCoursesTable.cid, courseId)
        )
      )
      .returning();

    // 2. Read current streak from users table
    const [dbUser] = await db
      .select()
      .from(usersTable)
      .where(eq(usersTable.email, email));

    if (dbUser) {
      // 3. Compute real streak (date-based)
      const { streakDays, lastActiveDate } = computeStreak(
        dbUser.streakDays ?? 0,
        dbUser.lastActiveDate ?? ""
      );

      // 4. Persist back
      await db
        .update(usersTable)
        .set({ streakDays, lastActiveDate })
        .where(eq(usersTable.email, email));
    }

    return NextResponse.json({ message: "Progress updated", data: result });
  } catch (error) {
    console.error("PUT /api/enroll-course error:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
