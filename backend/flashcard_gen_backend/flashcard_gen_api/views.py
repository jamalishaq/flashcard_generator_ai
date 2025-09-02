from rest_framework import generics
from rest_framework import status   
from rest_framework.response import Response
from django.contrib.auth import get_user_model
from .serializers import *
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

User = get_user_model()

class Register(generics.ListCreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer

class CustomTokenObtainPairView(TokenObtainPairView):

    def post(self, request, *args, **kwargs):
        response = super().post(request, *args, **kwargs)
        refresh_token = response.data.get('refresh')
    
        if refresh_token:
            response.set_cookie(
                key='refresh_token',
                value=refresh_token,
                httponly=True,
                secure=True,
                samesite='None',
                max_age=7 * 24 * 60 * 60,  # 7 days
            )
            del response.data['refresh']  # Remove refresh token from response body
        
        return response
    
class CustomTokenRefreshView(TokenRefreshView):
    def post(self, request, *args, **kwargs):
        refresh_token = request.COOKIES.get('refresh_token')
        print('Refresh: ', refresh_token)
        if not refresh_token:
            return Response({"error": "Refresh token is missing."}, status=status.HTTP_400_BAD_REQUEST)

        request.data['refresh'] = refresh_token
        response = super().post(request, *args, **kwargs)
        
        return response