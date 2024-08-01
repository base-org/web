FROM 652969937640.dkr.ecr.us-east-1.amazonaws.com/containers/node:current AS base

# ------------------------------------
#   1. Install project dependencies
# ------------------------------------
FROM base AS deps
WORKDIR /app

RUN apt-get update && apt-get install -y zip
ENV NODE_ENV=production
RUN yarn --immutable

# Add sharp support
# RUN npm install -g --arch=x64 --platform=linux --libc=glibc sharp@0.33.0-rc.2
# RUN mkdir special_folder
# RUN mkdir special_folder/node_modules
# RUN npm install --prefix ./special_folder sharp

# ------------------------------------
#   2. Build the project
# ------------------------------------
FROM base AS builder
WORKDIR /app

# I don't like this, we should be able to copy just the package.json and node_modules?
COPY --from=deps /app/node_modules ./node_modules
COPY . .


# RUN mkdir sharp
# COPY --from=deps /app/special_folder ./app/special_folder

# ENV NEXT_SHARP_PATH ./app/special_folder/node_modules/sharp

# RUN mkdir special_folder
# try sharp@next?
# RUN mkdir special_folder/node_modules
# RUN npm install --prefix ./special_folder sharp
# ENV NEXT_SHARP_PATH=./special_folder/node_modules/sharp

ENV NEXT_PRIVATE_STANDALONE true

# RUN npm install -g --arch=x64 --platform=linux --libc=glibc sharp@0.33.0-rc.2
# RUN npm install --unsafe-perm sharp

RUN yarn workspace @app/web next build

# ------------------------------------
#   3.Run it
# ------------------------------------
FROM base AS runner
WORKDIR /app

ENV NODE_ENV production

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/apps/web/public ./apps/web/public

# Set the correct permission for prerender cache
RUN mkdir .next
RUN chown nextjs:nodejs .next

# Automatically leverage output traces to reduce image size
# https://nextjs.org/docs/advanced-features/output-file-tracing
# COPY --from=builder --chown=nextjs:nodejs /app/special_folder ./
COPY --from=builder --chown=nextjs:nodejs /app/apps/web/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/apps/web/.next/static ./apps/web/.next/static

# USER nextjs # We can't do this as nextjs doesn't have access to the node binary

EXPOSE 3000

# ENV NEXT_SHARP_PATH=./special_folder/node_modules/sharp
ENV PORT 3000

CMD HOSTNAME="0.0.0.0" node apps/web/server.js