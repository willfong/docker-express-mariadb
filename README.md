# docker-express-mariadb

## Quick Start

1. Use Docker Compose to bring up the whole environment: `docker compose up`
1. Check that the server is running: `curl localhost:3000`
1. Use your web browser to check the frontend is working: `http://localhost:3000`
1. Check that bad URLs are being handled nicely: `curl localhost:3000/this-doesnt-exist`
1. Check that errors are being handled nicely: `curl localhost:3000/api/error`
1. Check that the database connection is working: `curl localhost:3000/api/delete-me-mariadb-test`

## Config

### Environment Variables

Local environment setup:

```shell
MARIADB_HOST=127.0.0.1
MARIADB_PORT=3306
MARIADB_DATABASE=test
MARIADB_USER=root
MARIADB_PASS=rootpass
MARIADB_CONN=10
```

Remember to use `127.0.0.1` instead of `localhost` for the HOST.

## Getting Started With Development

1. Configure environment variables
1. Docker MariaDB: `docker run -d --name mariadb -p 3306:3306 --env MARIADB_ROOT_PASSWORD=rootpass mariadb:10.9`
1. Run `yarn dev`

## AWS Deployment

Replace `<your_profile_name>` with your AWS profile name. Replace `<repo>` with your repository name.

### Pushing to ECR

```sh
AWS_PROFILE=<your_profile_name> aws ecr get-login-password --region ap-southeast-1 | docker login --username AWS --password-stdin 742334901973.dkr.ecr.ap-southeast-1.amazonaws.com
docker build --platform=linux/amd64 -t <repo> .
echo "Commit Hash: $(git rev-parse --short HEAD)" && docker tag <repo>:latest 742334901973.dkr.ecr.ap-southeast-1.amazonaws.com/<repo>:$(git rev-parse --short HEAD) && docker push 742334901973.dkr.ecr.ap-southeast-1.amazonaws.com/<repo>:$(git rev-parse --short HEAD)

```

### Deploy from ECR

```sh
 docker tag 742334901973.dkr.ecr.ap-southeast-1.amazonaws.com/<repo>:$(git rev-parse --short HEAD) 742334901973.dkr.ecr.ap-southeast-1.amazonaws.com/<repo>:production
 docker push 742334901973.dkr.ecr.ap-southeast-1.amazonaws.com/<repo>:production
```

### Deploy to Production

```sh
AWS_PROFILE=<your_profile_name> AWS_REGION=ap-southeast-1 aws ecs update-service --cluster default --service <repo> --force-new-deployment
```

### View Logs

```sh
AWS_PROFILE=<your_profile_name> AWS_REGION=ap-southeast-1 aws logs tail /ecs/services/<repo> --follow


## Design Considerations

### Not Using Database ORM

Our primary database is the RDBS MariaDB. We don't want to use a separate library to manage database operations (migrations).
```
