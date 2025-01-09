from django.urls import path
from .views import RegisterView, activate_account

urlpatterns = [
    path('register/', RegisterView.as_view(), name='register'),
    path('activate/<str:uidb64>/<str:token>/', activate_account, name='activate_account'),
]