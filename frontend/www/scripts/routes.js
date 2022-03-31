const BASE = `${HOST}/api`;

const ROUTES = {
    EXERCISES: '/exercises',
    WORKOUTS: '/workouts',
    WORKOUTS_FILE: '/workout-files'
};
export const getExerciseRoute = (id) =>
    BASE + ROUTES.EXERCISES`/${id}/`;

export const getAllExercisesRoute = () =>
    BASE + ROUTES.EXERCISES`/`;
export const getWorkoutsRoute = (id) =>
    BASE + ROUTES.WORKOUTS+`/${id}/`;

export const getWorkoutsFileRoute = (id) =>
    BASE + ROUTES.WORKOUTS_FILE +`/${id}/`;


