# Generated by Django 3.1 on 2022-03-08 14:18

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0010_user_friends'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='user',
            name='friends',
        ),
    ]