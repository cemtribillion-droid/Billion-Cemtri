import type { Question } from '../../types';

const BASE = {
  course_id: 'course-com211',
  course_code: 'COM 211',
  department_name: 'Computer Technology',
  academic_level: 'ND2' as const,
  semester: 'First Semester' as const,
  examination_year: '2024/2025 Practice Bank',
  session_type: 'Full-Time' as const,
  source_document: 'ND2 Practice Bank',
  verification_status: 'verified' as const,
  verified_by: 'ND2 Official Practice Bank',
  created_at: '2026-01-01T00:00:00.000Z',
};

const ARRAYS_COLL = {
  topic_id: 'topic-com211-arrays-collections',
  topic_name: 'Java Platform, Arrays & Collections',
};

const OOP_EVENTS = {
  topic_id: 'topic-com211-oop-events',
  topic_name: 'OOP Principles, Exceptions & Swing Events',
};

const MCQ_ITEMS: Array<{
  num: number;
  text: string;
  options: [string, string, string, string];
  ans: 'A' | 'B' | 'C' | 'D';
  exp: string;
  topic: typeof OOP_EVENTS;
}> = [
  { num: 1, text: 'Which keyword is used to inherit a class in Java?', options: ['implements', 'extends', 'inherits', 'super'], ans: 'B', exp: 'extends establishes class inheritance.', topic: OOP_EVENTS },
  { num: 2, text: 'Which of the following is an example of method overloading?', options: ['Defining methods with the same name but different parameter lists', 'Defining two classes with the same name', "Replacing a variable's value", 'Creating multiple objects'], ans: 'A', exp: 'Overloaded methods share a name but have different parameter lists.', topic: OOP_EVENTS },
  { num: 3, text: 'Which keyword prevents a class from being inherited?', options: ['static', 'private', 'final', 'protected'], ans: 'C', exp: 'A final class cannot be extended.', topic: OOP_EVENTS },
  { num: 4, text: 'Which concept allows a subclass to provide its own implementation of a superclass method?', options: ['Encapsulation', 'Method overriding', 'Method overloading', 'Compilation'], ans: 'B', exp: 'Overriding allows a subclass to redefine an inherited method.', topic: OOP_EVENTS },
  { num: 5, text: 'Which access modifier allows access only within the class where a member is declared?', options: ['public', 'protected', 'private', 'default'], ans: 'C', exp: 'Private members are accessible only within their declaring class.', topic: OOP_EVENTS },
  { num: 6, text: 'Which keyword refers to the current object?', options: ['super', 'this', 'current', 'self'], ans: 'B', exp: 'this refers to the current object instance.', topic: OOP_EVENTS },
  { num: 7, text: 'Which Java construct is used to handle exceptions?', options: ['if-else', 'try-catch', 'switch-case', 'for-loop'], ans: 'B', exp: 'try-catch catches and handles runtime exceptions.', topic: OOP_EVENTS },
  { num: 8, text: 'Which block executes whether an exception occurs or not?', options: ['catch', 'throw', 'finally', 'throws'], ans: 'C', exp: 'finally normally executes after the try/catch process completes.', topic: OOP_EVENTS },
  { num: 9, text: 'Which of these is an unchecked exception?', options: ['IOException', 'SQLException', 'ArithmeticException', 'FileNotFoundException'], ans: 'C', exp: 'ArithmeticException extends RuntimeException and is unchecked.', topic: OOP_EVENTS },
  { num: 10, text: 'Which keyword is used to create an interface implementation?', options: ['extends', 'implements', 'interface', 'abstract'], ans: 'B', exp: 'A class uses implements to implement an interface.', topic: OOP_EVENTS },
  { num: 11, text: 'Which collection does not allow duplicate elements?', options: ['ArrayList', 'LinkedList', 'HashSet', 'Vector'], ans: 'C', exp: 'HashSet stores unique elements only.', topic: ARRAYS_COLL },
  { num: 12, text: 'Which Java collection stores elements as key-value pairs?', options: ['ArrayList', 'HashMap', 'HashSet', 'Stack'], ans: 'B', exp: 'HashMap stores unique-key to value mappings.', topic: ARRAYS_COLL },
  { num: 13, text: 'Which method returns the number of characters in a String?', options: ['size()', 'count()', 'length()', 'getLength()'], ans: 'C', exp: 'length() returns the character count of a String.', topic: ARRAYS_COLL },
  { num: 14, text: 'Which keyword is used to declare a class-level variable shared by all instances?', options: ['final', 'static', 'public', 'transient'], ans: 'B', exp: 'Static members belong to the class rather than individual instances.', topic: ARRAYS_COLL },
  { num: 15, text: 'Which of the following is not a primitive Java data type?', options: ['int', 'boolean', 'char', 'String'], ans: 'D', exp: 'String is a reference class type, not a primitive type.', topic: ARRAYS_COLL },
  { num: 16, text: 'Which method is the entry point of a standard Java application?', options: ['start()', 'run()', 'main()', 'execute()'], ans: 'C', exp: 'main() is the standard JVM application entry point.', topic: ARRAYS_COLL },
  { num: 17, text: 'What is the main purpose of a constructor?', options: ['To destroy an object', 'To initialise an object', 'To compile a program', 'To handle exceptions'], ans: 'B', exp: 'Constructors initialise newly created objects.', topic: OOP_EVENTS },
  { num: 18, text: 'Which keyword is used to declare a class that cannot be instantiated directly?', options: ['static', 'abstract', 'final', 'private'], ans: 'B', exp: 'Abstract classes cannot be instantiated directly with new.', topic: OOP_EVENTS },
  { num: 19, text: 'Which Java feature allows the same reference variable to represent objects of different related classes?', options: ['Polymorphism', 'Compilation', 'Iteration', 'Recursion'], ans: 'A', exp: 'Polymorphism allows related subclass objects to be referenced through a common supertype.', topic: OOP_EVENTS },
  { num: 20, text: 'Which class is commonly used to read text input from the keyboard?', options: ['Scanner', 'FileWriter', 'PrintWriter', 'StringBuilder'], ans: 'A', exp: 'Scanner(System.in) reads text and primitive tokens from standard input.', topic: ARRAYS_COLL },
];

