---
title: Functional Interfaces, Lambda Expressions and Method References in Java
description: Since Java 8, lambda expressions have been supported via functional interfaces. Check out this tutorial on using functional interfaces, lambda expressions and method references.
tags: [Java, Functional Interface, Lambdas, Lambda Expressions]
keywords: java, functional interface, lambdas, lambda expressions
author: Julian Jupiter
date: 2023-03-17
slug: functional-interfaces-lambda-expressions-and-method-references-in-java
categories:
image:
  cover: /assets/images/blog/functional-interfaces-lambda-expressions-and-method-references-in-java/cover.png
  og: /assets/images/blog/functional-interfaces-lambda-expressions-and-method-references-in-java/cover.png
  thumbnail: /assets/images/blog/functional-interfaces-lambda-expressions-and-method-references-in-java/thumbnail.png
---

## Introduction
Since Java 8, **first-class functions** called **lambda expressions** have been supported via **functional interfaces**. It's been long requested by the users. Other programming languages have supported this either from the start or added later on.

Java is well-known as an ***object-oriented programming (OOP) language***. As such, everything in Java is an object except the eight primitive data types (**byte**, **short**, **int**, **long**, **float**, **double**, **character** and **boolean**). In OOP, an **object** maintains **states** or **data** via **fields**, also known as **attributes** or **properties**. An object **method**, also known as **function** or **procedure**, operates on these data. In Java, a **class** is the blueprint from which an object, or instance, is being created. This class includes fields and methods.

