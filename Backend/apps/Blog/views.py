from django.shortcuts import render, get_object_or_404
from django.contrib.auth.mixins import LoginRequiredMixin, UserPassesTestMixin
from django.contrib.auth.decorators import login_required
from django.contrib.auth.models import User
from django.contrib.auth import get_user_model
from django.views.generic import ListView, DetailView, CreateView, UpdateView, DeleteView
from django.db.models import Q
from django.http import JsonResponse
from django.views.decorators.http import require_POST
from rest_framework.permissions import IsAuthenticated, AllowAny, IsAdminUser
from rest_framework import generics, permissions, status
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.parsers import MultiPartParser, FormParser
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.filters import SearchFilter, OrderingFilter
from taggit.models import Tag
from .models import PremiumContent
from .serializers import PremiumContentSerializer
from .models import Category
from .models import (
    Post, Comment, GuestPostRequest, Poll, PollOption, Challenge, Certification,
    Newsletter, DevOpsShowcase, ProjectHighlight, InteractiveRoadmap, APIPlayground,
    CodeSnippet, Resource, Testimonial, Tutorial
)
from .serializers import (
    PostSerializer, CommentSerializer, GuestPostRequestSerializer, PollSerializer, ChallengeSerializer,
    CertificationSerializer, DevOpsShowcaseSerializer, ProjectHighlightSerializer,
    InteractiveRoadmapSerializer, APIPlaygroundSerializer, CodeSnippetSerializer,
    ResourceSerializer, TestimonialSerializer, TutorialSerializer
)

class PostListView(generics.ListAPIView):
    serializer_class = PostSerializer
    permission_classes = [permissions.AllowAny]

    def get_queryset(self):
        queryset = Post.objects.all().order_by('-publish')
        status = self.request.query_params.get('status')
        tag = self.request.query_params.get('tag')
        category = self.request.query_params.get('category')
        complexity = self.request.query_params.get('complexity')

        if status:
            queryset = queryset.filter(status=status)
        if tag:
            queryset = queryset.filter(tags__name__in=[tag])
        if category:
            queryset = queryset.filter(category=category)
        if complexity:
            queryset = queryset.filter(complexity=complexity)

        return queryset

    def list(self, request, *args, **kwargs):
        queryset = self.get_queryset()
        serializer = self.get_serializer(queryset, many=True)
        tags = Tag.objects.all().values_list('name', flat=True)
        categories = dict(Post.CATEGORY_CHOICES)
        complexities = dict(Post.COMPLEXITY_CHOICES)
        statuses = dict(Post.STATUS_CHOICES)
        return Response({
            'posts': serializer.data,
            'tags': list(tags),
            'categories': categories,
            'complexities': complexities,
            'statuses': statuses
        })


