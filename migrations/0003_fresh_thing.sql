CREATE TABLE `challenge_progress` (
	`id` varchar(255) NOT NULL,
	`user_id` varchar(255) NOT NULL,
	`challenge_id` varchar(255) NOT NULL,
	`completed` boolean NOT NULL DEFAULT false,
	`completed_at` timestamp DEFAULT (now()),
	CONSTRAINT `challenge_progress_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `user_active_days` (
	`id` varchar(255) NOT NULL,
	`user_id` varchar(255) NOT NULL,
	`active_date` date NOT NULL,
	CONSTRAINT `user_active_days_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `user_stats` (
	`id` varchar(255) NOT NULL,
	`user_id` varchar(255) NOT NULL,
	`lessons_completed` int NOT NULL DEFAULT 0,
	`challenges_solved` int NOT NULL DEFAULT 0,
	`days_active` int NOT NULL DEFAULT 0,
	`last_active_date` date,
	CONSTRAINT `user_stats_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
ALTER TABLE `challenge_progress` ADD CONSTRAINT `challenge_progress_user_id_user_id_fk` FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `user_active_days` ADD CONSTRAINT `user_active_days_user_id_user_id_fk` FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `user_stats` ADD CONSTRAINT `user_stats_user_id_user_id_fk` FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON DELETE no action ON UPDATE no action;