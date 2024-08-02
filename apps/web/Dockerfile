FROM 652969937640.dkr.ecr.us-east-1.amazonaws.com/containers/node:current

RUN apt-get update && apt-get install -y zip

ENV NODE_ENV=production

WORKDIR /repo

COPY . .

# Install dependencies
RUN yarn --immutable

EXPOSE 3000
# Build at runtime so that we get ENV variables, this allows us to use [Automatic Static Optimization](https://nextjs.org/docs/pages/building-your-application/rendering/automatic-static-optimization)
CMD ["/bin/bash", "-c", "yarn workspace @app/web next build ; yarn workspace @app/web start -p 3000"]