class PostDetailView(generics.RetrieveAPIView):
    queryset = Post.objects.filter(status='published')
    serializer_class = PostSerializer
    permission_classes = [AllowAny]
    lookup_field = 'slug'

    def get_serializer_context(self):
        context = super().get_serializer_context()
        context['request'] = self.request
        return context

    def retrieve(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = self.get_serializer(instance)
        related_posts = Post.objects.filter(tags__in=instance.tags.all()).exclude(id=instance.id).distinct()[:3]
        related_posts_serializer = PostSerializer(related_posts, many=True)
        data = serializer.data
        data['related_posts'] = related_posts_serializer.data
        return Response(data)

@api_view(['POST'])
@permission_classes([AllowAny])
def like_unlike_post(request, post_id):
    post = get_object_or_404(Post, id=post_id)
    if request.user.is_authenticated:
        if request.user in post.likes.all():
            post.likes.remove(request.user)
            return Response({'liked': False}, status=status.HTTP_200_OK)
        else:
            post.likes.add(request.user)
            return Response({'liked': True}, status=status.HTTP_200_OK)
    else:
        return Response({'error': 'Authentication required'}, status=status.HTTP_401_UNAUTHORIZED)

@api_view(['POST'])
@permission_classes([AllowAny])
def save_unsave_post(request, post_id):
    post = get_object_or_404(Post, id=post_id)
    if request.user.is_authenticated:
        if request.user in post.saved_by.all():
            post.saved_by.remove(request.user)
            return Response({'saved': False}, status=status.HTTP_200_OK)
        else:
            post.saved_by.add(request.user)
            return Response({'saved': True}, status=status.HTTP_200_OK)
    else:
        return Response({'error': 'Authentication required'}, status=status.HTTP_401_UNAUTHORIZED)

class PostCreateView(generics.CreateAPIView):
    queryset = Post.objects.all()
    serializer_class = PostSerializer
    permission_classes = [IsAdminUser]

    def perform_create(self, serializer):
        serializer.save(author=self.request.user)

class PostUpdateView(generics.UpdateAPIView):
    queryset = Post.objects.all()
    serializer_class = PostSerializer
    permission_classes = [IsAdminUser]
    lookup_field = 'slug'

class PostDeleteView(generics.DestroyAPIView):
    queryset = Post.objects.all()
    serializer_class = PostSerializer
    permission_classes = [IsAdminUser]
    lookup_field = 'slug'

@api_view(['GET'])
def about(request):
    return Response({'title': 'About'})

class DraftPostListView(generics.ListAPIView):
    queryset = Post.objects.filter(status='draft')
    serializer_class = PostSerializer
    permission_classes = [IsAdminUser]

    def get_queryset(self):
        return Post.objects.filter(status='draft', author=self.request.user)

class CommentListCreateView(generics.ListCreateAPIView):
    queryset = Comment.objects.all()
    serializer_class = CommentSerializer
    permission_classes = [AllowAny]

    def get_queryset(self):
        return Comment.objects.filter(post__id=self.kwargs['post_id'], active=True)

    def perform_create(self, serializer):
        post = get_object_or_404(Post, id=self.kwargs['post_id'])
        serializer.save(post=post, name=self.request.user.username if self.request.user.is_authenticated else 'Anonymous')

class GuestPostRequestCreateView(generics.CreateAPIView):
    queryset = GuestPostRequest.objects.all()
    serializer_class = GuestPostRequestSerializer
    permission_classes = [AllowAny]

@api_view(['POST'])
@permission_classes([AllowAny])
def rate_post(request, post_id):
    post = get_object_or_404(Post, id=post_id)
    rating = request.data.get('rating')
    if rating is not None:
        post.rating = (post.rating * post.rating_count + float(rating)) / (post.rating_count + 1)
        post.rating_count += 1
        post.save()
        return Response({'new_rating': post.rating}, status=status.HTTP_200_OK)
    return Response({'error': 'Rating is required'}, status=status.HTTP_400_BAD_REQUEST)

class UserPostListView(generics.ListAPIView):
    serializer_class = PostSerializer
    permission_classes = [AllowAny]

    def get_queryset(self):
        user = get_object_or_404(User, username=self.kwargs.get('username'))
        return Post.objects.filter(author=user).order_by('-date_posted')

@api_view(['POST'])
@permission_classes([IsAdminUser])
def create_poll(request, post_id):
    post = get_object_or_404(Post, id=post_id)
    serializer = PollSerializer(data=request.data)
    if serializer.is_valid():
        poll = serializer.save(post=post)
        for option in request.data.get('options', '').split(','):
            PollOption.objects.create(poll=poll, option_text=option.strip())
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def vote_poll(request, poll_id):
    poll = get_object_or_404(Poll, id=poll_id)
    option_id = request.data.get('option')
    if option_id:
        option = get_object_or_404(PollOption, id=option_id)
        option.votes += 1
        option.save()
        return Response({'message': 'Your vote has been recorded.'}, status=status.HTTP_200_OK)
    return Response({'message': 'Please select an option to vote.'}, status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
@permission_classes([IsAdminUser])
def create_challenge(request, post_id):
    post = get_object_or_404(Post, id=post_id)
    serializer = ChallengeSerializer(data=request.data)
    if serializer.is_valid():
        challenge = serializer.save(post=post)
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class CertificationListView(generics.ListAPIView):
    queryset = Certification.objects.all()
    serializer_class = CertificationSerializer
    permission_classes = [AllowAny]
    pagination_class = None

@api_view(['GET'])
@permission_classes([AllowAny])
def search(request):
    query = request.query_params.get('q', '')
    results = Post.objects.filter(Q(title__icontains=query) | Q(content__icontains=query))
    serializer = PostSerializer(results, many=True)
    return Response(serializer.data)

@api_view(['POST'])
@permission_classes([AllowAny])
def newsletter_signup(request):
    email = request.data.get('email')
    if email:
        Newsletter.objects.get_or_create(email=email)
        return Response({'message': 'You have successfully subscribed to our newsletter.'}, status=status.HTTP_201_CREATED)
    return Response({'message': 'Please provide a valid email address.'}, status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
@permission_classes([IsAdminUser])
def create_resource(request, post_id):
    post = get_object_or_404(Post, id=post_id)
    serializer = ResourceSerializer(data=request.data)
    if serializer.is_valid():
        resource = serializer.save(post=post)
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
@permission_classes([AllowAny])
def get_resources(request, post_id):
    post = get_object_or_404(Post, id=post_id)
    resources = Resource.objects.filter(post=post)
    serializer = ResourceSerializer(resources, many=True)
    return Response(serializer.data)


@api_view(['POST'])
@permission_classes([IsAdminUser])
def create_code_snippet(request, post_id):
    post = get_object_or_404(Post, id=post_id)
    serializer = CodeSnippetSerializer(data=request.data)
    if serializer.is_valid():
        snippet = serializer.save(post=post)
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
@permission_classes([IsAdminUser])
def create_devops_showcase(request, post_id):
    post = get_object_or_404(Post, id=post_id)
    serializer = DevOpsShowcaseSerializer(data=request.data)
    if serializer.is_valid():
        showcase = serializer.save(post=post)
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
@permission_classes([IsAdminUser])
def create_project_highlight(request, post_id):
    post = get_object_or_404(Post, id=post_id)
    serializer = ProjectHighlightSerializer(data=request.data)
    if serializer.is_valid():
        highlight = serializer.save(post=post)
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
@permission_classes([IsAdminUser])
def create_interactive_roadmap(request, post_id):
    post = get_object_or_404(Post, id=post_id)
    serializer = InteractiveRoadmapSerializer(data=request.data)
    if serializer.is_valid():
        roadmap = serializer.save(post=post)
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
@permission_classes([IsAdminUser])
def create_api_playground(request, post_id):
    post = get_object_or_404(Post, id=post_id)
    serializer = APIPlaygroundSerializer(data=request.data)
    if serializer.is_valid():
        playground = serializer.save(post=post)
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def subscribe_category(request, category_id):
    category = get_object_or_404(Category, id=category_id)
    user = request.user
    if user in category.subscribers.all():
        category.subscribers.remove(user)
        return Response({'subscribed': False}, status=status.HTTP_200_OK)
    else:
        category.subscribers.add(user)
        return Response({'subscribed': True}, status=status.HTTP_200_OK)
    
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def subscribe_author(request, author_id):
    author = get_object_or_404(User, id=author_id)
    user = request.user
    if user in author.profile.subscribers.all():
        author.profile.subscribers.remove(user)
        return Response({'subscribed': False}, status=status.HTTP_200_OK)
    else:
        author.profile.subscribers.add(user)
        return Response({'subscribed': True}, status=status.HTTP_200_OK)
    
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_premium_content(request):
    premium_content = PremiumContent.objects.all()
    serializer = PremiumContentSerializer(premium_content, many=True)
    return Response(serializer.data)



class CodeSnippetListView(generics.ListAPIView):
    queryset = CodeSnippet.objects.all()
    serializer_class = CodeSnippetSerializer
    permission_classes = [AllowAny]

class CodeSnippetCreateView(generics.CreateAPIView):
    queryset = CodeSnippet.objects.all()
    serializer_class = CodeSnippetSerializer
    permission_classes = [IsAdminUser]

    def perform_create(self, serializer):
        serializer.save(post_id=self.kwargs.get('post_id'))

class TestimonialListView(generics.ListAPIView):
    queryset = Testimonial.objects.all()
    serializer_class = TestimonialSerializer
    permission_classes = [AllowAny]
    pagination_class = None

class TutorialDetailView(generics.RetrieveUpdateAPIView):
    queryset = Tutorial.objects.all()
    serializer_class = TutorialSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
    parser_classes = (MultiPartParser, FormParser)

    def update(self, request, *args, **kwargs):
        partial = kwargs.pop('partial', False)
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data, partial=partial)
        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer)

        if getattr(instance, '_prefetched_objects_cache', None):
            instance._prefetched_objects_cache = {}

        return Response(serializer.data)

class TutorialListView(generics.ListCreateAPIView):
    queryset = Tutorial.objects.all()
    serializer_class = TutorialSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
    parser_classes = (MultiPartParser, FormParser)
    filter_backends = [DjangoFilterBackend, SearchFilter, OrderingFilter]
    filterset_fields = ['post__category', 'steps']
    search_fields = ['post__title', 'post__content']
    ordering_fields = ['post__publish', 'steps']

    def perform_create(self, serializer):
        post_id = self.request.data.get('post')
        post = Post.objects.get(id=post_id)
        serializer.save(post=post)

@api_view(['POST'])
@permission_classes([permissions.IsAuthenticated])
def update_tutorial_progress(request, tutorial_id):
    tutorial = get_object_or_404(Tutorial, id=tutorial_id)
    new_step = request.data.get('current_step')
    
    if new_step is not None and isinstance(new_step, int):
        if 1 <= new_step <= tutorial.steps:
            tutorial.current_step = new_step
            tutorial.save()
            return Response({'message': 'Tutorial progress updated successfully.'}, status=status.HTTP_200_OK)
        else:
            return Response({'error': 'Invalid step number.'}, status=status.HTTP_400_BAD_REQUEST)
    else:
        return Response({'error': 'Invalid data provided.'}, status=status.HTTP_400_BAD_REQUEST)
class PollListView(generics.ListAPIView):
    queryset = Poll.objects.all()
    serializer_class = PollSerializer
    permission_classes = [AllowAny]

class ChallengeListView(generics.ListAPIView):
    queryset = Challenge.objects.all()
    serializer_class = ChallengeSerializer
    permission_classes = [AllowAny]

class ResourceListView(generics.ListAPIView):
    queryset = Resource.objects.all()
    serializer_class = ResourceSerializer
    permission_classes = [AllowAny]

class DevOpsShowcaseListView(generics.ListAPIView):
    queryset = DevOpsShowcase.objects.all()
    serializer_class = DevOpsShowcaseSerializer
    permission_classes = [AllowAny]

class ProjectHighlightListView(generics.ListAPIView):
    queryset = ProjectHighlight.objects.all()
    serializer_class = ProjectHighlightSerializer
    permission_classes = [AllowAny]

class InteractiveRoadmapListView(generics.ListAPIView):
    queryset = InteractiveRoadmap.objects.all()
    serializer_class = InteractiveRoadmapSerializer
    permission_classes = [AllowAny]

class APIPlaygroundListView(generics.ListAPIView):
    queryset = APIPlayground.objects.all()
    serializer_class = APIPlaygroundSerializer
    permission_classes = [AllowAny]

class TutorialCreateView(generics.CreateAPIView):
    queryset = Tutorial.objects.all()
    serializer_class = TutorialSerializer
    permission_classes = [permissions.IsAdminUser]
    parser_classes = (MultiPartParser, FormParser)

    def perform_create(self, serializer):
        post_id = self.request.data.get('post')
        post = Post.objects.get(id=post_id)
        serializer.save(post=post)
        
class TutorialUpdateView(generics.UpdateAPIView):
    queryset = Tutorial.objects.all()
    serializer_class = TutorialSerializer
    permission_classes = [permissions.IsAdminUser]
    parser_classes = (MultiPartParser, FormParser)

    def perform_update(self, serializer):
        serializer.save()

class TutorialDeleteView(generics.DestroyAPIView):
    queryset = Tutorial.objects.all()
    serializer_class = TutorialSerializer
    permission_classes = [permissions.IsAdminUser]