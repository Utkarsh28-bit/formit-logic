import { Exercise, DietType, Allergy } from './types';

export const EXERCISES: Exercise[] = [
  {
    id: 'squat',
    name: 'Barbell Squat',
    // Using loremflickr to get an actual squat image or similar
    gifUrl: 'https://loremflickr.com/400/300/squat,gym/all', 
    defaultWeight: 60,
    targetReps: 8,
    muscleGroup: 'Legs',
    instructions: 'Keep chest up. Drive through heels. Maintain neutral spine.'
  },
  {
    id: 'front_squat',
    name: 'Front Squat',
    gifUrl: 'https://loremflickr.com/400/300/frontsquat,gym/all',
    defaultWeight: 40,
    targetReps: 8,
    muscleGroup: 'Legs',
    instructions: 'Rest bar on front delts. Keep elbows high. Squat deep keeping torso upright.'
  },
  {
    id: 'bench_press',
    name: 'Bench Press',
    gifUrl: 'https://loremflickr.com/400/300/benchpress,gym/all',
    defaultWeight: 40,
    targetReps: 10,
    muscleGroup: 'Push',
    instructions: 'Retract scapula. Lower bar to mid-chest. Press up explosively.'
  },
  {
    id: 'incline_db_press',
    name: 'Incline DB Press',
    gifUrl: 'https://loremflickr.com/400/300/dumbbellpress,gym/all',
    defaultWeight: 20,
    targetReps: 12,
    muscleGroup: 'Push',
    instructions: 'Set bench to 30 degrees. Press weights up converging slightly at top. Control descent.'
  },
  {
    id: 'tricep_pushdown',
    name: 'Tricep Pushdown',
    gifUrl: 'https://loremflickr.com/400/300/triceppushdown,gym/all',
    defaultWeight: 15,
    targetReps: 12,
    muscleGroup: 'Push',
    instructions: 'Keep elbows tucked at sides. Extend arms fully downwards. Control the return.'
  },
  {
    id: 'skull_crusher',
    name: 'Skull Crusher',
    gifUrl: 'https://loremflickr.com/400/300/skullcrusher,gym/all',
    defaultWeight: 20,
    targetReps: 10,
    muscleGroup: 'Push',
    instructions: 'Lie on bench. Lower bar to forehead by bending elbows. Extend back up.'
  },
  {
    id: 'deadlift',
    name: 'Deadlift',
    gifUrl: 'https://loremflickr.com/400/300/deadlift,gym/all',
    defaultWeight: 80,
    targetReps: 5,
    muscleGroup: 'Pull',
    instructions: 'Hinge at hips. Keep bar close to shins. Lock out hips at top.'
  },
  {
    id: 'rdl',
    name: 'Romanian Deadlift',
    gifUrl: 'https://loremflickr.com/400/300/deadlift,hamstrings/all',
    defaultWeight: 60,
    targetReps: 10,
    muscleGroup: 'Pull',
    instructions: 'Hinge primarily at hips with slight knee bend. Lower until hamstring stretch.'
  },
  {
    id: 'bicep_curl',
    name: 'Barbell Bicep Curl',
    gifUrl: 'https://loremflickr.com/400/300/bicepcurl,gym/all',
    defaultWeight: 20,
    targetReps: 12,
    muscleGroup: 'Pull',
    instructions: 'Keep elbows fixed at sides. Curl bar up towards chest. Squeeze biceps at top.'
  },
  {
    id: 'hammer_curl',
    name: 'Dumbbell Hammer Curl',
    gifUrl: 'https://loremflickr.com/400/300/hammercurl,gym/all',
    defaultWeight: 10,
    targetReps: 12,
    muscleGroup: 'Pull',
    instructions: 'Hold dumbbells with neutral grip. Curl up keeping palms facing each other.'
  }
];

export const INITIAL_PROFILE = {
  name: '',
  heightCm: 180,
  weightKg: 75,
  experienceYears: 0,
  diet: DietType.VEG,
  allergy: Allergy.NONE,
  onboardingComplete: false
};