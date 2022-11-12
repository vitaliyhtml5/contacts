-- phpMyAdmin SQL Dump
-- version 5.0.4
-- https://www.phpmyadmin.net/
--
-- Хост: localhost
-- Время создания: Ноя 12 2022 г., 20:43
-- Версия сервера: 10.4.17-MariaDB
-- Версия PHP: 7.3.27

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- База данных: `test3`
--

-- --------------------------------------------------------

--
-- Структура таблицы `contacts_people`
--

CREATE TABLE `contacts_people` (
  `id` int(11) NOT NULL,
  `name` varchar(30) NOT NULL,
  `email` varchar(30) NOT NULL,
  `uuid` varchar(36) NOT NULL,
  `categories_id` int(11) NOT NULL,
  `users_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Дамп данных таблицы `contacts_people`
--

INSERT INTO `contacts_people` (`id`, `name`, `email`, `uuid`, `categories_id`, `users_id`) VALUES
(1, 'John Smith', 'john.smith@hotmail.com', 'ff01005d-d66d-4ee6-91d2-edc0546a43f6', 1, 1),
(2, 'Brandon Morrison', 'balistreri.april@yahoo.com', 'ce2b4e79-814c-4da2-be83-66a930620a42', 2, 1),
(3, 'Jake Cameron', 'zlittle@gmail.com', '7127a7df-8009-454b-802e-85cbbfeed149', 4, 1),
(4, 'Victoria Black', 'fannie73@yahoo.com', 'c4e0f312-a72e-499a-a19e-7fd949ec8c44', 3, 1),
(5, 'Emily Dickens', 'kconn@rowe.com', '630b8811-70f8-4b46-ab17-5769bf8a3374', 3, 1),
(6, 'Lisa Brown', 'lisa@kirlin.com', 'ad121cba-8c2b-4e95-93f2-a014bb4cb5c9', 1, 1),
(7, 'Anna Nash', 'qlang@hotmail.com', '6feffa65-6ed3-42c3-909d-0543562a3785', 4, 1),
(8, 'Tim Blake', 'devan74@wehner.com', 'f36bfb2e-0bea-4203-aa72-fefce17cbd7c', 2, 1),
(9, 'Frank Harris', 'frank@wehner.com', '14f553e6-581b-4a00-b6e2-a4413d1d7495', 1, 1),
(10, 'Lauren Coleman', 'loretta@yahoo.com', '492ea22d-7b76-4de8-aa59-6048e84eb030', 3, 1),
(11, 'James Skinner', 'xlesch@halvorson.com', '82437bb4-5c57-4104-9b97-9aaa124f2808', 4, 1),
(12, 'David Robertson', 'david@hackett.com', '8d805390-06c5-4294-b9c8-9614b686857c', 3, 1),
(13, 'Julia Morgan', 'ebins@torphy.biz', '42473264-b6e2-4f1e-81c3-9fe64929fc6d', 1, 1),
(14, 'Stephen Newman', 'newman@hermann.info', 'f13f90ed-2a89-4f4c-9a80-12882e23b497', 4, 1),
(15, 'Justin Sharp', 'justin123@conn.biz', 'e4878a10-3351-4ef1-a1a4-a7723098d167', 2, 1),
(16, 'Robert Green', 'green.robert@stehr.info', '6bc84b2c-6054-4014-b366-1c11043e5307', 4, 1),
(17, 'Ryan Clark', 'ibuckridge@mueller.com', '5be370f3-5689-4f9d-a155-a428bd252ac2', 4, 1),
(18, 'Ryan Tucker', 'tucker@blick.com', '52a6c375-748f-4386-8fa1-4fff086e0cb4', 3, 1),
(19, 'Katherine Taylor', 'katherine75@gmail.com', '605f629f-8216-420d-a151-70b3b9fb2630', 1, 1),
(20, 'Jessica Berry', 'aupton@emard.net', 'aa3cc682-fdf4-4ca9-ba55-362d5f9797c0', 3, 1),
(21, 'Max Hudson', 'max.hudson@hotmail.com', '2e47aa99-792c-4c73-8588-cd73616a829f', 2, 1),
(22, 'Frank Murray', 'franco92@will.com', 'de3e322e-464a-4dcf-afec-0e80de6de6cb', 3, 1),
(23, 'Megan Anderson', 'foster74@heaney.com', 'a1e21912-46e2-4c4b-919d-241195af930a', 1, 1),
(24, 'Hannah Baker', 'bpaucek@ullrich.com', '56f63058-30d6-43bb-8b33-b28c9dbcde12', 4, 1),
(25, 'Austin Walsh', 'austin@bosco.org', '4c1b6add-e551-4636-89a7-2eb4a1df9b22', 2, 1),
(26, 'Joseph Carr', 'rod95@heller.com', '74cd4be0-8877-43ac-9845-397fe831f6d3', 3, 1),
(27, 'Maria Ferguson', 'ferguson@bosco.org', '2c328f74-6e74-4127-bed8-07f052fa5849', 2, 1),
(28, 'Matt	Ferguson', 'imelda82@watsica.biz', 'fc89cd1f-fdf7-4a86-8827-fba518e04c1d', 2, 1),
(29, 'Andrew Hart', 'andrew.hart@emard.net', '07032f04-72c9-476f-8c89-cd219a913b4b', 4, 1),
(30, 'Anthony MacDonald', 'anthony24@larkin.info', '628bcf45-d9f1-4da6-b5ab-dd472c7b9b2c', 1, 1);

--
-- Индексы сохранённых таблиц
--

--
-- Индексы таблицы `contacts_people`
--
ALTER TABLE `contacts_people`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT для сохранённых таблиц
--

--
-- AUTO_INCREMENT для таблицы `contacts_people`
--
ALTER TABLE `contacts_people`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=33;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;