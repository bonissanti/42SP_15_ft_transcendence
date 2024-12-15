from django.db import models
from django.contrib.auth.models import AbstractUser
from django.utils import timezone

# Create your models here.

class CustomUser(AbstractUser):
    last_activity = models.DateTimeField(null=True, blank=True)

    @property
    def is_online(self):
        if self.last_activity:
            return (timezone.now() - self.last_activity).second < 300
        return False
