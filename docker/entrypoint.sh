#!/bin/bash
set -e

PORT="${PORT:-8080}"
sed -i "s/Listen 80/Listen ${PORT}/" /etc/apache2/ports.conf

cd /var/www/html

php artisan storage:link --force 2>/dev/null || true

if [ -n "${DB_DATABASE:-}" ] && [ ! -f storage/app/public/installed ]; then
  touch storage/app/public/installed
fi

if [ ! -f storage/oauth-private.key ]; then
  php artisan passport:keys --force
fi

php artisan config:cache
php artisan route:cache
php artisan view:cache 2>/dev/null || true

chown -R www-data:www-data storage bootstrap/cache

rm -f /etc/apache2/mods-enabled/mpm_*.load /etc/apache2/mods-enabled/mpm_*.conf
a2enmod mpm_prefork >/dev/null

exec "$@"
