from django.apps import AppConfig
from dotenv import load_dotenv

load_dotenv()
class LoginlogicConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'user_auth'
