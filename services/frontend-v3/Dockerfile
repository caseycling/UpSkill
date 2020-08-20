FROM node:12.18.3-alpine3.11

ENV TZ=America/Toronto

USER root

# Set working directory
RUN mkdir -p /upskill-frontend/build
WORKDIR /upskill-frontend


# Copy app dependencies
COPY package.json yarn.lock /upskill-frontend/

# Make group permissions equal to the owner user permissions
RUN chgrp -R 0 /upskill-frontend && \ 
  chmod -R g=u /upskill-frontend

# Runs install script
RUN yarn install --production

# Copy app
COPY . .

RUN ls -la /upskill-frontend/src
RUN ls -la /upskill-frontend/src/database

# Builds the app
RUN yarn build

# Runs start script
CMD yarn start:prod

USER 1001