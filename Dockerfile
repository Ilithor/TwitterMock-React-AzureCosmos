FROM node:lts

ENV NODE_ENV 'production'
ENV PORT 80

# Bundle app source
COPY /server .

# Install app dependencies
RUN npm install


CMD [ "npm", "start" ]