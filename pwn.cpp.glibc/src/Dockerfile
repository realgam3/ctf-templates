FROM gcc:12.1-bullseye as build

WORKDIR /usr/src/app
COPY . .

RUN set -eux; \
    \
    g++ -pthread -std=c++17 --static main.cc -o main.so


FROM debian:bullseye-slim as core

ARG USERNAME=app
WORKDIR /usr/src/app
COPY --from=build /usr/src/app/main.so .

ENV IDLE_TIMEOUT=30
ENV SESSION_TIMEOUT=120
ENV COMMAND="timeout ${SESSION_TIMEOUT} /usr/src/app/main.so"
ENV PROCESS_OPTIONS="pty,setuid=${USERNAME},echo=0,raw,iexten=0"
ENV ADDRESS_OPTIONS="fork,reuseaddr"

RUN set -eux; \
    \
    apt-get update && apt-get install -y socat; \
	\
	chmod +x /usr/src/app/main.so; \
    adduser --disabled-password --no-create-home --gecos ${USERNAME} ${USERNAME}

USER ${USERNAME}
ENV HOME=/tmp

EXPOSE 8080
CMD [ "sh", "-c", "socat -dd -T${IDLE_TIMEOUT} \"TCP4-LISTEN:8080,${ADDRESS_OPTIONS}\" \"EXEC:${COMMAND},${PROCESS_OPTIONS}\"" ]
