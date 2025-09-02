from django.urls import path
from .views import *


urlpatterns = [
    path('auth/register/', Register.as_view(), name='register'),
    path('auth/token/', CustomTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('auth/token/refresh/', CustomTokenRefreshView.as_view(), name='token_refresh'),
]