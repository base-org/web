FROM 652969937640.dkr.ecr.us-east-1.amazonaws.com/containers/node:current AS base





# ------------------------------------
#   1. Install project dependencies
# ------------------------------------
FROM base AS deps
WORKDIR /repo

COPY . .
RUN yarn --immutable



# # Check: does this actually work? do we also need to copy web/base-ui? json files from
# COPY package.json yarn.lock ./


# RUN mkdir apps
# RUN mkdir libs

# COPY apps/web/package.json ./apps/web
# COPY apps/base-docs/package.json ./apps/base-docs
# COPY apps/bridge/package.json ./apps/bridge
# COPY libs/base-ui/package.json ./libs/base-ui

# Nuclear solution, I think we should be able to just get the package.json(s)
# COPY . .
# RUN yarn --immutable


# COPY apps/web ./apps/web
# COPY apps/base-docs ./apps/base-docs
# COPY apps/bridge ./apps/bridge
# COPY libs/base-ui ./libs/base-ui

# COPY package.json .
# COPY yarn.lock .

# RUN yarn install --pure-lockfile --non-interactive
# RUN yarn install --pure-lockfile --non-interactive --cache-folder ./ycache; rm -rf ./ycache
# RUN yarn --immutable

# ------------------------------------
#   2. Build the project
# ------------------------------------
FROM base AS builder
WORKDIR /repo

# We're suppose to do at least this first line, but this makes "yarn --immutable" fail :pain
COPY --from=deps /repo/node_modules ./node_modules
COPY --from=deps /repo/apps/web/node_modules ./apps/web/node_modules
COPY --from=deps /repo/apps/base-docs/node_modules ./apps/base-docs/node_modules
COPY --from=deps /repo/apps/bridge/node_modules ./apps/bridge/node_modules
COPY --from=deps /repo/libs/base-ui/node_modules ./libs/base-ui/node_modules

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
COPY --from=builder --chown=nextjs:nodejs /repo/apps/web/.next/static ./.next/static

# # USER nextjs # We can't do this as nextjs doesn't have access to the node binary

# EXPOSE 3000

# # ENV NEXT_SHARP_PATH=./special_folder/node_modules/sharp
# ENV PORT 3000
# # ENV NEXT_SHARP_PATH=./app/node_modules/sharp

CMD HOSTNAME="0.0.0.0" node server.js