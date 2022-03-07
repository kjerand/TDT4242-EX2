# Generated by Django 3.1 on 2022-03-07 13:23

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('workouts', '0006_auto_20220307_1230'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='exercise',
            name='sets',
        ),
        migrations.RemoveField(
            model_name='exercise',
            name='weight',
        ),
        migrations.AddField(
            model_name='exerciseinstance',
            name='duration',
            field=models.IntegerField(default=0),
        ),
        migrations.AddField(
            model_name='exerciseinstance',
            name='weight',
            field=models.IntegerField(default=0),
        ),
    ]