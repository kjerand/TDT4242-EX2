# Generated by Django 3.1 on 2022-03-07 14:23

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('workouts', '0007_auto_20220307_1323'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='exerciseinstance',
            name='duration',
        ),
    ]