## Functional Programming
[From Wikipedia, the free encyclopedia](https://en.wikipedia.org/wiki/Functional_programming):

> In computer science, functional programming is a programming paradigm where programs are constructed by applying and composing functions. It is a declarative programming paradigm in which function definitions are trees of expressions that map values to other values, rather than a sequence of imperative statements which update the running state of the program.

> In functional programming, functions are treated as first-class citizens, meaning that they can be bound to names (including local identifiers), passed as arguments, and returned from other functions, just as any other data type can. This allows programs to be written in a declarative and composable style, where small functions are combined in a modular manner.

By introducing **functional interfaces**, Java is now capable of expressing ***first-class functions***. They can be stored in variables, can be arguments or the return values of other functions. ***Higher-order functions*** are the functions that enclosed first-class functions.

## Functional Interfaces

Functional Interfaces are an interface with **single abstract method (SAM)**, called the ***functional method***. They provide target types for ***lambda expressions*** and ***method references***. Lambda expressions's parameters and return types are being matched to this functional method.

To indicate that an interface is a functional interface, we annotate an interface with `@FunctionalInterface` on class level. While an interface with SAM could still function as **Functional Interface** (lambda expression) as compiler can recognize it, annotation is recommended. By putting annotation, the message is clear and it provides guarantee to the developers that it won't get additional abstract method in the future and that it will remain functional interface.

Some old built-in interfaces with SAM, such as `Comparator` and `Runnable`, have been annotated with `@FunctionalInterface`.

### Example

```java
@FunctionalInterface
public interface Calculator {
  long calculate(long x, long y);
}
```

We can implement above interface in two ways prior to Java 8.

1. Anonymous class

  ```java
  Calculator division = new Calculator() {
    @Override
    public long calculate(long x, long y) {
      return x / y;
    }
  };

  long quotient = division.calculate(10, 2);
  ```

2. Concrete class

  ```java
  class Division implements Calculator {
    @Override
      public long calculate(long x, long y) {
      return x / y;
    }
  }
  
  Calculator division = new Division() ;
  long quotient = division.calculate(10, 2);
  ```

Anonymous classes can be passed as arguments.

With Java 8, there is a third way to to implement an interface and that is by using **Lambda Expressions**.

## Lambda Expressions

Lambda expressions encapsulate a single unit of behavior and pass it to other code. To be able to create lambda expression, you need first a Funtional Interface. This is the reason why a Functional Interface has a single abstract method. Instead of an anonymous class, you can use lambda expression which is a concise alternative and shorthand replacement for it.

### Syntax

```java
parameter -> expression or statement body
```

### Example

```java
(Integer x) -> { return x; };
```


### Characteristics of Lambda Expressions

1. Optional type declaration

```java
(x) -> { return x; };
```

2. Optional parentheses

```java
x -> { return x; };
```

Parentheses are required if there are multiple parameters. Parameters are separated by comma (`,`).

```java
(x, y) -> { return x + y; };
```

3. Optional curly braces (`{}`) and optional `return` keyword

```java
x -> x;
```

Curly braces are required if body has multiple statements. `return` keyword is required for a function with return value if body has multiple statements. No `return` keyword is required if function does not return a value as in regular method.

```java
x -> {
  System.out.println("Hello world!");
  return x;
};
```

```java
@FunctionalInterface
public interface HelloWorld {
  void greet(String message);
}

HelloWorld hellWorld1 = s -> System.out.println(s);

HelloWorld hellWorld2 = s -> {
  System.out.println(s);
  System.out.println("Welcome to Java 8 Programming!");
};
```

Remember our `Calculator` interface? Here is how to implement it using lambda expression:

```java
Calculator multiplication = (a, b) -> a * b;    // or (a, b) -> Math.multiplyExact(a, b);
Calculator division = (a, b) -> a / b;
Calculator addition = (a, b) -> a + b;          // or (a, b) -> Math.addExact(a, b);
Calculator subtraction = (a, b) -> a - b;       // or (a, b) -> Math.subtractExact(a, b);

long product = multiplication.calculate(5, 5);
long quotient = division.calculate(10, 2);
long sum = addition.calculate(5, 5);
long difference = subtraction.calculate(10, 4);
```

### Lambda Expressions as Arguments

Suppose we have a method that accepts three parameters. One of them is a functional interface:

```java
public static long calculate(long a, long b, Calculator calculator) {
  return calcultor.calculate(a, b);
}
```

We could pass in the variable for our lambda expression:

```java
Calculator multiplication = (a, b) -> a * b;
var product = calculate(5, 5, multiplication);
```

or, directly pass in the lambda expression:

```java
var product = calculate(5, 5, (a, b) -> a * b);
```

Prior to Java 8, we would write it this way:

```java
var product = calculate(5, 5, new Calculator() {
  @Override
  public long calculate(long a, long b) {
    return a * b;
  }
});
```

### Default and Static Methods

A functional interface can have more methods, either ***default method*** or ***static method***, but not additional abstract method. Adding more abstract methods, a functional interface would not compile. Annotation `@FunctionInterafce` must be removed and make the interface a regular one.

#### Default Methods

Along with lambda expressions comes **default method**. A default method is a concrete method in interfaces, not just functional interface. Previously, an interface can only have abstract method but not concrete ones. The purpose is to have backward compatibility so that existing interfaces can have additional methods automatically without modifying existing implementations. As its name suggests, a default method provides implementation that may be overriden by implementing classes.

An example of a default method is the `forEach` added to `java.uti.Iterable`. Thus, this method becomes available to interfaces that extends `Iterable`  such as `Collection` and its sub-interfaces, `List` and `Set`. An instance of these interfaces can use `forEach` as if implementations such as `ArrayList`, `HastSet` and others implemented it.

```java
public interface Greetings {
  default void greet() {
    System.out.println("Hello, world!");
  }
}
```

A default method is implicitly public, like regular interface methods; there's no need to specify the public modifier. Let's implement interface `Greetings`:

```java
public HelloWorldGreetings implements Greetings {}

var greetings = new HelloWorldGreetings();
greetings.greet(); // prints Hello, world!
```

To override:

```java
public GoodMorningGreetings implements Greetings {
  @Override
  public void greet() {
    System.out.println("Good morning!");
  }
}

var greetings = new GoodMorningGreetings();
greetings.greet(); // prints Good morning!
```

#### Static Methods

As in regular static methods, static methods in interfaces don't belong to an object and are not part of classes implementing the interface. Thus, they have to be **called by using the interface name preceding the method name** or be invoked within other *static* and *default* methods.

Let's modify `Greetings` interface.

```java
public interface Greetings {
  default void greet() {
    System.out.println(sayHello() + ", world!");
  }

  static String sayHello() {
    return "Hello";
  }
}

var hello = Greetings.sayHello();
System.out.prinltn(hello); // prints Hello
```
## Method References

Java enables you to pass references of methods or constructors via the `::` keyword. **Method references** are compact, easy-to-read lambda expressions for methods that already have a name. They are preferred over lambda expression if the expression does nothing but calls an existing method.

### Syntax

```java
Reference::methodName
```

### Types of Method References

<table class="">
    <thead>
        <tr>
            <th>Type</th>
            <th>Example</th>
        </tr>
    </thead>
    <tbod>
        <tr>
            <th>Reference to a static method</th>
            <td><code>ContainingClass::staticMethodName</code></td>
        </tr>
        <tr>
            <th>Reference to an instance method of a particular object</th>
            <td><code>containingObject::instanceMethodName</code></td>
        </tr>
        <tr>
            <th>Reference to an instance method of an arbitrary object of a particular type</th>
            <td><code>ContainingType::methodName</code></td>
        </tr>
        <tr>
            <th>Reference to a constructor</th>
            <td><code>ClassName::new</code></td>
        </tr>
    </tbody>
</table>

### Examples

#### Reference to a static method

Example 1

```java
class Person {
  private LocalDate birthday;

  public Person() {}

  public Person(LocalDate birthday) {
    this.birthday = birthday;
  }

  // setters, getters

  public static int compareByAge(Person a, Person b) {
    return a.birthday.compareTo(b.birthday);
  }
}
```

```java
Person p1 = new Person(LocalDate.of(2000, 6, 21));
Person p2 = new Person(LocalDate.of(2000, 6, 15));
Person p3 = new Person(LocalDate.of(1998, 3, 28));
Person[] persons = {p1, p2, p3};
```

Lambda Expression:

```java
Arrays.sort(persons, (p1, p2) -> Person.compareByAge(p1, p2));
```

Method Reference:

```java
Arrays.sort(persons, Person::compareByAge);
```

Example 2

```java
@FunctionalInterface
public interface StringToIntConverter {
  int convert(String string);
}
```

Lambda Expression:

```java
StringToIntConverter converter = s -> Integer.valueOf(s);
int i = converter.convert("10");
```

Method Reference:

```java
StringToIntConverter converter = Integer::valueOf;
int i = converter.convert("10");
```

#### Reference to an instance method of a particular object

Example 1

```java
public class Something {
  public int getYear(LocalDate localDate) {
    return localDate.getYear();
  }
}
```

Lambda Expression:

```java
Something something = new Something();
Function<LocalDate, Integer> f = d -> something.getYear(d);
int year = f.apply(p1.getBirthday());
```

Method Reference:

```java
Something something = new Something();
Function<LocalDate, Integer> f = something::getYear;
int year = f.apply(p1.getBirthday());
```

Example 2

```java
public interface PersonDao {
  Person findById(int id);
}
```

Lambda Expression:

```java
PersonDao personDao = new PersonDaoImpl();
Function<Integer, Person> f = id -> personDao.findById(id);
Person person = f.apply(1);
```

Method Reference:

```java
PersonDao personDao = new PersonDaoImpl();
Function<Integer, Person > f = personDao::findById;
Person person = f.apply(1);
```

#### Reference to an instance method of an arbitrary object of a particular type

Example 1

Lambda Expression:

```java
Function<String, String> f = s -> s.toUpperCase();
String httpGet = f.apply("get");
```

Method Reference:

```java
Function<String, String> f = String::toUpperCase;
String httpGet = f.apply("get");
```

Example 2

Lambda Expression:

```java
Person person = ...
Function<Person, LocalDate> f = p -> p.getBirthday();
LocalDate birthday = f.apply(person);
```

Method Reference:

```java
Person person = ...
Function<Person, LocalDate> f = Person::getBirthday;
LocalDate birthday = f.apply(person);
```

#### Reference to a constructor

Example 1

Lambda Expression:

```java
Function<LocalDate, Person> f = d -> new Person(d);
LocalDate birthday = LocalDate.of(2000, 10, 12);
Person person = f.apply(birthday);
```

Method Reference:

```java
Function<LocalDate, Person> f = Person::new;
LocalDate birthday = LocalDate.of(2000, 10, 12);
Person person = f.apply(birthday);
```

Example 2

Lambda Expression:

```java
Supplier<Person> s = () -> new Person();
Person person = s.get();
```

Method Reference:

```java
Supplier<Person> s = Person::new;
Person person = s.get();
```

## Java Built-in Functions

Java ships 43 built-in functions under `java.util.function` package. **Thirty eight** (**38**) of them are specialization for primitive and other functions.

These interfaces are general purpose functional interfaces used by the JDK or by user code as well. They provide enough to cover common requirements. JDK comes also with other functional interfaces included in other package closed to where they are used.

The following are the basic function interfaces:

1. `Function`
2. `Consumer`
3. `Supplier`
4. `Predicate`

### Function

`Function` represents a function that accepts one argument and produces a result. The type parameter `T` represents the type of the input to the function while the second one `R` represents the type of result. The functonal method of this functional interface is `apply(Object)`.

```java
@FunctionalInterface
public interface Function<T,R>
```

#### Examples

Below is an example of `Function` that accepts a String argument and returns a String.

```java
Function<String, String> f1 = a -> a;
String message = f1.apply("Welcome to Java 8!");
```

This one accepts a String argument and returns an integer.

```java
Function<String, Integer> f2 = a -> a.length();
int textLength = f2.apply("Welcome to Java 8!");
```

### Consumer

`Consumer` represents an operation that accepts a single input argument and returns no result. The type parameter `T` represents the type of the input to the operation. The functonal method of this functional interface is `accept(Object)`.

```java
@FunctionalInterface
public interface Consumer<T>
```

#### Examples

Both accept String input argument and returns no value.

```java
Consumer<String> c1 = a -> System.out.println(a);
c1.accept("Welcome to Java 8!");

Consumer<String> c2 = a -> {
  String message = "Welcome to " + a + "!";
  System.out.println(message);
};
c2.accept("Java 8");
```

### Supplier

`Supplier` represents a supplier of results. The type parameter `T` represents the type of results supplied by the supplier. This is a functional interface whose functional method is `get()`.

```java
@FunctionalInterface
public interface Supplier<T>
```

#### Examples

This example returns a value of String type.

```java
Supplier<String> stringSupplier = () -> "Welcome to Java 8!";
String message = stringSupplier.get();
```

And this one returns a value of User type.

```java
Supplier<User> userSupplier = () -> new User();
User user = userSupplier.get();
```

### Predicate

`Predicate` represents a predicate (boolean-valued function) of one argument. The type parameter `T` represents the type of the input to the predicate. This is a functional interface whose functional method is `test(Object)`.

```java
@FunctionalInterface
public interface Predicate<T>
```

#### Examples

To check if argument is equal to "YES" regardless of case:

```java
Predicate<String> answerPredicate = a -> "YES".equalsIgnoreCase(a);
boolean isYes = answerPredicate.test("Yes");
```

To check if person is of legal age (18 and above):

```java
public static Predicate<Integer> isLegalAge() {
  return age -> age >= 18;
}
```

```java
boolean legalAge = isLegalAge().test(18);
```

### Built-in Functions - Specialization

Other built-in functions are specializations for primitive types and for basic or another specialization functions.

To check all other built-in functions, please visit this <a href="https://docs.oracle.com/en/java/javase/17/docs/api/java.base/java/util/function/package-summary.html" target="blank">Javadoc</a>.

### Existing Interface - Comparator

`Comparator` is an existing interface in Java since version 1.2. This interface has a single abstract method, `compare(T o1, T o2)`, and, therefore, can be used as lambda expression.

Prior to Java 8, we would use `Comparator` in sorting a collection the following way:

```java
List<String> choices = Arrays.asList("c", "a", "d", "b", "e");

Collections.sort(choices, new Comparator<String>() {
  @Override
  public int compare(String a, String b) {
    return a.compareTo(b);
  }
});
```

Beginning Java 8:

```java
Comparator<String> comparator = (a, b) -> a.compareTo(b);
Collections.sort(choices, comparator);
```

```java
Collections.sort(choices, (String a, String b) -> {
  return a.compareTo(b);
});
```

```java
Collections.sort(choices, (String a, String b) -> a.compareTo(b));
```

```java
Collections.sort(choices, (a, b) -> a.compareTo(b));
```

## Some Java APIs Using Functional Interfaces

A lot of JDK standard APIs make use of functional interfaces. Stream API and `java.util.Optional`, for example, heavily use built-in functional interfaces. Third party libraries and framework leverage also on functional interfaces, either using built-in or user-defined functional interfaces.

### Stream API
  ```java
  var gospels = List.of("Matthew", "John", "Mark", "Luke");
  var names = gospels.stream()
    .filter(name -> name.length() == 4) // filter accepts java.util.function.Predicate functional interface
    .map(String::toUpperCase) // map accepts java.util.function.Function functional interface
    .toList();
  names.forEach(name -> System.out.println(name)); // forEach accepts java.util.function.Consumer function interface
   ```
### Optional
   
  ```java
  var optional = Optional.of("Philippines");
  optional.ifPresentOrElse(s -> {
    System.out.println(s);
  }, () -> {
    System.out.println("Error");
  });
  ```
  `ifPresentOrElse` has two parameters - `java.util.function.Consumer` and `java.lang.Runnable`. 
  
  `Runnable` has long been an existing interface since Java 1.0. `@FunctionalInterface` annotation was later added to it. It represents an operation that does not accept an argument and returns no result. The functonal method of this functional interface is `run()`.

  ```java
  @FunctionalInterface
  public interface Runnable {
    void run();
  }
  ```

## Conclusion

In this post, we have discussed what Java has got about function programming. We jave learned how to create and use functional interfaces, lambda expressions, and method references.

---

## Reference

1. https://docs.oracle.com/en/java/javase/17/docs/api/java.base/java/util/function/package-summary.html