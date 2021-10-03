from rest_framework import serializers
from rest_framework.validators import UniqueValidator
from django.contrib.auth.models import User
from django.urls import reverse
from rest_framework.test import APITestCase
from django.contrib.auth.models import User
from rest_framework import status
from .models import *
from rest_auth.registration.serializers import RegisterSerializer

class UserSerializer(serializers.ModelSerializer):
    email = serializers.EmailField(
            required=True,
            validators=[UniqueValidator(queryset=User.objects.all())]
            )
    username = serializers.CharField(
            validators=[UniqueValidator(queryset=User.objects.all())]
            )
    password = serializers.CharField(min_length=8)

    def create(self, validated_data):
        user = User.objects.create_user(validated_data['username'], validated_data['email'],
             validated_data['password'])
        return user

    class Meta:
        model = TwoFactor
        fields = ('user', 'img')
        
    

class LoginSerializer(serializers.ModelSerializer):
    username = serializers.CharField(
        max_length=255, min_length=3, required=True)
    password = serializers.CharField(
        max_length=68, min_length=6, write_only=True)
    

    tokens = serializers.SerializerMethodField()

    def get_tokens(self, obj):
        user = User.objects.get(username=obj['username'])
        if user:
            return {
                'refresh': user.tokens(),
            }


        

    class Meta:
        model = User
        fields = ['email', 'password', 'username', 'tokens',]



class RegisterUserSerializer(RegisterSerializer):
    user = serializers.PrimaryKeyRelatedField(read_only=True,) #by default allow_null = False
    img = serializers.ImageField(required=True, use_url=True)
    
    def get_cleaned_data(self):
            data = super(RegisterUserSerializer, self).get_cleaned_data()
            extra_data = {
                'user' : self.validated_data.get('restaurant_name', ''),
                'img': self.validated_data.get('img', ''),
            }
            data.update(extra_data)
            return data

    def save(self, request):
        user = super(RegisterUserSerializer, self).save(request)
        user.save()
        savr_user = TwoFactor(
            user=user,
            img=self.cleaned_data.get('img'), 
            )
            
        savr_user.save()
        return user
    


class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = TwoFactor
        fields = (
            'img',

        )
        
    def get_img(self, obj):
        try:
            pic = obj.img.url
        except:
            pic = None
        return pic
        
