# frontend

Frontend for TTV Chat Search. Developed with Create React App.

## Start

### Development

Build the image:

```shell
docker build -t dockerhub_id/image_name Dockerfile.dev
```

Start the container:

```shell
docker run -d -t -p 3000:3000 --name container_name dockerhub_id/image_name
```

#### Start without docker

Install dependencies:

```shell
npm i
```

Start development server:

```shell
npm run start
```

### Production

Build the image:

```shell
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
npm i
```

Run tests:

```shell
npm run test
```
