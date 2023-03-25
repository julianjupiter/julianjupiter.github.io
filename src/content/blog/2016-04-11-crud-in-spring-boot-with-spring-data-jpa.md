---
title: CRUD in Spring Boot with Spring Data JPA
description: Tutorial about CRUD operations in Spring Boot with Spring Data JPA.
tags: [Java, Spring Boot, Spring MVC, Spring Data JPA, CRUD]
keywords: Java, Spring Boot, Spring MVC, Spring Data JPA, CRUD
author: Julian Jupiter
date: 2016-04-11
slug: crud-in-spring-boot-with-spring-data-jpa
categories:
image:
  cover: /assets/images/blog/crud-in-spring-boot-with-spring-data-jpa/cover.png
---

Tutorial about CRUD operations in Spring Boot with Spring Data JPA. Application developed in this tutorial performs adding, editing, updating and deleting contacts.

We will be using the following to successfully create our application in this tutorial:

- Spring Web (Spring MVC, Spring Web MVC, a lot)
- MySQL
- Spring Data JPA (JPA, Hibernate)
- Thymeleaf - template engine; bye JSP!
- Many more, more than 50. With just a few lines in our pom.xml, let Spring Boot provide everything.

## Create A Project

Go to [Spring Intializr](https://start.spring.io "Spring Initializr") and create a Maven project.

<img class="img-fluid" src="/assets/images/blog/crud-in-spring-boot-with-spring-data-jpa/1.png" alt="Create Project in Spring Initializr">
<br>
<br>

Once done, hit **Generate Project** button to save the project.

Unzip the project and start coding. You can use any editor or IDE you prefer. For Eclipse users, you will have to issue the following command via Terminal before importing to Eclipse:

```bash
$ cd springbootcrud
$ mvn eclipse:eclipse
```

For NetBeans users, just click `File > Open Project...` or click `Open Project` toolbar, and locate where you unzipped the project. NetBeans natively suports Maven project, no conversion needed.

## Dependencies

Updadte your `pom.xml`:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
	xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd">
	<modelVersion>4.0.0</modelVersion>

	<groupId>io.github.julianjupiter</groupId>
	<artifactId>springbootcrud</artifactId>
	<version>0.0.1</version>
	<packaging>jar</packaging>

	<name>CRUD in Spring Boot with Spring Data JPA</name>
	<description>CRUD in Spring Boot with Spring Data JPA</description>

	<parent>
		<groupId>org.springframework.boot</groupId>
		<artifactId>spring-boot-starter-parent</artifactId>
		<version>1.3.3.RELEASE</version>
		<relativePath/> <!-- lookup parent from repository -->
	</parent>

	<properties>
		<project.build.sourceEncoding>UTF-8</project.build.sourceEncoding>
		<java.version>1.8</java.version>
	</properties>

	<dependencies>
		<dependency>
			<groupId>org.springframework.boot</groupId>
			<artifactId>spring-boot-starter-data-jpa</artifactId>
		</dependency>
		<dependency>
			<groupId>org.springframework.boot</groupId>
			<artifactId>spring-boot-starter-thymeleaf</artifactId>
		</dependency>
		<dependency>
			<groupId>org.springframework.boot</groupId>
			<artifactId>spring-boot-starter-web</artifactId>
		</dependency>

		<dependency>
			<groupId>mysql</groupId>
			<artifactId>mysql-connector-java</artifactId>
			<scope>runtime</scope>
		</dependency>
		<dependency>
			<groupId>org.springframework.boot</groupId>
			<artifactId>spring-boot-starter-test</artifactId>
			<scope>test</scope>
		</dependency>
	</dependencies>

	<build>
		<plugins>
			<plugin>
				<groupId>org.springframework.boot</groupId>
				<artifactId>spring-boot-maven-plugin</artifactId>
			</plugin>
		</plugins>
	</build>

</project>

```

## Database Table

Create database in MySQL. Mine is `springbootcrud`. Add the following table:

```sql
CREATE TABLE `contact` (
`id` int(11) NOT NULL AUTO_INCREMENT,
`last_name` varchar(100) NOT NULL,
`first_name` varchar(100) NOT NULL,
`mobile_no` varchar(11) NOT NULL,
`address` varchar(255) NOT NULL,
`date_created` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
```

## Codes

### Property

Insert the following to `application.properties`

```properties
spring.datasource.url = jdbc:mysql://localhost:3306/springbootcrud
spring.datasource.username = root
spring.datasource.password = admin123
```

### Configuration

`RepositoryConfiguration.java`

```java
package io.github.julianjupiter.springbootcrud.configuration;

import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.orm.jpa.EntityScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.transaction.annotation.EnableTransactionManagement;

@Configuration
@EnableAutoConfiguration
@EntityScan(basePackages = {"io.github.julianjupiter.springbootcrud.domain"})
@EnableJpaRepositories(basePackages = {"io.github.julianjupiter.springbootcrud.repository"})
@EnableTransactionManagement
public class RepositoryConfiguration {
}
```

### Main Class

`Application.java`

```java
package io.github.julianjupiter;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class Application {

	public static void main(String[] args) {
		SpringApplication.run(Application.class, args);
	}
}
```

### Domain

`Contact.java`

```java
package io.github.julianjupiter.springbootcrud.domain;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.validation.constraints.Size;
import org.hibernate.validator.constraints.NotEmpty;

@Entity
public class Contact {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer id;
    @NotEmpty(message = "Last Name is required.")
    @Size(min = 2, message = "Last Name must be at least 2 characters.")
    private String lastName;
    @NotEmpty(message = "First Name is required.")
    @Size(min = 2, message = "First Name must be at least 2 characters.")
    private String firstName;
    @Column(name = "mobile_no")
    @Size(min = 11, max = 11, message = "Mobile no. must be 11 digits.")
    private String mobileNumber;
    @NotEmpty(message = "Address is required.")
    private String address;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getMobileNumber() {
        return mobileNumber;
    }

    public void setMobileNumber(String mobileNumber) {
        this.mobileNumber = mobileNumber;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

}
```

### Repository

`ContactRepository.java`

```java
package io.github.julianjupiter.springbootcrud.repository;

import io.github.julianjupiter.springbootcrud.domain.Contact;
import org.springframework.data.repository.CrudRepository;

public interface ContactRepository extends CrudRepository<Contact, Integer>{

}
```

### Service

`ContactService.java`

```java
package io.github.julianjupiter.springbootcrud.service;

import io.github.julianjupiter.springbootcrud.domain.Contact;

public interface ContactService {
    Iterable<Contact> getAllContacts();
    Contact getContactById(Integer id);
    Contact saveContact(Contact contact);
    void deleteContact(Integer id);
}
```

`ContactServiceImpl.java`

```java
package io.github.julianjupiter.springbootcrud.service;

import io.github.julianjupiter.springbootcrud.domain.Contact;
import io.github.julianjupiter.springbootcrud.repository.ContactRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ContactServiceImpl implements ContactService {

    private ContactRepository contactRepository;

    @Autowired
    public void setContactRepository(ContactRepository contactRepository) {
        this.contactRepository = contactRepository;
    }

    @Override
    public Iterable<Contact> getAllContacts() {
        return this.contactRepository.findAll();
    }

    @Override
    public Contact getContactById(Integer id) {
        return this.contactRepository.findOne(id);
    }

    @Override
    public Contact saveContact(Contact contact) {
        return this.contactRepository.save(contact);
    }

    @Override
    public void deleteContact(Integer id) {
        this.contactRepository.delete(id);
    }

}
```

### Controllers

`HomeController.java`

```java
package io.github.julianjupiter.springbootcrud.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class HomeController {
    @RequestMapping(value = { "", "/", "/home" })
    public String index(Model model) {
        model.addAttribute("activePage", "home");
        return "index";
    }
}
```

`ContactController.java`

```java
package io.github.julianjupiter.springbootcrud.controller;

import io.github.julianjupiter.springbootcrud.domain.Contact;
import io.github.julianjupiter.springbootcrud.service.ContactService;
import javax.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@Controller
@RequestMapping("/contacts")
public class ContactController {
    private ContactService contactService;

    @Autowired
    public void setContactService(ContactService contactService) {
        this.contactService = contactService;
    }

    @RequestMapping(value = { "", "/" })
    public String index(Model model) {
        model.addAttribute("activePage", "contacts");
        model.addAttribute("contacts", this.contactService.getAllContacts());
        return "contacts/index";
    }

    @RequestMapping(value = "/add", method = RequestMethod.GET)
    public String addContactForm(Contact contact, Model model) {
        model.addAttribute("activePage", "contacts");
        return "contacts/add";
    }

    @RequestMapping(value = "/add", method = RequestMethod.POST)
    public String addContact(@Valid Contact contact, BindingResult bindingResult, Model model) {
        if (bindingResult.hasErrors()) {
            model.addAttribute("activePage", "contacts");
            return "contacts/add";
        }

        this.contactService.saveContact(contact);
        return "redirect:/contacts";
    }

    @RequestMapping(value = "/view/{id}")
    public String viewContact(@PathVariable Integer id, Model model) {
        model.addAttribute("contact", this.contactService.getContactById(id));
        model.addAttribute("activePage", "contacts");
        return "contacts/view";
    }

    @RequestMapping(value = "/edit/{id}")
    public String editContact(@PathVariable Integer id, Model model) {
        model.addAttribute("contact", this.contactService.getContactById(id));
        model.addAttribute("activePage", "contacts");
        return "contacts/edit";
    }

    @RequestMapping(value = "/update", method = RequestMethod.POST)
    public String updateContact(Contact contact) {
        System.out.println("Contact ID: " + contact.getId());
        this.contactService.saveContact(contact);
        return "redirect:/contacts/view/" + contact.getId();
    }

    @RequestMapping(value = "/delete/{id}", method = RequestMethod.GET)
    public String deleteContact(@PathVariable Integer id) {
        this.contactService.deleteContact(id);
        return "redirect:/contacts";
    }

}
```

## Views

### Fragments

`templates/fragments/head.html`

```html
<!DOCTYPE html>
<html xmlns:th="http://www.thymeleaf.org">
    <head>
        <link href="../static/css/bootstrap.min.css" th:href="@{/css/bootstrap.min.css}" rel="stylesheet" media="screen" />
        <link href="../static/css/app.css" th:href="@{/css/app.css}" rel="stylesheet" media="screen" />
    </head>
    <body>
    </body>
</html>
```

`templates/fragments/header.html`

```html
<!DOCTYPE html>
<html xmlns:th="http://www.thymeleaf.org">
    <head></head>
    <body>
        <nav class="navbar navbar-inverse navbar-fixed-top">
            <div class="container">
                <div class="navbar-header">
                    <button type="button" class="navbar-toggle collapsed"
                            data-toggle="collapse" data-target="#navbar" aria-expanded="false"
                            aria-controls="navbar">
                        <span class="sr-only">Toggle navigation</span> <span
                            class="icon-bar"></span> <span class="icon-bar"></span> <span
                            class="icon-bar"></span>
                    </button>
                    <a class="navbar-brand" href="#" th:href="@{/}">Spring Boot</a>
                </div>
                <div id="navbar" class="collapse navbar-collapse">
                    <ul class="nav navbar-nav">
                        <li th:class="${activePage == 'home'}? 'active' : ''"><a href="#" th:href="@{/}">Home</a></li>
                        <li th:class="${activePage} == 'contacts'? 'active' : ''"><a href="#" th:href="@{/contacts}">Contacts</a></li>
                    </ul>
                </div>
                <!--/.nav-collapse -->
            </div>
        </nav>
    </body>
</html>
```

`templates/fragments/js.html`

```html
<!DOCTYPE html>
<html xmlns:th="http://www.thymeleaf.org">
    <head></head>
    <body>
        <script src="../static/js/jquery.min.js" th:src="@{/js/jquery.min.js}"></script>
        <script src="../static/js/bootstrap.min.js" th:src="@{/js/bootstrap.min.js}"></script>
    </body>
</html>
```

### Home

`templates/index.html`

```html
<!DOCTYPE html>
<html>
    <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Home - CRUD in Spring Boot with Spring Data JPA</title>
        <!--/*/ <th:block th:include="fragments/head :: head"></th:block> /*/-->
    </head>
    <body>
        <!--/*/ <th:block th:include="fragments/header :: body"></th:block> /*/-->
        <div class="container">
            <div class="starter-template">
                <h1>CRUD in Spring Boot with Spring Data JPA</h1>
                <p class="lead">This application demonstrates CRUD application developed with Spring Boot, Spring Data JPA, Thymeleaf and MySQL.<br />
                    <a href="/contacts" class="btn btn-primary btn-lg">Contacts</a>
                </p>
            </div>
        </div>
        <!--/*/ <th:block th:include="fragments/js :: body"></th:block> /*/-->
    </body>
</html>
```

### Contacts

`templates/contact/index.html`

```html
<!DOCTYPE html>
<html>
    <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Contacts - CRUD in Spring Boot with Spring Data JPA</title>
        <!--/*/ <th:block th:include="fragments/head :: head"></th:block> /*/-->
    </head>
    <body>
        <!--/*/ <th:block th:include="fragments/header :: body"></th:block> /*/-->
        <div class="container">
            <div class="row">
                <div class="col-sm-10 col-sm-offset-1">
                    <div class="panel panel-default">
                        <!-- Default panel contents -->
                        <div class="panel-heading">Contacts <a th:href="@{/contacts/add}" class="btn btn-primary"><span class="glyphicon glyphicon-plus" aria-hidden="true"></span></a></div>
                        <table class="table">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Last Name</th>
                                    <th>First Name</th>
                                    <th>Mobile No.</th>
                                    <th>Address</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                            <div th:if="!${#lists.isEmpty(contacts)}">
                                <tr th:each = "contact : ${contacts}">
                                    <td th:text = "${contact.id}"></td>
                                    <td th:text = "${contact.lastName}"></td>
                                    <td th:text = "${contact.firstName}"></td>
                                    <td th:text = "${contact.mobileNumber}"></td>
                                    <td th:text = "${contact.address}"></td>
                                    <td>
                                        <div class="btn-group" role="group" aria-label="...">
                                            <a th:href="${'/contacts/view/' + contact.id}" class="btn btn-info"><span class="glyphicon glyphicon-eye-open" aria-hidden="true"></span></a>
                                            <a th:href="${'/contacts/edit/' + contact.id}" class="btn btn-success"><span class="glyphicon glyphicon-edit" aria-hidden="true"></span></a>
                                            <a th:href="${'/contacts/delete/' + contact.id}" class="btn btn-danger"><span class="glyphicon glyphicon-remove" aria-hidden="true"></span></a>
                                        </div>
                                    </td>
                                </tr>
                            </div>
                            <div th:if="${#lists.isEmpty(contacts)}">
                                <tr>
                                    <td>No contact exists!</td>
                                </tr>
                            </div>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
        <!--/*/ <th:block th:include="fragments/js :: body"></th:block> /*/-->
        <script src="../static/js/app.js" th:src="@{/js/app.js}"></script>
    </body>
</html>
```

`templates/contact/add.html`

```html
<!DOCTYPE html>
<html>
    <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Contacts - CRUD in Spring Boot with Spring Data JPA</title>
        <!--/*/ <th:block th:include="fragments/head :: head"></th:block> /*/-->
    </head>
    <body>
        <!--/*/ <th:block th:include="fragments/header :: body"></th:block> /*/-->
        <div class="container">
            <div class="row">
                <div class="col-sm-8 col-sm-offset-2">
                    <!--<div class="container">-->
                    <div class="panel panel-default">
                        <!-- Default panel contents -->
                        <div class="panel-heading">Add Contact</div>
                        <div class="panel-body">
                            <form action="/contacts/add" th:action="@{/contacts/add}" th:object="${contact}" method="post">
                                <div class="form-group">
                                    <label for="inputLastName">Last Name</label>
                                    <input type="text" class="form-control" id="inputLastName" placeholder="Last Name" th:field="*{lastName}" name="lastName" />
                                    <span  class="help-block" th:if="${#fields.hasErrors('lastName')}" th:errors="*{lastName}">Last Name Error</span>
                                </div>
                                <div class="form-group">
                                    <label for="inputFirstName">First Name</label>
                                    <input type="text" class="form-control" id="inputFirstName" placeholder="First Name" th:field="*{firstName}" name="firstName" />
                                    <span  class="help-block" th:if="${#fields.hasErrors('firstName')}" th:errors="*{firstName}">First Name Error</span>
                                </div>
                                <div class="form-group">
                                    <label for="inputMobileNumber">Mobile Number</label>
                                    <input type="text" class="form-control" id="inputMobileNumber" placeholder="Mobile No." th:field="*{mobileNumber}" name="mobileNumber" />
                                    <span  class="help-block" th:if="${#fields.hasErrors('mobileNumber')}" th:errors="*{mobileNumber}">Mobile Number Error</span>
                                </div>
                                <div class="form-group">
                                    <label for="inputAddress">Address</label>
                                    <input type="text" class="form-control" id="inputAddress" placeholder="Address" th:field="*{address}" name="address" />
                                    <span  class="help-block" th:if="${#fields.hasErrors('address')}" th:errors="*{address}">Address Error</span>
                                </div>
                                <div class="text-right">
                                    <a href="/contacts" th:href="@{/contacts}" class="btn btn-default">Cancel</a>
                                    <button type="submit" class="btn btn-primary">Save</button>
                                </div>
                            </form>
                        </div>
                        <div class="panel-footer">
                        </div>
                    </div>
                    <!--</div>-->
                </div>
            </div>
        </div>
        <!--/*/ <th:block th:include="fragments/js :: body"></th:block> /*/-->
        <script src="../static/js/app.js" th:src="@{/js/app.js}"></script>
    </body>
</html>
```

`templates/contact/view.html`

```html
<!DOCTYPE html>
<html>
    <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Contacts - CRUD in Spring Boot with Spring Data JPA</title>
        <!--/*/ <th:block th:include="fragments/head :: head"></th:block> /*/-->
    </head>
    <body>
        <!--/*/ <th:block th:include="fragments/header :: body"></th:block> /*/-->
        <div class="container">
            <div class="row">
                <div class="col-sm-8 col-sm-offset-2">
                    <!--<div class="container">-->
                    <div class="panel panel-default">
                        <!-- Default panel contents -->
                        <div class="panel-heading">View Contact</div>
                        <div class="panel-body">
                            <div class="form-group">
                                <label for="inputId">ID</label>
                                <input type="text" class="form-control" id="inputId" placeholder="ID" th:field="*{contact.id}" name="id" disabled="disabled" />
                            </div>
                            <div class="form-group">
                                <label for="inputLastName">Last Name</label>
                                <input type="text" class="form-control" id="inputLastName" placeholder="Last Name" th:field="*{contact.lastName}" name="lastName" disabled="disabled" />
                            </div>
                            <div class="form-group">
                                <label for="inputFirstName">First Name</label>
                                <input type="text" class="form-control" id="inputFirstName" placeholder="First Name" th:field="*{contact.firstName}" name="firstName" disabled="disabled" />
                            </div>
                            <div class="form-group">
                                <label for="inputMobileNumber">Mobile Number</label>
                                <input type="text" class="form-control" id="inputMobileNumber" placeholder="Mobile No." th:field="*{contact.mobileNumber}" name="mobileNumber" disabled="disabled" />
                            </div>
                            <div class="form-group">
                                <label for="inputAddress">Address</label>
                                <input type="text" class="form-control" id="inputAddress" placeholder="Address" th:field="*{contact.address}" name="address" disabled="disabled" />
                            </div>
                            <div class="text-right">
                                <a href="/contacts" th:href="@{/contacts}" class="btn btn-default">Back</a>
                                <a th:href="@{'/contacts/edit/' + ${contact.id}}" class="btn btn-primary">Edit</a>
                            </div>
                        </div>
                        <div class="panel-footer">
                        </div>
                    </div>
                    <!--</div>-->
                </div>
            </div>
        </div>
        <!--/*/ <th:block th:include="fragments/js :: body"></th:block> /*/-->
        <script src="../static/js/app.js" th:src="@{/js/app.js}"></script>
    </body>
</html>
```

`templates/contact/edit.html`

```html
<!DOCTYPE html>
<html>
    <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Contacts - CRUD in Spring Boot with Spring Data JPA</title>
        <!--/*/ <th:block th:include="fragments/head :: head"></th:block> /*/-->
    </head>
    <body>
        <!--/*/ <th:block th:include="fragments/header :: body"></th:block> /*/-->
        <div class="container">
            <div class="row">
                <div class="col-sm-8 col-sm-offset-2">
                    <!--<div class="container">-->
                    <div class="panel panel-default">
                        <!-- Default panel contents -->
                        <div class="panel-heading">Edit Contact</div>
                        <div class="panel-body">
                            <form th:action="@{/contacts/update}" th:object="${contact}" method="post">
                                <input type="hidden" th:field="*{id}" />
                                <div class="form-group">
                                    <label for="inputId">ID</label>
                                    <input type="text" class="form-control" id="inputId" placeholder="ID" th:field="*{id}" disabled="disabled" />
                                </div>
                                <div class="form-group">
                                    <label for="inputLastName">Last Name</label>
                                    <input type="text" class="form-control" id="inputLastName" placeholder="Last Name" th:field="*{lastName}" />
                                </div>
                                <div class="form-group">
                                    <label for="inputFirstName">First Name</label>
                                    <input type="text" class="form-control" id="inputFirstName" placeholder="First Name" th:field="*{firstName}" />
                                </div>
                                <div class="form-group">
                                    <label for="inputMobileNumber">Mobile Number</label>
                                    <input type="text" class="form-control" id="inputMobileNumber" placeholder="Mobile No." th:field="*{mobileNumber}" />
                                </div>
                                <div class="form-group">
                                    <label for="inputAddress">Address</label>
                                    <input type="text" class="form-control" id="inputAddress" placeholder="Address" th:field="*{address}" />
                                </div>
                                <div class="text-right">
                                    <a href="/contacts" th:href="@{/contacts}" class="btn btn-default">Cancel</a>
                                    <button type="submit" class="btn btn-primary">Save</button>
                                </div>
                            </form>
                        </div>
                        <div class="panel-footer">
                        </div>
                    </div>
                    <!--</div>-->
                </div>
            </div>
        </div>
        <!--/*/ <th:block th:include="fragments/js :: body"></th:block> /*/-->
        <script src="../static/js/app.js" th:src="@{/js/app.js}"></script>
    </body>
</html>
```

## Static Files

### CSS

`static/css/app.css`

```css
body {
  padding-top: 60px;
}

.starter-template {
  padding: 40px 15px;
  text-align: center;
}
```

Also included are CSS (`bootstrap.min.css`, `bootstrap-theme.min.css`) and JavaScript (`bootstrap.min`) files of **_Bootstrap_** as well as **_jQuery_**. They can also be downloaded from [Bootstrap](http://getbootstrap.com) website.

## Running the Application

```bash
$ mvn package && java -jar target/springbootcrud-0.0.1.jar
```

Open your browser and point to: <a href="http://localhost:8080" _target="blank">http://localhost:8080</a>

## Screenshots

<br>

## Home Page

<br>
<img class="img-fluid" src="/assets/images/blog/crud-in-spring-boot-with-spring-data-jpa/2.png" alt="Create Project in Spring Initializr">
<br>
<br>

### Contacts Page

<br>

#### Contact List (without records)

<br>
<img class="img-fluid" src="/assets/images/blog/crud-in-spring-boot-with-spring-data-jpa/3.png" alt="Create Project in Spring Initializr">
<br>
<br>

#### Add Contact Form

<br>
<img class="img-fluid" src="/assets/images/blog/crud-in-spring-boot-with-spring-data-jpa/4.png" alt="Create Project in Spring Initializr">
<br>
<br>
<img class="img-fluid" src="/assets/images/blog/crud-in-spring-boot-with-spring-data-jpa/5.png" alt="Create Project in Spring Initializr">
<br>
<br>

#### Contact List (with records)

<br>
<img class="img-fluid" src="/assets/images/blog/crud-in-spring-boot-with-spring-data-jpa/6.png" alt="Create Project in Spring Initializr">
<br>
<br>

#### View Contact

<br>
<img class="img-fluid" src="/assets/images/blog/crud-in-spring-boot-with-spring-data-jpa/7.png" alt="Create Project in Spring Initializr">
<br>
<br>

#### Edit Contact Form

<br>
<img class="img-fluid" src="/assets/images/blog/crud-in-spring-boot-with-spring-data-jpa/8.png" alt="Create Project in Spring Initializr">
<br>
<br>
Please post your comments or suggestions.

You can download complete source code [here](https://github.com/julianjupiter/springbootcrud "springbootcrud Source Code").
