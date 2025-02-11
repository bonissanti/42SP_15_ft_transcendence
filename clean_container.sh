#!/bin/bash

YELLOW="\e[0;33m"
RESET="\e[0;0m"

# Careful, this script will delete all containers on your machine

echo -e "${YELLOW}Stopping all containers${RESET}"
docker stop $(docker ps -a -q) 2> /dev/null

echo -e "${YELLOW}Deleting all containers stopped${RESET}"
docker rm -f $(docker ps -aq) 2> /dev/null

echo -e "${YELLOW}Deleting all images${RESET}"
docker image rm $(docker image ls) 2> /dev/null 
docker image rm $(docker image ls -a) 2> /dev/null 

echo -e "${YELLOW}Deleting all volumes${RESET}"
docker volume rm -f $(docker volume ls) 2> /dev/null

echo -e "${YELLOW}Deleting network${RESET}"
docker network rm $(docker network ls -q) 2> /dev/null

echo -e "${YELLOW}Deleting everything - double check${RESET}"
docker system prune --volumes --all --force 2> /dev/null
