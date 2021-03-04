FROM node:12-alpine

RUN echo 'crond' > /boot.sh

RUN set -x \
    && apk update \
    && apk upgrade \
    && apk add --no-cache \
    udev \
    ttf-freefont \
    chromium

# Create app directory

WORKDIR /usr/node-app

ENV NODE_SERVER_PORT=8082
ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD true
ENV CHROMIUM_PATH /usr/bin/chromium-browser

COPY . .

# install server deps

WORKDIR server



WORKDIR .



 #RUN npm run build:appdirty 
 # No me hace falta, se lanza con la carpeta dist ya creada y generar errores de permisos en openshift

ENTRYPOINT ["node", "dist/main.js"]
