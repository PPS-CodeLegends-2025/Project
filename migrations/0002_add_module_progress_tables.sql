CREATE TABLE `module_progress` (
    `id` varchar(32) NOT NULL,
    `user_id` varchar(255) NOT NULL,
    `module_id` varchar(255) NOT NULL,
    `section_index` int NOT NULL,
    `completed_at` timestamp DEFAULT (now()) NOT NULL,
    CONSTRAINT `module_progress_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
ALTER TABLE `module_progress` ADD CONSTRAINT `module_progress_user_id_user_id_fk` FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON DELETE no action ON UPDATE no action;
--> statement-breakpoint
CREATE TABLE `user_section_progress` (
    `id` varchar(32) NOT NULL,
    `user_id` varchar(255) NOT NULL,
    `module_id` varchar(255) NOT NULL,
    `section_id` varchar(255) NOT NULL,
    `completed_at` timestamp DEFAULT (now()) NOT NULL,
    CONSTRAINT `user_section_progress_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
ALTER TABLE `user_section_progress` ADD CONSTRAINT `user_section_progress_user_id_user_id_fk` FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON DELETE no action ON UPDATE no action;
