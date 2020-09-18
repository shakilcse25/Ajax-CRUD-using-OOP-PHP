# PHP PDO CRUD with ajax jQuery and Bootstrap

PHP MySQL CRUD Application using jQuery Ajax and Bootstrap

- git clone the repository

  Project setup
- Rename your project directory to "oop_php_ajax_crud"

  Create Database:

- create database name "profilesdb"
- create table using given below sql statement

```sh
CREATE TABLE `profiles` (
 `id` int(11) NOT NULL AUTO_INCREMENT,
 `fname` varchar(255) NOT NULL,
 `lname` varchar(255) NOT NULL,
 `photo` varchar(100) NOT NULL,
 `status` enum('1','0') NOT NULL DEFAULT '1',
 PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8
```

### Run the Project

Run the localhost (Apache service)
point to the:

```sh
http://localhost/oop_php_ajax_crud

```
