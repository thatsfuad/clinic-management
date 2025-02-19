from django.db import models
from django.contrib.auth.models import AbstractUser


class Clinic(models.Model):  # Renamed from add_clinic to Clinic
    clinic_name = models.CharField(max_length=150)
    specialization = models.CharField(max_length=100)
    address = models.CharField(max_length=200)
    city = models.CharField(max_length=100)
    postal_code = models.CharField(max_length=10)
    phone = models.CharField(max_length=20)
    email = models.EmailField(max_length=120)
    services = models.TextField(blank=True, null=True)
    operating_days = models.CharField(max_length=100)
    operating_hours = models.CharField(max_length=50)
    service_24_7 = models.BooleanField(default=False)
    chat_enabled = models.BooleanField(default=False)
    is_archived = models.BooleanField(default=False)

    def __str__(self):
        return self.clinic_name


