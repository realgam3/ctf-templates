FROM debian:bookworm-slim

ARG USERNAME=app
ARG PASSWORD=app
ARG GOTTY_VERSION=1.0.1

COPY generate.sh /generate.sh

RUN set -eux; \
    apt-get update; \
    apt-get install -y sudo xxd cron curl; \
    \
    chmod -r /home; \
    chmod +x /generate.sh; \
    echo "%sudo ALL=(ALL) NOPASSWD: ALL" > /etc/sudoers.d/sudo; \
    adduser --disabled-password --no-create-home --ingroup sudo --shell /generate.sh --gecos ${USERNAME} ${USERNAME}; \
    echo "${USERNAME}:${PASSWORD}" | chpasswd; \
    # mount -o remount,rw,hidepid=2 /proc; \
    \
    curl -L https://github.com/yudai/gotty/releases/download/v${GOTTY_VERSION}/gotty_linux_amd64.tar.gz \
      -o gotty.tar.gz; \
    tar -xzf gotty.tar.gz -C /usr/local/bin/; \
    rm -f gotty.tar.gz; \
    chmod +x /usr/local/bin/gotty

EXPOSE 3000
USER $USERNAME
ENV TERM=xterm-256color
CMD [ "gotty", "--address", "0.0.0.0", "--port", "3000", "--permit-write", "--reconnect", "/generate.sh" ]
