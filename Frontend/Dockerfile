FROM node:alpine AS development

ENV NODE_ENV development
WORKDIR /react-app

COPY . .

RUN npm install -g serve

CMD ["serve", "-s", "build", "-l", "3000"]
