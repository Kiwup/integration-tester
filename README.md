# integration-tester

This image is used to run various integration/e2e tests against a service using `docker-compose`

## Example
```
version: '2'
services:

  integration:
    image: reelevant/integration-tester
    links:
      - my-service
      - mongodb
      - redis
    command: npm run integration
    volumes:
      - ./integration/cases:/home/node/cases
      - ./integration/mocks:/home/node/mocks

  mock_server:
    image: reelevant/integration-tester
    volumes:
      - ./integration/mocks:/home/node/mocks

  my-service:
    build:
      context: .
    environment:
      - NODE_ENV=integration
    links:
      - mongodb
      - redis

  mongodb:
    image: mongo

  redis:
    image: redis
```
