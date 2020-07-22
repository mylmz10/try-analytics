# build stage
FROM node:lts-alpine as build-stage
WORKDIR /app
COPY package*.json ./
# RUN apk add --no-cache python make g++ git

RUN npm ci
COPY . .
RUN npm run build

# pre-deploy stage
FROM node:lts-alpine as pre-deploy-stage
WORKDIR /app
ENV NODE_ENV production
COPY --from=build-stage /app/package*.json /app/
RUN npm ci --only=prod

COPY --from=build-stage /app/app /app/app
COPY --from=build-stage /app/templates /app/templates
COPY --from=build-stage /app/config /app/config


# production stage
FROM node:lts-alpine as production-stage

RUN mkdir -p /app/tmp
RUN chmod 777 /app/tmp
RUN chown node:node /app/tmp

USER node
WORKDIR /app

COPY --from=pre-deploy-stage --chown=node:node /app /app

ENV TZ Europe/Istanbul
ENV NODE_ENV production

CMD ["node","app/www.js"]