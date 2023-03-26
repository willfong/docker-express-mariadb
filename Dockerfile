FROM node:18-alpine

WORKDIR /app
COPY api/package.json api/yarn.lock /app/
RUN yarn install

COPY api/. /app

CMD ["yarn", "start"]