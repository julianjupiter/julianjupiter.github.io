---
layout: post
title: RESTful Web Service API with Spring Boot and Spring MVC
date: 2020-09-13
description: This post walks you through the process of creating RESTful web service API with Spring Boot and Spring MVC.
categories:
keywords: Java, Spring Boot, Spring MVC, Spring Data JPA, RESTful Web Service
image:
  cover: /assets/images/blog/restful-web-service-api-with-spring-boot-and-spring-mvc/cover.png
  og: /assets/images/blog/restful-web-service-api-with-spring-boot-and-spring-mvc/cover.png
  thumbnail: /assets/images/blog/restful-web-service-api-with-spring-boot-and-spring-mvc/thumbnail.png
---

## Introduction

This post walks you through the process of creating RESTful web service API with `Spring Boot` and `Spring MVC`. We'll also use `Spring Data JPA`, `Hibernate` for the data access layer and `MySQL` for the database.

## What We Will Build

The service that we are going to create is for the `Product` in an e-commerce application which I call `Storee`.

We will implement at least four (4) operations on this web service:

<table class="table">
    <thead>
        <tr>
            <th scope="col">HTTP Verbs</th>
            <th scope="col">HTTP URI (endpoints)</th>
            <th scope="col">Description</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <th scope="row">GET</th>
            <td>/products</td>
            <td>List of product resources</td>
        </tr>
        <tr>
            <th scope="row">POST</th>
            <td>/products</td>
            <td>Create a new product resource</td>
        </tr>
        <tr>
            <th scope="row">GET</th>
            <td>/products/{id}</td>
            <td>Retrieve a product resource based on ID</td>
        </tr>
        <tr>
            <th scope="row">PUT</th>
            <td>/products/{id}</td>
            <td>Update a product resource based on ID</td>
        </tr>
        <tr>
            <th scope="row">DELETE</th>
            <td>/products/{id}</td>
            <td>Delete a product resource based on ID</td>
        </tr>
    </tbody>
</table>

### Request and Response

The context path of the service is `/storee/api/v1` and runs on port `7000`, hence `http://localhost:7000/storee/api/v1`;

#### Retrieve all products

**Request**

Method: `GET`

Endpoint: `http://localhost:7000/storee/api/v1/products`

**Response** 

Status: `200 OK`

Body:

```json
[
    {
        "id": 1,
        "name": "Samsung Galaxy S20",
        "description": "Samsung Galaxy S20",
        "price": 50000.00,
        "quantity": 25,
        "createdAt": "2020-09-12T03:33:54.134632+08:00"
    },
    ...more
] 
```

#### Create a product

**Request**

Method: `POST`

Endpoint: `http://localhost:7000/storee/api/v1/products`

Body:

```json
{
    "name": "Samsung Galaxy S20",
    "description": "Samsung Galaxy S20",
    "price": 50000.00,
    "quantity": 25,
}
```

**Response**

Status: `201 Created`

Body:

```json
{
    "id": 1,
    "name": "Samsung Galaxy S20",
    "description": "Samsung Galaxy S20",
    "price": 50000.00,
    "quantity": 25,
    "createdAt": "2020-09-12T03:33:54.134632+08:00"
}
```

#### Retrieve a product by ID

**Request**

Method: `GET`

Endpoint: `http://localhost:7000/storee/api/v1/products/{id}`

**Response**

Status: `200 OK`

Body: 

```json
{
    "id": 1,
    "name": "Samsung Galaxy S20",
    "description": "Samsung Galaxy S20",
    "price": 50000.00,
    "quantity": 25,
    "createdAt": "2020-09-12T03:33:54.134632+08:00"
}
```

#### Update a product by ID

**Request**

Method: `PUT`

Endpoint: `http://localhost:7000/storee/api/v1/products/{id}`

Body:

```json
{
    "name": "Samsung Galaxy S20",
    "description": "Samsung Galaxy S20",
    "price": 50000.00,
    "quantity": 30
}
```

**Response**

Status: `200 OK`

Body: 

```json
{
    "id": 1,
    "name": "Samsung Galaxy S20",
    "description": "Samsung Galaxy S20",
    "price": 50000.00,
    "quantity": 30,
    "createdAt": "2020-09-12T03:33:54.134632+08:00"
}
```

#### Delete a product by ID

**Request**

Method: `DELETE`

Endpoint: `http://localhost:7000/storee/api/v1/products/{id}`

**Response**

Status: `204 No Content`

#### Note:

Retrieving all products will always return `200 OK` HTTP status whether there is data or none (`[]`).

In case of invalid data, the service for creating or updating a product should return error message(s) and `400 Bad Request` HTTP status.

When retrieving, updating or deleting a product that does not exist, invalid `ID`, it should return an error message stating so and `404 Not Found` HTTP status.

## Let's Get Started

### The Database

