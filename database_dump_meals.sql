DROP DATABASE IF EXISTS Meal_Sharing;

CREATE DATABASE IF NOT EXISTS Meal_Sharing;

USE Meal_Sharing;

SET NAMES utf8mb4;

CREATE TABLE `meal` (
    `id` INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `title` VARCHAR(255) NOT NULL,
    `description` TEXT NOT NULL,
    `location` VARCHAR(255) NOT NULL,
    `when` DATETIME NOT NULL,
    `max_reservations` INT NOT NULL,
    `price` DECIMAL NOT NULL,
    `created_date` DATE NOT NULL,
    `img` TEXT
)  ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_unicode_ci;

CREATE TABLE `reservation` (
    `id` INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `number_of_guests` INT NOT NULL,
    `meal_id` INT UNSIGNED NOT NULL,
    `created_date` DATE NOT NULL,
    `contact_number` VARCHAR(255) NOT NULL,
    `contact_name` VARCHAR(255) NOT NULL,
    `contact_email` VARCHAR(255) NOT NULL,
    CONSTRAINT `fk_meal_reservation` FOREIGN KEY (`meal_id`)
        REFERENCES `meal` (`id`)
        ON DELETE CASCADE ON UPDATE CASCADE
)  ENGINE=INNODB DEFAULT CHARSET=UTF8MB4 COLLATE=UTF8MB4_UNICODE_CI;




CREATE TABLE `review` (
    `id` INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `title` VARCHAR(255) NOT NULL,
    `description` TEXT NOT NULL,
    `meal_id` INT UNSIGNED NOT NULL,
    `stars` INT NOT NULL,
    `created_date` DATE NOT NULL,
    CONSTRAINT `fk_meal_review` FOREIGN KEY (`meal_id`)
        REFERENCES `meal` (`id`)
        ON DELETE CASCADE ON UPDATE CASCADE
)  ENGINE=INNODB DEFAULT CHARSET=UTF8MB4 COLLATE=UTF8MB4_UNICODE_CI;

-- Meal
INSERT INTO meal (id, title, description, location, `when`, max_reservations, price, created_date, img) VALUES (1, 'chicken', 'fried chicken', 'Valby', '2021-07-23', 11, 200, '2021-02-23','https://images.pexels.com/photos/2673353/pexels-photo-2673353.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1');
INSERT INTO meal (id, title, description, location, `when`, max_reservations, price, created_date,img) VALUES (2, 'cake', 'cake with fruit', 'Koge', '2021-07-30', 6, 300, '2021-01-30','https://images.pexels.com/photos/16056575/pexels-photo-16056575/free-photo-of-chocolate-cake-with-strawberries.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1');
INSERT INTO meal (id, title, description, location, `when`, max_reservations, price, created_date, img) VALUES (3, 'burger', 'burgers with beef and chicken', 'Odense', '2021-07-20', 8, 400, '2021-01-20','https://images.pexels.com/photos/2983101/pexels-photo-2983101.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1');
INSERT INTO meal (id, title, description, location, `when`, max_reservations, price, created_date,img) VALUES (4, 'Salad', 'mixed from McDonalds and BurgerKing', 'Aarhus', '2021-07-15', 3, 250, '2021-01-15','https://images.pexels.com/photos/1143754/pexels-photo-1143754.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1');
INSERT INTO meal (id, title, description, location, `when`, max_reservations, price, created_date,img) VALUES (5, 'pasta', 'healthy food', 'Aalborg', '2021-07-15', 6, 350, '2021-07-16', 'https://images.pexels.com/photos/1279330/pexels-photo-1279330.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1');

-- Reservation
INSERT INTO reservation (id, number_of_guests, meal_id, created_date, contact_number, contact_name, contact_email) VALUES (1, 4, 1, '2021-08-12', '23456712', 'Mario', 'mario@dk.com');
INSERT INTO reservation (id, number_of_guests, meal_id, created_date, contact_number, contact_name, contact_email) VALUES (2, 4, 2, '2021-08-14', '23456723', 'Yoshi', 'yoshi@dk.com');
INSERT INTO reservation (id, number_of_guests, meal_id, created_date, contact_number, contact_name, contact_email) VALUES (3, 6, 3, '2021-08-28', '23456734', 'Luigi', 'luigi@dk.com');
INSERT INTO reservation (id, number_of_guests, meal_id, created_date, contact_number, contact_name, contact_email) VALUES (4, 5, 4, '2021-08-30', '23456764', 'Peach', 'peach@dk.com');
INSERT INTO reservation (id, number_of_guests, meal_id, created_date, contact_number, contact_name, contact_email) VALUES (5, 5, 5, '2021-08-03', '23456763', 'Toad', 'toad@dk.com');

-- Review
INSERT INTO review (id, title, description, meal_id, stars, created_date) VALUES (1, 'nice', 'nice experience', 3, 5, '2021-07-25');
INSERT INTO review (id, title, description, meal_id, stars, created_date) VALUES (2, 'good', 'lovely food with best experience', 4, 4, '2021-07-26');
INSERT INTO review (id, title, description, meal_id, stars, created_date) VALUES (3, 'tastes good', 'awesome.', 2, 4, '2021-07-27');
INSERT INTO review (id, title, description, meal_id, stars, created_date) VALUES (4, 'fine', 'delicious food', 2, 2, '2021-07-28');
INSERT INTO review (id, title, description, meal_id, stars, created_date) VALUES (5, 'best', 'enjoyed every bit of it', 5, 3, '2021-07-28');


SELECT * FROM reservation 
INNER JOIN meal ON reservation.meal_id = meal.id
WHERE reservation.meal_id = 1;



SELECT * FROM reservation 
INNER JOIN meal ON reservation.meal_id = meal.id
WHERE reservation.meal_id = 2;



