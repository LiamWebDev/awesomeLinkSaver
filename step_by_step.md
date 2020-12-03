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

# final step

- move the code link awesome to this
