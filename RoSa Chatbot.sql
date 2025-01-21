CREATE TABLE `categories` (
  `id` bigint PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL
);

CREATE TABLE `foods` (
  `id` bigint PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `fk_categories` bigint NOT NULL,
  `name` varchar(50) NOT NULL
);

CREATE TABLE `products` (
  `id` bigint PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `fk_foods` bigint NOT NULL,
  `name` varchar(50) NOT NULL,
  `description` text(500) NOT NULL,
  `prize` decimal(4,2) NOT NULL,
  `image` varchar(500) NOT NULL
);

CREATE TABLE `items` (
  `id` bigint PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL,
  `content_gr` bigint NOT NULL,
  `extra` bool NOT NULL,
  `prize_unit` decimal(4,2),
  `fk_foods` bigint NOT NULL
);

CREATE TABLE `product_item` (
  `id` bigint PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `fk_product` bigint NOT NULL,
  `fk_item` bigint NOT NULL
);

CREATE TABLE `users` (
  `id` bigint PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `names` varchar(70) NOT NULL,
  `surnames` varchar(70) NOT NULL,
  `identification_document` varchar(30) NOT NULL,
  `email` varchar(150) NOT NULL,
  `password` varchar(255) NOT NULL,
  `sex` varchar(20) NOT NULL
);

CREATE TABLE `countries` (
  `id` bigint PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `name` varchar(50)
);

CREATE TABLE `provinces` (
  `id` bigint PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `fk_countries` bigint NOT NULL,
  `name` varchar(50)
);

CREATE TABLE `cities` (
  `id` bigint PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `fk_provinces` bigint NOT NULL,
  `name` varchar(50)
);

CREATE TABLE `rol_users` (
  `id` bigint PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `name` varchar(20) NOT NULL
);

CREATE TABLE `user_details` (
  `id` bigint PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `fk_user` bigint UNIQUE NOT NULL,
  `fk_role` bigint NOT NULL,
  `fk_countries` bigint NOT NULL,
  `fk_provinces` bigint NOT NULL,
  `fk_cities` bigint NOT NULL,
  `zip_code` varchar(20) NOT NULL,
  `site_reference` varchar(250) NOT NULL,
  `phone` varchar(20) NOT NULL
);

CREATE TABLE `shopping_carts` (
  `id` bigint PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `fk_user` bigint NOT NULL,
  `date_create` date NOT NULL,
  `state` varchar(255) NOT NULL DEFAULT 'Pendiente'
);

CREATE TABLE `items_cart` (
  `id` bigint PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `fk_shopping_carts` bigint NOT NULL,
  `fk_product` bigint NOT NULL,
  `amount` int NOT NULL,
  `unit_price` decimal NOT NULL
);

CREATE TABLE `payment_methods` (
  `id` bigint PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `name` varchar(20) NOT NULL,
  `active` bool NOT NULL,
  `commission` decimal NOT NULL
);

CREATE TABLE `chats` (
  `id` bigint PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `fk_users` bigint NOT NULL,
  `title` varchar(50) NOT NULL,
  `date` date NOT NULL
);

CREATE TABLE `payments` (
  `id` bigint PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `fk_shopping_carts` bigint NOT NULL,
  `fk_method` bigint NOT NULL,
  `amount` decimal NOT NULL,
  `date` date NOT NULL
);

CREATE TABLE `author` (
  `id` bigint PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `name` varchar(10) NOT NULL
);

CREATE TABLE `messages` (
  `id` bigint PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `fk_chats` bigint NOT NULL,
  `fk_author` bigint NOT NULL,
  `date` date NOT NULL,
  `content` varchar(500) NOT NULL
);

ALTER TABLE `foods` ADD FOREIGN KEY (`fk_categories`) REFERENCES `categories` (`id`);

ALTER TABLE `products` ADD FOREIGN KEY (`fk_foods`) REFERENCES `foods` (`id`);

ALTER TABLE `product_item` ADD FOREIGN KEY (`fk_item`) REFERENCES `products` (`id`);

ALTER TABLE `product_item` ADD FOREIGN KEY (`fk_product`) REFERENCES `items` (`id`);

ALTER TABLE `items` ADD FOREIGN KEY (`fk_foods`) REFERENCES `foods` (`id`);

ALTER TABLE `user_details` ADD FOREIGN KEY (`fk_user`) REFERENCES `users` (`id`);

ALTER TABLE `user_details` ADD FOREIGN KEY (`fk_role`) REFERENCES `rol_users` (`id`);

ALTER TABLE `provinces` ADD FOREIGN KEY (`fk_countries`) REFERENCES `countries` (`id`);

ALTER TABLE `cities` ADD FOREIGN KEY (`fk_provinces`) REFERENCES `provinces` (`id`);

ALTER TABLE `user_details` ADD FOREIGN KEY (`fk_countries`) REFERENCES `countries` (`id`);

ALTER TABLE `user_details` ADD FOREIGN KEY (`fk_provinces`) REFERENCES `provinces` (`id`);

ALTER TABLE `user_details` ADD FOREIGN KEY (`fk_cities`) REFERENCES `cities` (`id`);

ALTER TABLE `shopping_carts` ADD FOREIGN KEY (`fk_user`) REFERENCES `users` (`id`);

ALTER TABLE `items_cart` ADD FOREIGN KEY (`fk_shopping_carts`) REFERENCES `shopping_carts` (`id`);

ALTER TABLE `items_cart` ADD FOREIGN KEY (`fk_product`) REFERENCES `products` (`id`);

ALTER TABLE `payments` ADD FOREIGN KEY (`fk_shopping_carts`) REFERENCES `shopping_carts` (`id`);

ALTER TABLE `payments` ADD FOREIGN KEY (`fk_method`) REFERENCES `payment_methods` (`id`);

ALTER TABLE `chats` ADD FOREIGN KEY (`fk_users`) REFERENCES `users` (`id`);

ALTER TABLE `messages` ADD FOREIGN KEY (`fk_chats`) REFERENCES `chats` (`id`);

ALTER TABLE `messages` ADD FOREIGN KEY (`fk_author`) REFERENCES `author` (`id`);
