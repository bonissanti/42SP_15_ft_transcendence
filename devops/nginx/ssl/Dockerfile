# Dockerfile para gerar certificados SSL auto-assinados para teste HTTPS
FROM alpine:latest

# Instala OpenSSL
RUN apk add --no-cache openssl

# Define o diretório de trabalho
WORKDIR /ssl

# Cria script de geração de certificados
COPY generate-ssl-internal.sh /generate-ssl.sh
RUN chmod +x /generate-ssl.sh

# Comando padrão para executar o script
CMD ["/generate-ssl.sh"]
