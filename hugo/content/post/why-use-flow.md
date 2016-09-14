---
date: 2016-09-13T09:19:22-04:00
description: "An introduction to and explanation of the benefits of static typing in JavaScript"
draft: false
slug: why-use-flow
tags:
  - "flow"
title: Why Use Flow?
---

[Flow](https://flowtype.org) is a static type checker for JavaScript open sourced by Facebook. It
helps you deal with many of the pain points of JavaScript and write better, easier to reason about
code.

<!--more-->

Their own homepage says:

> Flow can catch common bugs in JavaScript programs before they run, including
>
* silent type conversions,
* null dereferences,
* and the dreaded undefined is not a function.

and

> Flow also lets you gradually add type assertions to your code

So flow is a solution to many common JavaScript problems that you can gradually introduce into your
codebase. Pretty cool!

## Types

Before we even address flow, however, we must first clarify what types are, and the different
variations of types.

> A type is a classification identifying one of various types of data, such as real, integer or Boolean,
that determines the possible values for that type, the operations that can be done on values of that
type, the meaning of the data, and the way values of that type can be stored.<sup>[1]</sup>

[1]: https://en.wikipedia.org/wiki/Data_type

As for the variations in types it falls into two categories.

### Strong typing vs. Weak typing

[Wikipedia has a great article on this.](https://en.wikipedia.org/wiki/Strong_and_weak_typing) The
general consensus being that strong vs. weak is a bit ambiguous because there is no agreed upon
definition. I'm going to go with the definition on the wikipedia page titled

> Implicit type conversions and "type punning"

---

In a strongly typed language such as python, a variable cannot change its type after it has first
been declared unless you explicitly cast it to another type temporarily, or it is redeclared later.

```python
x = 5
print x + "" # cannot add integers to strings
```

throws the following error

```python
TypeError: unsupported operand type(s) for +: 'int' and 'str'
```

but this is fine

```python
x = 5
x = ""
print x + "" # redeclared x so it's fine
```

and so is this

```python
x = 5
print str(x) + "" # casted x to a string so it's fine
```

---

In a weakly typed language such as JavaScript, anything goes because variables are all implicitly
casted when they're used. You can add strings to Objects, Arrays to Objects, numbers to null, and
more; even worse, none of it throws an error if it's an accident.

```js
console.log({} + {}) // NaN
console.log({} + []) // 0
console.log([] + []) // ''
console.log({} + 2) // 2
console.log({} + 'hello') // NaN
```

You can see how if you make a mistake and end up passing incorrect parameters to function
that causes it to return an unexpected value, `NaN` for example, it can begin to propagate itself
throughout your codebase, causing problems that are hard to find because there are no errors.

### Static typing vs. Dynamic typing

Static vs Dynamic typing is a bit more controversial than Weak vs. Strong. I'm not going to be
saying one is better than another or giving a comprehensive breakdown of the benefits of each; instead,
I'll just be giving a brief introduction of both. If you want to see a bit more debate which is better,
the following are great discussions

* [Is type safety worth the trade-offs?](http://programmers.stackexchange.com/questions/59606/is-type-safety-worth-the-trade-offs)
* [What is the supposed productivity gain of dynamic typing?](http://programmers.stackexchange.com/questions/122205/what-is-the-supposed-productivity-gain-of-dynamic-typing)

Now given that disclaimer:

In a statically typed language, you explicitly write out the types of your variables. Most people
have seen Java, a strongly, statically typed language, where you write the types of your variables
out such as `int x`, and the return type and parameter types of your functions such as
`int add(int a, int b)`:

```java
public class Hello {
  public static void main(String[] args) {
    int x = 5;
    int y = 10;
    String s = "1.23131";

    System.out.println(add(x, y)); // 15
    System.out.println(add(x, s)); // Incompatible types: String cannot be converted to int
  }

  public static int add(int a, int b) {
    return a + b;
  }
}
```

This code will throw an error at line 8 when you compile your code because you cannot add
a `String` type to an `int` type.

Note that:

* The error is caught at compile-time instead of at run-time, which means you can't even run the
code until you fix the errors.
* If you're using an IDE, you'd get a message saying that `add(x, s)` isn't possible.
Because you specified your types in advance, your code can be analyzed at a higher level without
compiling to find mistakes.
* If the function was instead called `sfjkasjf` instead of `add`, you'd still know that it takes in
two integers and returns an integer, which is useful information.

---

In a dynamically typed language, you don't have to write out your types at all. The main benefit
being that your code looks less cluttered, and you don't have to think about types before starting to
program, which is a productivity boost. In python, a strongly, dynamically typed language, the
equivalent code would look like:

```python
def main():
  x = 5
  y = 10
  s = "1.23131"

  print add(x, y) # 15
  print add(x, s) # TypeError: unsupported operand type(s) for +: 'int' and 'str'

def add(a, b):
  return a + b
```

This code will throw an error at line 7 when you run your code because you cannot add
a `string` type to an `int` type.

Note that

* The code is more concise
* You can't really tell what the type of `a` and `b` are. `int`, `string`, `float`, `etc.` are all
possibilities.
* It still throws an error when you run it, albeit at run-time rather than compile-time, which is
a big distinction. This means testing is more crucial for dynamically typed languages because they
will run just fine even if the code contains type errors.

---

To be fair about the conciseness, Java isn't the most terse language. Here's the same code
written in some obligatory Haskell. I mean if I'm talking about types and don't write some Haskell,
did I really talk about types?

**Haskell**

```haskell
main :: IO()
main = do
  let x = 1
  let y = 2
  let s = ""

  print (add x y)
  print (add x s)

add :: Int -> Int -> Int
add = (+)
```

## Bringing it back to JavaScript and Flow

Now that we know more about types, we can get back to the matter at hand, which is making it harder
to make mistakes in your JavaScript code.

JavaScript is both weakly and dynamically typed, which is a flexible but extremely error prone
combination as you can see in following example and countless others that criticize these qualities
of the language.

* [wat](https://www.destroyallsoftware.com/talks/wat)

The solution to all these problems is flow, which through static typing, addresses a lot of the pain
points of the language like the one above.

This isn't a tutorial, so if you want to follow along you can check out
[the getting started guide for flow.](https://flowtype.org/docs/getting-started.html)

Lets go ahead and return to our very first JS example in the weak typing section, but this time with
flow checking our code:

```js
// @flow
// ^^^^^ that's necessary to activate flow
// flow is opt-in to allow you to gradually add types

console.log({} + {}) // NaN
console.log({} + []) // 0
console.log([] + []) // ''
console.log({} + 2) // 2
console.log({} + 'hello') // NaN
```

Immediately every single line becomes a type error similar to the one below.

```js
index.js:3
  3: console.log({} + {}) // NaN
                 ^^ object literal. This type cannot be added to
  3: console.log({} + {}) // NaN
                 ^^^^^^^ string
```

Without doing any extra work to add type annotations, flow already indicates that there's something
incorrect going on. The `wat` video doesn't really apply anymore.

### Benefits of annotating your code

While flow will help catch errors like the one above, to truly start benefiting from it, you'll
have to write your own type annotations, meaning you use either flow's built in types such as
`number`, `string`, `null`, `boolean`, `etc.` to specify the types of your variables or you create
some type aliases of your own such as

```js
type Person = {
  age: number,
  name: string,
  gender: 'male' | 'female'
}
```

When you begin to do this, flow learns more about your code base and gets better at telling you what
mistakes you've made.

## Examples

**Catches Incorrect Number of Parameters Passed to Function**

Code:

```js
// @flow

function xyz(x: number, y: number, z: number): number {
  return x + y + z
}

xyz(1, 2)
```

Error:

```js
index.js:7
  7: xyz(1, 2)
     ^^^^^^^^^ function call
  7: xyz(1, 2)
     ^^^^^^^^^ undefined (too few arguments, expected default/rest parameters). This type is incompatible with
  3: function xyz(x: number, y: number, z: number): number {
                                           ^^^^^^ number
```

**Catches Incorrect Parameter Types**

Code:

```js
// @flow

function xyz(x: number, y: number, z: number): number {
  return x + y + z
}

xyz(1, 2, '')
```

Error:

```js
index.js:7
  7: xyz(1, 2, '')
     ^^^^^^^^^^^^^ function call
  7: xyz(1, 2, '')
               ^^ string. This type is incompatible with
  3: function xyz(x: number, y: number, z: number): number {
                                           ^^^^^^ number
```

**Makes Sure You Don't Forget to Check for NULL**

Code:

```js
// @flow

function xyz(x: number, y: number, z: number): ?number {
  return Math.random() < 0.5 ? x + y + z : null
}

function printNumber(x: number): void {
  console.log(x)
}

printNumber(xyz(1, 2, 3))
```

Error:

```js
index.js:11
 11: printNumber(xyz(1, 2, 3))
     ^^^^^^^^^^^^^^^^^^^^^^^^^ function call
 11: printNumber(xyz(1, 2, 3))
                 ^^^^^^^^^^^^ null. This type is incompatible with
  7: function printNumber(x: number): void {
                             ^^^^^^ number
```

**Makes Sure You Return The Right Types**

Code:

```js
// @flow

function xyz(x: number, y: number, z: number): number {
  return Math.random() < 0.5
    ? x + y + z
    : null
}
```

Error:

```js
index.js:6
  6:     : null
           ^^^^ null. This type is incompatible with the expected return type of
  3: function xyz(x: number, y: number, z: number): number {
                                                    ^^^^^^ number
```

**Make Sure Your Objects Contain All the Properties They're Supposed to Contain**

Code:

```js
// @flow

type Person = {
  age: number,
  name: string,
  gender: 'male' | 'female'
}

const person: Person = { name: 'joe', age: 10 }
```

Error:

```js
index.js:9
  9: const person: Person = { name: 'joe', age: 10 }
                   ^^^^^^ property `gender`. Property not found in
  9: const person: Person = { name: 'joe', age: 10 }
                            ^^^^^^^^^^^^^^^^^^^^^^^^ object literal
```

**Make Sure You Don't Access Nonexistent Object Properties**

Code:

```js
// @flow

type Person = {
  age: number,
  name: string,
  gender: 'male' | 'female'
}

const person: Person = { name: 'joe', age: 10, gender: 'male' }
console.log(person.job)

```

Error:

```js
index.js:9
  9: console.log(person.job)
                        ^^^ property `job`. Property not found in
  9: console.log(person.job)
                 ^^^^^^ object type
```

## Going Deeper

These are some of the most common benefits, which you might be used to from other statically typed
languages. There's a few more, but listing them all would be a bit excessive. If you're thinking,
"that's it?", the rabbit hole goes much much deeper.d

[Giulio Canti](https://github.com/gcanti) has written quite a few articles on the more advanced
things that you can do with flow that gives it a level of expressiveness that allows you to do be
certain of much more than just variable types, parameter types, and return types.

* You can use types to check if code has been validated in [Phantom Types with Flow](https://medium.com/@gcanti/phantom-types-with-flow-828aff73232b#.su86baahz)
* You can create types with built in constraints in [Refinement Types with Flow](https://medium.com/@gcanti/refinements-with-flow-9c7eeae8478b#.e2ik0oqgs)
* You can create higher kinded types in [Higher Kinded Types with Flow](https://medium.com/@gcanti/higher-kinded-types-in-flow-275b657992b7#.1oa0j4u1a)
* You can express the side effects of your code as types in [The Eff Monad Implemented in Flow](https://medium.com/@gcanti/the-eff-monad-implemented-in-flow-40803670c3eb#.i067byfnq)

He also has authored [flow-static-land,](https://github.com/gcanti/flow-static-land) which is pretty mind blowing.

## Conclusion

TL;DR: Flow, which adds static types in JavaScript, makes your code easier to understand, reason
about, and prevents common mistakes. All of this with little upfront cost, and the ability to opt-in
slowly.
