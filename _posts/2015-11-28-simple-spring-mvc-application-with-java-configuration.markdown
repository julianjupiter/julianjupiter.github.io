---
layout: post
title: Simple Spring MVC Application with Java Configuration
date: 2015-11-28
description: Simple Spring MVC application with Java configuration instead of XML.
categories:
keywords: Java, Spring, Spring MVC, XML configuration, Java configuration, Java annotation
image:
  cover: /assets/images/blog/simple-spring-mvc-application-with-java-configuration/cover.PNG
  og: /assets/images/blog/simple-spring-mvc-application-with-java-configuration/cover.PNG
  thumbnail: /assets/images/blog/simple-spring-mvc-application-with-java-configuration/thumbnail.png
---

## Introduction

This is a simple `Spring MVC` application with `Java configuration` instead of `XML`. 

Our application won't require an application server to deploy to. We are going to use `Embdded Tomcat`. Also, the application will be packaged to singler executable JAR, including dependencies. We call this `Fat JAR` or `Uber JAR`. It is similar to Spring Boot. To achieve it, we'll use `Apache Maven Shade Plugin`.

We'll also use `JSP` as our template engine.

For this project, we create project foler `SpringMVCGreetingsApp`.

## Requirements

- `Java 11` - [OpenJDK](https://openjdk.java.net/), [GraalVM](https://www.graalvm.org/downloads/), [Zulu Builds of OpenJDK](https://www.azul.com/downloads), [Amazon Corretto](https://aws.amazon.com/corretto/), [SapMachine](https://sap.github.io/SapMachine/), [Liberica JDK](https://bell-sw.com/)
- `Maven` - you must have installed Maven or create [Maven wrapper](https://julianjupiter.com/blog/how-to-create-maven-and-gradle-wrapper).
- `IDE` - Intellij IDEA, NetBeans, Eclipse

## Project Structure

```
    SpringMVCGreetingsApp
    └── src
        └── main
            └── java
                └── com
                    └── julianjupiter
                        └── springmvcgreetings
                            └── configuration
                            └── controller
                            └── server
            └── resources
            └── webapp
                └── assets
                    └── css
                    └── js
                └── WEB-INF
                    └── views
                        └── greetings
                        └── home
                        └── includes
    └── pom.xml
```

## Maven Dependencies

Copy and paste the following to your `pom.xml`:

```xml
<project xmlns="http://maven.apache.org/POM/4.0.0"
	xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
	xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd">
	<modelVersion>4.0.0</modelVersion>
	<groupId>io.github.julianjupiter</groupId>
	<artifactId>SpringMVCGreetingsApp</artifactId>
	<version>1.0.0-SNAPSHOT</version>
	<packaging>jar</packaging>

	<name>SpringMVCGreetingsApp</name>
	<description>Spring MVC Application with Java configuration.</description>

	<properties>
		<failOnMissingWebXml>false</failOnMissingWebXml>
		<project.build.sourceEncoding>UTF-8</project.build.sourceEncoding>
		<project.reporting.outputEncoding>UTF-8</project.reporting.outputEncoding>
		<maven.compiler.source>11</maven.compiler.source>
		<maven.compiler.target>11</maven.compiler.target>
		<tomcat.version>9.0.37</tomcat.version>
		<spring.version>5.2.8.RELEASE</spring.version>
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
			<groupId>org.springframework</groupId>
			<artifactId>spring-webmvc</artifactId>
			<version>${spring.version}</version>
		</dependency>
		<dependency>
			<groupId>jakarta.servlet</groupId>
			<artifactId>jakarta.servlet-api</artifactId>
			<version>4.0.4</version>
		</dependency>
		<dependency>
			<groupId>jakarta.servlet.jsp</groupId>
			<artifactId>jakarta.servlet.jsp-api</artifactId>
			<version>2.3.6</version>
		</dependency>
		<dependency>
			<groupId>javax.servlet</groupId>
			<artifactId>jstl</artifactId>
			<version>1.2</version>
		</dependency>
	</dependencies>

	<build>
		<resources>
			<resource>
				<directory>src/main/webapp</directory>
				<targetPath>META-INF/resources</targetPath>
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
									<mainClass>com.julianjupiter.springmvcgreetings.SpringMVCGreetingsApplication</mainClass>
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
## Codes

#### Add Server

Since we're using Embedded Tomcat, we'll create our own server programmatically.

##### Server.java

```java
package com.julianjupiter.springmvcgreetings.server;

public interface Server {
	void run(String[] args);

	static Server newServer() {
		return new TomcatServer();
	}
}
```

##### TomcatServer.java

```java
package com.julianjupiter.springmvcgreetings.server;

import org.apache.catalina.Context;
import org.apache.catalina.LifecycleException;
import org.apache.catalina.WebResourceRoot;
import org.apache.catalina.startup.Tomcat;
import org.apache.catalina.webresources.StandardRoot;

import java.io.File;
import java.lang.System.Logger;

class TomcatServer implements Server {

	private static final Logger LOGGER = System.getLogger(TomcatServer.class.getName());

	private static final String DEFAULT_HOST = "localhost";
	private static final int DEFAULT_PORT = 8080;
	private static final String DEFAULT_CONTEXT_PATH = "/";
	private static final String DOC_BASE = ".";
	private static final String ADDITION_WEB_INF_CLASSES = "src/main/";
	private static final String WEB_APP_MOUNT = "/WEB-INF/classes";
	private static final String INTERNAL_PATH = "/";

	@Override
	public void run(String[] args) {
		int port = this.port(args);
		Tomcat tomcat = this.tomcat(port);

		try {
			tomcat.start();
		} catch (LifecycleException exception) {
			LOGGER.log(Logger.Level.ERROR, exception.getMessage());
			LOGGER.log(Logger.Level.ERROR, "Exit...");
			System.exit(1);
		}

		LOGGER.log(Logger.Level.INFO, "Application started with URL {}.", DEFAULT_HOST + ":" + port + DEFAULT_CONTEXT_PATH);
		LOGGER.log(Logger.Level.INFO,"Hit Ctrl+D or Ctrl+C to stop it...");
		tomcat.getServer().await();
	}

	private int port(String[] args) {
		if (args.length > 0) {
			String port = args[0];
			try {
				return Integer.valueOf(port);
			} catch (NumberFormatException exception) {
				LOGGER.log(Logger.Level.ERROR, "Invalid port number argument {}", port, exception);
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
		this.context(tomcat);

		return tomcat;
	}

	private Context context(Tomcat tomcat) {
		Context context = tomcat.addWebapp("", DOC_BASE);
		File classes = new File(ADDITION_WEB_INF_CLASSES);
		String base = classes.getAbsolutePath();
		WebResourceRoot resources = new StandardRoot(context);
		context.setResources(resources);

		return context;
	}
}
```

#### Add Launcher

##### SpringMVCGreetingsApplication.java

```java
package com.julianjupiter.springmvcgreetings;

import com.julianjupiter.springmvcgreetings.server.Server;

public class SpringMVCGreetingsApplication {
    public static void main(String[] args) {
        Server.newServer().run(args);
    }
}
```

#### Add Configuration

We'll create our configuration using Java.

##### ApplicationWebConfiguration.java

```java
package com.julianjupiter.springmvcgreetings.configuration;

import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.ViewResolverRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
import org.springframework.web.servlet.view.JstlView;

@Configuration
@EnableWebMvc
@ComponentScan(basePackages = "com.julianjupiter.springmvcgreetings")
public class ApplicationWebConfiguration implements WebMvcConfigurer {

    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        registry.addResourceHandler("/assets/css/**").addResourceLocations("/assets/css/");
        registry.addResourceHandler("/assets/js/**").addResourceLocations("/assets/js/");
    }

    @Override
    public void configureViewResolvers(ViewResolverRegistry registry) {
        registry.jsp("/WEB-INF/views/", ".jsp")
                .viewClass(JstlView.class);
    }

}
```

##### ApplicationInitializer.java

```java
package com.julianjupiter.springmvcgreetings.configuration;

import org.springframework.web.servlet.support.AbstractAnnotationConfigDispatcherServletInitializer;

public class ApplicationInitializer extends AbstractAnnotationConfigDispatcherServletInitializer {

    @Override
    protected Class<?>[] getRootConfigClasses() {
        return null;
    }

    @Override
    protected Class<?>[] getServletConfigClasses() {
        return new Class[]{ApplicationWebConfiguration.class};
    }

    @Override
    protected String[] getServletMappings() {
        return new String[]{"/"};
    }

}
```

#### Add Controller

We'll create only two (2) controllers - for index/home and greetings.

##### HomeController.java

```java
package com.julianjupiter.springmvcgreetings.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import javax.servlet.http.HttpServletRequest;
import java.lang.System.Logger;

@Controller
public class HomeController {

    private static final Logger LOGGER = System.getLogger(GreetingsController.class.getName());

    @RequestMapping(value = {"/", "/home"}, method = RequestMethod.GET)
    public String index(HttpServletRequest request, Model model) {
        LOGGER.log(Logger.Level.INFO, "URL: " + request.getRequestURL().toString());

        model.addAttribute("pageTitle", "Home");
        model.addAttribute("messageTitle", "Spring MVC Greetings Application");
        model.addAttribute("messageBody", "Welcome to Spring MVC Greetings Application!");

        return "home/index";
    }
}
```

##### GreetingsController.java

```java
package com.julianjupiter.springmvcgreetings.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import javax.servlet.http.HttpServletRequest;
import java.lang.System.Logger;

@Controller
public class GreetingsController {

    private static final Logger LOGGER = System.getLogger(GreetingsController.class.getName());

    @RequestMapping(value = {"/greetings"}, method = RequestMethod.GET)
    public String index(HttpServletRequest request, Model model) {
        LOGGER.log(Logger.Level.INFO, "URL: " + request.getRequestURL().toString());

        model.addAttribute("pageTitle", "Greetings");
        model.addAttribute("messageTitle", "Hello world!");
        model.addAttribute("messageBody", "Hello world! Welcome to Spring MVC!");

        return "greetings/index";
    }

}
```

#### Add Static Assets

We'll be using [Bootstrap](https://getbootstrap.com/) CSS framework. I only include `bootstrap.min.css`, `bootstrap.min.js`, `jquery-3.5.1.slim.min.js`, and `popper.min.js`.

I also have minimal custom CSS style, `application.css`:

```css
body {
  padding-top: 4.5rem;
}

footer {
   bottom:0;
   width:100%;
}
```

#### Add JSP templates

##### includes

###### head.jsp

```html
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt" %>
<jsp:useBean id="date" class="java.util.Date" />
<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
        <meta name="description" content="Spring MVC Application with Java configuration">
        <meta name="author" content="Julian Jupiter">
        <title>Spring MVC Greetings Application &mdash; ${pageTitle}</title>

        <!-- Bootstrap core CSS -->
        <link href="${pageContext.request.contextPath}/assets/css/bootstrap.min.css" rel="stylesheet">

        <!-- Custom styles for this template -->
        <link href="${pageContext.request.contextPath}/assets/css/application.css" rel="stylesheet">
    </head>
    <body>
```

###### header.jsp

```html
        <nav class="navbar navbar-expand-md navbar-dark fixed-top bg-dark">
          <a class="navbar-brand" href="${pageContext.request.contextPath}/">Spring MVC Greetings Application</a>
          <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarCollapse">
            <ul class="navbar-nav mr-auto">
              <li class="${pageTitle == 'Home' ? 'nav-item active': 'nav-item'}">
                <a class="nav-link" href="${pageContext.request.contextPath}/">Home <span class="sr-only">(current)</span></a>
              </li>
              <li class="${pageTitle == 'Greetings' ? 'nav-item active': 'nav-item'}">
                <a class="nav-link" href="${pageContext.request.contextPath}/greetings">Greetings</a>
              </li>
            </ul>
          </div>
        </nav>
        <main role="main" class="flex-shrink-0">
            <div class="container">
```

###### footer.jsp

```html
            </div>
        </main>
        <footer class="footer position-absolute mt-auto py-3">
            <div class="container">
                <div class="row">
                    <div class="col">
                        <p class="text-muted text-center">&copy; <a href="https://julianjupiter.com"><fmt:formatDate value="${date}" pattern="yyyy" /> Julian Jupiter</a></p>
                    </div>
                </div>
            </div>
        </footer>
        <!-- Bootstrap core JavaScript
        ================================================== -->
        <!-- Placed at the end of the document so the pages load faster -->
        <script src="${pageContext.request.contextPath}/assets/js/jquery-3.5.1.slim.min.js"></script>
        <script src="${pageContext.request.contextPath}/assets/js/popper.min.js"></script>
        <script src="${pageContext.request.contextPath}/assets/js/bootstrap.min.js"></script>
    </body>
</html>
```

##### home

###### index.jsp

```html
<%@ include file="../includes/head.jsp" %>
<%@ include file="../includes/header.jsp" %>
    <div class="jumbotron">
        <h2>${messageTitle}</h2>
        <p>${messageBody}</p>
        <p><a class="btn btn-primary btn-lg" href="${pageContext.request.contextPath}/greetings" role="button">Go to greetings &raquo;</a></p>
    </div>
<%@ include file="../includes/footer.jsp" %>
```

##### greetings

###### index.jsp

```html
<%@ include file="../includes/head.jsp" %>
<%@ include file="../includes/header.jsp" %>
    <div class="jumbotron">
        <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#greetings">Click me &raquo;</button>
        <div id="greetings" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="myModalLabel">${messageTitle}</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                   </div>
                    <div class="modal-body">
                        <p>${messageBody}</p>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
<%@ include file="../includes/footer.jsp" %>
```

### Build Application

To build our Fat JAR:

```bash
$ mvn package
```

If you're using Maven wrapper:

```bash
$ ./mvnw package
```

Above command generates executable JAR inside `target` folder with file name `SpringMVCGreetingsApp-1.0.0-SNAPSHOT.jar`.

### Run Application

```bash
$ java -jar ./target/SpringMVCGreetingsApp-1.0.0-SNAPSHOT.jar
```

Above command logs the following in the console:

```bash
Jul 26, 2020 7:34:44 PM org.apache.coyote.AbstractProtocol init
INFO: Initializing ProtocolHandler ["http-nio-8080"]
Jul 26, 2020 7:34:45 PM org.apache.catalina.core.StandardService startInternal
INFO: Starting service [Tomcat]
Jul 26, 2020 7:34:45 PM org.apache.catalina.core.StandardEngine startInternal
INFO: Starting Servlet engine: [Apache Tomcat/9.0.37]
Jul 26, 2020 7:34:45 PM org.apache.catalina.startup.ContextConfig getDefaultWebXmlFragment
INFO: No global web.xml found
Jul 26, 2020 7:34:48 PM org.apache.catalina.core.ApplicationContext log
INFO: 1 Spring WebApplicationInitializers detected on classpath
Jul 26, 2020 7:34:48 PM org.apache.catalina.core.ApplicationContext log
INFO: Initializing Spring DispatcherServlet 'dispatcher'
Jul 26, 2020 7:34:48 PM org.springframework.web.servlet.FrameworkServlet initServletBean
INFO: Initializing Servlet 'dispatcher'
Jul 26, 2020 7:34:48 PM org.springframework.web.servlet.FrameworkServlet initServletBean
INFO: Completed initialization in 660 ms
Jul 26, 2020 7:34:48 PM org.apache.coyote.AbstractProtocol start
INFO: Starting ProtocolHandler ["http-nio-8080"]
Jul 26, 2020 7:34:48 PM com.julianjupiter.springmvcgreetings.server.TomcatServer run
INFO: Application started with URL {}.
Jul 26, 2020 7:34:48 PM com.julianjupiter.springmvcgreetings.server.TomcatServer run
INFO: Hit Ctrl+D or Ctrl+C to stop it...
```

`Embedded Tomcat` listens on port `8080`.

### View Application in the browser

Open your browser and point to [http://localhost:8080](http://localhost:8080).

#### Screenshots

##### Home Page

<br>
<img class="img-fluid" src="/assets/images/blog/simple-spring-mvc-application-with-java-configuration/1.JPG">
<br>
<br>

##### Greetings Page

<br>
<img class="img-fluid" src="/assets/images/blog/simple-spring-mvc-application-with-java-configuration/2.JPG">
<br>
<br>

##### View Greetings Modal

<br>
<img class="img-fluid" src="/assets/images/blog/simple-spring-mvc-application-with-java-configuration/3.JPG">
<br>
<br>

### Conclusion

We're able to create a Spring MVC application with Java configuration, no XML. 

We build this application into a single JAR file, called Uber or Fat JAR; no need for standalone application server.

### Clone the source

[GitHub Source](https://github.com/julianjupiter/SpringMVCGreetingsApp)

```bash
$ git clone https://github.com/julianjupiter/SpringMVCGreetingsApp
$ cd SpringMVCGreetingsApp
$ ./mvnw clean package && java -jar ./target/SpringMVCGreetingsApp-1.0.0-SNAPSHOT.jar
```
