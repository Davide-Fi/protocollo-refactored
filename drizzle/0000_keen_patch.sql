CREATE TABLE "consultations" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"first_name" text NOT NULL,
	"last_name" text NOT NULL,
	"email" text NOT NULL,
	"interest" text NOT NULL,
	"message" text NOT NULL,
	"status" text DEFAULT 'pending' NOT NULL,
	"priority" text DEFAULT 'medium',
	"assigned_to" uuid,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now(),
	"contacted_at" timestamp
);
--> statement-breakpoint
CREATE TABLE "newsletters" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"email" text NOT NULL,
	"name" text NOT NULL,
	"subscribed" boolean DEFAULT true NOT NULL,
	"subscribed_at" timestamp DEFAULT now(),
	"unsubscribed_at" timestamp,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now(),
	CONSTRAINT "newsletters_email_unique" UNIQUE("email")
);
--> statement-breakpoint
CREATE TABLE "page_views" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"path" text NOT NULL,
	"user_agent" text,
	"referer" text,
	"ip_address" text,
	"timestamp" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "sunscreen_products" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"brand" text NOT NULL,
	"product_name" text NOT NULL,
	"spf" integer NOT NULL,
	"uva1_rating" text NOT NULL,
	"uva2_rating" text NOT NULL,
	"uvb_rating" text NOT NULL,
	"filters" jsonb NOT NULL,
	"texture_rating" text,
	"price_range" text,
	"availability" text DEFAULT 'widely_available',
	"notes" text,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"email" text NOT NULL,
	"name" text NOT NULL,
	"role" text DEFAULT 'viewer',
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now(),
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
--> statement-breakpoint
ALTER TABLE "consultations" ADD CONSTRAINT "consultations_assigned_to_users_id_fk" FOREIGN KEY ("assigned_to") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "consultations_status_idx" ON "consultations" USING btree ("status");--> statement-breakpoint
CREATE INDEX "consultations_created_at_idx" ON "consultations" USING btree ("created_at");--> statement-breakpoint
CREATE INDEX "consultations_email_idx" ON "consultations" USING btree ("email");--> statement-breakpoint
CREATE INDEX "newsletters_email_idx" ON "newsletters" USING btree ("email");--> statement-breakpoint
CREATE INDEX "newsletters_subscribed_idx" ON "newsletters" USING btree ("subscribed");--> statement-breakpoint
CREATE INDEX "page_views_path_idx" ON "page_views" USING btree ("path");--> statement-breakpoint
CREATE INDEX "page_views_timestamp_idx" ON "page_views" USING btree ("timestamp");--> statement-breakpoint
CREATE INDEX "sunscreen_brand_idx" ON "sunscreen_products" USING btree ("brand");--> statement-breakpoint
CREATE INDEX "sunscreen_spf_idx" ON "sunscreen_products" USING btree ("spf");--> statement-breakpoint
CREATE INDEX "sunscreen_ratings_idx" ON "sunscreen_products" USING btree ("uva1_rating","uva2_rating");--> statement-breakpoint
CREATE INDEX "sunscreen_filters_idx" ON "sunscreen_products" USING gin ("filters");