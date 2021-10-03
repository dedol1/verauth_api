from django.shortcuts import render, HttpResponse, get_object_or_404
from django.urls import reverse
from django.shortcuts import redirect
from django.contrib.auth import authenticate, login,logout
from django.contrib import messages
from django.contrib.auth.models import User
from django.http import JsonResponse
from rest_framework import generics, status, views, permissions,mixins
from django.contrib.auth.mixins import LoginRequiredMixin
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.decorators import api_view, permission_classes
import json
from .renderers import UserRenderer
import cv2
import time
import os
from rest_framework.authtoken.models import Token
from django.http import Http404, HttpResponse
from django.template.loader import render_to_string
from .models import *
from django.template.context_processors import csrf
from .forms import *
from django.conf import settings
from django.conf.urls.static import static
from base64 import b64decode
# import face_recognition as fr
from PIL import Image
import base64
import io
import numpy as np
from PIL import Image
import re
from django.contrib.auth import login

from rest_framework import permissions
from rest_framework.authtoken.serializers import AuthTokenSerializer
from knox.views import LoginView as KnoxLoginView
import cv2
from deepface import DeepFace
# import matplotlib.pyplot as plt
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .serializers import *
from django.contrib.auth.models import User
face_cascade = cv2.CascadeClassifier('haarcascade_frontalface_default.xml')
# Create your views here.



class LoginAPI(KnoxLoginView):
    permission_classes = (permissions.AllowAny,)

    def post(self, request, format=None):
        serializer = AuthTokenSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data['user']
        login(request, user)
        return super(LoginAPI, self).post(request, format=None)
    


class RegisterView(generics.GenericAPIView):

    serializer_class = RegisterUserSerializer
    renderer_classes = (UserRenderer,)
    queryset = TwoFactor.objects.all()
    permission_classes = (AllowAny,)


    def post(self, request):
        user = request.data
        serializer = self.serializer_class(data=user)
        serializer.is_valid(raise_exception=True)
        serializer.save(request)
        user_data = serializer.data
        return Response(user_data, status=status.HTTP_201_CREATED)
    




@api_view(['POST'])
@permission_classes((IsAuthenticated,))
def WebcamAuth(request):
    serializer = ProductSerializer(data=request.data)
    
    if serializer.is_valid():
        profile_pic= request.POST['img']
        print("\n\n\n\n\n\n")
        print(profile_pic)
        print("\n\n\n\n\n\n")
        myuser = request.user.myuserimg.all()
        for i in myuser:
            jjj = i.img.path
            print(i.img.path)
            
        
        face_match = 0
        header, encoded = profile_pic
        file_new = str(time.perf_counter())
        
        with open( profile_pic , "wb") as f:
            f.write(b64decode(encoded))
        
        
        img1_path = jjj
        
        img1 = DeepFace.detectFace(img1_path)
        
        model_name = "ArcFace"
        result = DeepFace.verify(img1_path= img1_path,img2_path = img1_path, model_name = model_name )

        print(result)
        os.remove(file_new + ".png") 
        
        
    return Response(result)


