FROM node:17.0-alpine
LABEL maintainer="Tomer Zait (realgam3) <realgam3@gmail.com>"

ARG USERNAME=app
WORKDIR /usr/src/app
COPY package*.json .

RUN set -eux; \
    \
    npm install -g pm2; \
    npm install; \
    \
    adduser --disabled-password --no-create-home --gecos ${USERNAME} ${USERNAME}

COPY . .

USER ${USERNAME}
ENV HOME=/tmp

EXPOSE 3000
CMD [ "npm", "start" ]
