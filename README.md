# docker-express-mariadb

## Quick Start

1. Use Docker Compose to bring up the whole environment: `docker compose up`
1. Check that the server is running: `curl localhost:3000`
1. Check that bad URLs are being handled nicely: `curl localhost:3000/this-doesnt-exist`
1. Check that errors are being handled nicely: `curl localhost:3000/error`
1. Check that the database connection is working: `curl localhost:3000/delete-me-mariadb-test`

## Config

### Environment Variables

Local environment setup:

```shell
MARIADB_HOST=127.0.0.1
MARIADB_PORT=3306
MARIADB_USER=root
MARIADB_PASS=rootpass
MARIADB_CONN=10
```

Remember to use `127.0.0.1` instead of `localhost` for the HOST.

## Getting Started With Development

1. Configure environment variables
1. Docker MariaDB: `docker run -d --name mariadb -p 3306:3306 --env MARIADB_ROOT_PASSWORD=rootpass mariadb:10.9`
1. Run `yarn dev`

## Design Considerations

### Not Using Database ORM

Our primary database is the RDBS MariaDB. We don't want to use a separate library to manage database operations (migrations).

```

```
