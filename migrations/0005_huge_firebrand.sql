CREATE TABLE `challenge` (
	`id` varchar(32) NOT NULL,
	`title` varchar(32) NOT NULL,
	`description` varchar(512) NOT NULL,
	`difficulty` varchar(32) NOT NULL,
	`category` varchar(32) NOT NULL,
	`xp` int NOT NULL,
	`time_estimate` varchar(32) NOT NULL,
	CONSTRAINT `challenge_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `challenge_task` (
	`id` varchar(36) NOT NULL,
	`challenge_id` varchar(255) NOT NULL,
	`name` varchar(255) NOT NULL,
	`description` varchar(1024) NOT NULL,
	`tests` json NOT NULL,
	`inputs` json NOT NULL,
	`output` json NOT NULL,
	`example_code` varchar(1024) NOT NULL,
	CONSTRAINT `challenge_task_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
ALTER TABLE `challenge_task` ADD CONSTRAINT `challenge_task_challenge_id_challenge_id_fk` FOREIGN KEY (`challenge_id`) REFERENCES `challenge`(`id`) ON DELETE no action ON UPDATE no action;