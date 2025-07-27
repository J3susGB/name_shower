# Etapa 1: Compilar Angular
FROM node:20 AS frontend
WORKDIR /app
COPY frontend/frontend/ .
RUN npm install && npm run build --configuration=production

# Etapa 2: Symfony + Apache
FROM php:8.2-apache
WORKDIR /var/www/html

# Instalar extensiones necesarias
RUN apt-get update && apt-get install -y \
    unzip git curl libpq-dev libzip-dev zip \
    && docker-php-ext-install pdo pdo_pgsql zip

# Activar mod_rewrite para Symfony
RUN a2enmod rewrite

# Copiar backend
COPY backend/ /var/www/html/

# Copiar frontend compilado al public/
COPY --from=frontend /app/dist /var/www/html/public

# Instalar Composer y dependencias
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer
RUN composer install --no-dev --optimize-autoloader

# Configurar Apache
COPY backend/docker/apache.conf /etc/apache2/sites-enabled/000-default.conf

EXPOSE 80
