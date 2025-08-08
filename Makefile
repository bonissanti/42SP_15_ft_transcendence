COMPOSE_FILE := docker-compose.yml

.PHONY: all build up stop start restart rm rmi rm-all ps test

all: build up

build:
	@docker compose -f $(COMPOSE_FILE) build

up:
	@docker compose -f $(COMPOSE_FILE) up -d

stop:
	@docker compose -f $(COMPOSE_FILE) stop

start:
	@docker compose -f $(COMPOSE_FILE) start

restart:
	@docker compose -f $(COMPOSE_FILE) restart

clean:
	@docker-compose down
	@sudo bash clean-docker.sh

rm:
	@docker compose -f $(COMPOSE_FILE) rm -f

rmi:
	@docker rmi -f $(shell docker images -q)

re: stop rm rmi build up

rm-all:
	@echo "Apagando TUDO relacionado ao Docker"
	@docker stop $$(docker ps -q) || true
	@docker rm -f $$(docker ps -aq) || true
	@docker rmi -f $$(docker images -aq) || true
	@docker volume rm -f $$(docker volume ls -q) || true
	@docker network rm $$(docker network ls -q | grep -v '^bridge$$' | grep -v '^host$$' | grep -v '^none$$') || true
	@docker builder prune -af || true

ps:
	@docker compose -f $(COMPOSE_FILE) ps

test:
	@echo "🚀 Executando TODOS os testes..."
	@echo "================================="
	
	@echo "\n🎮 Testando Game Service (Original)..."
	@cd tests/game-service-tests && \
	if [ ! -d "node_modules" ]; then \
		echo "📦 Instalando dependências..."; \
		npm install; \
	fi && \
	echo "🔨 Compilando..." && \
	npm run build && \
	echo "🧪 Executando..." && \
	node dist/index.js
	@rm -rf tests/game-service-tests/node_modules tests/game-service-tests/dist
	
	@echo "\n🎮 Testando Game Service (Extended)..."
	@cd tests/game-service-tests-extended && \
	if [ ! -d "node_modules" ]; then \
		echo "📦 Instalando dependências..."; \
		npm install; \
	fi && \
	echo "🔨 Compilando..." && \
	npm run build && \
	echo "🧪 Executando..." && \
	node dist/index.js
	@rm -rf tests/game-service-tests-extended/node_modules tests/game-service-tests-extended/dist
	
	@echo "\n🔐 Testando Auth Service..."
	@cd tests/auth-service-tests && \
	if [ ! -d "node_modules" ]; then \
		echo "📦 Instalando dependências..."; \
		npm install; \
	fi && \
	echo "🔨 Compilando..." && \
	npm run build && \
	echo "🧪 Executando..." && \
	node dist/index.js
	@rm -rf tests/auth-service-tests/node_modules tests/auth-service-tests/dist
	
	@echo "\n👤 Testando User Service..."
	@cd tests/user-service-tests && \
	if [ ! -d "node_modules" ]; then \
		echo "📦 Instalando dependências..."; \
		npm install; \
	fi && \
	echo "🔨 Compilando..." && \
	npm run build && \
	echo "🧪 Executando..." && \
	node dist/index.js
	@rm -rf tests/user-service-tests/node_modules tests/user-service-tests/dist
	
	@echo "\n🌐 Testando Frontend..."
	@cd tests/frontend-tests && \
	if [ ! -d "node_modules" ]; then \
		echo "📦 Instalando dependências..."; \
		npm install; \
	fi && \
	echo "🔨 Compilando..." && \
	npm run build && \
	echo "🧪 Executando..." && \
	node dist/index.js
	@rm -rf tests/frontend-tests/node_modules tests/frontend-tests/dist
	
	@echo "\n🎉 Todos os testes concluídos! Pastas limpas."
