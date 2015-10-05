# Reminisce.me

## Installation

First clone the repository somewhere:

    $ git clone git@github.com:reminisceme/app.git
    $ cd app

Define the following environment variables in `env/dev.sh`:

```
export MONGO_URL=mongodb://localhost/reminisceme
export ROOT_URL=http://local.reminisce.me
export PORT=3000
export GAME_CREATOR_URL=http://localhost:9900
export TIMEOUT_BETWEEN_FETCHES=1000
export FACEBOOK_APPID=...
export FACEBOOK_SECRET=..
export GMAPS_KEY=...
```

    $ source env/dev.sh
    $ meteor

    open http://local.reminisce.me


## License

This software is released under the Apache 2.0 license. See the `LICENSE` file for more informations.

