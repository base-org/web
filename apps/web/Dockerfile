FROM 652969937640.dkr.ecr.us-east-1.amazonaws.com/containers/node:current AS base

# ------------------------------------
#   1. Install project dependencies
# ------------------------------------
FROM base AS deps

RUN apt-get update && apt-get install -y zip

WORKDIR /repo

# Check: does this actually work? do we also need to copy web/base-ui? json files from
COPY package.json yarn.lock* ./

COPY apps/web/package.json ./apps/web
COPY apps/base-docs/package.json ./apps/base-docs
COPY apps/bridge/package.json ./apps/bridge
COPY libs/base-ui/package.json ./libs/base-ui

RUN yarn --immutable

# ------------------------------------
#   2. Build the project
# ------------------------------------
FROM base AS builder
WORKDIR /repo

ENV NODE_ENV=production

COPY . .

ENV NEXT_PRIVATE_STANDALONE true
RUN yarn workspace @app/web next build

# ------------------------------------
#   3.Run it
# ------------------------------------
FROM base AS runner
WORKDIR /repo

ENV NODE_ENV production

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /repo/apps/web/public ./apps/web/public

# Set the correct permission for prerender cache
RUN mkdir .next
RUN chown nextjs:nodejs .next

# Automatically leverage output traces to reduce image size
# https://nextjs.org/docs/advanced-features/output-file-tracing
# COPY --from=builder --chown=nextjs:nodejs /repo/special_folder ./
COPY --from=builder --chown=nextjs:nodejs /repo/apps/web/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /repo/apps/web/.next/static ./apps/web/.next/static

# USER nextjs # We can't do this as nextjs doesn't have access to the node binary

EXPOSE 3000

# ENV NEXT_SHARP_PATH=./special_folder/node_modules/sharp
ENV PORT 3000
# ENV NEXT_SHARP_PATH=./app/node_modules/sharp

CMD HOSTNAME="0.0.0.0" node apps/web/server.js