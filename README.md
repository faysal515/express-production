This is my version of building a production ready express application. Internet is already spoiled with so many production-ready boilerplates. They're using cool and hard-to-understand design patterns. My approach is to write easy to understand and easy to maintain code. A properly written documentation is on progress. Hope this helps


## Comments

My expectation is that people starting with web developing or have spent 1-2 years would be looking for boilerplate type resources.

There are few packages I've used to improve my dev experience. Its not mandatory but super helpful


### module-alias

I like to import/require files from root source path. for example my folder is

```
├── app.js
├── logger.js
├── controllers
│   ├── c.js
├── models
│   ├── m.js
```

if I want to require `c.js` file within `m.js`, my require path would be `@src/controllers/c` instead of `../controllers/c`. It really helps me at the time of working.

To achieve this, I have used **`module-alias`** package and I need to do some configuration in few files. Its a bit of additional work, but its worth the effort.

`.vscode` and `jsconfig.json` file is created to enhance my developing experience. It has nothing to do with application code. They are for pathmapping and intellisense of alias paths

**Jest** cannot automatically understand these paths, thus need to define this in `jest.config.js`. see `moduleNameMapper` within the config file



### Nodemon
Useful to restart project on file change

### Logging
One of the important thing we overlook starting a project is logging. New or junior developers have the tendancy to use `console.log` which is not going to help in production. We need to write logs in the file system so that it can be accesible and searchable. I've used **`winston`** logging library with custom formatting. My preferred logging format is

`timestamp [function name] logging level: message - stringified arguments`

Adding function name/label in the logs helps me search quickly in log files.
