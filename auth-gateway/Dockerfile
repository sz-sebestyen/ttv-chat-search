FROM node:14-alpine
ARG WORKDIR
WORKDIR $WORKDIR

ENV NODE_ENV=production

COPY package*.json ./
RUN ["npm", "ci"]
COPY . ./

EXPOSE 4000

CMD ["node", "index.js"]