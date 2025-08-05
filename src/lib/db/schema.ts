import { pgTable, text, uuid, timestamp, boolean, integer, jsonb, index } from 'drizzle-orm/pg-core';

// Newsletter subscriptions
export const newsletters = pgTable("newsletters", {
  id: uuid("id").primaryKey().defaultRandom(),
  email: text("email").notNull().unique(),
  name: text("name").notNull(),
  subscribed: boolean("subscribed").notNull().default(true),
  subscribedAt: timestamp("subscribed_at").defaultNow(),
  unsubscribedAt: timestamp("unsubscribed_at"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
}, (table) => ({
  emailIdx: index("newsletters_email_idx").on(table.email),
  subscribedIdx: index("newsletters_subscribed_idx").on(table.subscribed),
}));

// Consultation requests
export const consultations = pgTable("consultations", {
  id: uuid("id").primaryKey().defaultRandom(),
  firstName: text("first_name").notNull(),
  lastName: text("last_name").notNull(),
  email: text("email").notNull(),
  interest: text("interest", { 
    enum: ["nutrizione", "integrazione", "prevenzione", "protocollo", "altro"] 
  }).notNull(),
  message: text("message").notNull(),
  status: text("status", { 
    enum: ["pending", "contacted", "completed", "cancelled"] 
  }).notNull().default("pending"),
  priority: text("priority", { 
    enum: ["low", "medium", "high"] 
  }).default("medium"),
  assignedTo: uuid("assigned_to").references(() => users.id),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
  contactedAt: timestamp("contacted_at"),
}, (table) => ({
  statusIdx: index("consultations_status_idx").on(table.status),
  createdAtIdx: index("consultations_created_at_idx").on(table.createdAt),
  emailIdx: index("consultations_email_idx").on(table.email),
}));

// Admin users
export const users = pgTable("users", {
  id: uuid("id").primaryKey().defaultRandom(),
  email: text("email").notNull().unique(),
  name: text("name").notNull(),
  role: text("role", { 
    enum: ["admin", "editor", "viewer"] 
  }).default("viewer"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Sunscreen products database
export const sunscreenProducts = pgTable("sunscreen_products", {
  id: uuid("id").primaryKey().defaultRandom(),
  brand: text("brand").notNull(),
  productName: text("product_name").notNull(),
  spf: integer("spf").notNull(),
  uva1Rating: text("uva1_rating", { 
    enum: ["excellent", "good", "moderate", "poor"] 
  }).notNull(),
  uva2Rating: text("uva2_rating", { 
    enum: ["excellent", "good", "moderate", "poor"] 
  }).notNull(),
  uvbRating: text("uvb_rating", { 
    enum: ["excellent", "good", "moderate", "poor"] 
  }).notNull(),
  filters: jsonb("filters").notNull(), // Store filter composition as JSON
  textureRating: text("texture_rating", { 
    enum: ["excellent", "good", "moderate", "poor"] 
  }),
  priceRange: text("price_range", { 
    enum: ["budget", "mid", "premium"] 
  }),
  availability: text("availability", { 
    enum: ["widely_available", "limited", "discontinued"] 
  }).default("widely_available"),
  notes: text("notes"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
}, (table) => ({
  brandIdx: index("sunscreen_brand_idx").on(table.brand),
  spfIdx: index("sunscreen_spf_idx").on(table.spf),
  ratingsIdx: index("sunscreen_ratings_idx").on(table.uva1Rating, table.uva2Rating),
  filtersIdx: index("sunscreen_filters_idx").using('gin', table.filters),
}));

// Page analytics
export const pageViews = pgTable("page_views", {
  id: uuid("id").primaryKey().defaultRandom(),
  path: text("path").notNull(),
  userAgent: text("user_agent"),
  referer: text("referer"),
  ipAddress: text("ip_address"),
  timestamp: timestamp("timestamp").defaultNow(),
}, (table) => ({
  pathIdx: index("page_views_path_idx").on(table.path),
  timestampIdx: index("page_views_timestamp_idx").on(table.timestamp),
}));