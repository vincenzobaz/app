# Reminisce.me

[![Codacy Badge](https://api.codacy.com/project/badge/grade/dd447f353c054650bbaf3060ca1cd9d4)](https://www.codacy.com/app/reminisceme/app)

## Installation

1. Install Node.js and NPM.

  See the [official documentation](https://nodejs.org/).

2. Install [Meteor 1.4](https://www.meteor.com/install)

  ```bash
  $ curl https://install.meteor.com/ | sh
  ```

3. Install TypeScript 1.8 and Typings 1.4

  ```bash
  $ npm install -g typescript@1.8.10
  $ npm install -g typings@1.4.0
  ```

4. Install and start the [game creator](https://github.com/reminisceme/game-creator).

5. Then clone this repository somewhere:

  ```bash
  $ git clone git@github.com:reminisceme/app.git
  $ cd app/meteor
  $ npm install
  $ typings install
  ```

6. Install [Caddy](https://caddyserver.com/download)

7. Define the following environment variables in `env/dev.sh`:

  ```
  export MONGO_URL=mongodb://localhost/reminisceme
  export ROOT_URL=http://local.reminisce.me
  export PORT=3000
  export GAME_CREATOR_URL=http://localhost:9900
  export TIMEOUT_BETWEEN_FETCHES=1000
  export FACEBOOK_APPID=...
  export FACEBOOK_SECRET=..
  export GMAPS_KEY=...
  export APP_LOG_LOCATION=pathToLogFile
  ```

8. Add the following line to your `/etc/hosts`:

  ```
  local.reminisce.me 127.0.0.1
  ```

9. In a new tab, start Caddy:

  ```bash
  $ cd ../
  $ sudo caddy
  ```

10. In another tab, run the Meteor application:

  ```bash
  $ source ../env/dev.sh
  $ meteor
  ```

11. Then navigate to [](http://local.reminisce.me).

## License

This software is released under the Apache 2.0 license. See the `LICENSE` file for more informations.

