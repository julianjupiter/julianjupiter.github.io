---
layout: post
title: Installation of PHP 7 on Windows 10
date: 2017-12-07
description: Step-by-step setup of PHP 7 on Windows 10.
categories:
keywords: PHP installation, PHP installation on Windows
image:
  cover: /assets/images/blog/installation-of-php-7-on-windows-10/cover.PNG
  og: /assets/images/blog/installation-of-php-7-on-windows-10/cover.PNG
  thumbnail: /assets/images/blog/installation-of-php-7-on-windows-10/thumbnail.png
---

This is a step-by-step setup of PHP 7 on Windows 10.

1. Download PHP package from [PHP website](http://windows.php.net/download). The latest version as of this time is `7.2.0`. Choose `VC15 x64 Thread Safe` or `VC15 x86 Thread Safe for 64-bit` or `32-bit` OS. In my case, I downloaded the [former](http://windows.php.net/downloads/releases/php-7.2.0-nts-Win32-VC15-x64.zip "VC15 x86 Thread Safe").

<img class="img-fluid" src="/assets/images/blog/installation-of-php-7-on-windows-10/1.PNG" alt="VC15 x86 Thread Safe">

2. Extract the package to `C:\php`.

3. Inside php directory, make a copy of `php.ini-development` and rename it to `php.ini`.

<img class="img-fluid" src="/assets/images/blog/installation-of-php-7-on-windows-10/2.PNG" alt="PHP Ini")

4. Open `php.ini` and uncomment the following (_line 732_):

```ini
; extension_dir = "ext"
```

<img class="img-fluid" src="/assets/images/blog/installation-of-php-7-on-windows-10/3.PNG" alt="Extension Directory">

5.  Add `php.exe` to `Environment Variables's Path`. To add, look for `Path` under `System variables` and click `Edit...` button. Click New button and enter `C:\php`.

<img class="img-fluid" src="/assets/images/blog/installation-of-php-7-on-windows-10/4a.PNG" alt="Setting Environment Variables Path">

<img class="img-fluid" src="/assets/images/blog/installation-of-php-7-on-windows-10/4b.PNG" alt="Setting Environment Variables Path">

6. To test, create a directory: `C:\workspace\php`. Open your favorite text editor (mine is **Visual Studio Code**). Add the following codes to a file saved as `hello.php` inside `C:\workspace\php`:

```php
<?php

echo "Hello, world!";
```

<img class="img-fluid" src="/assets/images/blog/installation-of-php-7-on-windows-10/5.PNG" alt="Test PHP">

7. Open CMD and cd to `C:\workspace\php`. Run the following command:

```bash
php -S localhost:3000 -t .
```

<img class="img-fluid" src="/assets/images/blog/installation-of-php-7-on-windows-10/6.PNG" alt="PHP Built-in Web Server">

From PHP site:

> _As of PHP 5.4.0, the CLI SAPI provides a built-in web server._

> _This web server was designed to aid application development. It may also be useful for testing purposes or for application demonstrations that are run in controlled environments. It is not intended to be a full-featured web server. It should not be used on a public network._

8. Open your browser and point to `http://localhost:3000/hello.php`

<img class="img-fluid" src="/assets/images/blog/installation-of-php-7-on-windows-10/7.PNG" alt="Open PHP script on browser">

<img class="img-fluid" src="/assets/images/blog/installation-of-php-7-on-windows-10/8.PNG" alt="PHP Built-in Web Server console log">

9. Enable extension you want to use. For example, most likely you will be developing database-driven web applications and you'd want to use [MySQL](https://www.mysql.com/ "MySQL"), the world's most popular open-source DBMS. Install MySQL first if you haven't done so. Then, open `php.ini` and uncomment either or both of the following:

```ini
extension=mysqli
...
extension=pdo_mysql
```

<img class="img-fluid" src="/assets/images/blog/installation-of-php-7-on-windows-10/9.PNG" alt="Enable MySQL extensions">

If you've configured a web server Apache HTTP Server for PHP, you will have to restart it's service for the changes to take effect. As for PHP built-in web server, just run it again.

To test PHP and MySQL connection, you can create a PHP script and call the built-in `phpinfo()` function to display PHP environment. You should be able to see `php_pdo` included under PDO.

```php
<?php
echo phpinfo();
```

<img class="img-fluid" src="/assets/images/blog/installation-of-php-7-on-windows-10/10.PNG" alt="PHP phpinfo() built-in function">

You might also want to create script which creates connection to your database already created in the server.

```php
<?php

$dbProvider = 'mysql';
$dbHost = 'localhost';
$dbPort = '3306';
$dbSchema = 'mydb';
$dbCharSet = 'utf-8';
$dbUser = 'julez';
$dbPassword = 'admin';
$dns = $dbProvider . ':host=' . $dbHost . ';port=' . $dbPort . ';dbname=' . $dbSchema . ';char-set='. $dbCharSet;
$connection = new PDO($dns, $dbUser, $dbPassword);

if ($connection) {
    echo 'Database connected!';
} else {
    die('Unable to connect to databese!');
}
```

Save it as `php_pdo_mysql_test.php` and load to your browser.

<img class="img-fluid" src="/assets/images/blog/installation-of-php-7-on-windows-10/11.PNG" alt="PHP PDO MySQL connection">

It's done!

Please post your comments or suggestions.
