CREATE TABLE "fingerprint" (
	"id" text PRIMARY KEY NOT NULL,
	"fp_id" text,
	"useragent" text,
	"data" text,
	"server_feature" text,
	"created_at" timestamp DEFAULT now() NOT NULL
);
