FROM node:16.14-alpine

WORKDIR /app-frontend

COPY package* ./

RUN npm install

COPY . ./

EXPOSE 3000

CMD [ "npm", "start" ]