from django.test import TestCase
from users.serializers import (
    UserSerializer
)
# Create your tests here.

class UserSerializerTest(TestCase):
    def test_valid_password(self):
        user_serializer_object = UserSerializer()

        password = " "
        user_serializer_object.password = password
        user_serializer_object.password1 = password

        self.assertEqual(UserSerializer.validate_password(user_serializer_object, password), password)

        password = " "
        user_serializer_object.password = password
        user_serializer_object.password1 = password

        self.assertEqual(UserSerializer.validate_password(user_serializer_object, password), password)


    def test_create_user(self):
        user_serializer_object = UserSerializer()


    

     
     
     
       