const TF_ITEMS: Array<{ num: number; text: string; ans: 'True' | 'False'; exp: string; topic: typeof OOP_EVENTS }> = [
  { num: 21, text: 'Java supports object-oriented programming.', ans: 'True', exp: 'Java is built around classes, objects, encapsulation, inheritance, and polymorphism.', topic: OOP_EVENTS },
  { num: 22, text: 'A Java class can directly extend more than one class.', ans: 'False', exp: 'False: Java supports single class inheritance only (multiple inheritance is achieved via interfaces).', topic: OOP_EVENTS },
  { num: 23, text: 'A constructor has the same name as its class.', ans: 'True', exp: 'Constructors must match their declaring class name and have no return type.', topic: OOP_EVENTS },
  { num: 24, text: 'Method overloading requires methods to have different names.', ans: 'False', exp: 'False: Overloaded methods share the same name with different parameter lists.', topic: OOP_EVENTS },
  { num: 25, text: 'Method overriding is associated with inheritance.', ans: 'True', exp: 'A subclass overrides a method inherited from its superclass.', topic: OOP_EVENTS },
  { num: 26, text: 'A private member can be accessed directly from any class in the same package.', ans: 'False', exp: 'False: Private members are accessible only inside their declaring class.', topic: OOP_EVENTS },
  { num: 27, text: 'An interface can be implemented by a Java class.', ans: 'True', exp: 'Classes implement interfaces using the implements keyword.', topic: OOP_EVENTS },
  { num: 28, text: 'The finally block is commonly used for cleanup operations.', ans: 'True', exp: 'finally closes streams, scanners, and connections reliably.', topic: OOP_EVENTS },
  { num: 29, text: 'An exception is an event that disrupts the normal flow of program execution.', ans: 'True', exp: 'Exceptions signal abnormal runtime conditions that disrupt sequential flow.', topic: OOP_EVENTS },
  { num: 30, text: 'An ArrayList can grow dynamically.', ans: 'True', exp: 'ArrayList automatically resizes its backing array as elements are added.', topic: ARRAYS_COLL },
  { num: 31, text: 'A HashSet permits duplicate elements.', ans: 'False', exp: 'False: HashSet rejects duplicate entries.', topic: ARRAYS_COLL },
  { num: 32, text: 'The static keyword can be used with methods.', ans: 'True', exp: 'Static methods can be invoked directly on the class without creating an object.', topic: ARRAYS_COLL },
  { num: 33, text: 'Java is a case-sensitive programming language.', ans: 'True', exp: 'Identifiers differing only by case (e.g., total vs Total) are distinct in Java.', topic: ARRAYS_COLL },
  { num: 34, text: 'The break statement can terminate a loop.', ans: 'True', exp: 'break exits the innermost loop or switch statement immediately.', topic: ARRAYS_COLL },
  { num: 35, text: 'The continue statement terminates the entire program.', ans: 'False', exp: 'False: continue skips the rest of the current iteration and proceeds to the next loop step.', topic: ARRAYS_COLL },
  { num: 36, text: 'A String object is immutable in Java.', ans: 'True', exp: 'Once created, a String instance\'s character sequence cannot be modified in place.', topic: ARRAYS_COLL },
  { num: 37, text: 'An abstract class can contain both abstract and concrete methods.', ans: 'True', exp: 'Abstract classes may mix abstract declarations and concrete method implementations.', topic: OOP_EVENTS },
  { num: 38, text: 'The this keyword refers to the immediate superclass.', ans: 'False', exp: 'False: this refers to the current object; super refers to the immediate superclass.', topic: OOP_EVENTS },
  { num: 39, text: 'A Java application must always contain a constructor written by the programmer.', ans: 'False', exp: 'False: If no constructor is declared, the compiler synthesises a default no-argument constructor.', topic: OOP_EVENTS },
  { num: 40, text: "Encapsulation involves restricting direct access to an object's internal data.", ans: 'True', exp: 'Encapsulation hides fields (typically private) behind controlled getter/setter methods.', topic: OOP_EVENTS },
];

