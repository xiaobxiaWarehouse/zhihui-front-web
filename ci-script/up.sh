#!/bin/sh

tar zcf zhihui-front-web.tar.gz -C ../dist .
scp zhihui-front-web.tar.gz root@118.31.103.99:/opt/www/
