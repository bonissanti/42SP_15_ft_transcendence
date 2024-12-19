# from django.db import models
# from django.contrib.auth.models import AbstractUser
# from django.utils import timezone

# Create your models here.
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager
from django.contrib.auth.base_user import BaseUserManager
from django.db import models

from django.utils import timezone

class CustomUserManager(BaseUserManager):
    def create_user(self, username, password=None, **extra_fields):
        if not username:
            raise ValueError('The username field must be set')
        user = self.model(username=username, **extra_fields)
        user.set_password(password)
        user.save()
        return user

    def create_super_user(self, username, password=None, **extra_fields):
        # extra_fields.setdefault("is_staff", True)
        extra_fields.setdefault("is_superuser", True)
        extra_fields.setdefault("is_active", True)
        return self.create_user(username, password, extra_fields)

class CustomUser(AbstractBaseUser):
    username = models.CharField(max_length=150, unique=True)
    last_activity = models.DateField(default=timezone.now())
    is_online = models.BooleanField(default=True)
    # is_staff = models.BooleanField(default=True)


    USERNAME_FIELD = "username"
    objects = CustomUserManager()

    def updateLastActivity(self):
        self.last_activity = timezone.now()
        self.save()

    def isOnline(self):
        if self.last_activity:
            now = timezone.now()
            return now < self.last_activity + timezone.timedelta(minutes=5)
        return False

# class CustomUser(AbstractUser):
#     last_activity = models.DateTimeField(null=True, blank=True)

#     @property
#     def is_online(self):
#         if self.last_activity:
#             return (timezone.now() - self.last_activity).second < 300
#         return False
