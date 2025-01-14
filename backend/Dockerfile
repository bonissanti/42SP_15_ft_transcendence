FROM python:3.14.0a3-slim-bullseye

WORKDIR /code

# Prevents Python from writing pyc files to disc
ENV PYTHONDONTWRITEBYTECODE=1
# Prevents Python from buffering stdout and stderr
ENV PYTHONUNBUFFERED=1

RUN apt-get update && apt-get install -y \
    libpq-dev gcc libffi-dev curl && apt-get clean

RUN mkdir code
RUN pip install --upgrade pip
RUN pip install django-cors-headers
COPY ./utils/requirements.txt ./code
RUN pip install -r ./code/requirements.txt
HEALTHCHECK --interval=30s --timeout=10s --retries=3 CMD curl --fail http://localhost:8000 || exit 1

COPY . ./code/
