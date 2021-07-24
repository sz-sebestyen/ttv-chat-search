FROM node:14-alpine
ARG WORKDIR
WORKDIR $WORKDIR
COPY package*.json ./
RUN npm ci
COPY . ./

EXPOSE 8080

# ENV NODE_ENV=production

CMD ["node", "index.js"]