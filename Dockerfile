## Base ########################################################################
# Use a larger node image to do the build for native deps (e.g., gcc, python)
FROM node:18-alpine3.15

WORKDIR /app

RUN npm install -g npm@8.15.1

ADD package.json .
RUN npm install

EXPOSE 3000
