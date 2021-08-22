# backend

Service for TTV Chat Search. Responsible for querying the database when answering http requests from the frontend, and managing the chat-downloader.

## Start

### Development

Build the image:

```shell
cd backend/
docker build -t dockerhub_id/image_name Dockerfile.dev
```

Start the container:

```shell
docker run -d -t -p 8080:8080 --env-file ./env --name container_name dockerhub_id/image_name
```

### Production

Build the image:

```shell
cd backend/
docker build -t dockerhub_id/image_name .
```

Start the container:

```shell
docker run -d -t -p 8080:8080 --env-file ./env --name container_name dockerhub_id/image_name
```

### Configuration

All the necessary environment variables are described in the provided [.env.sample](./.env.sample).

## Running tests

Install dependencies:

```shell
cd backend/
npm i
```

Run tests:

```shell
npm run test
```

## Documentation

Documentation with OpenApi specification: [docs](./documentation.yaml). The documentation is served on /docs with the help of swagger-ui-express when the service is running.
