FROM node:14-alpine
ARG WORKDIR
WORKDIR $WORKDIR

ENV NODE_ENV=production

COPY package*.json ./
RUN ["npm", "ci"]
COPY . ./

EXPOSE 8080

CMD ["node", "index.js"]