# Generated by Django 5.1.4 on 2024-12-28 03:16

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('Blog', '0004_alter_apiplayground_options_alter_category_options_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='interactiveroadmap',
            name='roadmap_data',
            field=models.JSONField(blank=True, null=True),
        ),
    ]
