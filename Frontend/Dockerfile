FROM node:alpine AS development

ENV NODE_ENV development
WORKDIR /react-app

COPY build .

RUN npm install -g serve

CMD ["serve", "-s", "build"]
