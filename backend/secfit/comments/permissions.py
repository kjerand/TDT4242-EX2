from rest_framework import permissions


class IsCommentVisibleToUser(permissions.BasePermission):
    """
    Custom permission to only allow a comment to be viewed
    if one of the following holds:
    - The comment is on a public visibility workout
    - The comment was written by the user
    - The comment is on a coach visibility workout and the user is the workout owner's coach
    - The comment is on a workout owned by the user
    """

    def has_object_permission(self, request, view, obj):
        # Write permissions are only allowed to the owner.

        return self.check_object_permission(obj.workout.visibility, obj.owner, obj.owner.coach, request.user)



    def check_object_permission(self, workout_visiblity, workout_owner, workout_coach, user):
        return (
            workout_visiblity == "PU"
            or workout_owner == user
            or (workout_visiblity== "CO" and workout_coach == user)
            or workout_owner == user
        )