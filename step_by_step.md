# step 0: Add express server and a client/server structure nice!

[branch]webpack-step-0

- create /src folder
- create client and server
- yarn init -y or add express
- create express quick app:
  - / to show index file
  - /test to return JSON
- create the client
  - views/index.html => form with name to submit and import nameChecker,formHandler and staff
- how to run ?
  - script: "start"
- README

# step 1: Welcome webpack!

[branch] webpack-step-1

- Install webpack: `npm i webpack webpack-cli`
- Config and run:
  - create a webpack.config.js file in the project root
  - Add the new build npm script to package.json: "build":"webpack"
  - fill the webpack config with
- run `npm run build` and see the error
- Configure webpack:

  - webpack needs to build a map of our application and neeeds to start "somewhere", that is the
    `entry` point.
  - so let's create an `index.js` file on our client folder with just an alert to see what happens.
  - check the script to be runned

  ```
       module.exports = {
       entry: "./src/client/index.js",
       };
  ```

  - run the script, what happens?
    - webpack created the `dist` folder and inside a `main.js` file.
    - the content of the main.js is the content of our entry file, an alert.

# step 2: Babel to the rescue!

- So now we see what `output` means: The distribution folder.
- But this is the correct output or bundle for our application?

  - The main file does not contain our js or css files.
  - our app is not connected to the distribution folder.

- Fix #1: Now we need to add a reference to the index.js file on the index.html
  `<script type="text/javascript" src="../../../dist/main.js"></script>`
- Fix #2: Make the index.js import those files, but "how require/import?" .
  - babel to the rescue, :D
    `npm i -D @babel/core @babel/preset-env babel-loader`
  - create babelrc file
  - we need to make webpack use babel (and use tools of webpack more advanced) -> Loaders

# step 3: plugin for index

- We need to serve the index.html and import the staff from the other files

What are Loaders ? - Turn one file type into another

```
Out of the box, webpack only understands JavaScript and JSON files. Loaders allow
webpack to process other types of files and convert them into valid modules that
can be consumed by your application.
```

What are Plugins? - What Loaders can't do

```
While loaders are used to transform certain types of modules, plugins can be leveraged
to perform a wider range of tasks like bundle optimization, asset management and injection of
environment variables.
```

- Also to implement basically the index.html properly we need the HtmlWebPackPlugin -> Dinamyc reference
- app.use(express.static("src/client"));
- error on my code: app.use(express.static("dist")); // was what we wanted

# final step

- move the code link awesome to this
