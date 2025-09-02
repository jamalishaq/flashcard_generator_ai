from django.db import models
from django.contrib.auth.models import AbstractUser

class CustomUser(AbstractUser):
    username = None
    email = models.EmailField(unique=True, blank=False)

    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = []
