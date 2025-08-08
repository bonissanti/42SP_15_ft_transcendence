#!/bin/bash
set -e

echo "🚀 Executando TODOS os testes no Docker..."
echo "=========================================="

# Função para executar testes de um serviço
run_service_tests() {
    local service_name=$1
    local service_dir=$2
    local emoji=$3
    
    echo -e "\n$emoji Testando $service_name..."
    cd /app/tests/$service_dir
    
    echo "📦 Instalando dependências..."
    npm install --silent
    
    echo "🔨 Compilando..."
    npm run build
    
    echo "🧪 Executando..."
    node dist/index.js
    
    # Limpar node_modules e dist para economizar espaço
    rm -rf node_modules dist
    
    cd /app/tests
}

# Executar todos os testes
run_service_tests "Game Service (Original)" "game-service-tests" "🎮"
run_service_tests "Game Service (Extended)" "game-service-tests-extended" "🎮"
run_service_tests "Auth Service" "auth-service-tests" "🔐"
run_service_tests "User Service" "user-service-tests" "👤"
run_service_tests "Frontend" "frontend-tests" "🌐"

echo -e "\n🎉 Todos os testes concluídos no Docker! ✨"
