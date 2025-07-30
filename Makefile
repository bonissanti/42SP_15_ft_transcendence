COMPOSE_FILE := docker-compose.yml

.PHONY: all build up stop start restart rm rmi rm-all ps

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
