from django.contrib import admin
from .models import (
    Post,  Category, CodeSnippet, Tutorial, Resource, Comment, Poll, PollOption,
    Challenge, Certification, Newsletter, Testimonial, DevOpsShowcase,
    ProjectHighlight, InteractiveRoadmap, APIPlayground
)

class CodeSnippetInline(admin.StackedInline):
    model = CodeSnippet
    extra = 1

class ResourceInline(admin.StackedInline):
    model = Resource
    extra = 1

class CommentInline(admin.StackedInline):
    model = Comment
    extra = 0

class PollOptionInline(admin.TabularInline):
    model = PollOption
    extra = 3

class ChallengeInline(admin.StackedInline):
    model = Challenge
    extra = 0  

@admin.register(Post)
class PostAdmin(admin.ModelAdmin):
    list_display = ('title', 'author', 'publish', 'status')  
    list_filter = ('status', 'created', 'publish', 'author')
    search_fields = ('title', 'body')
    prepopulated_fields = {'slug': ('title',)}
    raw_id_fields = ('author',)
    date_hierarchy = 'publish'
    ordering = ('status', 'publish')

@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    list_display = ('name', 'slug')
    prepopulated_fields = {'slug': ('name',)}


@admin.register(Tutorial)
class TutorialAdmin(admin.ModelAdmin):
    list_display = ('post', 'steps', 'current_step')

@admin.register(Poll)
class PollAdmin(admin.ModelAdmin):
    list_display = ('question', 'post')
    inlines = [PollOptionInline]

@admin.register(Certification)
class CertificationAdmin(admin.ModelAdmin):
    list_display = ('title', 'user', 'issuer', 'date_earned')

@admin.register(Newsletter)
class NewsletterAdmin(admin.ModelAdmin):
    list_display = ('email', 'subscribed_at')

@admin.register(Testimonial)
class TestimonialAdmin(admin.ModelAdmin):
    list_display = ('author', 'company')

@admin.register(Comment)
class CommentAdmin(admin.ModelAdmin):
    list_display = ('author', 'post', 'created_at')

@admin.register(Resource)
class ResourceAdmin(admin.ModelAdmin):
    list_display = ('title', 'post', 'file')

@admin.register(DevOpsShowcase)
class DevOpsShowcaseAdmin(admin.ModelAdmin):
    list_display = ('title', 'post', 'description', 'image')

@admin.register(ProjectHighlight)
class ProjectHighlightAdmin(admin.ModelAdmin):
    list_display = ('title', 'post', 'description', 'github_url', 'live_demo_url')

@admin.register(InteractiveRoadmap)
class InteractiveRoadmapAdmin(admin.ModelAdmin):
    list_display = ('title', 'post', 'content')

@admin.register(APIPlayground)
class APIPlaygroundAdmin(admin.ModelAdmin):
    list_display = ('title', 'post', 'description', 'api_endpoint')

# Register the remaining models
admin.site.register(CodeSnippet)
admin.site.register(PollOption)
admin.site.register(Challenge)
