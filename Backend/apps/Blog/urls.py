from django.urls import path
from . import views
from .views import (
    PostListView, PostDetailView, PostCreateView, PostUpdateView, PostDeleteView,
    UserPostListView, CertificationListView, TestimonialListView, TutorialDetailView,
    CodeSnippetListView, CodeSnippetCreateView, DraftPostListView, PollListView,
    ChallengeListView, ResourceListView, DevOpsShowcaseListView, ProjectHighlightListView,
    InteractiveRoadmapListView, APIPlaygroundListView, TutorialListView, CommentListCreateView,
    GuestPostRequestCreateView
)

app_name = 'Blog'

urlpatterns = [
    path('', PostListView.as_view(), name='blog-home'),
    path('posts/', PostListView.as_view(), name='post-list'),
    path('user/<str:username>/', UserPostListView.as_view(), name='user-posts'),
    path('posts/<slug:slug>/', PostDetailView.as_view(), name='post-detail'),
    path('posts/new/', PostCreateView.as_view(), name='post-create'),
    path('posts/<slug:slug>/update/', PostUpdateView.as_view(), name='post-update'),
    path('posts/<slug:slug>/delete/', PostDeleteView.as_view(), name='post-delete'),
    path('about/', views.about, name='blog-about'),
    path('search/', views.search, name='search'),
    path('certifications/', CertificationListView.as_view(), name='certifications'),
    path('testimonials/', TestimonialListView.as_view(), name='testimonials'),
    path('tutorials/', TutorialListView.as_view(), name='tutorial-list'),
    path('tutorials/<int:pk>/', TutorialDetailView.as_view(), name='tutorial-detail'),
    path('tutorials/<int:pk>/progress/', views.update_tutorial_progress, name='update-tutorial-progress'),
    path('tutorials/create/', views.TutorialCreateView.as_view(), name='tutorial-create'),
    path('tutorials/<int:pk>/update/', views.TutorialUpdateView.as_view(), name='tutorial-update'),
    path('tutorials/<int:pk>/delete/', views.TutorialDeleteView.as_view(), name='tutorial-delete'),
    path('posts/<int:post_id>/code-snippets/', CodeSnippetListView.as_view(), name='code-snippets'),
    path('posts/<int:post_id>/create-code-snippet/', CodeSnippetCreateView.as_view(), name='create-code-snippet'),
    path('posts/<int:post_id>/polls/', views.create_poll, name='create-poll'),
    path('polls/', PollListView.as_view(), name='poll-list'),
    path('polls/<int:poll_id>/vote/', views.vote_poll, name='vote-poll'),
    path('posts/<int:post_id>/challenges/', views.create_challenge, name='create-challenge'),
    path('challenges/', ChallengeListView.as_view(), name='challenges'),
    path('newsletter-signup/', views.newsletter_signup, name='newsletter-signup'),
    path('posts/<int:post_id>/resources/', views.get_resources, name='get-resources'),
    path('resources/', ResourceListView.as_view(), name='resource-list'),
    path('posts/<int:post_id>/devops-showcases/', views.create_devops_showcase, name='create-devops-showcase'),
    path('devops-showcases/', DevOpsShowcaseListView.as_view(), name='devops-showcases'),
    path('posts/<int:post_id>/project-highlights/', views.create_project_highlight, name='create-project-highlight'),
    path('project-highlights/', ProjectHighlightListView.as_view(), name='project-highlight-list'),
    path('posts/<int:post_id>/interactive-roadmaps/', views.create_interactive_roadmap, name='create-interactive-roadmap'),
    path('interactive-roadmaps/', InteractiveRoadmapListView.as_view(), name='interactive-roadmaps'),
    path('posts/<int:post_id>/api-playgrounds/', views.create_api_playground, name='create-api-playground'),
    path('api-playgrounds/', APIPlaygroundListView.as_view(), name='api-playgrounds'),
    path('posts/<int:post_id>/like/', views.like_unlike_post, name='like-unlike-post'),
    path('posts/<int:post_id>/save/', views.save_unsave_post, name='save-unsave-post'),
    path('posts/<int:post_id>/comments/', CommentListCreateView.as_view(), name='comment-list-create'),
    path('guest-post-requests/', GuestPostRequestCreateView.as_view(), name='guest-post-request'),
    path('posts/<int:post_id>/rate/', views.rate_post, name='rate-post'),
    path('drafts/', DraftPostListView.as_view(), name='draft-posts'),
    path('categories/<int:category_id>/subscribe/', views.subscribe_category, name='subscribe-category'),
    path('authors/<int:author_id>/subscribe/', views.subscribe_author, name='subscribe-author'),
    path('premium-content/', views.get_premium_content, name='get-premium-content'),
]
