from django.urls import path
from .views import *
from django.contrib.auth import views as auth_views


app_name= 'auth'

urlpatterns = [
    path('loginapi/', LoginAPI.as_view() , name="loginapi"),
    path('register/', RegisterView.as_view() , name="register"),
    path('webcam_auth/', WebcamAuth , name="webcam_auth"),
    
    
    
]
