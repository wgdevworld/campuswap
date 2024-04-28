# vite build
FROM library/node:18-alpine as node
WORKDIR /home/node/app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# nginx
FROM library/nginx:alpine
COPY --from=node /home/node/app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf
EXPOSE 8090