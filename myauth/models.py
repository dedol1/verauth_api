from django.db import models
from django.contrib.auth.models import User

# Create your models here.




class TwoFactor(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="myuserimg")
    img = models.ImageField(upload_to ="userimage")