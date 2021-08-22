# frontend

Frontend for TTV Chat Search. Developed with Create React App.

## Start

### Development

Build the image:

```shell
cd frontend/
docker build -t dockerhub_id/image_name Dockerfile.dev
```

Start the container:

```shell
docker run -d -t -p 3000:3000 --name container_name dockerhub_id/image_name
```

### Production

Build the image:

```shell
cd frontend/
docker build -t dockerhub_id/image_name .
```

Start the container:

```shell
docker run -d -t -p 3000:80 --name container_name dockerhub_id/image_name
```

### Configuration

The backend host hast to be configure through the .env file. A [.env.sample](./.env.sample) is provided.

## Running tests

Install dependencies:

```shell
cd frontend/
npm i
```

Run tests:

```shell
npm run test
```