const FILL_ITEMS: Array<{ num: number; text: string; ans: string; exp: string; topic: typeof OOP_EVENTS }> = [
  { num: 41, text: 'The process of creating a new class from an existing class is called __________.', ans: 'Inheritance', exp: 'Inheritance derives a subclass from an existing superclass.', topic: OOP_EVENTS },
  { num: 42, text: 'The keyword used to refer to a superclass is __________.', ans: 'super', exp: 'super accesses superclass constructors, methods, and hidden fields.', topic: OOP_EVENTS },
  { num: 43, text: 'A method with the same name but different parameter lists demonstrates __________.', ans: 'Method overloading | Overloading', exp: 'Compile-time polymorphism via method overloading varies parameter signatures.', topic: OOP_EVENTS },
  { num: 44, text: 'The process of hiding internal data and controlling access through methods is called __________.', ans: 'Encapsulation', exp: 'Encapsulation bundles data and behaviour while protecting internal state.', topic: OOP_EVENTS },
  { num: 45, text: 'The Java keyword used to generate an exception manually is __________.', ans: 'throw', exp: 'throw explicitly raises an exception instance at runtime.', topic: OOP_EVENTS },
  { num: 46, text: 'A collection that stores unique elements is called a __________.', ans: 'Set | HashSet', exp: 'The Set interface guarantees no duplicate elements.', topic: ARRAYS_COLL },
  { num: 47, text: 'The method used to compare the contents of two String objects is __________.', ans: 'equals() | equals', exp: 'equals() compares String character content rather than object references.', topic: ARRAYS_COLL },
  { num: 48, text: 'The Java keyword used to declare an interface is __________.', ans: 'interface', exp: 'interface declares an abstract contract implemented by classes.', topic: OOP_EVENTS },
  { num: 49, text: 'A special method called automatically when an object is created is a __________.', ans: 'Constructor', exp: 'Constructors run automatically upon new instantiation.', topic: OOP_EVENTS },
  { num: 50, text: 'The Java package commonly used for input and output operations is __________.', ans: 'java.io | java.io.*', exp: 'java.io provides streams, readers, writers, and File classes.', topic: ARRAYS_COLL },
];

