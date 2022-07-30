FROM alpine:3.16 as build

WORKDIR /usr/src/app
COPY . .

RUN set -eux; \
    \
    apk add --no-cache gcc g++; \
    g++ -pthread -std=c++17 --static main.cc -o main.so


FROM alpine:3.16 as core

ARG USERNAME=app
WORKDIR /usr/src/app
COPY --from=build /usr/src/app/main.so .

ENV IDLE_TIMEOUT=30
ENV SESSION_TIMEOUT=120
ENV COMMAND=/usr/src/app/main.so
ENV PROCESS_OPTIONS="pty,setuid=${USERNAME},echo=0,raw,iexten=0"
ENV ADDRESS_OPTIONS="fork,reuseaddr"

RUN set -eux; \
    \
    apk add --no-cache socat; \
	\
	chmod +x /usr/src/app/main.so; \
    adduser --disabled-password --no-create-home --gecos ${USERNAME} ${USERNAME}

USER ${USERNAME}
ENV HOME=/tmp

EXPOSE 8080
CMD [ "sh", "-c", "socat -dd -t${SESSION_TIMEOUT} -T${IDLE_TIMEOUT} \"TCP4-LISTEN:8080,${ADDRESS_OPTIONS}\" \"EXEC:${COMMAND},${PROCESS_OPTIONS}\"" ]
