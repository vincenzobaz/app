# FIXME: This build step is now broken

FROM node:5.10.1

# Create app directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Install Meteor
RUN curl -sL https://install.meteor.com | sed s/--progress-bar/-sL/g | /bin/sh

COPY . /usr/src/app
WORKDIR meteor
RUN npm install

# Install typings definitions
RUN ./node_modules/.bin/typings install

EXPOSE 80
ENTRYPOINT ["meteor", "--production"]
