"""
Tests for the workouts application.
"""

from pydoc import visiblename
from django.test import TestCase, RequestFactory
from users.models import User
from workouts.permissions import (
    IsOwner,
    IsCoachAndVisibleToCoach,
    IsOwnerOfWorkout,
    IsCoachOfWorkoutAndVisibleToCoach,
    IsReadOnly,
    IsPublic,
    IsWorkoutPublic,
)
from workouts.models import (
    Workout
)

from workouts.serializers import (
    WorkoutFileSerializer
)


class WorkoutPermissionsTest(TestCase):
            
    def setUp(self):
        self.factory = RequestFactory()
        self.user1 = User.objects.create(username="Ola Nordmann", password="123")
        self.user2 = User.objects.create(username="Ola Sørmann", password="123")
        self.workout = Workout.objects.create(name="test", date="2012-09-04 06:00Z", notes="", owner=self.user1, visibility="PU")
        self.workout2 = Workout.objects.create(name="test", date="2012-09-04 06:00Z", notes="", owner=self.user1, visibility="PR")


        self.request1 = self.factory.get("/workout")
        self.request1.user = self.user1
        self.request1.method = "POST"

        self.request2 = self.factory.get("/")
        self.request2.user = self.user2
        
    def test_is_owner(self):
        is_owner_object = IsOwner()
    
        self.assertEqual(IsOwner.has_object_permission(is_owner_object, self.request1, "view", self.workout), True)
        self.assertEqual(IsOwner.has_object_permission(is_owner_object, self.request2, "view", self.workout), False)


    # def test_is_owner_of_workout_has_permission(self):

    #     is_owner_of_workout_object = IsOwnerOfWorkout()

    #     self.request1.POST["workout"] = self.workout

    #     IsOwnerOfWorkout.has_permission(is_owner_of_workout_object, self.request1, "view")


    # def test_is_owner_of_workout_has_object_permission(self):

    #     is_owner_of_workout_object = IsOwnerOfWorkout()

    #     IsOwnerOfWorkout.has_object_permission(is_owner_of_workout_object, self.request1, "view", self.workout )
    
    
    
    # def test_IsCoachOfWorkoutAndVisibleToCoach(self): 

    #     IsCoachAndVisibleToCoach_object = IsCoachAndVisibleToCoach()

    #     IsCoachAndVisibleToCoach.has_object_permission(IsCoachAndVisibleToCoach_object, self.request1, "veiw", self.user1)


    # def test_IsCoachOfWorkoutAndVisibleToCoach(self):

    #     IsCoachOfWorkoutAndVisibleToCoach_object = IsCoachOfWorkoutAndVisibleToCoach()

    #     IsCoachOfWorkoutAndVisibleToCoach.has_object_permission(IsCoachOfWorkoutAndVisibleToCoach_object, self.request1, "view", self.user1)

    def test_IsPublic(self):

        IsPublic_object = IsPublic()

        self.assertEqual(IsPublic.has_object_permission(IsPublic_object, self.request1, "view", self.workout), True)
        self.assertEqual(IsPublic.has_object_permission(IsPublic_object, self.request1, "view", self.workout2), False)


    # def test_IsWorkoutPublic(self):

    #     IsWorkoutPublic_object = IsWorkoutPublic()

    #     IsWorkoutPublic.has_object_permission(IsWorkoutPublic_object, self.request1, "view", self.user1)


    def test_IsReadOnly(self):

        IsReadOnly_object = IsReadOnly()

        self.assertEqual(IsReadOnly.has_object_permission(IsReadOnly_object, self.request1, "view", self.user1), False)
        self.assertEqual(IsReadOnly.has_object_permission(IsReadOnly_object, self.request2, "view", self.user1), True)
