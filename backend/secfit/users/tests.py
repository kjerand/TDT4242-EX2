from django.contrib.auth import get_user_model
from django.forms import ValidationError
from django.test import TestCase
from users.serializers import (
    UserSerializer
)
# Create your tests here.

class UserSerializerTest(TestCase):
    def test_valid_password(self):
        user_serializer_object = UserSerializer()

        password = "123"
        user_serializer_object.password = password
        user_serializer_object.password1 = password

        self.assertEqual(UserSerializer.validate_password(user_serializer_object, password), password)


    def test_create_user(self):
        user_serializer_object = UserSerializer()
        user_1 = {
            "username": "Ola Nordmann",
            "email": "ola@nordmann.com",
            "password": "Password123",
            "phone_number": "90909090",
            "country": "Norway",
            "city": "Oslo",
            "street_address": "Karl Johan",
        }

        created_user_1 = UserSerializer.create(user_serializer_object, user_1)
        
        self.assertEqual(user_1["email"], created_user_1.email)
        self.assertEqual(user_1["country"], created_user_1.country)

        user_2 = {
            "username": "Kari Nordmann",
            "email": "kari@nordmann.com",
            "password": "Password123",
            "phone_number": "90909090",
            "country": "Polen",
            "city": "Oslo",
            "street_address": "Karl Johan",
        }
        
        created_user_2 = UserSerializer.create(user_serializer_object, user_2)

        self.assertNotEqual(created_user_1.email, created_user_2.email)
        self.assertNotEqual(created_user_1.country, created_user_2.country)