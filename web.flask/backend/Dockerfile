FROM python:3.10-alpine
LABEL maintainer="Tomer Zait (realgam3) <realgam3@gmail.com>"

ARG USERNAME=app
WORKDIR /usr/src/app
COPY requirements.txt .

RUN set -eux; \
    \
    pip install gunicorn; \
    pip install -r requirements.txt; \
    \
    adduser --disabled-password --no-create-home --gecos ${USERNAME} ${USERNAME}

COPY . .

USER ${USERNAME}
ENV HOME=/tmp

EXPOSE 5000
CMD [ "gunicorn", "-b", "0.0.0.0:5000", "-w", "1", "index:app" ]
