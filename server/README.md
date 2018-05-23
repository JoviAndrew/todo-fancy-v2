# todo-fancy-v2

Todo Fancy with Vue Cli

This project is created using `nodejs`, `vue` as the client framework and `express` for the server.

This app uses `weather-js` to tell the users about the current weather, so they could plan the most appropriate action to take to finish the task now or later.

URL to the deployed project: https://todo.jovianandrewhari.cf/#/

### Dependencies

#### Server

    bcryptjs
    cors
    dotenv
    express
    jsonwebtoken
    mongoose
    morgan
    weather-js

### Client

    axios
    sweetalert
    vue
    vue-router
    vuex

The Client uses `vue-cli`. To run the project, first you must type in `npm run serve` in your respective terminal.

## End Point

#### Index
| Action | Path | Description |
|---------|:-----:|:----------:|
|POST|/index/login|Login User|
|POST|/index/register|Register User|
|POST|/index/loginfb|For Users who uses Facebook Login|

#### Todo
| Action | Path | Description |
|---------|:-----:|:----------:|
|POST|/todo/add|Add new task|
|GET|/todo/show|Show all tasks|
|GET|/show/:status|Show tasks by their status|
|PUT|/update/:id|Update task|
|DELETE|/delete/:id|Delete task|
|PUT|/finish/:id|Finish task|

#### User
| Action | Path | Description |
|---------|:-----:|:----------:|
|GET|/show-user|Get user|
|PUT|/update-user|Update user data|

#### Weather
| Action | Path | Description |
|---------|:-----:|:----------:|
|GET|/show-weather|Get weather data|