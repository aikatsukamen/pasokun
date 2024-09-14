FROM nikolaik/python-nodejs:python3.12-nodejs22

WORKDIR /workspace

ARG USERNAME=vscode
ARG USER_UID=1100
ARG USER_GID=$USER_UID

RUN apt-get update \
  && groupadd --gid $USER_GID $USERNAME \
  && useradd -s /bin/bash --uid $USER_UID --gid $USER_GID -m $USERNAME \
  && apt-get install -y sudo \
  && echo $USERNAME ALL=\(root\) NOPASSWD:ALL > /etc/sudoers.d/$USERNAME \
  && chmod 0440 /etc/sudoers.d/$USERNAME

RUN apt-get -y install curl git ffmpeg expect
RUN npm install -g npm

# puppeteer
ENV LANG ja_JP.UTF-8
RUN apt-get install -y libgtk-3.0 libgbm-dev libnss3 libatk-bridge2.0-0 libasound2
RUN apt-get update && \
  apt-get -y install locales fonts-ipafont fonts-ipaexfont && \
  echo "ja_JP UTF-8" > /etc/locale.gen && locale-gen

RUN apt-get install libsqlite3-dev\
  && apt-get install sqlite3

RUN sudo curl -sS -L https://github.com/yt-dlp/yt-dlp/releases/latest/download/yt-dlp -o /usr/bin/yt-dlp \
  && chmod 775 /usr/bin/yt-dlp
