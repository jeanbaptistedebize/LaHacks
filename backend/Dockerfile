FROM node:18-alpine

COPY ./package.json .

RUN yarn install

COPY ./prisma ./prisma

RUN yarn prisma generate

COPY . .

RUN yarn build

CMD yarn start:prod
