# Generated by Django 3.1 on 2022-03-07 12:30

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('workouts', '0005_auto_20220307_1111'),
    ]

    operations = [
        migrations.RenameField(
            model_name='exercise',
            old_name='weigth',
            new_name='weight',
        ),
    ]
