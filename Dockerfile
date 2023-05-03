# syntax=docker/dockerfile:1
# https://docs.docker.com/develop/develop-images/multistage-build/

ARG NODE_VERSION=18-alpine3.15

##############
# BASE STAGE #
##############
FROM node:$NODE_VERSION AS base

WORKDIR /usr/src/app

COPY ./package.json ./package-lock.json ./

COPY prisma ./prisma/

RUN apk add  --no-cache --update    python3 \
                                    make \
                                    g++ && \
                                    npm i node-gyp -gyp && \
                                    npm i -g npm@8.5.5 && \
                                    npm ci

###############
# BUILD STAGE #
###############
FROM base AS build

WORKDIR /usr/src/app

COPY . .

COPY --chown=node:node --from=base /usr/src/app/node_modules ./node_modules

EXPOSE 3000

RUN npm run build


#################
# RUNTIME STAGE #
#################
FROM node:$NODE_VERSION

WORKDIR /usr/src/app

COPY --chown=node:node --from=build /usr/src/app/package.json /usr/src/app/package-lock.json ./
COPY --chown=node:node --from=base /usr/src/app/node_modules ./node_modules
COPY --chown=node:node --from=build /usr/src/app/dist ./dist

RUN npm prune --production && npm cache clean -f

EXPOSE 3000

USER node

CMD ["node", "dist/main.js"]

