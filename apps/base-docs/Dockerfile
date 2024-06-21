FROM 652969937640.dkr.ecr.us-east-1.amazonaws.com/containers/node:v16

RUN apt-get update && apt-get install -y zip

ENV NODE_ENV=production

WORKDIR /repo

COPY . .

# Install dependencies
RUN yarn --immutable

EXPOSE 3000
CMD ["/bin/bash", "-c", "yarn workspace @app/base-docs build ; yarn workspace @app/base-docs start -p 3000"]
