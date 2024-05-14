# frontend/Dockerfile
FROM node:16.3.0-alpine AS prod

WORKDIR /app
COPY package.json /app
RUN npm install
COPY . /app
RUN npm run build


FROM nginx:alpine

USER root

WORKDIR /usr/local/bin

COPY --from=prod /app/build /usr/share/nginx/html
COPY ./default.conf /etc/nginx/conf.d/

RUN chgrp -R 0 /usr && chmod -R g=u /usr && chmod -R +rwX /usr
RUN chgrp -R 0 /etc/nginx && chmod -R g=u /etc/nginx && chmod -R g+rwX /etc/nginx
RUN chgrp -R 0 /var/cache && chmod -R g=u /var/cache && chmod -R g+rwX /var/cache
RUN chgrp -R 0 /var/cache /var/run /var/log && chmod -R 777 /var/cache /var/run /var/log


USER 1001

EXPOSE 8080

CMD ["nginx", "-g", "daemon off;"]