---
title: "Java 8 New Language Features"
excerpt: "This post discusses the new features introduced to Java 8 language."
date: "2019-07-06"
image:
  cover: ""
  og: ""
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

#### Syntax</h4>

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

To be continued...
