from django.contrib import admin
from .models import (
    Profile, JourneyItem, Project, ProjectImage, ContactMessage, 
    AboutMe, WhatIDo, Skill, Social
)


@admin.register(JourneyItem)
class JourneyItemAdmin(admin.ModelAdmin):
    list_display = ('type', 'title', 'institution', 'date_range', 'order')
    list_filter = ('type',)
    search_fields = ('title', 'institution', 'description')
    ordering = ('order', 'type', '-date_range')

class ProjectImageInline(admin.TabularInline):
    model = ProjectImage
    extra = 1

@admin.register(Project)
class ProjectAdmin(admin.ModelAdmin):
    list_display = ('title', 'stack', 'github_url', 'live_url')
    search_fields = ('title', 'about', 'stack')
    list_filter = ('stack',)
    inlines = [ProjectImageInline]



@admin.register(ContactMessage)
class ContactMessageAdmin(admin.ModelAdmin):
    list_display = ('full_name', 'email_address', 'created_at')
    search_fields = ('full_name', 'email_address', 'message')
    readonly_fields = ('created_at',)

admin.site.register(Profile)
admin.site.register(AboutMe)
admin.site.register(WhatIDo)

@admin.register(Skill)
class SkillAdmin(admin.ModelAdmin):
    list_display = ('name', 'category', 'icon', 'order')
    list_filter = ('category',)
    search_fields = ('name',)
    list_editable = ('category', 'order')

admin.site.register(Social)
