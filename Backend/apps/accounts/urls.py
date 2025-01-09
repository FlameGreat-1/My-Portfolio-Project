from django.urls import path
from . import views
from .views import GoogleLoginView, GoogleAuthStatusView
from .views import RequestPasswordResetEmail, PasswordTokenCheckAPI, SetNewPasswordAPIView
from .views import OTPVerificationView, ResendOTPView

app_name = 'accounts'

urlpatterns = [

    path('profile/', views.UserProfileView.as_view(), name='user_profile'),
    path('dashboard/', views.user_dashboard, name='user_dashboard'),
    path('preferences/', views.UserPreferenceView.as_view(), name='user_preferences'),
    path('subscribe/category/<int:category_id>/', views.subscribe_unsubscribe_category, name='subscribe_category'),
    path('subscribe/author/<int:author_id>/', views.subscribe_unsubscribe_author, name='subscribe_author'),
    path('premium-content/', views.PremiumContentView.as_view(), name='premium_content'),

    path('register/', views.RegisterView.as_view(), name='register'),
    path('login/', views.LoginView.as_view(), name='login'),
    path('logout/', views.LogoutView.as_view(), name='logout'),
    path('google/login/', GoogleLoginView.as_view(), name='google_login'),
    path('google/auth/', GoogleAuthStatusView.as_view(), name='google_auth_status'),
    path('password-reset/', views.PasswordResetRequestView.as_view(), name='password_reset'),
    path('activate/<str:uidb64>/<str:token>/<int:user_id>/', views.activate_account, name='activate_account'),
    path('resend-activation/', views.resend_activation_email, name='resend_activation_email'),
    path('request-reset-email/', RequestPasswordResetEmail.as_view(), name="request-reset-email"),
    path('password-reset/<uidb64>/<token>/', PasswordTokenCheckAPI.as_view(), name='password-reset-confirm'),
    path('password-reset-complete/', SetNewPasswordAPIView.as_view(), name='password-reset-complete'),
    path('verify-otp/', OTPVerificationView.as_view(), name='verify-otp'),
    path('resend-otp/', ResendOTPView.as_view(), name='resend-otp'),



    
]
