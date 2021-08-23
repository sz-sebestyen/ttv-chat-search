# TTV Chat Search

TTV Chat Search provides an easy way to search in the chat of twitch VODs (video on demand).

![asd](https://media2.giphy.com/media/bBrINHBQJMvGtJVW2p/giphy.gif)

## Features

What does this app do?

- It has a nice responsive frontend created with react.
- The user can request the server to download the chat of a twitch VOD. The server saves it in mongoDB.
- Then search the chat for keywords.
- View the search results in a convenient way.
- Generate a url to the timestamp of a given search result, and navigate to the VOD.
- Users can sign in with their twitch account (with twtich openid oauth flow)
- When the user is signed in, their searches get saved so they can review them later.

## Getting started

The easiest way to run the app is to start it up in development mode with docker-compose. But first we have to provide the needed environment variables - see the configuration section.

```shell
docker-compose up -d --build
```

When we run the above command, docker-compose will build the images and start the containers in the background.

### Configuration

This app requires a registered application on the [twitch developer console](https://dev.twitch.tv/docs/api/), with its own client_id and client_secret. Which we have to set as environment variables along with all the others, that are visible in the [.env.sample](./.env.sample) file at the repository's root.

## Building / testing / api documentation

More information about building for production, testing and documentation can be found in the services respective READMEs.

- [frontend](/frontend)
- [auth-gateway](/auth-gateway)
- [backend](/backend)
- [chat-downloader](/chat-downloader)
