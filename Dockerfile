FROM circleci/node:jessie-browsers
LABEL "maintainer"="github.com/maedy"

EXPOSE 5000

USER root
WORKDIR /tmp
RUN mkdir /app
WORKDIR /app/
RUN git clone https://github.com/maedy/simpleHTML.git
WORKDIR /simpleHTML
RUN npm install
RUN npm -g jasmine

ENTRYPOINT node app.js
