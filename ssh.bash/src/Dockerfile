FROM debian:bullseye-slim

ARG USERNAME=hackeriot
ARG PASSWORD=hackeriot

COPY generate.sh /generate.sh

RUN set -eux; \
    apt-get update; \
    apt-get install -y sudo openssh-server xxd cron; \
    \
    chmod -r /home; \
    chmod +x /generate.sh; \
    echo "%sudo ALL=(ALL) NOPASSWD: ALL" > /etc/sudoers.d/sudo; \
    adduser --disabled-password --no-create-home --ingroup sudo --shell /generate.sh --gecos ${USERNAME} ${USERNAME}; \
    echo "${USERNAME}:${PASSWORD}" | chpasswd; \
    \
    sed -i 's/session\s*required\s*pam_loginuid.so/session optional pam_loginuid.so/g' /etc/pam.d/sshd; \
    sed -i 's/#PasswordAuthentication yes/PasswordAuthentication yes/g' /etc/ssh/sshd_config; \
    sed -i 's/Subsystem\s*sftp/#Subsystem sftp/g' /etc/ssh/sshd_config; \
    mkdir -p /var/run/sshd; \
    ssh-keygen -A;
    # mount -o remount,rw,hidepid=2 /proc;

EXPOSE 22
CMD [ "bash", "-c", "service cron start; /usr/sbin/sshd -D -e" ]
