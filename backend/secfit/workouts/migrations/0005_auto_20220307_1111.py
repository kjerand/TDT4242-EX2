# Generated by Django 3.1 on 2022-03-07 11:11

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('workouts', '0004_auto_20211020_0950'),
    ]

    operations = [
        migrations.AddField(
            model_name='exercise',
            name='sets',
            field=models.CharField(default='0', max_length=50),
        ),
        migrations.AddField(
            model_name='exercise',
            name='weigth',
            field=models.CharField(default='0', max_length=50),
        ),
    ]
