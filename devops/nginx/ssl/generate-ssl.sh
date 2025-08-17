#!/bin/bash

# Script para gerar certificados SSL auto-assinados usando Docker Compose

echo "🔐 Iniciando geração de certificados SSL com Docker Compose..."

# Navega para o diretório raiz do projeto
cd "$(dirname "$0")/../../.."

# Para e remove o serviço SSL se estiver rodando
echo "🛑 Parando serviço SSL existente..."
docker-compose stop ssl-generator 2>/dev/null || true
docker-compose rm -f ssl-generator 2>/dev/null || true

# Remove o volume SSL para forçar regeneração
echo "🗑️  Removendo volume SSL existente..."
docker volume rm trans_ssl-certs 2>/dev/null || true

# Reconstrói e inicia apenas o serviço SSL
echo "🔨 Construindo e iniciando serviço SSL..."
docker-compose build ssl-generator
docker-compose up -d ssl-generator

# Aguarda o health check
echo "⏳ Aguardando geração dos certificados..."
timeout 15 bash -c 'until docker-compose ps ssl-generator | grep -q "healthy"; do sleep 2; done'

if docker-compose ps ssl-generator | grep -q "healthy"; then
    echo "✅ Certificados SSL gerados com sucesso!"
    echo ""
    echo "📁 Os certificados estão disponíveis no volume Docker 'ssl-certs'"
    echo "📋 Para visualizar os certificados:"
    echo "   docker-compose exec ssl-generator ls -la /ssl/"
    echo ""
    echo "🚀 Agora você pode iniciar todos os serviços:"
    echo "   docker-compose up -d"
else
    echo "❌ Erro: Timeout na geração dos certificados"
    echo "📝 Verifique os logs com: docker-compose logs ssl-generator"
    exit 1
fi

echo ""
echo "⚠️  ATENÇÃO: Estes são certificados auto-assinados apenas para desenvolvimento!"
echo "   Os navegadores mostrarão avisos de segurança que devem ser aceitos manualmente."
