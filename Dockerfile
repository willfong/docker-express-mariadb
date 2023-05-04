FROM node:18 AS frontend
WORKDIR /app
COPY frontend-next/package.json frontend-next/yarn.lock /app/
RUN yarn install
COPY frontend-next/. /app
RUN yarn build


FROM node:18-alpine
WORKDIR /app
COPY api/package.json api/yarn.lock /app/
RUN yarn install

COPY api/. /app

COPY --from=frontend /app/out/. /app/frontend/

CMD ["yarn", "start"]