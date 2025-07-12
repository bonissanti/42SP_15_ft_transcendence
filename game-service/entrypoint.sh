#!/bin/sh

set -e


echo "Rodando as migrações do Prisma..."
npx prisma migrate deploy

npx prisma studio &

echo "Iniciando a aplicação..."
exec "$@"