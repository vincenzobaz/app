FROM node:5.10.1

# Create app directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Install Meteor
RUN curl -sL https://install.meteor.com | sed s/--progress-bar/-sL/g | /bin/sh

# Install app dependencies
COPY package.json /usr/src/app/
RUN npm install

# Bundle app source
COPY . /usr/src/app

# Install typings definitions
RUN ./node_modules/.bin/typings install

EXPOSE 80
ENTRYPOINT ["node"]
CMD ["prod.js"]
