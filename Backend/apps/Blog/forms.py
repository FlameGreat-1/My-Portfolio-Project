from django import forms
from .models import Post, Comment, Poll, Challenge, Newsletter, CodeSnippet, Resource

class CommentForm(forms.ModelForm):
    class Meta:
        model = Comment
        fields = ['content']
        widgets = {
            'content': forms.Textarea(attrs={'rows': 4}),
        }

class PollForm(forms.ModelForm):
    options = forms.CharField(
        widget=forms.Textarea(attrs={'rows': 3}),
        help_text='Enter options separated by commas'
    )

    class Meta:
        model = Poll
        fields = ['question', 'options']

class ChallengeForm(forms.ModelForm):
    class Meta:
        model = Challenge
        fields = ['title', 'description', 'solution']
        widgets = {
            'description': forms.Textarea(attrs={'rows': 4}),
            'solution': forms.Textarea(attrs={'rows': 4}),
        }

class NewsletterForm(forms.ModelForm):
    class Meta:
        model = Newsletter
        fields = ['email']

class CodeSnippetForm(forms.ModelForm):
    class Meta:
        model = CodeSnippet
        fields = ['language', 'code']
        widgets = {
            'code': forms.Textarea(attrs={'rows': 10}),
        }

class ResourceForm(forms.ModelForm):
    class Meta:
        model = Resource
        fields = ['title', 'file']

class PostFilterForm(forms.Form):
    COMPLEXITY_CHOICES = [('', 'All')] + Post.COMPLEXITY_CHOICES
    CATEGORY_CHOICES = [('', 'All')] + Post.CATEGORY_CHOICES

    complexity = forms.ChoiceField(choices=COMPLEXITY_CHOICES, required=False)
    category = forms.ChoiceField(choices=CATEGORY_CHOICES, required=False)
    tag = forms.CharField(required=False)

class SearchForm(forms.Form):
    query = forms.CharField(label='Search', max_length=100)
