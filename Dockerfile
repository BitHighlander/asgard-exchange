#FROM node:8
#
#COPY /dist /
#COPY server.js /
#RUN npm i express body-parser
#EXPOSE 3080
#CMD ["server.js"]



FROM node:10.18

ARG NPM_TOKEN
ARG NODE_ENV

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
COPY package.json /usr/src/app/

COPY . /usr/src/app

RUN npm install
RUN npm run build:testnet

ENV NODE_ENV docker

#start
CMD [ "npm", "run", "start-prod" ]
