#!/bin/bash

# Esperar a que la base de datos esté disponible
until php bin/console doctrine:query:sql "SELECT 1" > /dev/null 2>&1; do
  echo "⏳ Esperando a que la base de datos esté disponible..."
  sleep 2
done

# Ejecutar las migraciones
echo "🚀 Ejecutando migraciones..."
php bin/console doctrine:migrations:migrate --no-interaction

# Levantar el servidor
echo "✅ Backend listo. Levantando el servidor Symfony..."
php -S 0.0.0.0:8000 -t public
