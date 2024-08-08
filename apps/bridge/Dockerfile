FROM 652969937640.dkr.ecr.us-east-1.amazonaws.com/containers/node:current

RUN apt-get update && apt-get install -y zip

ENV NODE_ENV=production

WORKDIR /repo

COPY . .

ARG CODEFLOW_COMMIT_TAG
ENV BUILD_ID ${CODEFLOW_COMMIT_TAG}
ENV BUGSNAG_API_KEY 8f7b6e984693922aac5021ee82d0bb8f
ENV BUGSNAG_SOURCEMAPS_URL https://sourcemaps.coinbase.com
ENV BUGSNAG_NOTIFY_URL https://exceptions.coinbase.com
ENV BUGSNAG_SESSIONS_URL https://sessions.coinbase.com

# Install dependencies
RUN yarn --immutable

RUN yarn workspace @app/bridge next build
RUN yarn workspaces focus --all --production

EXPOSE 3000
CMD ["yarn", "workspace", "@app/bridge", "start", "-p", "3000"]
