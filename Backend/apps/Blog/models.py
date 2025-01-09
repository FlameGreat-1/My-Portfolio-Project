from django.db import models
from django.utils import timezone
from django.contrib.auth.models import User
from django.urls import reverse
from taggit.managers import TaggableManager
from django.utils.text import slugify
from ckeditor.fields import RichTextField
from django.conf import settings
import jsonfield

User = settings.AUTH_USER_MODEL

class Category(models.Model):
    name = models.CharField(max_length=100)
    slug = models.SlugField(max_length=100, unique=True)

    class Meta:
        verbose_name_plural = "Categories"
        ordering = ['name']

    def __str__(self):
        return self.name

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.name)
        super().save(*args, **kwargs)

class Post(models.Model):
    COMPLEXITY_CHOICES = [
        ('beginner', 'Beginner'),
        ('intermediate', 'Intermediate'),
        ('advanced', 'Advanced'),
    ]
    CATEGORY_CHOICES = [
        ('frontend', 'Frontend'),
        ('backend', 'Backend'),
        ('devops', 'DevOps'),
        ('programming', 'Programming'),
    ]
    STATUS_CHOICES = (
        ('draft', 'Draft'),
        ('published', 'Published'),
    )
    title = models.CharField(max_length=250)
    slug = models.SlugField(max_length=250, unique_for_date='publish')
    author = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    body = models.TextField(default='Default body text')
    publish = models.DateTimeField(default=timezone.now)
    created = models.DateTimeField(default=timezone.now)
    updated = models.DateTimeField(auto_now=True)
    status = models.CharField(max_length=10, choices=STATUS_CHOICES, default='draft')
    category = models.ForeignKey(Category, on_delete=models.SET_NULL, null=True, related_name='posts')
    complexity = models.CharField(max_length=20, choices=COMPLEXITY_CHOICES, default='beginner')
    tags = TaggableManager()
    likes = models.ManyToManyField(User, related_name='post_likes', blank=True)
    saved_by = models.ManyToManyField(User, related_name='saved_posts', blank=True)
    views = models.PositiveIntegerField(default=0)
    rating = models.DecimalField(max_digits=3, decimal_places=2, default=0.00)
    rating_count = models.PositiveIntegerField(default=0)
    is_premium = models.BooleanField(default=False)
    content = models.TextField(default="") 

    class Meta:
        ordering = ('-publish',)

    def __str__(self):
        return self.title

    def get_absolute_url(self):
        return reverse('blog:post_detail', args=[self.publish.year,
                                                 self.publish.month,
                                                 self.publish.day,
                                                 self.slug])

    def get_like_count(self):
        return self.likes.count()

    def get_save_count(self):
        return self.saved_by.count()

class Comment(models.Model):
    post = models.ForeignKey(Post, related_name='comments', on_delete=models.CASCADE)
    author = models.ForeignKey(User, on_delete=models.CASCADE)
    content = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return f"Comment by {self.author.username} on {self.post.title}"

class PremiumContent(models.Model):
    title = models.CharField(max_length=200)
    content = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return self.title

class GuestPostRequest(models.Model):
    name = models.CharField(max_length=100)
    email = models.EmailField()
    title = models.CharField(max_length=250)
    content = models.TextField()
    submitted = models.DateTimeField(auto_now_add=True)
    status = models.CharField(max_length=20, choices=[('pending', 'Pending'), ('approved', 'Approved'), ('rejected', 'Rejected')], default='pending')

    class Meta:
        ordering = ['-submitted']

    def __str__(self):
        return f"Guest Post Request: {self.title} by {self.name}"

class CodeSnippet(models.Model):
    post = models.ForeignKey(Post, related_name='code_snippets', on_delete=models.CASCADE)
    language = models.CharField(max_length=50)
    code = models.TextField()

    def __str__(self):
        return f"{self.language} snippet for {self.post.title}"

class Tutorial(models.Model):
    post = models.OneToOneField('Post', on_delete=models.CASCADE)
    steps = models.IntegerField()
    current_step = models.IntegerField(default=1)
    video = models.FileField(upload_to='tutorials/videos/', null=True, blank=True)
    github_repo = models.URLField(max_length=200, null=True, blank=True)
    image = models.ImageField(upload_to='tutorials/images/', null=True, blank=True)

    def __str__(self):
        return f"Tutorial for {self.post.title}"


class Resource(models.Model):
    post = models.ForeignKey(Post, related_name='resources', on_delete=models.CASCADE)
    title = models.CharField(max_length=100)
    file = models.FileField(upload_to='resources/')

    def __str__(self):
        return self.title

class Poll(models.Model):
    question = models.CharField(max_length=200)
    post = models.ForeignKey(Post, related_name='polls', on_delete=models.CASCADE)

    def __str__(self):
        return self.question

class PollOption(models.Model):
    poll = models.ForeignKey(Poll, related_name='options', on_delete=models.CASCADE)
    option_text = models.CharField(max_length=200)
    votes = models.IntegerField(default=0)

    def __str__(self):
        return self.option_text

class Challenge(models.Model):
    post = models.ForeignKey(Post, related_name='challenges', on_delete=models.CASCADE)
    title = models.CharField(max_length=100)
    description = models.TextField()
    solution = models.TextField()
    created_at = models.DateTimeField(default=timezone.now)

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return self.title

class Certification(models.Model):
    user = models.ForeignKey(User, related_name='certifications', on_delete=models.CASCADE)
    title = models.CharField(max_length=100)
    issuer = models.CharField(max_length=100)
    date_earned = models.DateField()

    class Meta:
        ordering = ['-date_earned']

    def __str__(self):
        return f"{self.title} - {self.user.username}"

class Newsletter(models.Model):
    email = models.EmailField(unique=True)
    subscribed_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-subscribed_at']

    def __str__(self):
        return self.email

class Testimonial(models.Model):
    author = models.CharField(max_length=100)
    content = models.TextField()
    company = models.CharField(max_length=100)
    created_at = models.DateTimeField(default=timezone.now)

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return f"Testimonial by {self.author}"

class DevOpsShowcase(models.Model):
    post = models.ForeignKey(Post, related_name='devops_showcases', on_delete=models.CASCADE)
    title = models.CharField(max_length=100)
    description = RichTextField()
    image = models.ImageField(upload_to='devops_showcases/')
    pipeline_data = jsonfield.JSONField(null=True, blank=True)
    infrastructure_diagram = models.ImageField(upload_to='devops_showcases/diagrams/', null=True, blank=True) 
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return self.title


class ProjectHighlight(models.Model):
    post = models.ForeignKey(Post, related_name='project_highlights', on_delete=models.CASCADE)
    title = models.CharField(max_length=100)
    description = RichTextField()
    github_url = models.URLField()
    live_demo_url = models.URLField(blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return self.title

class InteractiveRoadmap(models.Model):
    post = models.ForeignKey(Post, related_name='interactive_roadmaps', on_delete=models.CASCADE)
    title = models.CharField(max_length=100)
    content = RichTextField()
    created_at = models.DateTimeField(auto_now_add=True)
    roadmap_data = models.JSONField(null=True, blank=True)

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return self.title

class APIPlayground(models.Model):
    post = models.ForeignKey(Post, related_name='api_playgrounds', on_delete=models.CASCADE)
    title = models.CharField(max_length=100)
    description = models.TextField()
    api_endpoint = models.URLField()
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return self.title
