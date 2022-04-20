# pull official base image
FROM node:latest

# set working directory
WORKDIR /app

# add `/app/node_modules/.bin` to $PATH
ENV PATH /app/node_modules/.bin:$PATH

RUN rm -rf node_modules

# install app dependencies
COPY package.json ./

RUN yarn cache clean --force && yarn install --pure-lockfile --ignore-optional --force

# add app
COPY . ./

# start app
CMD ["yarn", "start", "--verbose"]    