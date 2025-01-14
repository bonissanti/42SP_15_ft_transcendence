FROM nginx:latest
COPY . /usr/share/nginx/html
RUN apt-get update && apt-get install -y curl
EXPOSE 80
HEALTHCHECK --interval=30s --timeout=10s --retries=3 CMD curl --fail http://localhost:3000 || exit 1