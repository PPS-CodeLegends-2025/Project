CREATE TABLE `achievement` (
	`id` varchar(32) NOT NULL,
	`user_id` varchar(255) NOT NULL,
	`name` varchar(255) NOT NULL,
	`receipt_date` datetime NOT NULL,
	CONSTRAINT `achievement_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `course` (
	`id` varchar(32) NOT NULL,
	`name` varchar(255) NOT NULL,
	`description` varchar(512) NOT NULL,
	`level` varchar(32),
	`duration` int,
	CONSTRAINT `course_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `course_module` (
	`id` varchar(32) NOT NULL,
	`username` varchar(32) NOT NULL,
	`description` varchar(512) NOT NULL,
	`course_id` varchar(32) NOT NULL,
	CONSTRAINT `course_module_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `user_course_progress` (
	`id` varchar(32) NOT NULL,
	`user_id` varchar(255) NOT NULL,
	`course_id` varchar(32) NOT NULL,
	`completed` int NOT NULL DEFAULT 0,
	`total` int NOT NULL DEFAULT 0,
	CONSTRAINT `user_course_progress_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
ALTER TABLE `user` ADD `full_name` varchar(255) DEFAULT '' NOT NULL;--> statement-breakpoint
ALTER TABLE `user` ADD `level` int DEFAULT 0 NOT NULL;--> statement-breakpoint
ALTER TABLE `user` ADD `xp_points` int DEFAULT 0 NOT NULL;--> statement-breakpoint
ALTER TABLE `user` ADD `registration_date` timestamp DEFAULT (now()) NOT NULL;--> statement-breakpoint
ALTER TABLE `user` ADD `bio` varchar(256) DEFAULT '' NOT NULL;--> statement-breakpoint
ALTER TABLE `achievement` ADD CONSTRAINT `achievement_user_id_user_id_fk` FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `course_module` ADD CONSTRAINT `course_module_course_id_course_id_fk` FOREIGN KEY (`course_id`) REFERENCES `course`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `user_course_progress` ADD CONSTRAINT `user_course_progress_user_id_user_id_fk` FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `user_course_progress` ADD CONSTRAINT `user_course_progress_course_id_course_id_fk` FOREIGN KEY (`course_id`) REFERENCES `course`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `user` DROP COLUMN `age`;