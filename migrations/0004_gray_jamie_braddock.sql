CREATE TABLE `badge` (
	`id` varchar(255) NOT NULL,
	`name` varchar(255) NOT NULL,
	`description` text NOT NULL,
	`icon` varchar(255) NOT NULL,
	`category` varchar(100) NOT NULL,
	`level` int NOT NULL DEFAULT 1,
	`hidden` boolean NOT NULL DEFAULT false,
	`created_at` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `badge_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `user_badge` (
	`id` varchar(255) NOT NULL,
	`user_id` varchar(255) NOT NULL,
	`badge_id` varchar(255) NOT NULL,
	`awarded_at` timestamp NOT NULL DEFAULT (now()),
	`viewed` boolean NOT NULL DEFAULT false,
	CONSTRAINT `user_badge_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
ALTER TABLE `user_badge` ADD CONSTRAINT `user_badge_user_id_user_id_fk` FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `user_badge` ADD CONSTRAINT `user_badge_badge_id_badge_id_fk` FOREIGN KEY (`badge_id`) REFERENCES `badge`(`id`) ON DELETE no action ON UPDATE no action;