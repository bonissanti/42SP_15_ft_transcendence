# Dockerfile para executar todos os testes
FROM 42_transcendence-auth-service:latest

# Instalar dependências do sistema
RUN apt-get update && apt-get install -y bash git && rm -rf /var/lib/apt/lists/*

# Criar diretório de trabalho
WORKDIR /app/tests

# Copiar todos os arquivos de teste
COPY . .

# Tornar o script executável
RUN chmod +x run-all-tests.sh

# Comando padrão
CMD ["./run-all-tests.sh"]
