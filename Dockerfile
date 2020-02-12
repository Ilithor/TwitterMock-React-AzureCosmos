FROM node:lts

# Create app directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Bundle app source
COPY /server /usr/src/app

# Install app dependencies
RUN npm install

RUN ls -la /usr/src/app

ENV PORT 80
ENV NODE_ENV 'production'

CMD [ "npm", "start" ]