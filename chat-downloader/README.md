# chat-downloader

Service for TTV Chat Search. Responsible for communicating with the twitch api. Downloads information about VODs and thier chats.

## Start

### Development

Build the image:

```shell
docker build -t dockerhub_id/image_name Dockerfile.dev
```

Start the container:

```shell
docker run -d -t -p 5000:5000 --env-file ./env --name container_name dockerhub_id/image_name
```

### Production

Build the image:

```shell
docker build -t dockerhub_id/image_name .
```

Start the container:

```shell
docker run -d -t -p 5000:5000 --env-file ./env --name container_name dockerhub_id/image_name
```

### Configuration

All the necessary environment variables are described in the provided [.env.sample](./.env.sample).

## Running tests

Install dependencies:

```shell
npm i
```

Run tests:

```shell
npm run test
```

## Documentation

Documentation with OpenApi specification: [docs](./documentation.yaml). The documentation is served on /docs with the help of swagger-ui-express when the service is running.
