from django import forms
from .models import Clinic 
from django.contrib.auth.forms import AuthenticationForm 

class ClinicForm(forms.ModelForm):
    class Meta:
        model = Clinic  # Changed here
        fields = [
            'clinic_name', 
            'specialization', 
            'address', 
            'city', 
            'postal_code', 
            'phone', 
            'email', 
            'services', 
            'operating_days', 
            'operating_hours', 
            'service_24_7', 
            'chat_enabled'
        ]
        widgets = {
            'services': forms.Textarea(attrs={'rows': 3}),
            'operating_days': forms.TextInput(attrs={'placeholder': 'e.g., Monday-Friday'}),
            'operating_hours': forms.TextInput(attrs={'placeholder': 'e.g., 8AM - 6PM'}),
        }

class Clinic_Form(forms.ModelForm):
    class Meta:
        model = Clinic  # Changed here
        fields = '__all__'


class LoginForm(AuthenticationForm):
    username = forms.CharField(label="Email or Special Code")
    password = forms.CharField(widget=forms.PasswordInput)