from django.urls import path
from .views import ProfileView, JourneyView, ContactMessageView, ProjectView, ProjectDetailView, ProjectImageUploadView, ProjectChunkUploadView, ProjectChunkMergeView, AboutMeView, WhatIDoView, SkillView, SocialView

urlpatterns = [
    path('api/profile/', ProfileView.as_view(), name='profile'),
    path('api/journey/', JourneyView.as_view(), name='journey'),
    path('api/contact/', ContactMessageView.as_view(), name='contact'),
    path('api/projects/', ProjectView.as_view(), name='projects'),
    path('api/projects/<int:pk>/', ProjectDetailView.as_view(), name='project-detail'),
    path('api/projects/<int:pk>/upload-images/', ProjectImageUploadView.as_view(), name='project-image-upload'),
    path('api/projects/upload-chunk/', ProjectChunkUploadView.as_view(), name='upload-chunk'),
    path('api/projects/merge-chunks/', ProjectChunkMergeView.as_view(), name='merge-chunks'),
    path('api/about-me/', AboutMeView.as_view(), name='about-me'),
    path('api/what-i-do/', WhatIDoView.as_view(), name='what-i-do'),
    path('api/skills/', SkillView.as_view(), name='skills'),
    path('api/socials/', SocialView.as_view(), name='socials'),

]