const PRACTICAL_THEORY_ITEMS: Array<{
  num: number;
  text: string;
  solution: string;
  scheme: string[];
  topic: typeof OOP_EVENTS;
}> = [
  {
    num: 51,
    text: 'Practical — Student Management Program:\nWrite a Java program that defines a Student class with Student name, Matriculation number, and three examination scores. Accept details, calculate total and average scores, display student details/average, and display a grade based on the average.',
    solution: `import java.util.Scanner;

class Student {
    String name;
    String matricNo;
    double score1, score2, score3;

    void calculateResult() {
        double total = score1 + score2 + score3;
        double average = total / 3;

        System.out.println("Name: " + name);
        System.out.println("Matric Number: " + matricNo);
        System.out.println("Total: " + total);
        System.out.println("Average: " + average);

        if (average >= 70)
            System.out.println("Grade: A");
        else if (average >= 60)
            System.out.println("Grade: B");
        else if (average >= 50)
            System.out.println("Grade: C");
        else if (average >= 45)
            System.out.println("Grade: D");
        else
            System.out.println("Grade: F");
    }
}

public class StudentManagement {
    public static void main(String[] args) {
        Scanner input = new Scanner(System.in);
        Student student = new Student();
        System.out.print("Enter name: ");
        student.name = input.nextLine();
        System.out.print("Enter matric number: ");
        student.matricNo = input.nextLine();
        System.out.print("Enter three scores: ");
        student.score1 = input.nextDouble();
        student.score2 = input.nextDouble();
        student.score3 = input.nextDouble();
        student.calculateResult();
        input.close();
    }
}`,
    scheme: ['class Student', 'Scanner input', 'total and average', 'grade condition'],
    topic: ARRAYS_COLL,
  },
  {
    num: 52,
    text: 'Practical — Inheritance and Method Overriding:\nCreate a superclass named Employee with calculateSalary(). Create subclasses FullTimeEmployee (fixed monthly salary) and PartTimeEmployee (hours worked × hourly rate). Override calculateSalary() in both subclasses and demonstrate polymorphism through an Employee reference.',
    solution: `class Employee {
    double calculateSalary() {
        return 0;
    }
}

class FullTimeEmployee extends Employee {
    double monthlySalary;
    FullTimeEmployee(double salary) { monthlySalary = salary; }

    @Override
    double calculateSalary() {
        return monthlySalary;
    }
}

class PartTimeEmployee extends Employee {
    double hours;
    double hourlyRate;
    PartTimeEmployee(double hours, double rate) {
        this.hours = hours;
        this.hourlyRate = rate;
    }

    @Override
    double calculateSalary() {
        return hours * hourlyRate;
    }
}

public class Payroll {
    public static void main(String[] args) {
        Employee first = new FullTimeEmployee(150000);
        Employee second = new PartTimeEmployee(80, 1500);
        System.out.println(first.calculateSalary());
        System.out.println(second.calculateSalary());
    }
}`,
    scheme: ['extends Employee', '@Override calculateSalary', 'FullTimeEmployee and PartTimeEmployee', 'Employee reference polymorphism'],
    topic: OOP_EVENTS,
  },
  {
    num: 53,
    text: 'Practical — Exception Handling:\nWrite a Java program that requests two numbers from the user, divides the first by the second, handles division by zero using exception handling with an appropriate error message, and uses a finally block to display a completion message.',
    solution: `import java.util.Scanner;

public class DivisionProgram {
    public static void main(String[] args) {
        Scanner input = new Scanner(System.in);
        try {
            System.out.print("Enter first number: ");
            int first = input.nextInt();
            System.out.print("Enter second number: ");
            int second = input.nextInt();
            int result = first / second;
            System.out.println("Result: " + result);
        } catch (ArithmeticException e) {
            System.out.println("Error: Division by zero is not allowed.");
        } finally {
            System.out.println("Program execution completed.");
            input.close();
        }
    }
}`,
    scheme: ['try block division', 'catch ArithmeticException', 'error message', 'finally completion message'],
    topic: OOP_EVENTS,
  },
  {
    num: 54,
    text: 'Explain the four major principles of object-oriented programming. Give a practical example of each.',
    solution:
      '- Encapsulation: combining data and methods while restricting direct access to internal state (e.g., private balance with deposit/withdraw methods).\n- Inheritance: allowing a subclass to acquire properties and methods from a superclass (e.g., Car extends Vehicle).\n- Polymorphism: allowing a single reference type or interface to represent different object behaviours (e.g., Shape.draw()).\n- Abstraction: exposing essential functionality while hiding complex implementation details (e.g., abstract class or interface).',
    scheme: ['Encapsulation example', 'Inheritance example', 'Polymorphism example', 'Abstraction example'],
    topic: OOP_EVENTS,
  },
  {
    num: 55,
    text: 'Differentiate between method overloading and method overriding. Provide Java code examples.',
    solution:
      '- Overloading: defining multiple methods with the same name and different parameter lists within a class (compile-time resolution).\n- Overriding: redefining an inherited superclass method in a subclass with the same signature (runtime polymorphism).\nExample: int add(int a, int b) vs double add(double a, double b) for overloading; @Override void speak() in Dog extends Animal for overriding.',
    scheme: ['Overloading same name different parameters', 'Overriding subclass redefines superclass method', 'Compile-time vs runtime', 'Java code examples'],
    topic: OOP_EVENTS,
  },
  {
    num: 56,
    text: 'Explain inheritance in Java. Discuss its advantages and the different forms of inheritance that can be represented in Java.',
    solution:
      'Inheritance allows a subclass to reuse fields and methods from a superclass using extends. Advantages: code reuse, maintainability, and hierarchical modelling. Forms in Java: single, multilevel, and hierarchical class inheritance (multiple inheritance is represented via implementing multiple interfaces rather than extending multiple classes).',
    scheme: ['Code reuse and maintainability', 'Single multilevel hierarchical', 'Multiple inheritance via interfaces'],
    topic: OOP_EVENTS,
  },
  {
    num: 57,
    text: 'What is exception handling? Explain the functions of try, catch, finally, throw, and throws.',
    solution:
      'Exception handling manages runtime errors gracefully without crashing the program.\n- try: encloses code that may throw an exception.\n- catch: handles a matching exception type.\n- finally: executes cleanup code regardless of whether an exception occurred.\n- throw: explicitly throws an exception object.\n- throws: declares checked exceptions a method may propagate to its caller.',
    scheme: ['try encloses risky code', 'catch handles exception', 'finally cleanup', 'throw vs throws'],
    topic: OOP_EVENTS,
  },
  {
    num: 58,
    text: 'Differentiate between an abstract class and an interface in Java.',
    solution:
      '- Abstract class uses the abstract keyword; interface uses the interface keyword.\n- Abstract classes can hold instance fields and constructors; interfaces define contracts (and can include abstract, default, static, and private methods).\n- A class can extend only one abstract/concrete class, whereas it can implement multiple interfaces.',
    scheme: ['abstract vs interface keywords', 'Constructors and instance fields', 'Single extends vs multiple implements'],
    topic: OOP_EVENTS,
  },
  {
    num: 59,
    text: 'Explain Java collections. Discuss ArrayList, LinkedList, HashSet, and HashMap.',
    solution:
      'The Java Collections Framework provides reusable data structures and algorithms:\n- ArrayList: dynamic resizable array offering fast index-based access.\n- LinkedList: doubly linked list efficient for frequent insertions/removals at ends or iterators.\n- HashSet: hash-backed Set storing unique elements with no guaranteed order.\n- HashMap: key-value map storing unique keys mapped to values for fast lookup.',
    scheme: ['ArrayList resizable array', 'LinkedList doubly linked', 'HashSet unique elements', 'HashMap key-value pairs'],
    topic: ARRAYS_COLL,
  },
  {
    num: 60,
    text: 'Explain constructors in Java. Differentiate between default constructors, no-argument constructors, and parameterised constructors.',
    solution:
      'A constructor is a special block with the same name as its class (and no return type) invoked automatically to initialise new objects.\n- Default constructor: compiler-generated no-arg constructor inserted only when no constructors are defined.\n- No-argument constructor: explicitly written constructor taking zero parameters.\n- Parameterised constructor: accepts arguments to initialise object fields with custom values.',
    scheme: ['Object initialisation same name as class', 'Compiler-generated default constructor', 'Explicit no-argument constructor', 'Parameterised constructor'],
    topic: OOP_EVENTS,
  },
];

