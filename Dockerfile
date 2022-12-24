FROM node:18-alpine

WORKDIR /dist

RUN yarn global add cross-env ts-node
RUN yarn global add typescript@4.8.4

COPY package.json ./

COPY yarn.lock ./

RUN yarn install --frozen-lockfile

COPY . .

EXPOSE 3006

RUN tsc
RUN yarn build

CMD ["ts-node", "server.ts"]
