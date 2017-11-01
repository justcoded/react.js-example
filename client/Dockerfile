FROM node:boron as builder

WORKDIR /tmp/app
COPY package.json .
RUN npm install
COPY . .
RUN npm run build

FROM httpd:2.4

COPY --from=builder /tmp/app/build /usr/local/apache2/htdocs/