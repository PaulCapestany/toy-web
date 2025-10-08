# Toy-web Dockerfile
#
# This Dockerfile builds a minimal static web server for toy-web using Nginx.
# It copies the frontend assets (index.html, script.js, style.css) into the default
# Nginx www directory. We rely on Node for building (if needed) and run tests.
#
# Steps:
# 1. Builder stage: Install deps, run `npm test`
# 2. Final stage: Nginx serving static files

FROM node:18-alpine AS builder
WORKDIR /app
# Copy npm manifests; package-lock.json is optional in this repo
COPY package*.json ./
RUN npm install --loglevel verbose
COPY . .
# Run tests and build steps if any
RUN npm test

FROM nginx:1.25-alpine
WORKDIR /usr/share/nginx/html
# Copy from builder stage (the static files: index.html, script.js, style.css)
COPY --from=builder /app/index.html ./
COPY --from=builder /app/script.js ./
COPY --from=builder /app/style.css ./
# Remove default Nginx index
RUN rm /usr/share/nginx/html/*.orig 2>/dev/null || true

# Expose port 8080 for consistency
EXPOSE 8080

# Adjust Nginx to listen on 8080 in the default server
RUN sed -i 's/listen\s*80;/listen 8080;/' /etc/nginx/conf.d/default.conf

# OpenShift/Arbitrary UID compatibility:
# - Pre-create Nginx cache temp dirs
# - Make critical paths group-writable and assign group 0 so arbitrary UIDs
#   (which default to root group on OpenShift) can write
# - Comment out the 'user' directive to avoid warnings when not running as root
RUN set -eux; \
    mkdir -p /var/cache/nginx/client_temp; \
    for p in /var/cache/nginx /var/run /var/log/nginx /etc/nginx /etc/nginx/conf.d; do \
      chgrp -R 0 "$p" || true; \
      chmod -R g+rwX "$p" || true; \
    done; \
    if grep -q "^user" /etc/nginx/nginx.conf; then \
      sed -i 's/^user.*/# user disabled for OpenShift/' /etc/nginx/nginx.conf; \
    fi

CMD ["nginx", "-g", "daemon off;"]
