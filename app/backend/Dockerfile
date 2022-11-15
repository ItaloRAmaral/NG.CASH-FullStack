FROM node:16.18
WORKDIR /app/back-end
 
COPY package* ./
RUN npm install
COPY . .
CMD [ "npm", "run", "dev" ] 