FROM php:8.3-cli

# Instala extensiones necesarias para PostgreSQL y otros
RUN apt-get update && apt-get install -y \
    libpq-dev \
    unzip \
    git \
    zip \
    libicu-dev \
    && docker-php-ext-install intl pdo pdo_pgsql

# Establece el directorio de trabajo
WORKDIR /var/www/html

# Copia los archivos del proyecto
COPY . .

# Instala Composer
RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer

# Da permisos si es necesario
RUN chmod -R 777 var
