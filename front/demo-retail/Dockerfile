# frontend/Dockerfile
FROM node:16.3.0-alpine AS prod

WORKDIR /app

COPY package.json /app

RUN npm install

COPY . /app

RUN npm run build

FROM nginx:alpine

USER root

RUN chgrp -R 0 /usr && chmod -R g=u /usr && chmod -R +rwX /usr
RUN chgrp -R 0 /etc/nginx && chmod -R g=u /etc/nginx && chmod -R +rwX /etc/nginx
RUN chgrp -R 0 /var/cache/nginx && chmod -R g=u /var/cache/ngnix && chmod -R +rwX /var/cache/nginx
WORKDIR /usr/local/bin

COPY --from=prod /app/build /usr/share/nginx/html

COPY generate-config.sh .

COPY custom-nginx.template /etc/nginx/conf.d/

RUN chmod +x generate-config.sh

USER 1001

EXPOSE 8080

ENTRYPOINT [ "/bin/sh", "generate-config.sh"]