We'll be using `MySQL Server` for the database. My MySQL version is the latest as of press time, `8.0.21`.

```sql
CREATE DATABASE storee;
USE storee;
CREATE TABLE IF NOT EXISTS product (
    id BIGINT NOT NULL AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    price DECIMAL(19,2) NOT NULL,
    quantity BIGINT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME ON UPDATE CURRENT_TIMESTAMP,
    CONSTRAINT pk_product_id PRIMARY KEY(id)
);
```

### Create Maven Project

Our project will be created using Maven build system. To create a project, go to [Spring Initializr](https://start.spring.io/) website.

As of this time, the latest version of Spring Boot is `2.3.3`. I've added `Spring Web` as a dependency. It contains `Spring MVC`, the web framework that we are going to use to create the RESTful web service. I've also added `Spring Data JPA` which contains the frameworks for accessing database using repository design pattern. By default, it uses `Hibernate` as the `JPA` implementation. Since we're using MySQL for the database, I've added `MySQL Driver`. And finally, `Validation` dependency for `Bean Validation` which contains both the `Jakarta EE Bean Validation API` and `Hibernate Validator` as the implementation. 

For the `Project Metadata` you are free to input as you see fit. You might want to check out [Guide to naming conventions on groupId, artifactId, and version](https://maven.apache.org/guides/mini/guide-naming-conventions.html).

Leave the rest as is.

Once done, click `GENERATE` button. Save the project and extract it in your workspace.

<img class="img-fluid" src="/assets/images/blog/restful-web-service-api-with-spring-boot-and-spring-mvc/01.JPG" alt="Create Project in Spring Initializr">

<br><br>

Your Maven `pom.xml` should look similar to this:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
	xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 https://maven.apache.org/xsd/maven-4.0.0.xsd">
	<modelVersion>4.0.0</modelVersion>
	<parent>
		<groupId>org.springframework.boot</groupId>
		<artifactId>spring-boot-starter-parent</artifactId>
		<version>2.3.3.RELEASE</version>
		<relativePath/> <!-- lookup parent from repository -->
	</parent>
	<groupId>com.julianjupiter.storee</groupId>
	<artifactId>storee-product-service</artifactId>
	<version>0.0.1-SNAPSHOT</version>
	<name>storee-product-service</name>
	<description>Storee Product Service</description>

	<properties>
		<java.version>11</java.version>
	</properties>

	<dependencies>
		<dependency>
			<groupId>org.springframework.boot</groupId>
			<artifactId>spring-boot-starter-data-jpa</artifactId>
		</dependency>
		<dependency>
			<groupId>org.springframework.boot</groupId>
			<artifactId>spring-boot-starter-validation</artifactId>
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
			<exclusions>
				<exclusion>
					<groupId>org.junit.vintage</groupId>
					<artifactId>junit-vintage-engine</artifactId>
				</exclusion>
			</exclusions>
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

Project structure should be as follows:

<img class="img-fluid" src="/assets/images/blog/restful-web-service-api-with-spring-boot-and-spring-mvc/02.JPG" alt="Project Structure">

### Configuration

Let's rename `application.properties` inside `src/main/resources` folder to `application.yml`. Copy and paste the following it:

```yml
# server
server:
  port: 7000
  servlet:
    context-path: /storee/api/v1
# spring
spring:
  datasource:
    driver-class-name: com.mysql.cj.jdbc.Driver
    url: jdbc:mysql://localhost:3306/storee?useLegacyDatetimeCode=false&serverTimezone=Asia/Manila
    username: root
    password:
  jpa:
    database-platform: org.hibernate.dialect.MySQL8Dialect
    hibernate:
      ddl-auto: none
  messages:
    basename: i18n/messages
```

Since `messages.basename` value is `i18n/messages`, let's also create folder `i18n` folder inside `src/main/resources` and a file `messages.properties`. This file will contain the messages needed in our error response. Copy and paste the following to `messages.properties`.

```properties
product.not.found = Product with ID {0} was not found.
NotBlank.productDto.name = Product name is required.
NotNull.productDto.price = Product price is required.
NotNull.productDto.quantity = Product quantity is required.
```

### Let's Code

The most important part of the code in this project is the `controller` since this is the layer, web layer, that contains the API that exposes our RESTful web services. However, our controller depends on other layer to fulfill its function. For this reason, we will start coding from codes that have no or have minimal dependencies.

#### JPA Entity Class

We only have one entity class. 

`Product.java`

```java
package com.julianjupiter.storee.product.entity;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import java.math.BigDecimal;
import java.time.OffsetDateTime;

@Entity
public class Product {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    private String description;
    private BigDecimal price;
    private Long quantity;
    private OffsetDateTime createdAt;

    public Long getId() {
        return id;
    }

    public Product setId(Long id) {
        this.id = id;
        return this;
    }

    public String getName() {
        return name;
    }

    public Product setName(String name) {
        this.name = name;
        return this;
    }

    public String getDescription() {
        return description;
    }

    public Product setDescription(String description) {
        this.description = description;
        return this;
    }

    public BigDecimal getPrice() {
        return price;
    }

    public Product setPrice(BigDecimal price) {
        this.price = price;
        return this;
    }

    public Long getQuantity() {
        return quantity;
    }

    public Product setQuantity(Long quantity) {
        this.quantity = quantity;
        return this;
    }

    public OffsetDateTime getCreatedAt() {
        return createdAt;
    }

    public Product setCreatedAt(OffsetDateTime createdAt) {
        this.createdAt = createdAt;
        return this;
    }
}
```

#### Repository

Since we only have single entity, we'll only have one repository also.

`ProductRepository.java`

```java
package com.julianjupiter.storee.product.repository;

import com.julianjupiter.storee.product.entity.Product;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProductRepository extends JpaRepository<Product, Long> {
}
```

#### DTO

We could have used the entity class, `Product.java`, for the request and response payload but It would still be better that our entity not to be exposed in our web service. So, I've decided to still use `Data Transfer Object`. Don't be surprised if the DTO has the same structure as the entity. The only difference are the Bean Validation annotations and, of course, the name.

`ProductDto.java`

```java
package com.julianjupiter.storee.product.dto;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import java.math.BigDecimal;
import java.time.OffsetDateTime;

public class ProductDto {
    private Long id;
    @NotBlank(message = "{NotBlank.productDto.name}")
    private String name;
    private String description;
    @NotNull(message = "{NotNull.productDto.price}")
    private BigDecimal price;
    @NotNull(message = "{NotNull.productDto.quantity}")
    private Long quantity;
    private OffsetDateTime createdAt;

    public Long getId() {
        return id;
    }

    public ProductDto setId(Long id) {
        this.id = id;
        return this;
    }

    public String getName() {
        return name;
    }

    public ProductDto setName(String name) {
        this.name = name;
        return this;
    }

    public String getDescription() {
        return description;
    }

    public ProductDto setDescription(String description) {
        this.description = description;
        return this;
    }

    public BigDecimal getPrice() {
        return price;
    }

    public ProductDto setPrice(BigDecimal price) {
        this.price = price;
        return this;
    }

    public Long getQuantity() {
        return quantity;
    }

    public ProductDto setQuantity(Long quantity) {
        this.quantity = quantity;
        return this;
    }

    public OffsetDateTime getCreatedAt() {
        return createdAt;
    }

    public ProductDto setCreatedAt(OffsetDateTime createdAt) {
        this.createdAt = createdAt;
        return this;
    }
}
```

#### Mappper

Since we have DTO, mapper is inevitable. We'll use it to convert entity to DTO or the other way around.

`ProductMapper.java`

```java
package com.julianjupiter.storee.product.mapper;

import com.julianjupiter.storee.product.dto.ProductDto;
import com.julianjupiter.storee.product.entity.Product;
import org.springframework.stereotype.Component;

@Component
public class ProductMapper {

    public ProductDto fromEntityToDto(Product product) {
        return new ProductDto()
                .setId(product.getId())
                .setName(product.getName())
                .setDescription(product.getDescription())
                .setPrice(product.getPrice())
                .setQuantity(product.getQuantity())
                .setCreatedAt(product.getCreatedAt());
    }

    public Product fromDtoToEntity(ProductDto productDto) {
        return new Product()
                .setId(productDto.getId())
                .setName(productDto.getName())
                .setDescription(productDto.getDescription())
                .setPrice(productDto.getPrice())
                .setQuantity(productDto.getQuantity())
                .setCreatedAt(productDto.getCreatedAt());
    }

}
```

#### Service

Quoting the [Service Layer pattern](https://martinfowler.com/eaaCatalog/serviceLayer.html) by Martin Fowler:

*A Service Layer defines an application's boundary [Cockburn PloP] and its set of available operations from the perspective of interfacing client layers. It encapsulates the application's business logic, controlling transactions and coor-dinating responses in the implementation of its operations.*

`ProductService.java`

```java
package com.julianjupiter.storee.product.service;

import com.julianjupiter.storee.product.dto.ProductDto;

import java.util.List;
import java.util.Optional;

public interface ProductService {

    List<ProductDto> findAll();

    Optional<ProductDto> findById(Long id);

    ProductDto create(ProductDto productDto);

    ProductDto update(ProductDto productDto);

    void deleteById(Long id);
}
```

`ProductServiceImpl.java`

```java
package com.julianjupiter.storee.product.service;

import com.julianjupiter.storee.product.dto.ProductDto;
import com.julianjupiter.storee.product.mapper.ProductMapper;
import com.julianjupiter.storee.product.repository.ProductRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.OffsetDateTime;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@Transactional
public class ProductServiceImpl implements ProductService {

    private final ProductMapper productMapper;
    private final ProductRepository productRepository;

    public ProductServiceImpl(ProductMapper productMapper, ProductRepository productRepository) {
        this.productMapper = productMapper;
        this.productRepository = productRepository;
    }

    @Override
    public List<ProductDto> findAll() {
        return this.productRepository.findAll().stream()
                .map(this.productMapper::fromEntityToDto)
                .collect(Collectors.toUnmodifiableList());
    }

    @Override
    public Optional<ProductDto> findById(Long id) {
        return this.productRepository.findById(id)
                .map(this.productMapper::fromEntityToDto);
    }

    @Override
    public ProductDto create(ProductDto productDto) {
        productDto.setId(null);

        if (productDto.getCreatedAt() == null) {
            productDto.setCreatedAt(OffsetDateTime.now());
        }

        var newProduct = this.productMapper.fromDtoToEntity(productDto);
        var createdProduct = this.productRepository.save(newProduct);

        return this.productMapper.fromEntityToDto(createdProduct);
    }

    @Override
    public ProductDto update(ProductDto productDto) {
        var productUpdate = this.productMapper.fromDtoToEntity(productDto);
        var updatedProduct = this.productRepository.save(productUpdate);

        return this.productMapper.fromEntityToDto(updatedProduct);
    }

    @Override
    public void deleteById(Long id) {
        this.productRepository.deleteById(id);
    }
}
```

#### Controller

And here we have our controller, `ProductController`. In this class will we define the endpoints and HTTP method need for our web services.

`ProductController.java`

```java
package com.julianjupiter.storee.product.controller;

import com.julianjupiter.storee.product.dto.ProductDto;
import com.julianjupiter.storee.product.exception.BeanValidationException;
import com.julianjupiter.storee.product.exception.ProductNotFoundException;
import com.julianjupiter.storee.product.service.ProductService;
import com.julianjupiter.storee.product.util.UriUtil;
import org.springframework.context.MessageSource;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/products")
public class ProductController {

    private final MessageSource messageSource;
    private final ProductService productService;

    public ProductController(MessageSource messageSource, ProductService productService) {
        this.messageSource = messageSource;
        this.productService = productService;
    }

    @GetMapping
    public List<ProductDto> findAll() {
        return this.productService.findAll();
    }

    @PostMapping
    public ResponseEntity<ProductDto> create(@RequestBody @Valid ProductDto productDto, BindingResult bindingResult) {
        if (bindingResult.hasErrors()) {
            throw new BeanValidationException(bindingResult);
        }

        var createdProductDto = this.productService.create(productDto);
        var uri = UriUtil.path("/{id}", createdProductDto.getId());

        return ResponseEntity.created(uri)
                .body(createdProductDto);
    }

    @GetMapping("/{id}")
    public ResponseEntity<ProductDto> findById(@PathVariable Long id) {
        return this.productService.findById(id)
                .map(ResponseEntity::ok)
                .orElseThrow(() -> new ProductNotFoundException(id));
    }

    @PutMapping("/{id}")
    public ResponseEntity<ProductDto> update(@PathVariable Long id, @RequestBody @Valid ProductDto productDto, BindingResult bindingResult) {
        if (bindingResult.hasErrors()) {
            throw new BeanValidationException(bindingResult);
        }

        return this.productService.findById(id)
                .map(existingProductDto -> {
                    productDto
                            .setId(id)
                            .setCreatedAt(existingProductDto.getCreatedAt());
                    return ResponseEntity.ok(this.productService.update(productDto));
                }).orElseThrow(() -> new ProductNotFoundException(id));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> delete(@PathVariable Long id) {
        return this.productService.findById(id)
                .map(productDto -> {
                    this.productService.deleteById(id);
                    return ResponseEntity.noContent().build();
                })
                .orElseThrow(() -> new ProductNotFoundException(id));
    }
}
```

This is the code that corresponds to our service for retrieving all products, `/products`.

```java
@GetMapping
public List<ProductDto> findAll() {
    return this.productService.findAll();
}
```

Notice that we do not define the path here. This is because, on class level, we already did so, `@RequestMapping("/products")`. This is the root of all product services.

The same also for creating a product resource:

```java
@PostMapping
public ResponseEntity<ProductDto> create(@RequestBody @Valid ProductDto productDto, BindingResult bindingResult) {
    if (bindingResult.hasErrors()) {
        throw new BeanValidationException(bindingResult);
    }

    var createdProductDto = this.productService.create(productDto);
    var uri = UriUtil.path("/{id}", createdProductDto.getId());

    return ResponseEntity.created(uri)
            .body(createdProductDto);
}
```

For retreiving a product:

```java
@GetMapping("/{id}")
public ResponseEntity<ProductDto> findById(@PathVariable Long id) {
    return this.productService.findById(id)
            .map(ResponseEntity::ok)
            .orElseThrow(() -> new ProductNotFoundException(id));
}
```

This is understood that the path is `/products/{id}`. There is no need to include `/products` since it's been defined on the class level. The same is true for update and delete services.

```java
@PutMapping("/{id}")
public ResponseEntity<ProductDto> update(@PathVariable Long id, @RequestBody @Valid ProductDto productDto, BindingResult bindingResult) {
    if (bindingResult.hasErrors()) {
        throw new BeanValidationException(bindingResult);
    }

    return this.productService.findById(id)
            .map(existingProductDto -> {
                productDto
                        .setId(id)
                        .setCreatedAt(existingProductDto.getCreatedAt());
                return ResponseEntity.ok(this.productService.update(productDto));
            }).orElseThrow(() -> new ProductNotFoundException(id));
}

@DeleteMapping("/{id}")
public ResponseEntity<?> delete(@PathVariable Long id) {
    return this.productService.findById(id)
            .map(productDto -> {
                this.productService.deleteById(id);
                return ResponseEntity.noContent().build();
            })
            .orElseThrow(() -> new ProductNotFoundException(id));
}
```

### Other Codes

#### Exception

`ApiException.java`

```java
package com.julianjupiter.storee.product.exception;

public class ApiException extends RuntimeException {
}
```

`ProductNotFoundException.java`

```java
package com.julianjupiter.storee.product.exception;

public class ProductNotFoundException extends ApiException {

    private final Long productId;
    public ProductNotFoundException(Long productId) {
        this.productId = productId;
    }

    public Long getProductId() {
        return productId;
    }
}
```

`BeanValidationException.java`

```java
package com.julianjupiter.storee.product.exception;

import org.springframework.validation.BindingResult;

public class BeanValidationException extends ApiException {
    private final BindingResult bindingResult;

    public BeanValidationException(BindingResult bindingResult) {
        this.bindingResult = bindingResult;
    }

    public BindingResult getBindingResult() {
        return bindingResult;
    }
}
```

`Message.java`

```java
package com.julianjupiter.storee.product.exception;

public class Message {
    private final String message;

    private Message(String message) {
        this.message = message;
    }

    public static Message of(String message) {
        return new Message(message);
    }

    public String getMessage() {
        return message;
    }
}
```

`ExceptionResponse.java`

```java
package com.julianjupiter.storee.product.exception;

import com.fasterxml.jackson.annotation.JsonProperty;
import org.springframework.http.HttpStatus;

import java.net.URI;
import java.time.OffsetDateTime;
import java.util.List;

public class ExceptionResponse {
    private final int status;
    private final String message;
    private final OffsetDateTime createdAt;
    private final URI path;
    @JsonProperty("errors")
    private final List<Message> messages;

    private ExceptionResponse(HttpStatus httpStatus, OffsetDateTime createdAt, URI path, List<Message> messages) {
        this.status = httpStatus.value();
        this.message = httpStatus.getReasonPhrase();
        this.createdAt = createdAt;
        this.path = path;
        this.messages = messages;
    }

    public static ExceptionResponse of(HttpStatus httpStatus, OffsetDateTime createdAt, URI path, List<Message> messages) {
        return new ExceptionResponse(httpStatus, createdAt, path, messages);
    }

    public int getStatus() {
        return status;
    }

    public String getMessage() {
        return message;
    }

    public OffsetDateTime getCreatedAt() {
        return createdAt;
    }

    public URI getPath() {
        return path;
    }

    public List<Message> getMessages() {
        return messages;
    }
}
```

`ApiExceptionHandler.java`

```java
package com.julianjupiter.storee.product.exception;

import com.julianjupiter.storee.product.util.MessageSourceProperties;
import com.julianjupiter.storee.product.util.UriUtil;
import org.springframework.context.MessageSource;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.time.OffsetDateTime;
import java.util.List;
import java.util.Locale;
import java.util.stream.Collectors;

@RestControllerAdvice
public class ApiExceptionHandler {
    private final MessageSource messageSource;

    public ApiExceptionHandler(MessageSource messageSource) {
        this.messageSource = messageSource;
    }

    @ExceptionHandler(BeanValidationException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    protected ExceptionResponse handleBeanValidation(BeanValidationException exception) {
        var bindingResult = exception.getBindingResult();
        var fieldErrors = bindingResult.getFieldErrors();
        var messages = fieldErrors.stream()
                .map(fieldError -> {
                    var fieldErrorCode = fieldError.getCode();
                    var field = fieldError.getField();
                    var resolveMessageCodes = bindingResult.resolveMessageCodes(fieldErrorCode);
                    var message = this.messageSource.getMessage(resolveMessageCodes[0] + "." + field, new Object[] { fieldError.getRejectedValue() }, Locale.ENGLISH);
                    return Message.of(message);
                })
                .collect(Collectors.toUnmodifiableList());

        return ExceptionResponse.of(HttpStatus.BAD_REQUEST, OffsetDateTime.now(), UriUtil.path(), messages);
    }

    @ExceptionHandler(ProductNotFoundException.class)
    @ResponseStatus(HttpStatus.NOT_FOUND)
    public ExceptionResponse handleProductNotFound(ProductNotFoundException exception) {
        var params = new Long[] { exception.getProductId() };
        var message = Message.of(messageSource.getMessage(MessageSourceProperties.PRODUCT_NOT_FOUND.toString(), params, Locale.ENGLISH));
        var messages = List.of(message);

        return ExceptionResponse.of(HttpStatus.NOT_FOUND, OffsetDateTime.now(), UriUtil.path(), messages);
    }
}
```

#### Utility

`UriUtil.java`

```java
package com.julianjupiter.storee.product.util;

import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;

public class UriUtil {

    public static URI path() {
        return ServletUriComponentsBuilder.fromCurrentRequestUri()
                .buildAndExpand()
                .toUri();
    }

    public static URI path(String path, Object... uriVariableValues) {
        return ServletUriComponentsBuilder.fromCurrentRequestUri()
                .path(path)
                .buildAndExpand(uriVariableValues)
                .toUri();
    }

}
```

`MessageSourceProperties.java`

```java
package com.julianjupiter.storee.product.util;

public enum MessageSourceProperties {
    PRODUCT_NOT_FOUND("product.not.found");

    private final String value;

    MessageSourceProperties(String value) {
        this.value = value;
    }

    @Override
    public String toString() {
        return value;
    }
}
```

## Final Project Structure

<img class="img-fluid" src="/assets/images/blog/restful-web-service-api-with-spring-boot-and-spring-mvc/03.JPG" alt="Final Project Structure">

## Build and Run the Service

`Spring Boot` project comes with Maven wrapper. If first time to run it, it will download Maven binary package and the dependencies.

To build on Linux:

```bash
$ ./mvnw clean package
```

On Windows:

```cmd
> .\mvnw clean package
```

Once build is completed, run the service (Linux):

```bash
$ java -jar ./target/storee-product-service-0.0.1-SNAPSHOT.jar
```

On Windows:

```cmd
> java -jar .\target/storee-product-service-0.0.1-SNAPSHOT.jar
```

## Testing Time

To test, I'm going to use [Insomnia Core](https://insomnia.rest/). You could laso use [Postman](https://www.postman.com/), `curl` or [HTTPie](https://httpie.org/).

**Retrieve products, no data**

Request:

Method: `GET`

Endpoint: `http://localhost:7000/storee/api/v1/products`

Response:

Status: `200 OK`

Body:

```json
[]
```

<img class="img-fluid" src="/assets/images/blog/restful-web-service-api-with-spring-boot-and-spring-mvc/04.JPG" alt="Retrieve products, no data">

**Create product, invalid data**

Request:

Method: `POST`

Endpoint: `http://localhost:7000/storee/api/v1/products`

Body: 

```json
{
    "name": "Samsung Galaxy S20",
    "description": "Samsung Galaxy S20"
}
```

Response:

Status: `400 Bad Request`

Body:

```json
{
    "status": 400,
    "message": "Bad Request",
    "createdAt": "2020-09-12T20:02:56.4905563+08:00",
    "path": "http://localhost:7000/storee/api/v1/products",
    "errors": [
        {
            "message": "Product price is required."
        },
        {
            "message": "Product quantity is required."
        }
    ]
}
```

<img class="img-fluid" src="/assets/images/blog/restful-web-service-api-with-spring-boot-and-spring-mvc/05.JPG" alt="Create product, invalid data">

**Create product**

Request:

Method: `POST`

Endpoint: `http://localhost:7000/storee/api/v1/products`

Body: 

```json
{
    "name": "Samsung Galaxy S20",
    "description": "Samsung Galaxy S20",
    "price": 50000,
    "quantity": 25,
}
```

Response:

Status: `201 Created`

Location: `http://localhost:7000/storee/api/v1/products/1`

Body:

```json
{
    "id": 1,
    "name": "Samsung Galaxy S20",
    "description": "Samsung Galaxy S20",
    "price": 50000,
    "quantity": 25,
    "createdAt": "2020-09-12T20:03:33.4061495+08:00"
}
```

<img class="img-fluid" src="/assets/images/blog/restful-web-service-api-with-spring-boot-and-spring-mvc/06.JPG" alt="Create product">

**Retrieve created product**

Request:

Method: `GET`

Endpoint: `http://localhost:7000/storee/api/v1/products/1`

Response:

Status: `200 OK`

Body:

```json
{
    "id": 1,
    "name": "Samsung Galaxy S20",
    "description": "Samsung Galaxy S20",
    "price": 50000,
    "quantity": 25,
    "createdAt": "2020-09-12T20:03:33+08:00"
}
```

<img class="img-fluid" src="/assets/images/blog/restful-web-service-api-with-spring-boot-and-spring-mvc/07.JPG" alt="Retrieve created products">

**Retrieve products**

Request:

Method: `GET`

Endpoint: `http://localhost:7000/storee/api/v1/products`

Response:

Status: `200 OK`

Body:

```json
[
    {
        "id": 1,
        "name": "Samsung Galaxy S20",
        "description": "Samsung Galaxy S20",
        "price": 50000,
        "quantity": 25,
        "createdAt": "2020-09-12T20:03:33+08:00"
    }
]
```

<img class="img-fluid" src="/assets/images/blog/restful-web-service-api-with-spring-boot-and-spring-mvc/08.JPG" alt="Retrieve products">

**Create another product**

Request:

Method: `POST`

Endpoint: `http://localhost:7000/storee/api/v1/products`

Body: 

```json
{
    "name": "Apple iPhone 11 Pro",
    "description": "Apple iPhone 11 Pro",
    "price": 60952.00,
    "quantity": 30
}
```

Response:

Status: `201 Created`

Location: `http://localhost:7000/storee/api/v1/products/2`

Body:

```json
{
    "id": 2,
    "name": "Apple iPhone 11 Pro",
    "description": "Apple iPhone 11 Pro",
    "price": 60952.00,
    "quantity": 30,
    "createdAt": "2020-09-12T20:06:19.7526434+08:00"
}
```

<img class="img-fluid" src="/assets/images/blog/restful-web-service-api-with-spring-boot-and-spring-mvc/09.JPG" alt="Create another product">

**Retrieve products**

Request:

Method: `GET`

Endpoint: `http://localhost:7000/storee/api/v1/products`

Response:

Status: `200 OK`

Body:

```json
[
    {
        "id": 1,
        "name": "Samsung Galaxy S20",
        "description": "Samsung Galaxy S20",
        "price": 50000,
        "quantity": 25,
        "createdAt": "2020-09-12T20:03:33+08:00"
    },
    {
        "id": 2,
        "name": "Apple iPhone 11 Pro",
        "description": "Apple iPhone 11 Pro",
        "price": 60952.00,
        "quantity": 30,
        "createdAt": "2020-09-12T20:06:20+08:00"
    }
]
```

<img class="img-fluid" src="/assets/images/blog/restful-web-service-api-with-spring-boot-and-spring-mvc/10.JPG" alt="Retrieve products">

**Retrieve product, not found**

Request:

Method: `GET`

Endpoint: `http://localhost:7000/storee/api/v1/products/3`

Response:

Status: `404 Not Found`

Body:

```json
{
  "status": 404,
  "message": "Not Found",
  "createdAt": "2020-09-12T20:07:43.7526804+08:00",
  "path": "http://localhost:7000/storee/api/v1/products/3",
  "errors": [
    {
      "message": "Product with ID 3 was not found."
    }
  ]
}
```

<img class="img-fluid" src="/assets/images/blog/restful-web-service-api-with-spring-boot-and-spring-mvc/11.JPG" alt="Retrieve product, not found">

**Update product, not found**

Request:

Method: `PUT`

Endpoint: `http://localhost:7000/storee/api/v1/products/3`

Body: 

```json
{
    "name": "Apple iPhone 11 Pro",
    "description": "Apple iPhone 11 Pro",
    "price": 60952.00,
    "quantity": 35,    
}
```

Response:

Status: `404 Not Found`

Body:

```json
{
    "status": 404,
    "message": "Not Found",
    "createdAt": "2020-09-12T20:12:43.6627053+08:00",
    "path": "http://localhost:7000/storee/api/v1/products/3",
    "errors": [
        {
            "message": "Product with ID 3 was not found."
        }
    ]
}
```

<img class="img-fluid" src="/assets/images/blog/restful-web-service-api-with-spring-boot-and-spring-mvc/12.JPG" alt="Update product, not found">

**Update product, invalid data**

Request:

Method: `PUT`

Endpoint: `http://localhost:7000/storee/api/v1/products/1`

Body: 

```json
{
    "description": "Samsung Galaxy S20",
    "price": 50000,
    "quantity": 25
}
```

Response:

Status: `400 Bad Request`

Body:

```json
{
    "status": 400,
    "message": "Bad Request",
    "createdAt": "2020-09-12T20:09:09.933927+08:00",
    "path": "http://localhost:7000/storee/api/v1/products/1",
    "errors": [
        {
            "message": "Product name is required."
        }
    ]
}
```

<img class="img-fluid" src="/assets/images/blog/restful-web-service-api-with-spring-boot-and-spring-mvc/13.JPG" alt="Update product, invalid data">

**Update product**

Request:

Method: `PUT`

Endpoint: `http://localhost:7000/storee/api/v1/products/1`

Body: 

```json
{
    "name": "Samsung Galaxy S20",
    "description": "Samsung Galaxy S20",
    "price": 50000,
    "quantity": 28
}
```

Response:

Status: `200 OK`

Body:

```json
{
    "id": 1,
    "name": "Samsung Galaxy S20",
    "description": "Samsung Galaxy S20",
    "price": 50000,
    "quantity": 28,
    "createdAt": "2020-09-12T20:03:33+08:00"
}
```

<img class="img-fluid" src="/assets/images/blog/restful-web-service-api-with-spring-boot-and-spring-mvc/14.JPG" alt="Update product">

**Retrieve updated product**

Request:

Method: `GET`

Endpoint: `http://localhost:7000/storee/api/v1/products/1`

Response:

Status: `200 OK`

Body:

```json
{
    "id": 1,
    "name": "Samsung Galaxy S20",
    "description": "Samsung Galaxy S20",
    "price": 50000,
    "quantity": 28,
    "createdAt": "2020-09-12T20:03:33+08:00"
}
```

<img class="img-fluid" src="/assets/images/blog/restful-web-service-api-with-spring-boot-and-spring-mvc/14.JPG" alt="Retrieve updated product">

**Retrieve product**

Request:

Method: `GET`

Endpoint: `http://localhost:7000/storee/api/v1/products`

Response:

Status: `200 OK`

Body:

```json
[
    {
        "id": 1,
        "name": "Samsung Galaxy S20",
        "description": "Samsung Galaxy S20",
        "price": 50000,
        "quantity": 28,
        "createdAt": "2020-09-12T20:03:33+08:00"
    },
    {
        "id": 2,
        "name": "Apple iPhone 11 Pro",
        "description": "Apple iPhone 11 Pro",
        "price": 60952.00,
        "quantity": 30,
        "createdAt": "2020-09-12T20:06:20+08:00"
    }
]
```

<img class="img-fluid" src="/assets/images/blog/restful-web-service-api-with-spring-boot-and-spring-mvc/14.JPG" alt="Retrieve products">

**Delete product, not found**

Request:

Method: `DELETE`

Endpoint: `http://localhost:7000/storee/api/v1/products/3`

Response:

Status: `404 Not Found`

Body:

```json
{
    "status": 404,
    "message": "Not Found",
    "createdAt": "2020-09-12T20:13:26.6683615+08:00",
    "path": "http://localhost:7000/storee/api/v1/products/3",
    "errors": [
        {
            "message": "Product with ID 3 was not found."
        }
    ]
}
```

<img class="img-fluid" src="/assets/images/blog/restful-web-service-api-with-spring-boot-and-spring-mvc/16.JPG" alt="Delete product, not found">

**Delete product**

Request:

Method: `DELETE`

Endpoint: `http://localhost:7000/storee/api/v1/products/2`

Response:

Status: `204 No Content`

<img class="img-fluid" src="/assets/images/blog/restful-web-service-api-with-spring-boot-and-spring-mvc/17.JPG" alt="Delete product">

**Retrieve deleted product, not found**

Request:

Method: `GET`

Endpoint: `http://localhost:7000/storee/api/v1/products/2`

Response:

Status: `404 Not Found`

Body:

```json
{
    "status": 404,
    "message": "Not Found",
    "createdAt": "2020-09-12T20:14:21.6507184+08:00",
    "path": "http://localhost:7000/storee/api/v1/products/2",
    "errors": [
        {
            "message": "Product with ID 2 was not found."
        }
    ]
}
```

<img class="img-fluid" src="/assets/images/blog/restful-web-service-api-with-spring-boot-and-spring-mvc/18.JPG" alt="Retrieve deleted product, not found">

**Retrieve product**

Request:

Method: `GET`

Endpoint: `http://localhost:7000/storee/api/v1/products`

Response:

Status: `200 OK`

Body:

```json
[
    {
        "id": 1,
        "name": "Samsung Galaxy S20",
        "description": "Samsung Galaxy S20",
        "price": 50000,
        "quantity": 28,
        "createdAt": "2020-09-12T20:03:33+08:00"
    }
]
```

<img class="img-fluid" src="/assets/images/blog/restful-web-service-api-with-spring-boot-and-spring-mvc/19.JPG" alt="Retrieve products">

## Conclusion

We're able to develop RESTful web service using `Spring Boot` and `Spring MVC`. We applied some proper conventions in building RESTful web service such as RESTful URI and appropriate HTTP verbs.

## Clone the Source

[GitHub Source](https://github.com/julianjupiter/storee)

```bash
$ git clone https://github.com/julianjupiter/storee
$ cd storee/storee-product-service
$ ./mvnw clean package && java -jar ./target/storee-product-service-0.0.1-SNAPSHOT.jar
```