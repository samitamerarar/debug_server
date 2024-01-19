FROM node:14-alpine

WORKDIR /usr/src/react-app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

EXPOSE 3149

CMD ["npm", "start"]