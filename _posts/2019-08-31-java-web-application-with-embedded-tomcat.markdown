---
layout: post
title: Java Web Application with Embedded Tomcat
date: 2019-08-31
description: This tutorial is to create a Java web application using embedded Apache Tomcat web server.
categories:
keywords: Java, Java web, Apache Tomcat, Tomcat embed, Tomcat embedded
image:
  cover: /assets/images/blog/java-web-application-with-embedded-tomcat/cover.PNG
  og: /assets/images/blog/java-web-application-with-embedded-tomcat/cover.PNG
  thumbnail: /assets/images/blog/java-web-application-with-embedded-tomcat/thumbnail.png
---

### Purpose

This is to create a web application in Java. The Apache Tomcat will be emddeded to the JAR (not WAR), called uber/fat JAR. Other dependencies, if there is any, will also be included.

We will create a page with the following URL:

```
http://localhost:8080/app/
```

This page will display an introduction about embedding Tomcat with Java Web application. This also include button that is link to _[Books](http://localhost:8080/app/books)_ page.

**_Book_** page is a list of books with columns: **_ID_**, **_Title_**, **_Edition_** and **_Action_** button that when clicked will display a modal consisting more information about selected book.

### Requirements

- JDK 8
- Maven
- an IDE - Eclipse (Or NetBeans, Intellij IDEA, if you prefer)

### Build with Maven

First, we'll create a Java Maven project. Open your terminal and cd to your preferred workspace and run the following commands:

```bash
$ mkdir java-web-app-with-embedded-tomcat
$ cd java-web-app-with-embedded-tomcat
$ mkdir -p src/main/java/io/github/julinjupiter/app
$ mkdir src/main/resources
$ mkdir -p src/main/webapp/WEB-INF
$ touch pom.xml
```

_Note:_ you can choose your own package instead of _io/github/julianjupiter/app_ (_io.github.julinjupiter.app_)

The project structure should now be:

```
    java-web-app-with-embedded-tomcat
    └── src
        └── main
            └── java
                └── io
                    └── github
                        └── julianjupiter
                            └── app
            └── resources
            └── webapp
                └── WEB-INF
    └── pom.xml
```

Open **_pom.xml_** using your favorite editor (mine is [Visual Studio Code](https://code.visualstudio.com)). Copy and paste the following XML.

```xml
<project xmlns="http://maven.apache.org/POM/4.0.0"
  xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
  xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd">
  <modelVersion>4.0.0</modelVersion>
  <groupId>io.github.julianjupiter</groupId>
  <artifactId>java-web-app-with-embedded-tomcat</artifactId>
  <version>1.0.0-SNAPSHOT</version>
  <packaging>jar</packaging>

  <name>java-web-app-with-embedded-tomcat</name>
  <description>Java Web Application with Embedded Tomcat.</description>

  <properties>
		<project.build.sourceEncoding>UTF-8</project.build.sourceEncoding>
		<project.reporting.outputEncoding>UTF-8</project.reporting.outputEncoding>
		<maven.compiler.source>1.8</maven.compiler.source>
		<maven.compiler.target>1.8</maven.compiler.target>
		<failOnMissingWebXml>false</failOnMissingWebXml>
		<tomcat.version>9.0.36</tomcat.version>
        <slf4j.version>1.7.30</slf4j.version>
	</properties>

	<dependencies>
		<dependency>
			<groupId>org.apache.tomcat.embed</groupId>
			<artifactId>tomcat-embed-core</artifactId>
			<version>${tomcat.version}</version>
		</dependency>
		<dependency>
			<groupId>org.apache.tomcat.embed</groupId>
			<artifactId>tomcat-embed-jasper</artifactId>
			<version>${tomcat.version}</version>
		</dependency>
		<dependency>
			<groupId>javax.servlet</groupId>
			<artifactId>jstl</artifactId>
			<version>1.2</version>
		</dependency>
		<dependency>
			<groupId>jakarta.json.bind</groupId>
			<artifactId>jakarta.json.bind-api</artifactId>
			<version>1.0.2</version>
		</dependency>				
		<dependency>
		    <groupId>org.eclipse</groupId>
		    <artifactId>yasson</artifactId>
		    <version>1.0.7</version>
		</dependency>		
		<dependency>
			<groupId>org.glassfish</groupId>
			<artifactId>jakarta.json</artifactId>
			<version>1.1.6</version>
		</dependency>
		<dependency>
			<groupId>org.slf4j</groupId>
			<artifactId>slf4j-log4j12</artifactId>
			<version>${slf4j.version}</version>
		</dependency>
		<dependency>
			<groupId>org.slf4j</groupId>
			<artifactId>jcl-over-slf4j</artifactId>
			<version>${slf4j.version}</version>
		</dependency>
	</dependencies>

	<build>
		<resources>
			<resource>
				<directory>src/main/webapp</directory>
				<targetPath>META-INF/resources</targetPath>
			</resource>
			<resource>
				<directory>src/main/resources</directory>
			</resource>
		</resources>
		<plugins>
			<plugin>
				<groupId>org.apache.maven.plugins</groupId>
				<artifactId>maven-shade-plugin</artifactId>
				<version>3.2.4</version>
				<configuration>
					<createDependencyReducedPom>true</createDependencyReducedPom>
					<filters>
						<filter>
							<artifact>*:*</artifact>
							<excludes>
								<exclude>META-INF/*.SF</exclude>
								<exclude>META-INF/*.DSA</exclude>
								<exclude>META-INF/*.RSA</exclude>
							</excludes>
						</filter>
					</filters>
				</configuration>
				<executions>
					<execution>
						<phase>package</phase>
						<goals>
							<goal>shade</goal>
						</goals>
						<configuration>
							<createDependencyReducedPom>false</createDependencyReducedPom>
							<transformers>
								<transformer implementation="org.apache.maven.plugins.shade.resource.ServicesResourceTransformer"/>
								<transformer implementation="org.apache.maven.plugins.shade.resource.ManifestResourceTransformer">
									<mainClass>io.github.julianjupiter.app.Main</mainClass>
								</transformer>
							</transformers>
						</configuration>
					</execution>
				</executions>
			</plugin>
		</plugins>
	</build>
</project>
```

Take note that our **_packaging_** is **_jar_** and we are using **_Maven Shade Plugin_** here to package our application into JAR. From its website, it reads:

_This plugin provides the capability to package the artifact in an uber-jar, including its dependencies and to shade - i.e. rename - the packages of some of the dependencies._

Another thing worth to mention is the **_mainClass_** tag where we define our class with **_main_** method.

Lastly, we include at least two dependencies for embedding Tomcat: _tomcat-embed-core_, _tomcat-embed-jasper_.

### Import to Eclipse

To import the project:

_Eclipse - File > Import... > Maven > Existing Maven Projects > Browse ... (for Root Directory) > Finish_

### Let's Start Coding

#### Server

Create a package **_server_** under **_app_**. Under this package, we will have an interface **_Server_** and class **_TomcatServer_**. The interface will have one abstract method, **_run_** which will serve as entry point to start our Tomcat server. This opens a possibility to add more servers other than Tomcat, either from scratch or use existing ones (Jetty, Undertow).

##### `Server.java`

```java
package io.github.julianjupiter.app.server;

public interface Server {
    public void run(String[] args);
}
```

##### `TomcatServer.java`

```java
package io.github.julianjupiter.app.server;

import java.io.File;

import org.apache.catalina.Context;
import org.apache.catalina.LifecycleException;
import org.apache.catalina.WebResourceRoot;
import org.apache.catalina.startup.Tomcat;
import org.apache.catalina.webresources.DirResourceSet;
import org.apache.catalina.webresources.StandardRoot;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class TomcatServer implements Server {

    private static final Logger LOGGER = LoggerFactory.getLogger(TomcatServer.class);
    private static final String DEFAULT_HOST = "localhost";
    private static final int DEFAULT_PORT = 8080;
    private static final String DEFAULT_CONTEXT_PATH = "/app";
    private static final String DOC_BASE = ".";
    private static final String ADDITION_WEB_INF_CLASSES = "target/classes";
    private static final String WEB_APP_MOUNT = "/WEB-INF/classes";
    private static final String INTERNAL_PATH = "/";

    @Override
    public void run(String[] args) {
        int port = port(args);
        Tomcat tomcat = tomcat(port);

        try {
            tomcat.start();
        } catch (LifecycleException exception) {
            LOGGER.error("{}", exception.getMessage());
            LOGGER.error("Exit...");
            System.exit(1);
        }

        LOGGER.info("Application started with URL {}.", DEFAULT_HOST + ":" + port + DEFAULT_CONTEXT_PATH);
        LOGGER.info("Hit Ctrl + D or C to stop it...");
        tomcat.getServer().await();
    }

    private int port(String[] args) {
        if (args.length > 0) {
            String port = args[0];
            try {
                return Integer.valueOf(port);
            } catch (NumberFormatException exception) {
                LOGGER.error("Invalid port number argument {}", port, exception);
            }
        }

        return DEFAULT_PORT;
    }

    private Tomcat tomcat(int port) {
        Tomcat tomcat = new Tomcat();
        tomcat.setHostname(DEFAULT_HOST);
        tomcat.getHost().setAppBase(DOC_BASE);
        tomcat.setPort(port);
        tomcat.getConnector();
        context(tomcat);

        return tomcat;
    }

    private Context context(Tomcat tomcat) {
        Context context = tomcat.addWebapp(DEFAULT_CONTEXT_PATH, DOC_BASE);
        File classes = new File(ADDITION_WEB_INF_CLASSES);
        String base = classes.getAbsolutePath();
        WebResourceRoot resources = new StandardRoot(context);
        resources.addPreResources(new DirResourceSet(resources, WEB_APP_MOUNT, base, INTERNAL_PATH));
        context.setResources(resources);

        return context;
    }
}
```

##### Main.java

We will now create our main class as defined by **_mainClass_** in pom.xml.

As this class contains **_main_** method, this will serve as entry point to start our application and the server. Here, we instantiate the **_TomcatServer_** class and call **_run_** method. We pass in **_args_** argument from **_main_** method to **_run_** method. By default, the server will listen on port **_8080_** but we can override it by passing desired port number to our **_main_** method. This is optional, though (stick to 8080).

```java
package io.github.julianjupiter.app;

import io.github.julianjupiter.app.server.Server;
import io.github.julianjupiter.app.server.TomcatServer;

public class Main {
    public static void main(String[] args) {
        Server app = new TomcatServer();
        app.run(args);
    }
}
```

With the codes above, we can now build and run our application, but since there is no Servlet handler or default JSP page, it will just error page.

To test our application, create a **_index.jsp_** file inside **_webapp_** folder.

```html
<%@ page language="java" contentType="text/html; charset=ISO-8859-1" pageEncoding="ISO-8859-1"%>
<!DOCTYPE html>
<html>
    <head>
        <meta charset="UTF-8">
        <title>Java Web Application with Embedded Tomcat</title>
    </head>
    <body>
        <h1>Hello, world!</h1>
    </body>
</html>
```

To build and run the application, run the following commands under the root directory of the project:

```bash
$ mvn package
$ java -jar ./target/java-web-app-with-embedded-tomcat-1.0.0-SNAPSHOT.jar
```

If the application starts successfully, open your browser: [http://localhost:8080/app](http://localhost:8080/app).

<br>
<img class="img-fluid" src="/assets/images/blog/java-web-application-with-embedded-tomcat/1.PNG">
<br>
<br>

### Add Servlet, JSPs and Other Classes

#### Domain Model

##### `Book.java`

This class is simply a POJO as state container of our data.

```java
package io.github.julianjupiter.app.domain;

import javax.json.bind.annotation.JsonbNillable;

@JsonbNillable
public class Book {
    private long id;
    private String title;
    private String edition;

    private String isbn;
    private String author;
    private String yearPublished;

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getEdition() {
        return edition;
    }

    public String getIsbn() {
        return isbn;
    }

    public void setIsbn(String isbn) {
        this.isbn = isbn;
    }

    public void setEdition(String edition) {
        this.edition = edition;
    }

    public String getAuthor() {
        return author;
    }

    public void setAuthor(String author) {
        this.author = author;
    }

    public String getYearPublished() {
        return yearPublished;
    }

    public void setYearPublished(String yearPublished) {
        this.yearPublished = yearPublished;
    }
}
```

#### Repository

These serve our repository. However, the data is just a dummy for this demo.

##### `BookRepository.java`

```java
    package io.github.julianjupiter.app.repository;

    import java.util.Optional;

    import io.github.julianjupiter.app.domain.Book;

    public interface BookRepository {

        Iterable<Book> findAll();

        Optional<Book> findById(long id);

    }
```

##### `BookRepositoryImpl.java`

```java
package io.github.julianjupiter.app.repository;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import io.github.julianjupiter.app.domain.Book;

public class BookRepositoryImpl implements BookRepository {

    private static List<Book> bookList = new ArrayList<>();

    static {
        Book book1 = new Book();
        book1.setId(1L);
        book1.setTitle("Beginning Spring Boot 2");
        book1.setIsbn("978-1-4842-2930-9");
        book1.setAuthor("K. Siva Prasad Reddy");
        book1.setYearPublished("2017");

        Book book2 = new Book();
        book2.setId(2L);
        book2.setTitle("Effective Java");
        book2.setEdition("Third Edition");
        book2.setIsbn("978-0-13-468599-1");
        book2.setAuthor("Joshua Block");
        book2.setYearPublished("2018");

        Book[] books = { book1, book2 };
        bookList = Arrays.asList(books);
    }

    @Override
    public Iterable<Book> findAll() {
        return bookList;
    }

    @Override
    public Optional<Book> findById(long id) {
        return bookList.stream()
            .filter(book -> book.getId() == id)
            .findFirst();
    }

}
```

#### Service

These serve as intermediary between our controller and repository.

##### `BookService.java`

```java
package io.github.julianjupiter.app.service;

import java.util.Optional;

import io.github.julianjupiter.app.domain.Book;

public interface BookService {

    Iterable<Book> findAll();

    Optional<Book> findById(long id);

}
```

##### `BookServiceImpl.java`

```java
package io.github.julianjupiter.app.service;

import java.util.Optional;

import io.github.julianjupiter.app.domain.Book;
import io.github.julianjupiter.app.repository.BookRepository;

public class BookServiceImpl implements BookService {

    private BookRepository bookRepository;

    public BookServiceImpl(BookRepository bookRepository) {
        this.bookRepository = bookRepository;
    }

    @Override
    public Iterable<Book> findAll() {
        return this.bookRepository.findAll();
    }

    @Override
    public Optional<Book> findById(long id) {
        return this.bookRepository.findById(id);
    }

}
```

##### Controller

##### `BaseController.java`

We'll create a base controller that will contain common properties and methods to be used by our controller. We extends this class with **_HttpServlet_** so that any class (controller) that extends it becomes an Servlet too.

```java
package io.github.julianjupiter.app.controller;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

public class BaseController extends HttpServlet {

    private static final long serialVersionUID = 632349127293785744L;
    private static final String VIEW_PREFIX = "/WEB-INF/templates/";
    private static final String VIEW_SUFFIX = ".jsp";

    protected String getAction(HttpServletRequest request) {
        String action = request.getParameter("action");

        return (action == null) || action.isEmpty() ? "" : action;
    }

    protected void render(HttpServletRequest request, HttpServletResponse response, String template) throws ServletException, IOException {
        getServletContext().getRequestDispatcher(VIEW_PREFIX + template + VIEW_SUFFIX).forward(request, response);
    }

    public void redirect(HttpServletResponse response, String path) throws IOException {
        response.sendRedirect(path);
    }

}
```

##### `BookController.java`

The **_BookController_** extends **_BaseController_** class to become a Servlet. This will serve as the controller. Since our application will only display list of books and individual book, only **_doGet_** method will be implemented. This method intercepts all **_HTTP GET_** request.

```java
package io.github.julianjupiter.app.controller;

import java.io.IOException;
import java.io.PrintWriter;
import java.time.ZonedDateTime;
import java.util.Optional;

import javax.json.bind.Jsonb;
import javax.json.bind.JsonbBuilder;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import io.github.julianjupiter.app.domain.Book;
import io.github.julianjupiter.app.repository.BookRepositoryImpl;
import io.github.julianjupiter.app.service.BookService;
import io.github.julianjupiter.app.service.BookServiceImpl;
import io.github.julianjupiter.app.util.Error;
import io.github.julianjupiter.app.util.ErrorResponse;

@WebServlet(name = "bookController", urlPatterns = "/books")
public class BookController extends BaseController {

    private static final long serialVersionUID = -8199839431714257029L;
    private static final Logger LOGGER = LoggerFactory.getLogger(BookController.class);
    private final BookService bookService;

    public BookController() {
        this.bookService = new BookServiceImpl(new BookRepositoryImpl());
    }

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        String action = this.getAction(request);
        switch (action) {
            case "":
            case "list":
                try {
                    this.findAll(request, response);
                } catch (Exception exception) {
                    LOGGER.error(exception.getMessage());
                }

                break;
            case "view":
                try {
                    this.findById(request, response);
                } catch (Exception exception) {
                    LOGGER.error(exception.getMessage());
                }

                break;

            default:
                try {
                    response.setStatus(404);
                    this.render(request, response, "error/404");
                } catch (Exception exception) {
                    LOGGER.error(exception.getMessage());
                }

                break;
        }

    }

    private void findAll(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        Iterable<Book> books = this.bookService.findAll();
        request.setAttribute("pageName", "Books");
        request.setAttribute("books", books);
        this.render(request, response, "book/list");
    }

    private void findById(HttpServletRequest request, HttpServletResponse response) throws Exception {
        String id = request.getParameter("id");
        long bookId = Long.parseLong(id);
        Optional<Book> book = this.bookService.findById(bookId);
        String bookJson;
        try(Jsonb jsonbObject = JsonbBuilder.create()) {
            if (book.isPresent()) {
                response.setStatus(200);
                bookJson = jsonbObject.toJson(book.get());
            } else {
                response.setStatus(404);
                ErrorResponse errorResponse = new ErrorResponse();
                Error error = new Error();
                error.setMessage("Book with ID " + id + " was not found.");
                error.setCreatedAt(ZonedDateTime.now());
                errorResponse.setError(error);
                bookJson = jsonbObject.toJson(error);
            }
        }
        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");
        PrintWriter out = response.getWriter();
        out.print(bookJson);
        out.flush();
    }

}
```

#### Templates

Our templates will be written in JSP.

Let's create first **_templates_** folder under **_/webapp/WEB-INF_**. Under this new folder, we'll create four (4) folders - **_book_**, **_components_**, **_error_**, and **_includes_**.

The new structure of our Maven project:

```
java-web-app-with-embedded-tomcat
└── src
    └── main
        └── java
            └── io
                └── github
                    └── julianjupiter
                        └── app
                            └── controller
                            └── domain
                            └── repository
                            └── server
                            └── service
                            └── util
        └── resources
        └── webapp
            └── WEB-INF
                └── templates
                    └── book
                    └── components
                    └── error
                    └── includes
└── pom.xml
```

##### `includes`

These are the common parts of a page.

###### `init.jsp`

```html
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
```

###### `header.jsp`

```html
<%@ include file="init.jsp"%>
<c:if test="${not empty param.pageName}">
    <c:set var="pageName" value="${param.pageName}" />
</c:if>
<!doctype html>
<html lang="en">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
        <meta name="description" content="">
        <meta name="author" content="">
        <link rel="icon" href="${pageContext.request.contextPath}/assets/images/favicon.ico">
        <title>${pageName} - Java Web Application with Embedded Tomcat</title>
        <link rel="stylesheet" href="${pageContext.request.contextPath}/assets/vendor/bootstrap/4.1.3/css/bootstrap.min.css">
        <link rel="stylesheet" href="${pageContext.request.contextPath}/assets/css/main.css">
      </head>
    <body>
        <header>
            <nav class="navbar navbar-expand-lg navbar-light bg-light">
                <a class="navbar-brand" href="#">Java Web Application</a>
                  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                  </button>
                  <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
                    <div class="navbar-nav">
                        <a class="nav-item nav-link<c:if test="${pageName == 'Home'}"> active</c:if>" href="${pageContext.request.contextPath}/" alt="Home">Home <span class="sr-only">(current)</span></a>
                          <a class="nav-item nav-link<c:if test="${pageName == 'Books'}"> active</c:if>" href="${pageContext.request.contextPath}/books" alt="Books">Books</a>
                    </div>
                  </div>
            </nav>
        </header>
```

###### `footer.jsp`

```html
        <script src="${pageContext.request.contextPath}/assets/vendor/jquery/jquery-3.3.1.slim.min.js"></script>
        <script src="${pageContext.request.contextPath}/assets/vendor/popper.js/1.14.3/umd/popper.min.js"></script>
        <script src="${pageContext.request.contextPath}/assets/vendor/bootstrap/4.1.3/js/bootstrap.min.js"></script>
        <script src="${pageContext.request.contextPath}/assets/js/main.js"></script>
    </body>
</html>
```

##### `error`

#### `404.jsp`

```html
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
    <head>
        <meta charset="UTF-8">
        <title>Java Web Application with Embedded Tomcat</title>
    </head>
    <body>
        <h1>Error 404, Page not found!</h1>
    </body>
</html>
```

##### `components`

These are components used by our pages - modal, table.

###### `bookModal.jsp`

```html
<div class="modal fade" id="bookModal" tabindex="-1" role="dialog" aria-labelledby="bookModalLabel" aria-hidden="true">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
                <div class="modal-header">
                <h5 class="modal-title" id="bookModalLabel"></h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
                </div>
                <div class="modal-body">
            </div>
            <div class="modal-footer">
            </div>
        </div>
        </div>
</div>
```

###### `viewBookTable.jsp`

```html
<div id="viewBookTable" class="table-responsive" style="display:none;">
    <table class="table table-hover table-borderless">
        <tbody>
            <tr>
                <th class="text-right" scope="row">ID</th>
                <td id="bookId"></td>
            </tr>
            <tr>
                <th class="text-right" scope="row">Title</th>
                <td id="bookTitle"></td>
            </tr>
            <tr>
                <th class="text-right" scope="row">Edition</th>
                <td id="bookEdition"></td>
            </tr>
            <tr>
                <th class="text-right" scope="row">ISBN</th>
                <td id="bookIsbn"></td>
            </tr>
            <tr>
                <th class="text-right" scope="row">Author</th>
                <td id="bookAuthor"></td>
            </tr>
            <tr>
                <th class="text-right" scope="row">Year Published</th>
                <td id="bookYearPublished"></td>
            </tr>
        </tbody>
    </table>
</div>
```

##### `book`

This template will be used by our page pertaining to Book in our application.

###### `list.jsp`

```html
<%@ include file="/WEB-INF/templates/includes/header.jsp"%>
<div class="jumbotron jumbotron-fluid">
    <div class="container">
        <h1 class="display-4">Java Web Application with Embedded Tomcat</h1>
        <p class="lead">This is a web application in Java which runs on embedded Apache Tomcat in the form of executable JAR (not WAR), called uber/fat JAR. Other dependencies, if any, are also included.</p>
      </div>
</div>
<main>
    <div class="container">
        <div class="row">
            <div class="col">
                <table class="table table-hover">
                    <thead>
                        <tr>
                            <th scope="col">ID</th>
                              <th scope="col">Title</th>
                              <th scope="col">Edition</th>
                              <th scope="col">Action</th>
                        </tr>
                    </thead>
                      <tbody>
                          <c:forEach var="book" items="${books}">
                        <tr>
                              <th scope="row">${book.id}</th>
                              <td>${book.title}</td>
                              <td>${book.edition}</td>
                              <td>
                                  <div class="btn-group" role="group" aria-label="Basic example">
                                    <button type="button" class="btn btn-info" data-toggle="modal" data-target="#bookModal" data-book-action="viewBook" data-book-id="${book.id}">View</button>
                                </div>
                              </td>
                        </tr>
                        </c:forEach>
                      </tbody>
                </table>
            </div>
        </div>
    </div>
</main>
<%@ include file="/WEB-INF/templates/components/bookModal.jsp"%>
<%@ include file="/WEB-INF/templates/components/viewBookTable.jsp"%>
<%@ include file="/WEB-INF/templates/includes/footer.jsp"%>
```

#### Default Page

##### `index.jsp`

This is the default page in our application if we access [http://localhost:8080/app](http://localhost:8080/app).

Remember the **_index.jsp_** that we created earlier to test our application? We just need to modify that file.

```html
<jsp:include page="/WEB-INF/templates/includes/header.jsp">
    <jsp:param value="Home" name="pageName"/>
</jsp:include>
        <div class="jumbotron jumbotron-fluid">
            <div class="container">
                <h1 class="display-4">Java Web Application with Embedded Tomcat</h1>
                <p class="lead">This is a web application in Java which runs on embedded Apache Tomcat in the form of executable JAR (not WAR), called uber/fat JAR. Other dependencies, if any, are also included.</p>
                <a type="button" class="btn btn-primary btn-lg" href="${pageContext.request.contextPath}/books" alt="Books">Books</a>
            </div>
        </div>
<%@ include file="/WEB-INF/templates/includes/footer.jsp"%>
```

#### Static Files

Our pages will make use of JavaScript and CSS. It includes Bootstrap CSS framework, hence, the need to import them.

Let's create **_assets_** folder under **_/webapp_**. Under this new folder, we'll create three (3) folders - **_css_**, **_js_**, and **_vendor_**.

Our custom styling and JavaScript files will, obviously, be put inside **_css_** and **_js_** folders, respectively, while the third-party ones, Bootstrap, jQuery, Popper.js, will be in **_vendor_** folder.

The new structure of our Maven project:

```
java-web-app-with-embedded-tomcat
└── src
    └── main
        └── java
            └── io
                └── github
                    └── julianjupiter
                        └── app
                            └── controller
                            └── domain
                            └── repository
                            └── server
                            └── service
                            └── util
        └── resources
        └── webapp
            └── assets
                └── css
                └── js
                └── vendor
            └── WEB-INF
                └── templates
                    └── book
                    └── components
                    └── error
                    └── includes
└── pom.xml
```

###### `css`

###### `main.css`

```css
.table-responsive {
  display: table;
}
```

##### `js`

###### `main.js`

```javascript
let modalTitle = $(".modal-title");
let modalBody = $(".modal-body");
let modalFooter = $(".modal-footer");
let closeBookModal = $(
  '<button id="close-book-modal" type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>'
);

function viewBook(bookModal, bookId) {
  let viewBookTableHidden = $("#viewBookTable:hidden");
  $(bookModal).find(modalTitle).text("View Book");
  $(bookModal).find(modalBody).html(viewBookTableHidden.clone());
  let viewBookTable = $("#viewBookTable");
  $(bookModal).find(viewBookTable).css("display", "block");
  $(bookModal).find(modalFooter).append(closeBookModal);

  fetch("books?action=view&id=" + bookId)
    .then((response) => ({ status: response.status, data: response.json() }))
    .then((response) => {
      if (response.status == 200) {
        response.data.then((value) => {
          $(bookModal).find("#bookId").text(value.id);
          $(bookModal).find("#bookTitle").text(value.title);
          $(bookModal).find("#bookEdition").text(value.edition);
          $(bookModal).find("#bookIsbn").text(value.isbn);
          $(bookModal).find("#bookAuthor").text(value.author);
          $(bookModal).find("#bookYearPublished").text(value.yearPublished);
        });
      } else if (response.status == 404) {
        response.data.then((value) => {
          $(bookModal).find(".modal-body").html(value.message);
        });
      } else {
        $(bookModal)
          .find(".modal-body")
          .html("An unknown error occurred. Please contact Administrator.");
      }
    })
    .catch((error) => {
      console.log("Request failed", error);
      $(bookModal)
        .find(".modal-body")
        .html("An unknown error occurred. Please contact Administrator.");
    });
}

function clearModal(modal) {
  $(modal).find(modalTitle).html("");
  $(modal).find(modalBody).html("");
  $(modal).find(modalFooter).html("");
}

$(document).ready(() => {
  $("#bookModal")
    .on("show.bs.modal", function (event) {
      var bookModal = $(this);
      var button = $(event.relatedTarget);
      var bookAction = button.data("book-action");
      var bookId = button.data("book-id");

      switch (bookAction) {
        case "addBook":
          addBook(bookModal);
          break;

        case "viewBook":
          viewBook(this, bookId);
          break;
      }
    })
    .on("hidden.bs.modal", function (event) {
      clearModal(this);
    });
});
```

##### `vendor`

For the [Bootstrap](https://getbootstrap.com "Bootstrap · The most popular HTML, CSS, and JS library in the world."), [jQuery](https://jquery.com/ "jQuery"), and [Popper.js](https://popper.js.org/ "Popper - Tooltip & Popover Positioning Engine"), you can download them from their respective sites.

Check **_header.jsp_** and **_footer.jsp_** files how these frameworks/libraries structured in our project.

#### Re-build and Run our Application

Run the following commands and open [http://localhost:8080/app](http://localhost/app) in our browser.

```bash
$ mvn clean package
$ java -jar ./target/java-web-app-with-embedded-tomcat-1.0.0-SNAPSHOT.jar
```

#### Screenshots

##### Home Page

<br>
<img class="img-fluid" src="/assets/images/blog/java-web-application-with-embedded-tomcat/2.PNG">
<br>
<br>

##### List of Books

<br>
<img class="img-fluid" src="/assets/images/blog/java-web-application-with-embedded-tomcat/3.PNG">
<br>
<br>

##### View a Book

<br>
<img class="img-fluid" src="/assets/images/blog/java-web-application-with-embedded-tomcat/4.PNG">
<br>
<br>

#### Conclusion

We're able to create a Servlet application in which we use Embedded Tomcat Server. We build this application into a single JAR file, called Uber or Fat JAR.

With this, we no longer need a standalone web server to deploy our application to. We achieved this mechanism by using [Maven Shade Plugin](https://maven.apache.org/plugins/maven-shade-plugin/).

You can download complete source code **[here](https://github.com/julianjupiter/java-web-app-with-embedded-tomcat "Java Web Application with Embedded Tomcat")**.
