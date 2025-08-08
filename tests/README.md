# Documentação das Regras de Teste do Makefile

## Regras Disponíveis

### 🚀 Regra Principal
**`make test`** - Executa todos os testes via Docker (build + execução)
- Constrói automaticamente a imagem Docker de testes
- Executa todos os 310 testes em ambiente isolado
- Usa cache Docker para execuções mais rápidas

### 🐳 Regras Docker
**`make build-test-image`** - Apenas constrói a imagem Docker
**`make test-docker`** - Constrói e executa testes no Docker
**`make clean-test-docker`** - Remove imagens Docker de teste
**`make test-docker-clean`** - Executa testes + limpeza automática

### 💻 Regras Locais
**`make test-local`** - Executa todos os testes localmente (sem Docker)
- Instala dependências em cada projeto
- Compila TypeScript
- Executa testes
- Limpa node_modules/dist após execução

## Estrutura dos Testes

### 📊 Cobertura Total: 310 testes
- 🎮 Game Service (Original): 47 testes
- 🎮 Game Service (Extended): 41 testes  
- 🔐 Auth Service: 51 testes
- 👤 User Service: 82 testes
- 🌐 Frontend: 89 testes

## Vantagens do Docker

✅ **Isolamento**: Ambiente limpo e controlado
✅ **Reprodutibilidade**: Mesmos resultados em qualquer máquina
✅ **Performance**: Cache Docker acelera builds subsequentes
✅ **CI/CD Ready**: Pronto para integração contínua
✅ **Manutenção**: Limpeza automática de dependências

## Exemplos de Uso

```bash
# Execução principal (recomendada)
make test

# Execução local (para desenvolvimento)
make test-local

# Construir apenas a imagem
make build-test-image

# Executar + limpar
make test-docker-clean
```

## Fluxo de Execução

1. **`make test`** → **`make test-docker`** → **`make build-test-image`**
2. Construção da imagem Docker com base no auth-service
3. Execução do script `run-all-tests.sh` no container
4. Testes sequenciais de todos os 5 serviços
5. Relatório consolidado de 310 testes

## Arquivos Docker

- `tests/Dockerfile` - Definição da imagem de testes
- `tests/run-all-tests.sh` - Script de execução dos testes
- `tests/.dockerignore` - Arquivos ignorados no build
