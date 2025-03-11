CREATE TABLE `generated_task` (
	`id` varchar(36) NOT NULL DEFAULT UUID(),
	`name` varchar(255) NOT NULL,
	`description` varchar(512) NOT NULL,
	`inputs` json NOT NULL,
	`output` json NOT NULL,
	`example_data` json NOT NULL,
	`example_code` varchar(1024) NOT NULL,
	CONSTRAINT `generated_task_id` PRIMARY KEY(`id`)
);
