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

// Users table for authentication
export const users = pgTable("users", {
  id: uuid("id").primaryKey().defaultRandom(),
  email: text("email").notNull().unique(),
  emailVerified: timestamp("email_verified"),
  name: text("name").notNull(),
  password: text("password"), // For credentials provider
  image: text("image"),
  role: text("role", { 
    enum: ["admin", "editor", "viewer", "user"] 
  }).default("user"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
}, (table) => ({
  emailIdx: index("users_email_idx").on(table.email),
}));

// Accounts table for OAuth providers
export const accounts = pgTable("accounts", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: uuid("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
  type: text("type").notNull(),
  provider: text("provider").notNull(),
  providerAccountId: text("provider_account_id").notNull(),
  refresh_token: text("refresh_token"),
  access_token: text("access_token"),
  expires_at: integer("expires_at"),
  token_type: text("token_type"),
  scope: text("scope"),
  id_token: text("id_token"),
  session_state: text("session_state"),
}, (table) => ({
  userIdIdx: index("accounts_user_id_idx").on(table.userId),
  providerIdx: index("accounts_provider_idx").on(table.provider, table.providerAccountId),
}));

// Sessions table
export const sessions = pgTable("sessions", {
  id: uuid("id").primaryKey().defaultRandom(),
  sessionToken: text("session_token").notNull().unique(),
  userId: uuid("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
  expires: timestamp("expires").notNull(),
}, (table) => ({
  userIdIdx: index("sessions_user_id_idx").on(table.userId),
  sessionTokenIdx: index("sessions_session_token_idx").on(table.sessionToken),
}));

// Verification tokens for email verification
export const verificationTokens = pgTable("verification_tokens", {
  identifier: text("identifier").notNull(),
  token: text("token").notNull().unique(),
  expires: timestamp("expires").notNull(),
}, (table) => ({
  identifierTokenIdx: index("verification_identifier_token_idx").on(table.identifier, table.token),
}));

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

// Protocol tabs for dynamic protocol builder
export const protocolTabs = pgTable("protocol_tabs", {
  id: uuid("id").primaryKey().defaultRandom(),
  tabIndex: integer("tab_index").notNull().unique(),
  concernName: text("concern_name").notNull(),
  tabTitle: text("tab_title").notNull(),
  emoji: text("emoji"),
  imageUrl: text("image_url"),
  contentHtml: text("content_html").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
}, (table) => ({
  tabIndexIdx: index("protocol_tabs_tab_index_idx").on(table.tabIndex),
  concernNameIdx: index("protocol_tabs_concern_name_idx").on(table.concernName),
}));