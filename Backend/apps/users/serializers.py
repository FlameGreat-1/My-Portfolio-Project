from rest_framework import serializers
from django.conf import settings
from .models import Profile, JourneyItem, ContactMessage, Project, AboutMe, WhatIDo, Skill, Social

class JourneyItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = JourneyItem
        fields = ['id', 'type', 'title', 'institution', 'description', 'date_range']

class ContactMessageSerializer(serializers.ModelSerializer):
    class Meta:
        model = ContactMessage
        fields = ['full_name', 'email_address', 'message']

class ProjectSerializer(serializers.ModelSerializer):
    image_url = serializers.SerializerMethodField()
    video_url = serializers.SerializerMethodField()

    class Meta:
        model = Project
        fields = ['id', 'title', 'about', 'stack', 'github_url', 'live_url', 'image_url', 'video_url', 'order']

    def get_image_url(self, obj):
        if obj.image:
            return self.context['request'].build_absolute_uri(obj.image.url)
        return None

    def get_video_url(self, obj):
        if obj.video:
            return self.context['request'].build_absolute_uri(obj.video.url)
        return None

class ProjectDetailSerializer(serializers.ModelSerializer):
    images = serializers.SerializerMethodField()

    class Meta:
        model = Project
        fields = ['id', 'title', 'about', 'stack', 'github_url', 'live_url', 'image', 'images', 'video', 'order']

    def get_images(self, obj):
        request = self.context.get('request')
        if request is not None:
            return [request.build_absolute_uri(img.image.url) for img in obj.images.all()]
        return [img.image.url for img in obj.images.all()]

class AboutMeSerializer(serializers.ModelSerializer):
    class Meta:
        model = AboutMe
        fields = ['content']

class WhatIDoSerializer(serializers.ModelSerializer):
    class Meta:
        model = WhatIDo
        fields = ['title', 'description', 'icon']

class SkillSerializer(serializers.ModelSerializer):
    class Meta:
        model = Skill
        fields = ['name', 'icon', 'category', 'order']

class SocialSerializer(serializers.ModelSerializer):
    class Meta:
        model = Social
        fields = ['type', 'icon', 'value', 'link']

class ProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profile
        fields = '__all__'
