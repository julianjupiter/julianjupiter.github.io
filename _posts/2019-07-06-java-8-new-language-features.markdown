---
layout: post
title: Java 8 New Language Features
date: 2019-07-06
description: This post discusses the new features introduced to Java 8 language.
categories:
keywords: Java, Java 8, Java 8 new features
image:
  cover: 
  og: 
  thumbnail: /assets/images/blog/java-8-new-language-features/thumbnail.png
---

### Overview

This post discusses the new language features of **Java 8**. Java 8's release is the most awaited and is a major feature release of Java programming language.

These new features include **functional interfaces**, **interface default method**, **lambda expressions**, **method references**, **Optional**, and **Stream API**. We will also talk about some of **built-in functions** that implement Function Interface and the **New Date and Time API**.

### Functional Interface

Functional Interface is an interface with **single abstract method (SAM)**. Static or the new default method is not counted. To indicate that an interface is a **Functional Interface**, annotation `@FunctionalInterface` on class level is needed. While an interface with SAM could still function as **Functional Interface** (qualified as lambda expression) even if it does not have such annotation (example is AWT's `ActionListener`), it is recommended that it be annotated.

Some old built-in interfaces with SAM, such as `Comparator` and `Runnable`, have been annotated with `@FunctionalInterface` and can be used as lambda expressions.

#### Example

```java
@FunctionalInterface
public interface Calculator {
  long calculate(long x, long y);
}
```

We can implement above interface in two ways prior to Java 8.

- Anonymous class

  ```java
  Calculator division = new Calculator() {
    @Override
    public long calculate(long x, long y) {
      return x / y;
    }
  };

  long quotient = division.calculate(10, 2);
  ```

- Concrete class

  ```java
  class Division implements Calculator {
    @Override
      public long calculate(long x, long y) {
      return x / y;
    }
  }
  ```

  ```java
  Calculator division = new Division() ;
  long quotient = division.calculate(10, 2);
  ```

With Java 8, there is a third way to to implement an interface and that is by using **Lambda Expressions**.

### Lambda Expressions

Lambda expressions encapsulate a single unit of behavior and pass it to other code. To be able to create lambda expression, you need first a Funtional Interface. This is the reason why a Functional Interface has a single abstract method. Instead of an anonymous class, you can use lambda expression which is a concise alternative and shorthand replacement for it.

#### Syntax

```java
parameter -> expression or statement body
```

#### Example

```java
(Integer x) -> { return x; };
```

#### Characteristics of Lambda Expression

1. Optional type declaration

```java
(x) -> { return x; };
```

2. Optional parentheses<br>

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
x -> {
  System.out.println("Hello world!");
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

### Built-in Functions

Java 8 ships 43 built-in functions under `java.util.function` package. **Thirty eight** (**38**) of them are specialization for primitive and other functions.

The following are the basic functions:

1. `Function`
2. `Consumer`
3. `Supplier`
4. `Predicate`

#### Function

Function represents a function that accepts one argument and produces a result. The type parameter `T` represents the type of the input to the function while the second one R represents the type of result. The functonal method of this functional interface is `apply(Object)`.

```java
@FunctionalInterface
public interface Function<T,R>
```

##### Examples

Below is an example of Function that accepts a String argument and returns a String.

```java
Function<String, String> f1 = a -> a;
String message = f1.apply("Welcome to Java 8!");
```

This one accepts a String argument and returns an integer.

```java
Function<String, Integer> f2 = a -> a.length();
int textLength = f2.apply("Welcome to Java 8!");
```

#### Consumer

Consumer represents an operation that accepts a single input argument and returns no result. The type parameter `T` represents the type of the input to the operation. The functonal method of this functional interface is `accept(Object)`.

```java
@FunctionalInterface
public interface Consumer<T>
```

##### Examples

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

#### Supplier

Supplier Represents a supplier of results. The type parameter `T` represents the type of results supplied by the supplier. This is a functional interface whose functional method is `get()`.

```java
@FunctionalInterface
public interface Supplier<T>
```

##### Examples

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

#### Predicate

Predicate represents a predicate (boolean-valued function) of one argument. The type parameter `T` represents the type of the input to the predicate. This is a functional interface whose functional method is `test(Object)`.

```java
@FunctionalInterface
public interface Predicate<T>
```

##### Examples

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

#### Built-in Functions - Specialization

Other built-in functions are specializations for primitive types and for basic or another specialization functions.

To check all other built-in functions, please visit this <a href="https://docs.oracle.com/javase/8/docs/api/java/util/function/package-summary.html" target="blank">Javadoc</a>.

#### Existing Interface - Comparator

`Comparator` is an existing interface in Java since version 1.2. This interface has a single abstract method, `compare(T o1, T o2)`, and, therefore, can be used as lambda expression similar to functions added to Java 8.

Prior to Java 8, we would use <span class="inline-code">Comparator</span> in sorting a collection the following way:

```java
List<String> choices = Arrays.asList("c", "a", "d", "b", "e");

Collections.sort(choices, new Comparator<String>() {
  @Override
  public int compare(String a, String b) {
    return a.compareTo(b);
  }
});
```

With Java 8:

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

### Default Methods

Default methods enable you to add new functionality to the interfaces of your libraries and ensure binary compatibility with code written for older versions of those interfaces. They are interface methods that have an implementation, similar to static methods, and the `default` keyword at the beginning of the method signature.

#### Syntax

```java
default type methodName(type parameter) {
  body
}
```

For example, default method `forEach()` was added to `Iterable` interface. This method takes a `Consumer` argument and performs action for each element (similar to enhanced `for-each` construct). `List` interface which extends `Iterable` can now be used with `forEach()` method:

```java
List<String> days = Arrays.asList("Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday");
days.forEach(day -> System.out.println(day));
```

#### Example

```java
public interface Calculator {
  double calculate(double number);

  default double sqrt(double number) {
    return Math.sqrt(number);
  }
}
```

```java
Calculator sc = x -> x * x;
double square = sc.calculate(10.0); // 100.0
double sqrt = sc.sqrt(square);      // 10.0
```

### Method References

Java 8 enables you to pass references of methods or constructors via the :: keyword. Method references are compact, easy-to-read lambda expressions for methods that already have a name. They are preferred over lambda expression if the expression does nothing but calls an existing method.

#### Syntax

```java
Reference::methodName
```

#### Types of Method References

<table class="table table-bordered table-striped">
    <thead>
        <tr>
            <th scope="col">Type</th>
            <th scope="col">Example</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <th scope="row">Reference to a static method</th>
            <td>ContainingClass::staticMethodName</td>
        </tr>
        <tr>
            <th scope="row">Reference to an instance method of a particular object</th>
            <td>containingObject::instanceMethodName</td>
        </tr>
        <tr>
            <th scope="row">Reference to an instance method of an arbitrary object of a particular type</th>
            <td>ContainingType::methodName</td>
        </tr>
        <tr>
            <th scope="row">Reference to a constructor</th>
            <td>ClassName::new</td>
        </tr>
    </tbody>
</table>

#### Example

##### Reference to a static method

1. Example 1

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

Lambda Expression

```java
Arrays.sort(persons, (p1, p2) -> Person.compareByAge(p1, p2));
```

Method Reference

```java
Arrays.sort(persons, Person::compareByAge);
```

1. Example 2

```java
@FunctionalInterface
public interface StringToIntConverter {
  int convert(String string);
}
```

Lambda Expression

```java
StringToIntConverter converter = s -> Integer.valueOf(s);
int i = converter.convert("10");
```

Method Reference

```java
StringToIntConverter converter = Integer::valueOf;
int i = converter.convert("10");
```

##### Reference to an instance method of a particular object

1. Example 1

```java
public class Something {
  public int getYear(LocalDate localDate) {
    return localDate.getYear();
  }
}
```

Lambda Expression

```java
Something something = new Something();
Function<LocalDate, Integer> f = d -> something.getYear(d);
int year = f.apply(p1.getBirthday());
```

Method Reference

```java
Something something = new Something();
Function<LocalDate, Integer> f = something::getYear;
int year = f.apply(p1.getBirthday());
```

2. Example 2

```java
public interface PersonDao {
  Person findById(int id);
}
```

Lambda Expression

```java
PersonDao personDao = new PersonDaoImpl();
Function<Integer, Person> f = id -> personDao.findById(id);
Person person = f.apply(1);
```

Method Reference

```java
PersonDao personDao = new PersonDaoImpl();
Function<Integer, Person > f = personDao::findById;
Person person = f.apply(1);
```

##### Reference to an instance method of an arbitrary object of a particular type

1. Example 1

Lambda Expression

```java
Function<String, String> f = s -> s.toUpperCase();
String httpGet = f.apply("get");
```

Method Reference

```java
Function<String, String> f = String::toUpperCase;
String httpGet = f.apply("get");
```

2. Example 2

Lambda Expression

```java
Person person = ...
Function<Person, LocalDate> f = p -> p.getBirthday();
LocalDate birthday = f.apply(person);
```

Method Reference

```java
Person person = ...
Function<Person, LocalDate> f = Person::getBirthday;
LocalDate birthday = f.apply(person);
```

##### Reference to a constructor</h5>

1. Example 1

Lambda Expression

```java
Function<LocalDate, Person> f = d -> new Person(d);
LocalDate birthday = LocalDate.of(2000, 10, 12);
Person person = f.apply(birthday);
```

Method Reference

```java
Function<LocalDate, Person> f = Person::new;
LocalDate birthday = LocalDate.of(2000, 10, 12);
Person person = f.apply(birthday);
```

2. Example 2

Lambda Expression

```java
Supplier<Person> s = () -> new Person();
Person person = s.get();
```

Method Reference

```java
Supplier<Person> s = Person::new;
Person person = s.get();
```

### When to Use Nested Classes, Local Classes, Anonymous Classes, and Lambda Expressions

- Local class - Use it if you need to create more than one instance of a class, access its constructor, or introduce a new, named type (because, for example, you need to invoke additional methods later).
- Anonymous class - Use it if you need to declare fields or additional methods.
- Lambda expression or Method reference
  - Use it if you are encapsulating a single unit of behavior that you want to pass to other code. For example, you would use a lambda expression if you want a certain action performed on each element of a collection, when a process is completed, or when a process encounters an error.
  - Use it if you need a simple instance of a functional interface and none of the preceding criteria apply (for example, you do not need a constructor, a named type, fields, or additional methods).
- Nested class

  - Use it if your requirements are similar to those of a local class, you want to make the type more widely available, and you don't require access to local variables or method parameters.
  - Use a non-static nested class (or inner class) if you require access to an enclosing instance's non-public fields and methods. Use a static nested class if you don't require this access.

### Optional

- `null` reference is the source of many problems because it is often used to denote the absence of a value
- Java SE 8 introduces a new class called `java.util.Optional` that can alleviate some of these problems.
- Thus, `Optional` object is a container object which may or may not contain a non-null value.
- If a value is present, `isPresent()` will return true and `get()` will return the value.

#### How to create Optional objects?

- Empty Optional

  ```java
  Optional<String> msgOptional = Optional.empty();
  ```

- Optional with non-null value

  ```java
  String message = “Welcome to Java 8!”;
  Optional<String> msgOptional = Optional.of(message);
  ```

  If `message` were `null`, a `NullPointerException` would immediately be thrown, rather than getting a latent error once you try to access properties of the `message` String object.

- Optional object that may hold a null value

  ```java
  String message = null;
  Optional<String> msgOptional = Optional.ofNullable(message);
  ```

If `message` were `null`, the resulting `Optional` object would be empty (`Optional.empty()`) and would not throw `NullPointerException`.

#### Check Value Presence and Do Action

- `isPresent()`

  - Returns `true` if the wrapped value is not `null`

    ```java
    Optional<String> msgOptional = …;
    if (msgOptional.isPresent()) {
      System.out.println(msgOptional.get());
    }
    ```

    Before `Optional`, we would do:

    ```java
    String message = …;
    if (message != null) {
      System.out.println(message);
    }
    ```

- `ifPresent()`

  - Allows to run some codes if it returns `true`; takes a `Consumer` function which takes the object being checked as an argument.

    ```java
    Optional<String> msgOptional = …;
    msgOptional.ifPresent(m -> System.out.println(m));
    ```

    Or

    ```java
    msgOptional.ifPresent(System.out::println);
    ```

- `orElse()`

  - Retrieves value wrapped inside an `Optional` object if it is present and its argument otherwise.

    ```java
    Optional<String> msgOptional = …;
    String message = msgOptional.orElse(“Welcome!”);
    ```

    Before `Optional`, we would do:

    ```java
    String message = …;
    String msg = message != null ? Message : “Welcome!”;
    ```

- `orElseGet()`

  - Similar to `orElse()`, it retrieves value wrapped inside an `Optional` object if it is present and its argument otherwise, however, it takes its default value from a `Supplier` which is invoked and returns the value of invocation.

    ```java
    Optional<String> msgOptional = …;
    String message = msgOptional.orElseGet(() -> “Welcome!”);
    ```

- `orElseThrow()`

  - Similar to `orElse()` and `orElseGet()`, it retrieves value wrapped inside an `Optional` object if it is present and its argument otherwise. Instead of returning a default value when wrapped value is not present, it throws an exception.

    ```java
    Optional<String> messageOptional = …;
    String message = messageOptional.orElseThrow(() -> new IllegalArgumentException());
    ```

    Or

    ```java
    Optional<String> messageOptional = …;
    String message = messageOptional.orElseThrow(IllegalArgumentException::new);
    ```

- `get()`

  - Can only return value if it is present, otherwise, it returns `NoSuchElementException`.

    ```java
    Optional<String> messageOptional = …;
    String message = messageOptional.get();
    ```

    Make sure to be defensive against possible `NoSuchElementException` when using this method:

    ```java
    String message = messageOptional.isPresent() ? messageOptional.get() : “Welcome!”;
    ```

- `filter()`

  - If a value is present, and the value matches the given predicate, return an `Optional` describing the value, otherwise return an empty `Optional`.

    Example

    ```java
    Optional<String> answerOptional = Optional.of(“YES”)
        .filter(b -> b.equalsIgnorecase(“yes”));
    ```

  - If a value is present, and the value matches the given predicate, return an `Optional` describing the value, otherwise return an empty `Optional`.

    Example

    ```java
    LocalDate birthday = LocalDate.of(2000, 7, 23);
    Optional<LocalDate> legalAgeOptional1 = Optional.of(birthday)
        .filter(this::isLegalAge);
    ```

    ```java
    public boolean isLegalAge(LocalDate birthday) {
      LocalDate currentDate = LocalDate.now(); // 2019-5-24
      Period interval = Period.between(birthday, currentDate);

      return interval.getYears() > 17;
    }
    ```

    Above code will return `Optional` with a LocalDate value since filter meets the predicate.

- `map()`

  - Transforms value - if a value is present, apply the provided mapping function to it, and if the result is non-null, return an `Optional` describing the result. Otherwise return an empty `Optional`.

    Example 1

    ```java
    List<String> frameworks = Arrays.asList("Spring", “Spring Fu”, "Quarkus", "Micronaut", "Play", "Struts", "Spark", "Summer Fun");
    Optional<List<String>> listOptional = Optional.of(frameworks);
    int size = listOptional
        .map(List::size) // Lambda expression .map(list -> list.size())
        .orElse(0);
    ```

    Above code will return an integer value since mapping function is to get the size of `List`.

    Example 2

    ```java
    class Person {
      public Optional<String> getName() {
        return Optional.of("Digong");
      }
    }
    ```

    ```java
    Person person = new Person();
    Optional<Person> personOptional = Optional.of(person);
    Optional<Optional<String>> nameOptionalWrapper = personOptional.map(Person::getName);
    Optional<String> nameOptional = nameOptionalWrapper.orElse(Optional.empty());
    String name = nameOptional.orElse("");
    ```

    With `.map()`, we still need to get `Optional` that wraps another `Optional` (line 3). Then, `.orElse()`, line 4, gets the `Optional` wrapped in `Optional`. Finally, the last `.orElse()` extracts the name value.

- `flatMap()`

  - If a value is present, apply the provided `Optional`-bearing mapping function to it, return that result, otherwise return an empty `Optional`. This method is similar to `map()`, but the provided mapper is one whose result is already an `Optional`, and if invoked, `flatMap()` does not wrap it with an additional `Optional`.

    ```java
    Person person = new Person();
    Optional<Person> personOptional = Optional.of(person);
    Optional<String> nameOptional = personOptional.flatMap(Person::getName);
    // Lambda expression: personOptional.flatMap(p -> p.getName());
    String name = nameOptional.orElse("");
    ```

    `.flatMap()` already returns the `Optional` wrapped in another `Optional`. We have saved a single line.

### Stream API

- A sequence of elements supporting sequential and parallel aggregate operations.
- Collections in Java 8 are extended so you can simply create streams either by calling `Collection.stream()` or `Collection.parallelStream()`
- `Stream` operations are either **intermediate** or **terminal**
  - **Intermediate operations** return the `Stream` itself so you can chain multiple method calls in a row
    - `filter`
    - `sorted`
    - `map`
  - **Terminal operations** return a result of a certain type
    - `forEach`
    - `allMatch`
    - `findFirst`
    - `count`
    - `reduce`
    - `collect`

#### Stream - filter()

Returns a stream consisting of the elements of this stream that match the given predicate.

Example:

```java
List<String> frameworks = new ArrayList<>();
frameworks.add("Spring");
frameworks.add("Spring Fu");
frameworks.add("Quarkus");
frameworks.add("Micronaut");
frameworks.add("Play");
frameworks.add("Struts");
frameworks.add("Spark");
frameworks.add("Summer Fun");

List<String> frameworks = frameworks();
List<String> frameworksStartWithS = frameworks.stream()
        .filter(framework -> framework.startsWith("S"))
        .collect(Collectors.toList());
```

#### Stream - sorted()

Returns a stream consisting of the elements of this stream, sorted according to natural order.

Example

```java
List<String> frameworks = frameworks();
List<String> frameworksSorted = frameworks.stream()
        .sorted()
        .collect(Collectors.toList());

// reversed
List<String> frameworksReversed = frameworks.stream()
        .sorted(Collections.reverseOrder())
        .collect(Collectors.toList());
```

#### Stream - map()

Returns a stream consisting of the results of applying the given function to the elements of this stream.

Example

```java
List<String> frameworks = frameworks();
```

Lambda Expression

```java
List<String> frameworksToUpperCase = frameworks.stream()
        .map(framework -> framework.toUpperCase())
        .collect(Collectors.toList());
```

Method Reference

```java
List<String> frameworksToUpperCase = frameworks.stream()
        .map(String::toUpperCase)
        .collect(Collectors.toList());
```

#### Stream - forEach()

Returns an iterator over elements.

Example

```java
List<String> frameworks = frameworks();
```

Lambda Expression

```java
frameworks.forEach(framework -> System.out.println(framework));
```

Method Reference

```java
frameworks.forEach(System.out::println);
```

#### Stream - allMatch()

Returns whether all elements of this stream match the provided predicate.

Example

```java
List<String> frameworks = frameworks();
boolean allMatched = frameworks.stream()
        .allMatch(framework -> framework.split(" ").length > 1);
```

#### Stream - findFirst()

Returns whether all elements of this stream match the provided predicate.

Example

```java
List<String> frameworks = frameworks();
Optional<String> frameworkOptional = frameworks.stream()
        .filter(framework -> framework.contains("Fund"))
        .findFirst();
```

#### Stream - count()

Returns the count of elements in this stream.

Example

```java
List<String> frameworks = frameworks();
long countAll = frameworks.stream()
        .count();
long countStartsWithS = frameworks.stream()
        .filter(framework -> framework.startsWith("S"))
        .count();
```

#### Stream - reduce()

Performs a reduction on the elements of this stream, using an associative accumulation function, and returns an Optional describing the reduced value, if any.

Example

```java
Integer[] grades = {90, 85, 92, 98, 88, 93};
Optional<Integer> totalOptional = Stream.of(grades)
        .reduce((g1, g2) -> g1 + g2);
totalOptional.ifPresent(System.out::println);
```

#### Stream - collect()

Performs a mutable reduction operation on the elements of this stream using a Collector. A Collector encapsulates the functions used as arguments to collect(Supplier, BiConsumer, BiConsumer), allowing for reuse of collection strategies and composition of collect operations such as multiple-level grouping or partitioning.

Example 1

```java
Integer[] grades = {90, 85, 92, 98, 88, 93};
List<Integer> gradeList = Stream.of(grades)
        .filter(grade -> grade > 89)
        .collect(Collectors.toList());
```

Example 2

```java
List<User> users = Arrays.asList(
new User("John", "ADMIN"),
new User("Luke", "USER"),
new User("Matthew", "USER"),
new User("Mark", "USER"),
new User("Paul", "ADMIN"));

Map<String, User> userMap = users.stream()
        .collect(Collectors.toMap(User::getRole, user -> user));
```

### New Date and Time API

- The Date-Time APIs, introduced in JDK 8, are a set of packages that model the most important aspects of date and time
- The core classes in the java.time package use the calendar system defined in **ISO-8601** (based on the Gregorian calendar system) as the default calendar.
  - `java.time` - Classes for date, time, date and time combined, time zones, instants, duration, and clocks.
  - `java.time.chrono` - API for representing calendar systems other than ISO-8601. Several predefined chronologies are provided and you can also define your own chronology.
  - `java.time.format` - Classes for formatting and parsing dates and time.
  - `java.time.temporal` - Extended API, primarily for framework and library writers, allowing interoperations between the date and time classes, querying, and adjustment. Fields and units are defined in this package.
  - `java.time.zone` - Classes that support time zones, offsets from time zones, and time zone rules. on the Gregorian calendar system) as the default calendar.
- Old Date API
  - Existing classes aren’t thread-safe, leading to potential concurrency issues for users—not something the average developer would expect to deal with when writing date-handling code.
  - Some of the date and time classes also exhibit quite poor API design. For example, years in `java.util.Date` start at 1900, months start at 1, and days start at 0—not very intuitive.
  - These issues, and several others, have led to the popularity of third-party date and time libraries, such as Joda-Time.

The project, **Date and Time API**, has been led jointly by the author of **Joda-Time** (**Stephen Colebourne**) and Oracle, under **JSR 310**, and appears in the new Java SE 8 package `java.time`.

#### New Date and Time API - Clock

**Clock**

- A clock providing access to the current instant, date and time using a time-zone.

Example

```java
Clock clock = Clock.systemDefaultZone();
long millis = clock.millis();

Instant instant = clock.instant();
Date legacyDate = Date.from(instant);
```

#### New Date and Time API - Timezone

**ZoneId**

- A time-zone ID, such as `Asia/Manila`. A `ZoneId` is used to identify the rules used to convert between, an `Instant` and a `LocalDateTime`.

Example

```java
Set<ZoneId> availableZoneIds = ZoneId.getAvailableZoneIds();
```

```java
ZoneId zone1 = ZoneId.of("Asia/Manila");
ZoneId zone2 = ZoneId.of("Europe/Paris");
System.out.println(zone1.getRules());   // ZoneRules[currentStandardOffset=+08:00]
System.out.println(zone2.getRules());   // ZoneRules[currentStandardOffset=+01:00]
```

#### New Date and Time API - LocalTime

**LocalTime**

- A time without a time-zone in the ISO-8601 calendar system, such as `08:24:15`.

Example

```java
ZoneId zone1 = ZoneId.of("Asia/Manila");
ZoneId zone2 = ZoneId.of("Europe/Paris");
LocalTime now1 = LocalTime.now(zone1);
LocalTime now2 = LocalTime.now(zone2);

System.out.println(now1.isBefore(now2));  // false

long hoursBetween = ChronoUnit.HOURS.between(now1, now2);
long minutesBetween = ChronoUnit.MINUTES.between(now1, now2);

System.out.println(hoursBetween);       // -6
System.out.println(minutesBetween);     // -360
```

#### New Date and Time API - LocalDate

**LocalDate**

- A date without a time-zone in the ISO-8601 calendar system, such as `2019-05-24`.

Example

```java
LocalDate today = LocalDate.now();
LocalDate tomorrow = today.plus(1, ChronoUnit.DAYS);
LocalDate yesterday = tomorrow.minusDays(2);

LocalDate independenceDay = LocalDate.of(2019, Month.MAY, 24);
DayOfWeek dayOfWeek = independenceDay.getDayOfWeek();
System.out.println(dayOfWeek);    // FRIDAY
```

#### New Date and Time API - LocalDateTime

**LocalDateTime**

- A date-time without a time-zone in the ISO-8601 calendar system, such as `2019-05-24T08:24:15`.

Example

```java
LocalDateTime ldt = LocalDateTime.of(2019, Month.MAY, 24, 14, 55, 59);

DayOfWeek dayOfWeek = ldt.getDayOfWeek();
System.out.println(dayOfWeek);      // FRIDAY

Month month = ldt.getMonth();
System.out.println(month);          // MAY

long minuteOfDay = ldt.getLong(ChronoField.MINUTE_OF_DAY);
System.out.println(minuteOfDay);    // 895
```

---

# References

1. https://docs.oracle.com/javase/8/docs/technotes/guides/language/enhancements.html#javase8
2. https://www.tutorialspoint.com/java8/index.htm
3. https://winterbe.com/posts/2014/03/16/java-8-tutorial/
4. https://www.oracle.com/technetwork/articles/java/java8-optional-2175753.html
5. https://www.baeldung.com/java-optional
6. https://www.baeldung.com/java-8-streams
7. https://docs.oracle.com/javase/8/docs/technotes/guides/datetime/index.html
