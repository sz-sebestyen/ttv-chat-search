# auth-gateway

Service for TTV Chat Search. Authenticates the user with twitch's openid oauth flow, and serves as a proxy between frontend and backend. When signed in, it validates the user before forwarding the requests to the backend.

## Start

### Development

Build the image:

```shell
cd auth-gateway/
docker build -t dockerhub_id/image_name Dockerfile.dev
```

Start the container:

```shell
docker run -d -t -p 4000:4000 --env-file ./env --name container_name dockerhub_id/image_name
```

### Production

Build the image:

```shell
cd auth-gateway/
docker build -t dockerhub_id/image_name .
```

Start the container:

```shell
docker run -d -t -p 4000:4000 --env-file ./env --name container_name dockerhub_id/image_name
```

### Configuration

All the necessary environment variables are described in the provided .env.sample.

## Running tests

Install dependencies:

```shell
cd auth-gateway/
npm i
```

Run tests:

```shell
npm run test
```

## Documentation

Documentation with OpenApi specification: [docs](./documentation.yaml). The documentation is served on /docs with the help of swagger-ui-express when the service is running.
