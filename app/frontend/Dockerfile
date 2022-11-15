FROM node:16.18
WORKDIR /app/front-end
 
COPY package* ./
RUN npm install
COPY . .
CMD [ "npm", "start" ] 