#!/bin/sh

set -e


echo "Rodando as migrações do Prisma..."
npx prisma migrate deploy

npx prisma studio --port 5556 &

echo "Iniciando a aplicação..."
exec "$@"