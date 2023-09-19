FROM 652969937640.dkr.ecr.us-east-1.amazonaws.com/containers/node:v16

RUN apt-get update && apt-get install -y zip

ENV NODE_ENV=production

WORKDIR /repo

COPY . .

# Install dependencies
RUN yarn --immutable
RUN yarn build

RUN yarn workspace @app/web next build
RUN yarn workspaces focus --all --production

EXPOSE 3000
CMD ["yarn", "workspace", "@app/web", "start", "-p", "3000"]
