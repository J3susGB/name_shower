# Etapa única: Symfony + Apache
FROM php:8.2-apache
WORKDIR /var/www/html

# Instalar extensiones necesarias
RUN apt-get update && apt-get install -y \
    unzip git curl libpq-dev libzip-dev zip libicu-dev \
    && docker-php-ext-install intl pdo pdo_pgsql zip

# Activar mod_rewrite para Symfony
RUN a2enmod rewrite

# Copiar backend con frontend ya generado en /public/landing
COPY backend/ /var/www/html/

# Instalar Composer y dependencias
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer
ENV APP_ENV=prod
RUN composer install --no-dev --optimize-autoloader

# Configurar Apache
COPY backend/docker/apache.conf /etc/apache2/sites-enabled/000-default.conf

EXPOSE 80
