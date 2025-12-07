import { relations } from "drizzle-orm";
import { unique } from "drizzle-orm/pg-core";
import { index } from "drizzle-orm/pg-core";
import {
    integer,
    pgTable,
    varchar,
    boolean,
    json,
    timestamp,
} from "drizzle-orm/pg-core";


// ---------- User Table ------------
export const usersTable = pgTable("users", {
    id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
    name: varchar("name", { length: 255 }).notNull(),
    email: varchar("email", { length: 255 }).notNull().unique(),

    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull().$onUpdate(() => new Date()),
});


// Relations for Users (One-to-Many with Courses and Enrollments)
export const usersRelations = relations(usersTable, ({ many }) => ({
    courses: many(coursesTable),
    enrollments: many(enrollCourseTable)
}))


// ----------- Courses Table -------------
export const coursesTable = pgTable("courses", {
    id: integer("id").primaryKey().generatedAlwaysAsIdentity(),

    cid: varchar("cid", { length: 255 }).notNull().unique(),
    name: varchar("name", { length: 255 }).notNull(),
    description: varchar("description", { length: 1000 }),

    noOfChapters: integer("noOfChapters").notNull().default(0),
    includeVideo: boolean("includeVideo").default(false),

    level: varchar("level", { length: 50 }).notNull(),
    category: varchar("category", { length: 255 }).notNull(),

    bannerImageUrl: varchar("bannerImageUrl", { length: 500 }).default(""),
    duration: varchar("duration", { length: 100 }).default("0h 0m"),

    courseJson: json("courseJson").default({}),
    courseContent: json("courseContent").default([]).notNull(),

    userEmail: varchar("userEmail", { length: 255 })
        .references(() => usersTable.email, { onDelete: "cascade" })
        .notNull(),

    isPublished: boolean("isPublished").default(false),

    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull().$onUpdate(() => new Date()),

},  (table) => ({
        cidIdx: index("course_cid_idx").on(table.cid),
        userEmailIdx: index("course_user_email_idx").on(table.userEmail),
    publishedIdx: index("course_published_idx").on(table.isPublished)
}));


// Relations for Courses
export const coursesRelations = relations(coursesTable, ({ one, many }) => ({
    author: one(usersTable, {
        fields: [coursesTable.userEmail],
        references: [usersTable.email]
    }),
    enrollments: many(enrollCourseTable)
}))


// ----------- Enrollments Table ---------
export const enrollCourseTable = pgTable("enrollCourse", {
    id: integer("id").primaryKey().generatedAlwaysAsIdentity(),

    cid: varchar("cid", { length: 255 })
        .notNull()
        .references(() => coursesTable.cid, { onDelete: "cascade" }),

    userEmail: varchar("userEmail", { length: 255 })
        .references(() => usersTable.email, { onDelete: "cascade" })
        .notNull(),

    completedChapters: json("completedChapters").default([]).notNull(),

    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull().$onUpdate(() => new Date()),

},  (table) => ({
        enrollCidIdx: index("enroll_cid_idx").on(table.cid),
        enrollUserIdx: index("enroll_user_idx").on(table.userEmail),
        uniqueEnrollment: unique("unique_enrollment").on(table.cid, table.userEmail)
}));


// Relations for Enrollments
export const enrollCourseRelations = relations(enrollCourseTable, ({ one }) => ({
    course: one(coursesTable, {
        fields: [enrollCourseTable.cid],
        references: [coursesTable.cid],
    }),
    user: one(usersTable, {
        fields: [enrollCourseTable.userEmail],
        references: [usersTable.email],
    })
}))