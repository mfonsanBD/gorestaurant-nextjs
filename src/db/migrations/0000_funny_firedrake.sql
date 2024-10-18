CREATE TABLE `products` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text NOT NULL,
	`description` text NOT NULL,
	`photo` text NOT NULL,
	`price` real NOT NULL,
	`isActive` integer DEFAULT true NOT NULL
);
