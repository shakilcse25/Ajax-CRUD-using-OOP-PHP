-- phpMyAdmin SQL Dump
-- version 4.8.4
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Sep 18, 2020 at 08:32 PM
-- Server version: 10.1.37-MariaDB
-- PHP Version: 7.3.1

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `profilesdb`
--

-- --------------------------------------------------------

--
-- Table structure for table `profiles`
--

CREATE TABLE `profiles` (
  `id` int(11) NOT NULL,
  `fname` varchar(255) NOT NULL,
  `lname` varchar(255) NOT NULL,
  `photo` varchar(100) NOT NULL,
  `status` enum('1','0') NOT NULL DEFAULT '1'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `profiles`
--

INSERT INTO `profiles` (`id`, `fname`, `lname`, `photo`, `status`) VALUES
(18, 'John', 'Doe', '6c4edce613831847494ab022e32cd7cd.jpeg', '1'),
(19, 'Leo', 'Mess', '5f79b7a60506e35f5be18033da71b2cd.jpg', '1'),
(20, 'Satoshi ', 'Nakamoto ', '67fbffe702f494a27ef23b4430e7fff2.jpg', '1'),
(21, 'Imran', 'Khan', 'e07be0e0716fd6d701ec142541545b1c.jpg', '1'),
(22, 'Roger ', 'Federer', 'a7406f5e7a88b3a8ed4fae12b1a5a34f.png', '1'),
(23, 'Rasmus ', 'Lerdorf', '5ef8ad74421fa6a4395b33616d75a98f.jpg', '1'),
(24, 'Recep Tayyip ', 'Erdoğan', 'c7c75636cd6aaa0da31e3298216fb9aa.png', '1'),
(25, 'Mark Elliot ', 'Zuckerberg', '7cd621b3904bbd833fb550d6b1a50b38.jpg', '1'),
(26, 'Steven Paul ', 'Jobs', '87044f13061e0b2ab67d5bffe4dc1995.jpeg', '1'),
(27, 'Bill', 'Gates', 'c43fb284e6c1d17e5585af3332cd6ae3.jpg', '1'),
(28, 'Albert', 'Einstein', '9f35469c58a399cd2de743a55a49133b.jpg', '1'),
(29, 'Jeff', 'Bezos', '6ad7989b41721ca607e410ab707c04a3.jpg', '1'),
(30, 'Thomas', 'Edison', 'e01e4f66f9fdfcf2a5371d3875fddf86.jpg', '1');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `profiles`
--
ALTER TABLE `profiles`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `profiles`
--
ALTER TABLE `profiles`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=32;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
