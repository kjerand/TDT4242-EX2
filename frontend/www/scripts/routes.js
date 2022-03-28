const BASE = `${HOST}/api`;

const ROUTES = {
    EXERCISES: '/exercises',
    WORKOUTS: '/workouts'
};

export const getExerciseRoute = (id) =>
    BASE + ROUTES.EXERCISES+`/${id}/`;


export default ROUTES;