FROM node:18-alpine3.17

RUN apk update && apk add zip

ENV NODE_ENV=production

WORKDIR /repo

COPY . .

# Install dependencies
RUN yarn --immutable

RUN yarn workspace @app/bridge next build
RUN yarn workspaces focus --all --production

EXPOSE 3000
CMD ["yarn", "workspace", "@app/bridge", "start", "-p", "3000"]
