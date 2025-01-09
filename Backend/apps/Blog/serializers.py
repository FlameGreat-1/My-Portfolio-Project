from rest_framework import serializers
from django.contrib.auth import get_user_model
from .models import (
    Post, Comment, GuestPostRequest, CodeSnippet, Resource, Poll, PollOption, Challenge,
    Certification, Testimonial, DevOpsShowcase, ProjectHighlight,
    InteractiveRoadmap, APIPlayground, Tutorial, Category, PremiumContent
)

User = get_user_model()

class CommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comment
        fields = ['id', 'post', 'name', 'email', 'body', 'created', 'active']
        read_only_fields = ['post']

class GuestPostRequestSerializer(serializers.ModelSerializer):
    class Meta:
        model = GuestPostRequest
        fields = ['id', 'name', 'email', 'title', 'content', 'submitted', 'status']
        read_only_fields = ['submitted', 'status']

class CodeSnippetSerializer(serializers.ModelSerializer):
    class Meta:
        model = CodeSnippet
        fields = ['id', 'language', 'code']

class ResourceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Resource
        fields = ['id', 'title', 'file']

class PollOptionSerializer(serializers.ModelSerializer):
    class Meta:
        model = PollOption
        fields = ['id', 'option_text', 'votes']

class PollSerializer(serializers.ModelSerializer):
    options = PollOptionSerializer(many=True, read_only=True)

    class Meta:
        model = Poll
        fields = ['id', 'question', 'options']

class ChallengeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Challenge
        fields = ['id', 'title', 'description', 'solution']

class DevOpsShowcaseSerializer(serializers.ModelSerializer):
    class Meta:
        model = DevOpsShowcase
        fields = ['id', 'title', 'description', 'pipeline_data', 'infrastructure_diagram']

class ProjectHighlightSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProjectHighlight
        fields = ['id', 'title', 'description', 'github_url', 'live_demo_url']

class InteractiveRoadmapSerializer(serializers.ModelSerializer):
    class Meta:
        model = InteractiveRoadmap
        fields = ['id', 'title', 'content', 'roadmap_data']

class APIPlaygroundSerializer(serializers.ModelSerializer):
    class Meta:
        model = APIPlayground
        fields = ['id', 'title', 'description', 'api_endpoint']

class TutorialSerializer(serializers.ModelSerializer):
    post_title = serializers.CharField(source='post.title', read_only=True)

    class Meta:
        model = Tutorial
        fields = ['id', 'post', 'post_title', 'steps', 'current_step', 'video', 'github_repo', 'image']

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ['id', 'name', 'slug']

class PremiumContentSerializer(serializers.ModelSerializer):
    class Meta:
        model = PremiumContent
        fields = ['id', 'title', 'content', 'created_at', 'updated_at']

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email']

class PostSerializer(serializers.ModelSerializer):
    author = UserSerializer(read_only=True)
    likes_count = serializers.SerializerMethodField()
    is_liked = serializers.SerializerMethodField()
    is_saved = serializers.SerializerMethodField()
    code_snippets = CodeSnippetSerializer(many=True, read_only=True)
    resources = ResourceSerializer(many=True, read_only=True)
    comments = CommentSerializer(many=True, read_only=True)
    polls = PollSerializer(many=True, read_only=True)
    challenges = ChallengeSerializer(many=True, read_only=True)
    devops_showcases = DevOpsShowcaseSerializer(many=True, read_only=True)
    project_highlights = ProjectHighlightSerializer(many=True, read_only=True)
    interactive_roadmaps = InteractiveRoadmapSerializer(many=True, read_only=True)
    api_playgrounds = APIPlaygroundSerializer(many=True, read_only=True)
    tutorial = TutorialSerializer(read_only=True)
    tags = serializers.StringRelatedField(many=True)
    image = serializers.ImageField(max_length=None, use_url=True, required=False)

    class Meta:
        model = Post
        fields = [
            'id', 'title', 'content', 'author', 'tags',
            'complexity', 'category', 'slug', 'views', 'comments',
            'code_snippets', 'resources', 'polls', 'challenges',
            'devops_showcases', 'project_highlights', 'interactive_roadmaps',
            'api_playgrounds', 'tutorial', 'image', 'publish', 'created', 'updated', 'status', 
            'likes_count', 'is_liked', 'is_saved', 'rating', 'rating_count'
        ]

    def get_likes_count(self, obj):
        return obj.likes.count()

    def get_is_liked(self, obj):
        user = self.context['request'].user
        return user in obj.likes.all() if user.is_authenticated else False

    def get_is_saved(self, obj):
        user = self.context['request'].user
        return user in obj.saved_by.all() if user.is_authenticated else False

class CertificationSerializer(serializers.ModelSerializer):
    user = serializers.StringRelatedField()

    class Meta:
        model = Certification
        fields = ['id', 'user', 'title', 'issuer', 'date_earned']

class TestimonialSerializer(serializers.ModelSerializer):
    class Meta:
        model = Testimonial
        fields = ['id', 'author', 'content', 'company']

