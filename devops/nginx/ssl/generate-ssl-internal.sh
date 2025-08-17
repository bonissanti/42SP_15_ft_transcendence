#!/bin/sh

# Verifica se os certificados já existem
if [ -f "/ssl/localhost.key" ] && [ -f "/ssl/localhost.pem" ]; then
    echo "✅ Certificados SSL já existem"
    ls -la /ssl/
else
    echo "🔐 Gerando certificados SSL auto-assinados..."
    
    # Gera a chave privada e o certificado auto-assinado
    openssl req -x509 -nodes -days 365 -newkey rsa:2048 \
        -keyout /ssl/localhost.key \
        -out /ssl/localhost.pem \
        -subj "/C=BR/ST=SP/L=SaoPaulo/O=42School/OU=Transcendence/CN=localhost" \
        -addext "subjectAltName=DNS:localhost,DNS:*.localhost,IP:127.0.0.1,IP:0.0.0.0"
    
    # Define as permissões adequadas para os arquivos
    chmod 600 /ssl/localhost.key
    chmod 644 /ssl/localhost.pem
    
    echo "✅ Certificados SSL gerados com sucesso!"
    ls -la /ssl/
fi

# Mostra informações do certificado
echo "📋 Informações do certificado:"
openssl x509 -in /ssl/localhost.pem -text -noout | grep -E 'Subject:|DNS:|IP:|Not Before|Not After'

# Mantém o container rodando
echo "🔄 Serviço SSL pronto. Certificados disponíveis em /ssl/"
tail -f /dev/null
