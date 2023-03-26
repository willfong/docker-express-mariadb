FROM node:18 AS frontend
WORKDIR /app
COPY frontend-react/package.json frontend-react/yarn.lock /app/
RUN yarn install
COPY frontend-react/. /app
RUN yarn build


FROM node:18-alpine
WORKDIR /app
COPY api/package.json api/yarn.lock /app/
RUN yarn install

COPY api/. /app

COPY --from=frontend /app/build/. /app/frontend/

CMD ["yarn", "start"]