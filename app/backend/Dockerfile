FROM node:16.14-alpine

WORKDIR /app/backend
 
COPY package* ./

RUN npm config set cache /tmp --global

RUN npm install

COPY . ./

EXPOSE 3001

CMD [ "npm", "run", "dev" ] 