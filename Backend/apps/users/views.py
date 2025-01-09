import os
import time
from django.conf import settings
from django.shortcuts import render
from django.shortcuts import get_object_or_404
from django.core.mail import send_mail
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.parsers import MultiPartParser, FormParser
from .models import Profile, JourneyItem, Project, AboutMe, WhatIDo, ContactMessage, Skill, Social, ProjectImage
from .serializers import ProfileSerializer, JourneyItemSerializer, ContactMessageSerializer, ProjectSerializer, ProjectDetailSerializer,  AboutMeSerializer, WhatIDoSerializer, SkillSerializer, SocialSerializer

class ProfileView(APIView):
    def get(self, request):
        profile = Profile.objects.first()
        serializer = ProfileSerializer(profile)
        return Response(serializer.data)

class JourneyView(APIView):
    def get(self, request):
        items = JourneyItem.objects.all()
        serializer = JourneyItemSerializer(items, many=True)
        return Response(serializer.data)

class ContactMessageView(APIView):
    def post(self, request):
        serializer = ContactMessageSerializer(data=request.data)
        if serializer.is_valid():
            message = serializer.save()
            
            # Get the profile email
            profile = Profile.objects.first()  
            if profile:
                recipient_email = profile.email
            else:
                recipient_email = settings.EMAIL_HOST_USER  

            # Send email
            subject = f"New Contact Message from {message.full_name}"
            email_message = f"You have received a new message:\n\nFrom: {message.full_name}\nEmail: {message.email_address}\n\nMessage:\n{message.message}"
            send_mail(subject, email_message, settings.EMAIL_HOST_USER, [recipient_email])

            return Response({"success": True, "message": "Message sent successfully!"}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class ProjectView(APIView):
    parser_classes = (MultiPartParser, FormParser)

    def get(self, request):
        projects = Project.objects.all().order_by('order')
        serializer = ProjectSerializer(projects, many=True, context={'request': request})
        return Response(serializer.data)

    def post(self, request):
        if 'video' in request.FILES and request.FILES['video'].size > 2 * 1024 * 1024 * 1024:  # If file is larger than 2GB
            return Response({"message": "Please use chunked upload for files larger than 2GB"}, status=status.HTTP_400_BAD_REQUEST)
        
        serializer = ProjectSerializer(data=request.data, context={'request': request})
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
class ProjectDetailView(APIView):
    def get(self, request, pk):
        project = get_object_or_404(Project, pk=pk)
        serializer = ProjectDetailSerializer(project, context={'request': request})
        return Response(serializer.data)

class ProjectChunkUploadView(APIView):
    parser_classes = (MultiPartParser, FormParser)

    def post(self, request):
        chunk = request.FILES.get('video')
        chunk_number = int(request.POST.get('chunk'))
        total_chunks = int(request.POST.get('totalChunks'))
        filename = os.path.basename(request.POST.get('filename'))  # Sanitize filename

        temp_dir = os.path.join(settings.MEDIA_ROOT, 'temp')
        os.makedirs(temp_dir, exist_ok=True)
        temp_file_path = os.path.join(temp_dir, f"{filename}.part{chunk_number}")
        
        try:
            with open(temp_file_path, 'wb+') as destination:
                for chunk_data in chunk.chunks():
                    destination.write(chunk_data)
        except IOError as e:
            return Response({"error": f"Error writing chunk: {str(e)}"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

        return Response({"message": "Chunk received", "chunk_number": chunk_number, "total_chunks": total_chunks}, status=status.HTTP_200_OK)

class ProjectChunkMergeView(APIView):
    def post(self, request):
        filename = os.path.basename(request.data.get('filename'))
        total_chunks = int(request.data.get('totalChunks'))

        final_filename = f"{filename.split('.')[0]}_{int(time.time())}.{filename.split('.')[-1]}"
        videos_dir = os.path.join(settings.MEDIA_ROOT, 'videos')
        os.makedirs(videos_dir, exist_ok=True)
        final_path = os.path.join(videos_dir, final_filename)

        try:
            with open(final_path, 'wb') as outfile:
                for i in range(total_chunks):
                    chunk_path = os.path.join(settings.MEDIA_ROOT, 'temp', f"{filename}.part{i}")
                    if os.path.exists(chunk_path):
                        with open(chunk_path, 'rb') as infile:
                            outfile.write(infile.read())
                        os.remove(chunk_path)
                    else:
                        raise FileNotFoundError(f"Chunk file missing: {chunk_path}")

            # Create project entry in database
            project_data = request.data.copy()
            project_data['video'] = f'videos/{final_filename}'
            serializer = ProjectSerializer(data=project_data, context={'request': request})
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data, status=status.HTTP_201_CREATED)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        except Exception as e:
            # Clean up any temporary files
            for i in range(total_chunks):
                chunk_path = os.path.join(settings.MEDIA_ROOT, 'temp', f"{filename}.part{i}")
                if os.path.exists(chunk_path):
                    os.remove(chunk_path)
            if os.path.exists(final_path):
                os.remove(final_path)
            return Response({"error": f"Error merging chunks: {str(e)}"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    def delete(self, request):
        # Cleanup temporary files older than 24 hours
        temp_dir = os.path.join(settings.MEDIA_ROOT, 'temp')
        current_time = time.time()
        for filename in os.listdir(temp_dir):
            file_path = os.path.join(temp_dir, filename)
            if os.path.isfile(file_path) and os.path.getmtime(file_path) < current_time - 86400:
                os.remove(file_path)
        return Response({"message": "Temporary files cleaned up"}, status=status.HTTP_200_OK)
        
class ProjectImageUploadView(APIView):
    parser_classes = (MultiPartParser, FormParser)

    def post(self, request, pk):
        project = get_object_or_404(Project, pk=pk)
        images = request.FILES.getlist('images')
        for image in images:
            ProjectImage.objects.create(project=project, image=image)
        return Response({'message': 'Images uploaded successfully'}, status=status.HTTP_201_CREATED)


class AboutMeView(APIView):
    def get(self, request):
        about_me = AboutMe.objects.first()
        serializer = AboutMeSerializer(about_me)
        return Response(serializer.data)

class WhatIDoView(APIView):
    def get(self, request):
        what_i_do = WhatIDo.objects.all()
        serializer = WhatIDoSerializer(what_i_do, many=True)
        return Response(serializer.data)

class SkillView(APIView):
    def get(self, request):
        skills = Skill.objects.all().order_by('category', 'order')
        serializer = SkillSerializer(skills, many=True)
        return Response(serializer.data)


class SocialView(APIView):
    def get(self, request):
        socials = Social.objects.all()
        serializer = SocialSerializer(socials, many=True)
        return Response(serializer.data)
