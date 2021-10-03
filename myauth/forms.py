from django import forms
from .models import *


class ImageForm(forms.ModelForm):
    class Meta:
        model= User
        fields = ('username', 'first_name', 'last_name','password', 'email',)
        
        widgets = {
            'first_name': forms.TextInput(attrs={'class': 'form-control', 'placeholder': 'Ex: John Doe'}),
            'last_name': forms.TextInput(attrs={'class': 'form-control', 'placeholder': 'Ex: John Doe2'}),
            'username': forms.TextInput(attrs={'class': 'form-control', 'placeholder': 'Ex: 30'}),
            'email': forms.TextInput(attrs={'class': 'form-control'}),
            }
        

class ImageFormTwo(forms.ModelForm):
    class Meta:
        model = TwoFactor
        fields = ('img',)

        # widgets = {
        #     'img': forms.FileField(),
        #     }