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
    Exercise,
    ExerciseInstance,
    Workout
)

from workouts.serializers import (
    WorkoutFileSerializer
)


class WorkoutPermissionsTest(TestCase):
            
    def set_up(self):
        self.factory = RequestFactory()
        self.user1 = User.objects.create(username="Ola Nordmann", password="123")
        self.user2 = User.objects.create(username="Ola Sørmann", password="123", coach=self.user1)
        self.workout = Workout.objects.create(name="test", date="2012-09-04 06:00Z", notes="", owner=self.user1, visibility="PU")
        self.workout2 = Workout.objects.create(name="test", date="2012-09-04 06:00Z", notes="", owner=self.user2, visibility="PR")
        
        self.exercise = Exercise.objects.create(name="test", description="test")
        self.exerciseInstance1 = ExerciseInstance.objects.create(workout = self.workout, exercise=self.exercise, sets=1, number=1)
        self.exerciseInstance2 = ExerciseInstance.objects.create(workout = self.workout2, exercise=self.exercise, sets=1, number=1)

        self.request1 = self.factory.get("/workout")
        self.request1.user = self.user1
        self.request1.method = "POST"

        self.request2 = self.factory.get("/")
        self.request2.user = self.user2
        
    def test_is_owner(self):
        is_owner_object = IsOwner()
    
        self.assertEqual(IsOwner.has_object_permission(is_owner_object, self.request1, "view", self.workout), True)
        self.assertEqual(IsOwner.has_object_permission(is_owner_object, self.request2, "view", self.workout), False)


    def test_is_owner_of_workout_has_permission(self):

        is_owner_of_workout_object = IsOwnerOfWorkout()

        self.request1.POST["workout"] = self.workout

        IsOwnerOfWorkout.has_permission(is_owner_of_workout_object, self.request1, "view")


    def test_is_owner_of_workout_has_object_permission(self):

        is_owner_of_workout_object = IsOwnerOfWorkout()

        self.assertEqual(IsOwnerOfWorkout.has_object_permission(is_owner_of_workout_object, self.request1, "view", self.exerciseInstance1 ), True)
        self.assertEqual(IsOwnerOfWorkout.has_object_permission(is_owner_of_workout_object, self.request2, "view", self.exerciseInstance1 ), False)
    
    
    def test_is_coach_and_visible_to_coach(self): 

        is_coach_and_visible_to_coach_object = IsCoachAndVisibleToCoach()

        self.assertEqual(IsCoachAndVisibleToCoach.has_object_permission(is_coach_and_visible_to_coach_object, self.request1, "veiw", self.workout2), True)
        self.assertEqual(IsCoachAndVisibleToCoach.has_object_permission(is_coach_and_visible_to_coach_object, self.request1, "view", self.workout), False)


    def test_is_coach_of_workout_and_visible_to_coach(self):

        test_is_coach_of_workout_and_visible_to_coach_object = IsCoachOfWorkoutAndVisibleToCoach()

        self.assertEqual(IsCoachOfWorkoutAndVisibleToCoach.has_object_permission(test_is_coach_of_workout_and_visible_to_coach_object, self.request1, "view", self.exerciseInstance2), True)
        self.assertEqual(IsCoachOfWorkoutAndVisibleToCoach.has_object_permission(test_is_coach_of_workout_and_visible_to_coach_object, self.request1, "view", self.exerciseInstance1), False)
        
    def test_is_public(self):

        is_public_object = IsPublic()

        self.assertEqual(IsPublic.has_object_permission(is_public_object, self.request1, "view", self.workout), True)
        self.assertEqual(IsPublic.has_object_permission(is_public_object, self.request1, "view", self.workout2), False)


    def test_is_workout_public(self):

        is_workout_public_object = IsWorkoutPublic()

        self.assertEqual(IsWorkoutPublic.has_object_permission(is_workout_public_object, self.request1, "view", self.exerciseInstance1), True)
        self.assertEqual(IsWorkoutPublic.has_object_permission(is_workout_public_object, self.request1, "view", self.exerciseInstance2), False)




    def test_is_read_only(self):

        is_read_only_object = IsReadOnly()

        self.assertEqual(IsReadOnly.has_object_permission(is_read_only_object, self.request1, "view", self.user1), False)
        self.assertEqual(IsReadOnly.has_object_permission(is_read_only_object, self.request2, "view", self.user1), True)
