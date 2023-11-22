CREATE TABLE `user_posts`.`users` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(50) NOT NULL,
  `email` VARCHAR(256) NOT NULL,
  `password` VARCHAR(50) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `email_UNIQUE` (`email` ASC) VISIBLE);

CREATE TABLE `user_posts`.`posts` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `user_id` INT NOT NULL,
  `body` LONGTEXT NOT NULL,
  `creation_time` BIGINT NOT NULL,
  PRIMARY KEY (`id`));

ALTER TABLE `user_posts`.`posts` 
ADD CONSTRAINT `FK_posts_to_user` FOREIGN KEY (user_id) REFERENCES `user_posts`.`users`(id)
ON DELETE CASCADE;
