// src/data/courses.js
const coursesData = [
    {
      id: 'fullstack-js',
      title: 'Full Stack JavaScript',
      description: 'Learn modern JavaScript from front to back',
      modules: [
        {
          id: 'javascript-basics',
          title: 'JavaScript Basics',
          lessons: [
            {
              id: 'js-intro',
              title: 'Introduction to JavaScript',
              content: `
                <h2>Introduction to JavaScript</h2>
                <p>JavaScript is a lightweight, interpreted, or just-in-time compiled programming language with first-class functions. 
                While it is most well-known as the scripting language for Web pages, many non-browser environments also use it, such as Node.js.</p>
                
                <h3>What You'll Learn</h3>
                <ul>
                  <li>Basic JavaScript syntax</li>
                  <li>Variables and data types</li>
                  <li>Control flow</li>
                  <li>Functions</li>
                </ul>
                
                <h3>Example Code</h3>
                <pre><code>
                // This is a comment
                let message = "Hello World!";
                console.log(message);
                
                // Variables
                let number = 42;
                const PI = 3.14159;
                
                // Conditional statement
                if (number > 40) {
                  console.log("The number is greater than 40");
                }
                </code></pre>
              `
            },
            {
              id: 'variables',
              title: 'Variables and Data Types',
              content: `
                <h2>Variables and Data Types</h2>
                <p>JavaScript variables are containers for storing data values. In JavaScript, there are several ways to declare a variable.</p>
                
                <h3>Variable Declaration</h3>
                <ul>
                  <li><code>var</code> - Function scoped, legacy way to declare variables</li>
                  <li><code>let</code> - Block scoped, preferred for variables that can change</li>
                  <li><code>const</code> - Block scoped, for values that won't change</li>
                </ul>
                
                <h3>JavaScript Data Types</h3>
                <ul>
                  <li>String - Used for text</li>
                  <li>Number - Used for both integers and floating point numbers</li>
                  <li>Boolean - true or false</li>
                  <li>Object - Collections of related data</li>
                  <li>Array - Ordered lists</li>
                  <li>Null - Intentional absence of any object value</li>
                  <li>Undefined - Value of a variable that has not been assigned a value</li>
                </ul>
                
                <h3>Code Example</h3>
                <pre><code>
                // String
                let name = "John";
                
                // Number
                const age = 30;
                const score = 90.5;
                
                // Boolean
                let isActive = true;
                
                // Array
                const colors = ["red", "green", "blue"];
                
                // Object
                const person = {
                  firstName: "John",
                  lastName: "Doe",
                  age: 30
                };
                
                // Accessing object properties
                console.log(person.firstName); // "John"
                </code></pre>
              `
            }
          ]
        },
        {
          id: 'dom-manipulation',
          title: 'DOM Manipulation',
          lessons: [
            {
              id: 'dom-intro',
              title: 'Introduction to the DOM',
              content: `
                <h2>Introduction to the DOM</h2>
                <p>The Document Object Model (DOM) is a programming interface for web documents. It represents the page so that programs can change the document structure, style, and content.</p>
                
                <h3>Key Concepts</h3>
                <ul>
                  <li>The DOM represents the document as nodes and objects</li>
                  <li>JavaScript can modify the DOM to change content and styling</li>
                  <li>The DOM is tree-structured with parent and child elements</li>
                </ul>
                
                <h3>DOM Tree Example</h3>
                <pre><code>
                // HTML example
                /*
                &lt;html&gt;
                  &lt;head&gt;
                    &lt;title&gt;My Title&lt;/title&gt;
                  &lt;/head&gt;
                  &lt;body&gt;
                    &lt;h1&gt;A Heading&lt;/h1&gt;
                    &lt;a href="#"&gt;Link&lt;/a&gt;
                  &lt;/body&gt;
                &lt;/html&gt;
                */
                </code></pre>
                
                <h3>Basic DOM Methods</h3>
                <pre><code>
                // Getting elements
                const heading = document.getElementById('main-heading');
                const paragraphs = document.getElementsByTagName('p');
                const buttons = document.getElementsByClassName('btn');
                
                // Modern selectors - preferred
                const container = document.querySelector('.container');
                const items = document.querySelectorAll('.item');
                
                // Modifying content
                heading.textContent = 'New Heading';
                paragraph.innerHTML = '&lt;strong&gt;Bold text&lt;/strong&gt;';
                </code></pre>
              `
            },
            {
              id: 'event-handling',
              title: 'Event Handling',
              content: `
                <h2>Event Handling</h2>
                <p>JavaScript allows you to execute code when events are detected. An event could be something like a button click, page load, or form submission.</p>
                
                <h3>Common Events</h3>
                <ul>
                  <li><code>click</code> - When an element is clicked</li>
                  <li><code>submit</code> - When a form is submitted</li>
                  <li><code>load</code> - When a page or image finishes loading</li>
                  <li><code>keydown</code>, <code>keyup</code> - When keyboard keys are pressed or released</li>
                  <li><code>mouseover</code>, <code>mouseout</code> - When the mouse enters or leaves an element</li>
                </ul>
                
                <h3>Adding Event Listeners</h3>
                <pre><code>
                // Method 1: Using addEventListener
                const button = document.querySelector('#myButton');
                
                button.addEventListener('click', function(event) {
                  console.log('Button was clicked!');
                  console.log(event); // The event object contains useful information
                });
                
                // Method 2: Using onclick property
                button.onclick = function() {
                  console.log('Button was clicked!');
                };
                
                // Example of form submission
                const form = document.querySelector('#myForm');
                
                form.addEventListener('submit', function(event) {
                  event.preventDefault(); // Prevents the form from submitting normally
                  console.log('Form submitted!');
                  
                  // Get form data
                  const input = document.querySelector('#myInput');
                  console.log('Input value:', input.value);
                });
                </code></pre>
              `
            }
          ]
        }
      ]
    }
  ];
  
  export default coursesData;