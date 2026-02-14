FROM node:trixie-slim AS builder
WORKDIR /app
COPY package*.json ./

RUN npm ci
COPY . .
RUN npm run build
# make builder lean: remove dev deps, caches and source maps to shrink layers
RUN npm prune --production \
    && rm -rf /root/.npm /root/.cache /tmp/* \
    && rm -rf ./node_modules \
    && find . -type f -name '*.map' -delete


    
FROM node:trixie-slim
WORKDIR /app
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public

RUN npm ci --omit=dev
EXPOSE 3000
CMD ["npm", "start"]
# This section of code performs the following functionality:
# [Please insert a brief summary of what the selected code does here.]
#
# Parameters:
# - [List and describe any input parameters or environment variables used.]
#
# Usage:
# - [Explain how this code should be used within the Docker build process.]
#
# Notes:
# - [Include any important notes, caveats, or dependencies relevant to this code.]