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
        extra_fields.setdefault("is_staff", True)
        extra_fields.setdefault("is_superuser", True)
        extra_fields.setdefault("is_active", True)
        return self.create_user(username, password, extra_fields)

class CustomUser(AbstractBaseUser):
    username = models.CharField(max_length=150, unique=True)
    last_activity = models.DateField()
    is_online = models.BooleanField()
    is_staff = models.BooleanField

    objects = CustomUserManager()

    def updateLastActivity(self):
        self.last_activity = timezone.now()
        self.save()

    def isOnline(self):
        if self.last_activity:
            now = timezone.now()
            return now < self.last_activity + timezone.timedelta(minutes=5)
        return False