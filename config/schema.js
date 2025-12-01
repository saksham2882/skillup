import {
    integer,
    pgTable,
    varchar,
    boolean,
    json,
    timestamp,
} from "drizzle-orm/pg-core";

export const usersTable = pgTable("users", {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    name: varchar("name", { length: 255 }).notNull(),
    email: varchar("email", { length: 255 }).notNull().unique(),
    subscriptionId: varchar("subscriptionId", { length: 255 }),
    createdAt: timestamp("created_at").defaultNow(),
    updatedAt: timestamp("updated_at").defaultNow(),
});

export const coursesTable = pgTable("courses", {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),

    cid: varchar("cid", { length: 255 }).notNull().unique(),
    name: varchar("name", { length: 255 }).notNull(),
    description: varchar("description", { length: 500 }),

    noOfChapters: integer("noOfChapters").notNull(),
    includeVideo: boolean("includeVideo").default(false),

    level: varchar("level", { length: 50 }).notNull(),
    category: varchar("category", { length: 255 }),

    bannerImageUrl: varchar("bannerImageUrl", { length: 500 }).default(""),
    duration: varchar("duration", { length: 50 }).default(""),

    courseJson: json("courseJson").default({}),
    courseContent: json("courseContent").default({}),

    userEmail: varchar("userEmail", { length: 255 })
        .references(() => usersTable.email, { onDelete: "cascade" })
        .notNull(),

    createdAt: timestamp("created_at").defaultNow(),
    updatedAt: timestamp("updated_at").defaultNow(),
});

export const enrollCourseTable = pgTable("enrollCourse", {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),

    cid: varchar("cid", { length: 255 })
        .notNull()
        .references(() => coursesTable.cid, { onDelete: "cascade" }),
    userEmail: varchar("userEmail", { length: 255 })
        .references(() => usersTable.email, { onDelete: "cascade" })
        .notNull(),

    completedChapters: json("completedChapters").default([]),

    createdAt: timestamp("created_at").defaultNow(),
});
