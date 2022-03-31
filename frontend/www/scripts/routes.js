const BASE = `${HOST}/api`;

const ROUTES = {
    EXERCISES: '/exercises',
    WORKOUTS: '/workouts',
    WORKOUTS_FILE: '/workout-files'
};
const getExerciseRoute = (id) =>
    BASE + ROUTES.EXERCISES + `/${id}/`;

const getAllExercisesRoute = () =>
    BASE + ROUTES.EXERCISES + `/`;

const getWorkoutsRoute = (id) =>
    BASE + ROUTES.WORKOUTS+`/${id}/`;

export const getWorkoutsFileRoute = (id) =>
    BASE + ROUTES.WORKOUTS_FILE +`/${id}/`;

export default {
    getExerciseRoute,
    getAllExercisesRoute,
    getWorkoutsRoute,
    getWorkoutsFileRoute
};


