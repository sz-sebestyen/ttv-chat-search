FROM node:14-alpine
ARG WORKDIR
WORKDIR $WORKDIR
COPY package*.json ./
RUN ["npm", "ci", "--production"]
COPY . ./

EXPOSE 4000

# ENV NODE_ENV=production

CMD ["node", "index.js"]