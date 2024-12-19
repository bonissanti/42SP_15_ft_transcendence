FROM python:3.14.0a3-slim-bullseye

WORKDIR /code

# Prevents Python from writing pyc files to disc
ENV PYTHONDONTWRITEBYTECODE=1
# Prevents Python from buffering stdout and stderr
ENV PYTHONUNBUFFERED=1

RUN apt-get update && apt-get install -y \
    libpq-dev gcc libffi-dev && apt-get clean

RUN mkdir code
RUN pip install --upgrade pip
# ENV PATH="/code/game-env/bin:$PATH"
COPY ./utils/requirements.txt ./code
RUN pip install -r ./code/requirements.txt

COPY . ./code/
# ENTRYPOINT ["tail", "-f", "/dev/null"]
