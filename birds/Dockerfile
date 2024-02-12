FROM node:current-bookworm-slim

RUN apt-get update && apt-get install -y curl openssl

RUN apt-get install -y --no-install-recommends libreoffice-writer libreoffice-gtk3

WORKDIR /app

RUN npm install pnpm -g

COPY package.json pnpm-lock.yaml ./

RUN pnpm install --frozen-lockfile

COPY ./ ./

EXPOSE 3006

ENV NODE_ENV production

ENV NEXT_TELEMETRY_DISABLED 1

ENV NODE_TLS_REJECT_UNAUTHORIZED=0

RUN pnpm prisma generate

RUN pnpm build

CMD ["pnpm", "start"]