export const COM211_PRACTICE_QUESTIONS: Question[] = [
  ...MCQ_ITEMS.map((item) => ({
    ...BASE,
    id: `q-com211-pb-${item.num}`,
    topic_id: item.topic.topic_id,
    topic_name: item.topic.topic_name,
    question_number: String(item.num),
    question_type: 'mcq' as const,
    question_text: item.text,
    options: [
      { label: 'A' as const, text: item.options[0] },
      { label: 'B' as const, text: item.options[1] },
      { label: 'C' as const, text: item.options[2] },
      { label: 'D' as const, text: item.options[3] },
    ],
    correct_answer: item.ans,
    official_solution_excerpt: item.exp,
    marks: 1,
    difficulty: 'foundation' as const,
    source_page: 1,
  })),
  ...TF_ITEMS.map((item) => ({
    ...BASE,
    id: `q-com211-pb-${item.num}`,
    topic_id: item.topic.topic_id,
    topic_name: item.topic.topic_name,
    question_number: String(item.num),
    question_type: 'true_false' as const,
    question_text: item.text,
    options: [
      { label: 'A' as const, text: 'True' },
      { label: 'B' as const, text: 'False' },
    ],
    correct_answer: item.ans,
    official_solution_excerpt: item.exp,
    marks: 1,
    difficulty: 'foundation' as const,
    source_page: 2,
  })),
  ...FILL_ITEMS.map((item) => ({
    ...BASE,
    id: `q-com211-pb-${item.num}`,
    topic_id: item.topic.topic_id,
    topic_name: item.topic.topic_name,
    question_number: String(item.num),
    question_type: 'fill_gap' as const,
    question_text: item.text,
    correct_answer: item.ans,
    official_solution_excerpt: item.exp,
    marks: 1,
    difficulty: 'standard' as const,
    source_page: 3,
  })),
  ...PRACTICAL_THEORY_ITEMS.map((item) => ({
    ...BASE,
    id: `q-com211-pb-${item.num}`,
    topic_id: item.topic.topic_id,
    topic_name: item.topic.topic_name,
    question_number: String(item.num),
    question_type: 'theory' as const,
    question_text: item.text,
    official_solution_excerpt: item.solution,
    marking_scheme: item.scheme,
    marks: 10,
    difficulty: item.num <= 53 ? ('challenging' as const) : ('standard' as const),
    source_page: 4,
  })),
];
