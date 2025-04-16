FRONT_DIR=./frontend
BACK_DIR=./backend

COMPOSE_FILE=docker-compose.yml


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

rm:
	@docker compose -f $(COMPOSE_FILE) rm -f

rmi:
	@docker rmi -f $(docker images -q)

rm-all:
	@read -p "Essa bomba vai apagar TODOS os containers, tem certeza? [y/n] " ans; \
	if [ "$$ans" = "y" ] || [ "$$ans" = "Y" ]; then \
		docker stop $$(docker ps -q); \
		docker rm $$(docker ps -aq); \
	else \
		echo "cancelado"; \
	fi

ps:
	@docker compose -f $(COMPOSE_FILE) ps
