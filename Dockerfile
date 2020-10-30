# FROM    gcr.io/mnm-billions-1/base/angular:9.1.1-cli AS builder
FROM    asosar/angular:9.1.1-cli AS builder
COPY    . /opt/source-code
WORKDIR /opt/source-code
RUN     npm install
RUN     ng build --prod

FROM    nginx:1.15-alpine
RUN     echo "http://uk.alpinelinux.org/alpine/v3.8/main" > /etc/apk/repositories ; \
        echo "http://uk.alpinelinux.org/alpine/v3.8/community" >> /etc/apk/repositories ; \
        apk add --no-cache bash ; \
        echo "http://dl-cdn.alpinelinux.org/alpine/v3.8/main" > /etc/apk/repositories ; \
        echo "http://dl-cdn.alpinelinux.org/alpine/v3.8/community" >> /etc/apk/repositories
COPY    entrypoint.sh /
COPY    default.conf /etc/nginx/conf.d/default.conf
WORKDIR /usr/share/nginx/html
COPY    --from=builder /opt/source-code/dist/operator-admin-app-no-wl/ /usr/share/nginx/html
EXPOSE  80
RUN     chmod +x /entrypoint.sh
CMD     [ "/entrypoint.sh" ]

