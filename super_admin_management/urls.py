from django.urls import path
from .views import *

urlpatterns = [
     path('', UserLoginView.as_view(), name='login'),
    path('admin_dashboard/', admin_dashboard, name='admin_dashboard'),
    path('add_clinic/', add_clinic, name='add_clinic'),
    path('clinic_list/', clinic_list, name='clinic_list'),
    path('clinic_profile/<int:clinic_id>/', clinic_profile, name='clinic_profile'),
    path('update_clinic/<int:clinic_id>/', update_clinic, name='update_clinic'),
    path('delete_clinic/<int:clinic_id>/', delete_clinic, name='delete_clinic'),
    path('archive_clinic/<int:clinic_id>/', archive_clinic, name='archive_clinic'),
]
