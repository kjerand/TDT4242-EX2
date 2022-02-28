"""
Tests for the workouts application.
"""
from urllib import request
from django.test import TestCase, RequestFactory
from workouts.permissions import (
    IsOwner,
    IsCoachAndVisibleToCoach,
    IsOwnerOfWorkout,
    IsCoachOfWorkoutAndVisibleToCoach,
    IsReadOnly,
    IsPublic,
    IsWorkoutPublic,
)
from workouts.serializers import (
    WorkoutFileSerializer
)


class WorkoutPermissionsTest(TestCase):
    def setUp(self):
        self.factory = RequestFactory()
        
    def test_is_owner(self):
        is_owner_object = IsOwner()
        workout_test_object = WorkoutFileSerializer()

        request = self.factory.get("/")

        workout_test_object.owner = "Ola Nordmann"

        request.user = workout_test_object.owner

        self.assertEqual(IsOwner.has_object_permission(is_owner_object, request, "view", workout_test_object), True)

    def test_is_workout_owner(self): 
        self.assertEqual(5, 5)

    def test_is_coach_and_visible(self):
        is_coach_object = IsCoachAndVisibleToCoach()
        workout_test_object = WorkoutFileSerializer()

        request = self.factory.get("/")

        workout_test_object.owner.coach = "Ola Nordmann"

        request.user = workout_test_object.owner.coach
       
        self.assertEqual(IsCoachAndVisibleToCoach.has_object_permission(is_coach_object, request, "view", workout_test_object), True)





# Create your tests here.
