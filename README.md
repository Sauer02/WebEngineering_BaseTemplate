# Web Engineering Coding Playground Template

This repository is designed as the foundation for coding playgrounds in the Web Engineering course. It offers a structured space for experimenting with and mastering various web development technologies and practices.
The project is based on [this](https://developer.mozilla.org/en-US/docs/Learn/Accessibility/Accessibility_troubleshooting) repository from MDN.

The project introduces a lot of code smells for you to tackle.
**Lets get coding!**

## Submission Details and Deadlines

- Coding playgrounds are **individual** work
- There will be 2 serparate submissions:
  - [Base Playgrounds](#base-coding-playgrounds): Submission Deadline **03.11.2024**
  - [Extended Playgrounds](#extended-coding-playgrounds): Submission Deadline **16.01.2025**
- The playgrounds will be guided through in our sessions - still there will be distance work!
- Use this base template to create your project repository.
- Each playground is linked in the corresponding course section.
- You can find the submissions at the bottom of the Moodle course.

## Features

- Wonderful UI-design :heart_eyes:
- Loads bear data using [Wikipedia API](https://www.mediawiki.org/wiki/API:Main_page) :bear:
  - Original Wikipedia Page can be found [here](https://en.wikipedia.org/wiki/List_of_ursids)
- Worst JS coding practices :cold_sweat:
- No Build and Dependency Management at all :fire:

# Base Coding Playgrounds

## K.O. Criteria

- No JS Frameworks allowed to solve the base coding playgrounds (e.g. Vue.js, Angular, React, Svelte,...) - don't panic we will come to them!
- No CSS Libraries allowed (e.g. Bootstrap, Material, Tailwind, ...)

## Submission

Submit your coding repository link in Moodle. Send me an invitation to your repository if it is set to private:

> GitHub: leonardo1710
>
> GitLab: leon.freudenthaler@fh-campuswien.ac.at

## 1. JS Playground (10 Pts.)

The provided base project template contains some bugs and bad JS coding practices for you to fix in your first playground. Take a look into the component files and get a grasp of the inner workings of the provided project.

> **ATTENTION: After finishing the JS Playground please create a commit or branch and link it below. Otherwise it is not possible to grade your 1. submission, since we will switch to TypeScript afterwards!**
>
> **This is my JS Playground commit/branch:** f/pg1

**Tasks:**
Fix application code and answer the questions:

- (2) Adapt the code to use `async/await` instead of the `then()`-callback hell and refactor the functions to use arrow function syntax instead of `function()`-syntax.
- (2) Add proper error handling to the code using `try/catch` and provide useful error messages to the users. Additionally, check the image URL availability before rendering the images in HTML. Provide placeholder images if the given URL does not exist.
- (1) Extract the range value from the provided Wikitext (response from the API). Examine the provided Wikitext format inside `extractBears` function.
- (1) Split the code into separate modules with regards to clean separation of concerns.
- (1) Eliminate all other bad coding practices you can find.
- (3) Answer the following questions and provide some examples inside the `Readme.md` file.

> **What bad coding practices did you find? Why is it a bad practice and how did you fix it?**

I found:

1. **Callback Hell (Use of .then() Chains)**

**Bad Practice:** The code used multiple .then() chains for handling asynchronous operations, leading to deeply nested and harder-to-read code.<br>
**Why It's Bad:** Callback chains can quickly become unreadable, leading to a phenomenon called "callback hell". It makes debugging and maintaining the code more difficult.<br>
**Fix:** Refactored the code to use async/await, which makes asynchronous code look more like synchronous code and easier to understand.

```JS
// Bad (Callback Hell)
fetch(url)
  .then(res => res.json())
  .then(data => {
    // ...
  });

// Good (Using async/await)
const fetchData = async () => {
  const res = await fetch(url);
  const data = await res.json();
  // ...
};
```

2. **Lack of Error Handling**

   **Bad Practice:** The original code did not have any error handling for failed requests or missing image URLs.<br>
   **Why It's Bad:** Not handling errors can cause your application to crash or display broken UI elements when something goes wrong (e.g., network failure, incorrect URL, etc.).<br>
   **Fix:** Wrapped asynchronous code in try/catch blocks to handle errors gracefully. A placeholder image is displayed if an image cannot be fetched.

```JS
// Bad (No error handling)
fetchImageUrl(fileName).then(imageUrl => {
  // Use the imageUrl...
});

// Good (Error handling with try/catch)
const fetchImageUrl = async (fileName) => {
  try {
    const res = await fetch(url);
    const data = await res.json();
    // Return the image URL
  } catch (error) {
    console.error('Failed to fetch image', error);
    return 'media/noBearFound.jpg';
  }
};
```

3. **No Separation of Concerns**

   **Bad Practice:** Different functionalities (fetching data, DOM manipulation, etc.) were all mixed together in the same file.<br>
   **Why It's Bad:** Mixing concerns makes the code harder to maintain and debug, as different responsibilities are tangled together.<br>
   **Fix:** Split the code into separate modules, each handling a single responsibility (e.g., one for fetching data, one for DOM manipulation).

```JS
/*
  No real code here, just splitted the one big file into smaller files,
  with always one responsibility.
  Then needed to import those in the correct order in the index.html
*/
```

4. **Hardcoded Text and Inconsistent Variable Naming**

   **Bad Practice:** Hardcoded text like 'Show comments' and inconsistent variable names (e.g., var instead of const/let).<br>
   **Why It's Bad:** Hardcoding text values and using inconsistent variable naming leads to poor readability and makes localization or future changes harder.<br>
   **Fix:** Replaced hardcoded values with constants and used let/const for consistent variable declaration.

```JS
// Bad (Hardcoded Text)
if (showHideText == 'Show comments') {
  showHideBtn.textContent = 'Hide comments';

// Good (Using constants)
const SHOW_COMMENTS = 'Show comments';
const HIDE_COMMENTS = 'Hide comments';
if (showHideText === SHOW_COMMENTS) {
  showHideBtn.textContent = HIDE_COMMENTS;
}
```

5. **Redundant Code**
   **Bad Practice:** Repeating DOM manipulation code when creating elements (e.g., for adding new comments).<br>
   **Why It's Bad:** Repetitive code reduces maintainability and increases the chance for errors.<br>
   **Fix:** Encapsulated repetitive code into reusable functions to reduce redundancy.

```JS
/*
  I just wanted to mention redundant code here, but I actually didnt change it
  because in my opinion, for this it would introduce more complexity to write the
  helper function (because its only 2 lines).
*/

// Bad (Redundant code for adding comments)
var namePara = document.createElement('p');
namePara.textContent = nameValue;
listItem.appendChild(namePara);

// Good (Encapsulated in a function)
const createParagraph = (text) => {
  const p = document.createElement('p');
  p.textContent = text;
  return p;
};
listItem.appendChild(createParagraph(nameValue));
```

## 2. Dependency- and Build Management Playground (10 Pts.)

Build the application with `npm` and a build and a dependency management tool of your choice (e.g. [Vite](https://vitejs.dev/), [Webpack](https://webpack.js.org/), or others).

Here are some additional resources: [Package Management and Bundling](https://github.com/leonardo1710/WebEngineeringSDE/wiki/2-Package-Management,-Build-Management-and-Modules), [Vite Tutorial](https://github.com/leonardo1710/WebEngineeringSDE/wiki/2.1-Vite-Web-Application-Setup), [Webpack Tutorial](https://github.com/leonardo1710/WebEngineeringSDE/wiki/2.2-Webpack-Web-Application-Setup).

**Tasks:**

- (1) Integrate `npm` and a build management tool into your project.
- (2) Configure your project to use Typescript as your primary development language and adapt the code and file extensions respectively.
- (2) Use ESLint and Prettier inside your project - rulesets can be found below.
- (1) Keep your builds clear and add dependencies to the right build (e.g. do not add dev dependencies inside the production build and vice versa).
- (1) Define the following tasks within `npm scripts`:
  - `dev`: starts the development server
  - `build`: runs the typescript compiler and bundles your application - bundling depends on your chosen build tool (e.g. Vite, Webpack) but typically bundles multiple files into one, applies optimizations like minification and obfuscation and outputs final results to a `dist` or `build` directory.
  - `lint`: runs ESLint on all `.js` and `.ts` files in your projects `/src` directory
  - `lint:fix`: runs and also fixes all issues found by ESLint
  - `format`: formats all `.js` and `.ts` files in your projects `/src` directory
  - `format:check`: checks if the files in the `/src` directory are formatted according to Prettier's rules.
- (1) Configure a pre-commit hook that lints and formats your code using [husky](https://typicode.github.io/husky/) and [lint-staged](https://github.com/lint-staged/lint-staged). A tutorial can be found [here](https://dev.to/shashwatnautiyal/complete-guide-to-eslint-prettier-husky-and-lint-staged-fh9).
- (2) Answer the question at the end of this section inside `Readme.md` file:

**ESLint Configurations**

Use ESLint configs [standard-with-typescript](https://www.npmjs.com/package/eslint-config-standard-with-typescript) and [TypeScript ESLint Plugin](https://www.npmjs.com/package/@typescript-eslint/eslint-plugin).
Your `.eslintrc` file should have the following extensions:

```.eslintrc.yml
...
extends:
  - standard-with-typescript
  - plugin:@typescript-eslint/recommended
  - plugin:prettier/recommended
  - prettier
...
```

**Prettier Configurations**

Apply the following ruleset for Prettier:

```.prettierrc
{
  "semi": true,
  "singleQuote": true,
  "trailingComma": "es5",
  "tabWidth": 2,
  "printWidth": 80
}
```

> **What improvements in your codebase were introduced by using TS instead of JS? Name at least 3 and explain why.**

My findings:

1. **Static Type Checking**

**Improvement:** TypeScript enforces type declarations, allowing developers to specify the types of variables, parameters, and return values.<br>
**Why:** This helps catch type-related errors at compile time rather than runtime. In large codebases, type mismatches are common sources of bugs, and TypeScript prevents them early. For example, trying to assign a string to a number-typed variable will be caught immediately in TypeScript.<br>

```JS
// Bad (JavaScript)
const fetchImageUrl = (fileName) => {};

// Good (TypeScript - with type checking)
const fetchImageUrl = (fileName: string): Promise<string> => {};
```

2. **Union and Intersection Types**

**Improvement:** TypeScript allows defining union types (e.g., a value can be one of several types) and intersection types (combining multiple types). This adds flexibility while maintaining strong type safety.<br>
**Why:** Union types are helpful when dealing with functions that can accept multiple types of inputs, while intersection types are great for combining multiple types into one structure, allowing for more expressive and reusable code.<br>

```JS
// Union Type: can accept string or number
const params: Record<string, string | number> = {
  action: 'parse',
  page: 'title',
  prop: 'wikitext',
  section: 3,
  format: 'json',
  origin: '*',
};


// Intersection Type: combines Bear and Animal into one
interface Bear {
  name: string;
  binomial: string;
  image: string;
  range: string;
}

interface Animal {
  legs: number;
}
const bear1: Bear & Animal = { name: 'Panda', binomial: 'Ailuropoda melanoleuca', image: 'panda.jpg', range: 'China', legs: 4 };
```

3. **Enhanced Refactoring and Code Maintenance**

**Improvement:** TypeScript's static typing provides safety when refactoring code. It ensures that when a change is made, all parts of the codebase that are affected by that change are automatically flagged for review.<br>
**Why:** Refactoring becomes less risky because TypeScript will throw errors if a function or variable is being used incorrectly after changes. This means developers can confidently update and scale their applications without introducing hidden bugs.<br>

```JS
// Renaming or changing this interface will flag any usage across the codebase
interface Bear {
  name: string;
  binomial: string;
  image: string;
  range: string;
  // Adding a new field here will automatically highlight the need for its usage elsewhere
  habitat: string;
}
```

There would be also others like `Non-nullable Types` or `Module System Support`, ...

## 3. CI/CD Pipeline Playground (5 Pts.)

Implementation of a CI/CD pipeline to automate the development and deployment process – write automated tests.

Here are some additional resources: [GitHub Actions Tutorial](https://github.com/leonardo1710/WebEngineeringSDE/wiki/3.2-CI-CD-Pipeline-with-Github-Pages-and-Github-Actions) and [GitHub Actions Docs](https://docs.github.com/en/actions).

**Tasks:**

- (1.5) Write at least 2 meaningful unit tests (use [Vitest](https://vitest.dev/) or [Jest](https://jestjs.io/)) for your project and configure the following tasks in `npm scripts`:
  - `test`: runs all files that include `.test.` or `.spec.`, e.g.: `example.test.ts`
  - `test:coverage`: runs tests like `test` but also creates a test coverage report
- (1) Configure **2 Workflows** in GitHub Actions, one for development and one for deployment:
  - Create a `development` branch inside your repository
  - (1) Development Workflow should at least test and lint your code when developers push to branch `development`
  - (1) Deployment Workflow is triggered when developers push into `main` branch. It should at least test, lint and build your source code. Afterwards the build artifacts of your application should be automatically deployed to Github Pages (or another hosting provider of your choice).
- (0.5) Reuse existing workflows or jobs whenever possible!

## 4. Accessibility Playground (5 Pts.)

You might have noticed that the base project has a number of accessibility issues - your task is to explore the existing site and fix them.
Use the tools presented in our accessibility workshop to test the accessibility in your project.

**(0.5) Color**

Test the current color contrast (text/background), report the results of the test, and then fix them by changing the assigned colors.

_Present your reports here._

**(0.5) Semantic HTML**

Report on what happens when you try to navigate the page using a screen reader. Fix those navigation issues.

_Present your reports here._

**(0.5) Audio**

The `<audio>` player isn't accessible to hearing impaired (deaf) people — can you add some kind of accessible alternative for these users?

_Present your findings and fixes here._

**(1) Forms**

- The `<input>` element in the search form at the top could do with a label, but we don't want to add a visible text label that would potentially spoil the design and isn't really needed by sighted users. Fix this issue by adding a label that is only accessible to screen readers.
- The two `<input>` elements in the comment form have visible text labels, but they are not unambiguously associated with their labels — how do you achieve this? Note that you'll need to update some of the CSS rule as well.

_Present your findings and fixes here._

**(0.5) Comment section**

The show/hide comment control button is not currently keyboard-accessible. Can you make it keyboard accessible, both in terms of focusing it using the tab key, and activating it using the return key?

_Present your findings and fixes here._

**(1) The table**

The data table is not currently very accessible — it is hard for screen reader users to associate data rows and columns together, and the table also has no kind of summary to make it clear what it shows. Can you add some features to your HTML to fix this problem?

_Present your findings and fixes here._

**(1) More Findings**

What other accessibility issues did you find? Explain how you did fix them.

# Extended Coding Playgrounds

Please create a new independent Repository for these playgrounds and submit a link to it in the Moodle submission.
Additionally, provide a description of how to start your frontend and backend services inside the `README.md`.

## Submission

Submit your coding repository link in Moodle. Send me an invitation to your repository if it is set to private:

> GitHub: leonardo1710
>
> GitLab: leon.freudenthaler@fh-campuswien.ac.at

## 5. Migrate to a Frontend Framework (10 pts.)

In this playground you will migrate your application to a frontend framework of your choice.

**Tasks**:

- Migrate your application to a frontend framework of your choice (e.g. React, Angular, Vue.js, Svelte,...)
  - All previous features should still work
  - The application still should use build and dependency management
- Adapt your `npm scripts` if necessary

## 6. Integrate a Backend Framework (10 pts.)

In this playground you will use a backend framework of your choice and connect it with an API to your frontend application.

**Tasks**:

- (3) Setup a backend framework of your choice
- (2) Create an API your frontend will be connected to (REST, GraphQL, gRPC, you choose...)
- (2) Your backend should now request the bear data from presented Wikipedia API
- (3) Replace the frontend Wikipedia API calls with calls to your backend - the functionality of your frontend should work as before!
- (Optional): you may want to introduce some sort of caching layer for Wikipedia API requests

## 7. Containerize your application (10 pts.)

Dockerize your frontend and backend applications. It should be possible to start all services in the corresponding mode (development, production) with a single command (e.g. use Docker Compose for this).

**Tasks**:

- (6) Create **multi-stage Dockerfiles** for your applications (depending on your frameworks):
  - The frontend Dockerfile should: 1. run the app in a development environment 2. build the app 3. serve build artefacts over Nginx
  - The backend Dockerfile should: 1. run the app in a development environment 2. build the app if there is a build step in your framework (optional) 3. serve the app
- (4) Create two docker-compose files to orchestrate you applications in `development` and `production` mode:
  - Define ports and dependencies
  - Define corresponding stage (development, production)
  - Use environment variables if possible
- Your application should start with the following commands:
  - Development: `docker-compose -f docker-compose.yml up --build`
  - Production: `docker-compose -f docker-compose.prod.yml up --build`
