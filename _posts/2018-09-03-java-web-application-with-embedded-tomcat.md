---
layout: post
title: Java Web Application with Embedded Tomcat
date: 2018-08-31
description: This tutorial is to create a Java web application using embedded Apache Tomcat web server.
keywords: Java, Tomcat, Embedded
---

***Purpose
This is to create a web application in Java. The Apache Tomcat will be emddeded to the JAR (not WAR), called uber/fat JAR. Other dependencies, if there is any, will also be included.

We will create a page with the following URL:

http://localhost:8080/java-web-app-with-embedded-tomcat/hello

This page will display a form with two inputs, *name* and *message*. When submitted, it will display the message and name on the same page.

***Requirements
* JDK 8
* Maven
* an IDE - Eclipse, NetBeans, or Intellij IDEA

***Build with Maven
First, we'll create a Java Maven project. Open your terminal and cd to your preferred workspace and run the following commands:
```bash
mkdir java-web-app-with-embedded-tomcat
cd java-web-app-with-embedded-tomcat
mkdir -p src/main/java/io/github/julinjupiter/app
mkdir -p src/main/resources
mkdir -p src/main/webapp/WEB-INF
```
Note: you can choose your own package instead of *io/github/julianjupiter/app* (io.github.julinjupiter.app).

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
```
To be continued...