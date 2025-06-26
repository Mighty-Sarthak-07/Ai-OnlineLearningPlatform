import { boolean, integer, jsonb, pgTable, varchar } from "drizzle-orm/pg-core";

export const usersTable = pgTable("users", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: varchar({ length: 255 }).notNull(),
  email: varchar({ length: 255 }).notNull().unique(),
  subscriptionid: varchar(),
});

export const coursesTable = pgTable("courses", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  cid: varchar().notNull().unique(),
  name: varchar({ length: 255 }).notNull(),
  description: varchar().notNull(),
  noOfChapters: integer().notNull(),
  includeVideo: boolean().default(false),
  level: varchar({ length: 255 }).notNull(),
  category: varchar({ length: 255 }).notNull(),
  courseJson: jsonb().notNull(),
  bannerImageUrl: varchar({ length: 255 }).default(''),
  courseContent: jsonb().default({}),
    userEmail: varchar('userEmail').references(() => usersTable.email).notNull(),
});

export const enrollCoursesTable = pgTable("enrollcourses", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  cid: varchar().references(() => coursesTable.cid).notNull(),
  userEmail: varchar('userEmail').references(() => usersTable.email).notNull(),
  completedChapters: jsonb().default({}),
});