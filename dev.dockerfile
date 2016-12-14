# FIXME: This build step is now broken

FROM node:5.10.1

# Create app directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

RUN npm install -g typings@1.4.0

# Install Meteor
RUN curl -sL https://install.meteor.com | sed s/--progress-bar/-sL/g | /bin/sh
COPY . /usr/src/app
WORKDIR meteor

# Logs configuration
ENV APP_LOG_LOCATION /winston-logs/app.logs

# Run app in user mode
RUN groupadd -r app_group && useradd -r -g app_group app_user
RUN mkdir -p /home/app_user
RUN chown -R app_user:app_group .
RUN chown -R app_user:app_group /home/app_user
USER app_user
RUN meteor npm install
RUN typings install

EXPOSE 3000
ENTRYPOINT ["meteor"]
