import { pgTable, uuid, text, integer, timestamp, jsonb, index, boolean, numeric } from 'drizzle-orm/pg-core';

// Updated sunscreen products schema to match original page structure
export const sunscreenProducts = pgTable("sunscreen_products", {
  id: uuid("id").primaryKey().defaultRandom(),
  brand: text("brand").notNull(),
  productName: text("product_name").notNull(),
  spf: integer("spf").notNull(),
  
  // Individual filter fields as booleans
  tinosorbS: boolean("tinosorb_s").notNull().default(false),
  tinosorbM: boolean("tinosorb_m").notNull().default(false),
  mexorylSX: boolean("mexoryl_sx").notNull().default(false),
  mexorylXL: boolean("mexoryl_xl").notNull().default(false),
  mexoryl400: boolean("mexoryl_400").notNull().default(false),
  uvinulAPlus: boolean("uvinul_a_plus").notNull().default(false),
  uvinulT150: boolean("uvinul_t150").notNull().default(false),
  homosalate: boolean("homosalate").notNull().default(false),
  octocrylene: boolean("octocrylene").notNull().default(false),
  avobenzone: boolean("avobenzone").notNull().default(false),
  ethylhexylSalicylate: boolean("ethylhexyl_salicylate").notNull().default(false),
  octisalate: boolean("octisalate").notNull().default(false),
  ensulizole: boolean("ensulizole").notNull().default(false),
  octinoxate: boolean("octinoxate").notNull().default(false),
  zincOxide: boolean("zinc_oxide").notNull().default(false),
  titaniumDioxide: boolean("titanium_dioxide").notNull().default(false),
  
  // Ratings
  uva1Rating: text("uva1_rating", { 
    enum: ["excellent", "good", "moderate", "poor"] 
  }).notNull(),
  uva2Rating: text("uva2_rating", { 
    enum: ["excellent", "good", "moderate", "poor"] 
  }).notNull(),
  uvbRating: text("uvb_rating", { 
    enum: ["excellent", "good", "moderate", "poor"] 
  }).notNull(),
  
  // Additional fields from original
  overallRating: numeric("overall_rating", { precision: 2, scale: 1 }).notNull(), // out of 5.0
  description: text("description").notNull(),
  price: text("price"),
  availability: text("availability").notNull(),
  
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
}, (table) => ({
  brandIdx: index("sunscreen_brand_idx").on(table.brand),
  spfIdx: index("sunscreen_spf_idx").on(table.spf),
  ratingsIdx: index("sunscreen_ratings_idx").on(table.uva1Rating, table.uva2Rating),
}));