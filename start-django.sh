# This will install python3-pip and sqlite3.
# After that, it will create a virtual environment,
# activate it, and install Django. Finally,
# you can start coding.

sudo apt-get update
sudo apt install python3-pip
sudo apt-get install sqlite3

python3 -m venv game-env
source game-env/bin/activate
python3 -m pip install django

