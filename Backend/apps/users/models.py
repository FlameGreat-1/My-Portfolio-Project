
from django.db import models

class JourneyItem(models.Model):
    ITEM_TYPES = (
        ('education', 'Education'),
        ('internship', 'Internship'),
        ('certification', 'Certification'),
        ('work', 'Work Experience'),
    )
    type = models.CharField(max_length=20, choices=ITEM_TYPES)
    title = models.CharField(max_length=200)
    institution = models.CharField(max_length=200)
    description = models.TextField()
    date_range = models.CharField(max_length=50)
    order = models.IntegerField(default=0)

    class Meta:
        ordering = ['order', 'type', '-date_range']

    def __str__(self):
        return f"{self.get_type_display()}: {self.title}"


class ContactMessage(models.Model):
    full_name = models.CharField(max_length=100)
    email_address = models.EmailField()
    message = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Message from {self.full_name}"


class Project(models.Model):
    title = models.CharField(max_length=200)
    about = models.TextField()
    stack = models.CharField(max_length=500)
    github_url = models.URLField()
    live_url = models.URLField()
    image = models.ImageField(upload_to='project_images/', null=True, blank=True)
    video = models.FileField(upload_to='project_videos/', null=True, blank=True)
    order = models.IntegerField(default=0)

    class Meta:
        ordering = ['order']

    def __str__(self):
        return self.title

class ProjectImage(models.Model):
    project = models.ForeignKey(Project, related_name='images', on_delete=models.CASCADE)
    image = models.ImageField(upload_to='project_images/')

    def __str__(self):
        return f"Image for {self.project.title}"


class AboutMe(models.Model):
    content = models.TextField()

    def __str__(self):
        return "About Me"

ICON_CHOICES = [
    # DevOps
    ('SiAmazonaws', 'AWS'),
    ('SiDocker', 'Docker'),
    ('SiKubernetes', 'Kubernetes'),
    ('SiTerraform', 'Terraform'),
    ('SiJenkins', 'Jenkins'),
    
    # Backend
    ('SiDjango', 'Django'),
    ('FaNodeJs', 'Node.js'),
    ('SiPostman', 'Postman (REST API)'),
    ('SiFastapi', 'FastAPI'),
    
    # Frontend
    ('FaReact', 'React'),
    ('SiNextdotjs', 'Next.js'),
    ('SiTypescript', 'TypeScript'),
    ('SiTailwindcss', 'TailwindCSS'),
    ('SiUnocss', 'UnoCSS'),
    ('FaSass', 'Sass'),
    ('SiFramer', 'Framer Motion'),
    ('SiFirebase', 'Firebase'),
    ('SiHugo', 'Hugo'),
    ('SiRedux', 'Redux'),
    ('FaHtml5', 'HTML5'),
    
    # Programming
    ('FaPython', 'Python'),
    ('SiJavascript', 'JavaScript'),
    ('SiLatex', 'LaTeX'),
    ('SiMatlabSimulink', 'MATLAB'),
    
    # Other tools and technologies
    ('FaGithub', 'GitHub'),
    ('FaGitAlt', 'Git'),
    ('SiVisualstudiocode', 'VS Code'),
    ('FaFigma', 'Figma'),
    ('SiCanva', 'Canva'),
    ('SiNpm', 'NPM'),
    ('SiYarn', 'Yarn'),
    ('SiJest', 'Jest'),
    ('FaCss3Alt', 'CSS3'),
    ('FaBootstrap', 'Bootstrap'),

    # icons for WhatIDo
    ('FaLaptopCode', 'Software Engineering'),
    ('FaFlask', 'Chemical Engineering'),
    ('FaPaintBrush', 'UX/UI Designing'),
    ('FaChartLine', 'Financial Analysis'),
    ('FaGlobe', 'Web Development'),

    
    # Default option
    ('FaCode', 'Default (Code Icon)'),
]

class Skill(models.Model):
    CATEGORY_CHOICES = [
        ('devops', 'DevOps'),
        ('backend', 'Backend'),
        ('frontend', 'Frontend'),
        ('programming', 'Programming'),
        ('other', 'Other'),
    ]

    name = models.CharField(max_length=100)
    icon = models.CharField(max_length=50, choices=ICON_CHOICES, default='FaCode')
    category = models.CharField(max_length=20, choices=CATEGORY_CHOICES, default='other')
    order = models.IntegerField(default=0)

    class Meta:
        ordering = ['category', 'order']

    def __str__(self):
        return self.name
    
class WhatIDo(models.Model):
    title = models.CharField(max_length=100)
    description = models.TextField()
    icon = models.CharField(max_length=50, choices=ICON_CHOICES, default='FaCode')

    def __str__(self):
        return self.title

class Social(models.Model):
    SOCIAL_TYPES = [
        ('Email', 'Email'),
        ('WhatsApp', 'WhatsApp'),
        ('Phone', 'Phone'),
        ('Location', 'Location'),
    ]

    type = models.CharField(max_length=50, choices=SOCIAL_TYPES)
    icon = models.CharField(max_length=50)
    value = models.CharField(max_length=255)
    link = models.URLField(blank=True)
    order = models.IntegerField(default=0)

    class Meta:
        ordering = ['order']

    def __str__(self):
        return self.type

class Profile(models.Model):
    name = models.CharField(max_length=100)
    title = models.CharField(max_length=100)
    image = models.ImageField(upload_to='profile_images/')
    email = models.EmailField()
    phone = models.CharField(max_length=20)
    location = models.CharField(max_length=100)
    resume_file = models.FileField(upload_to='resumes/', blank=True, null=True)
    cv_file = models.FileField(upload_to='cvs/', blank=True, null=True)
    github = models.URLField(blank=True)
    facebook = models.URLField(blank=True)
    twitter = models.URLField(blank=True)
    linkedin = models.URLField(blank=True)
    whatsapp = models.URLField(blank=True)

    def __str__(self):
        return self.name
