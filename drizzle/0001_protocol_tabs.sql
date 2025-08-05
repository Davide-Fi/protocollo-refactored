-- Create protocol_tabs table
CREATE TABLE IF NOT EXISTS "protocol_tabs" (
	"id" serial PRIMARY KEY NOT NULL,
	"tab_index" integer NOT NULL UNIQUE,
	"concern_name" text NOT NULL,
	"tab_title" text NOT NULL,
	"emoji" text,
	"image_url" text,
	"content_html" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);

-- Create indexes
CREATE INDEX IF NOT EXISTS "protocol_tabs_tab_index_idx" ON "protocol_tabs" ("tab_index");
CREATE INDEX IF NOT EXISTS "protocol_tabs_concern_name_idx" ON "protocol_tabs" ("concern_name");