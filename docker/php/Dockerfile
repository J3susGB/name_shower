FROM php:8.3-fpm

# Instalar dependencias necesarias para PostgreSQL y otros
RUN apt-get update && apt-get install -y \
    git unzip libpq-dev libzip-dev zip \
    && docker-php-ext-install pdo pdo_pgsql

# Copiar Composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# Establecer el directorio de trabajo
WORKDIR /var/www/html

# Copiar el código del backend al contenedor
COPY . .

# Instalar dependencias PHP (si no usas volumen en producción)
RUN composer install --no-dev --optimize-autoloader
