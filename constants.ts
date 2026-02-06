import { Exercise, DietType, Allergy } from './types';

export const EXERCISES: Exercise[] = [
  {
    id: 'squat',
    name: 'Barbell Squat',
    gifUrl: 'https://assets.mixkit.co/videos/preview/mixkit-man-doing-squats-at-the-gym-2354-large.mp4', 
    videoUrl: 'https://www.youtube.com/embed/gcNh17Ckjgg',
    defaultWeight: 60,
    targetReps: 8,
    muscleGroup: 'Legs',
    instructions: 'Keep chest up. Drive through heels. Maintain neutral spine.'
  },
  {
    id: 'front_squat',
    name: 'Front Squat',
    // Fallback to Squat video if specific front squat stock footage unavailable, or generic barbell
    gifUrl: 'https://assets.mixkit.co/videos/preview/mixkit-man-training-with-a-barbell-in-a-gym-2359-large.mp4',
    videoUrl: 'https://www.youtube.com/embed/v-mQMCnQS-M',
    defaultWeight: 40,
    targetReps: 8,
    muscleGroup: 'Legs',
    instructions: 'Rest bar on front delts. Keep elbows high. Squat deep keeping torso upright.'
  },
  {
    id: 'leg_extension',
    name: 'Leg Extension',
    gifUrl: 'https://assets.mixkit.co/videos/preview/mixkit-woman-working-out-legs-on-a-machine-2068-large.mp4',
    videoUrl: 'https://www.youtube.com/embed/YyvSfVjQeL0',
    defaultWeight: 30,
    targetReps: 12,
    muscleGroup: 'Legs',
    instructions: 'Sit on machine. Extend legs fully. Squeeze quads at top.'
  },
  {
    id: 'leg_curl',
    name: 'Leg Curl',
    gifUrl: 'https://loremflickr.com/800/600/gym,machine/all',
    videoUrl: 'https://www.youtube.com/embed/ELOCsoDSmrg',
    defaultWeight: 30,
    targetReps: 12,
    muscleGroup: 'Legs',
    instructions: 'Lie face down. Curl heels towards glutes. Control the eccentric.'
  },
  {
    id: 'leg_press',
    name: 'Leg Press',
    gifUrl: 'https://assets.mixkit.co/videos/preview/mixkit-man-training-legs-on-the-machine-22874-large.mp4',
    videoUrl: 'https://www.youtube.com/embed/IZxyjW7MPJQ',
    defaultWeight: 100,
    targetReps: 10,
    muscleGroup: 'Legs',
    instructions: 'Place feet shoulder width. Lower weight until knees are 90 degrees. Push back up.'
  },
  {
    id: 'calf_raise',
    name: 'Standing Calf Raise',
    gifUrl: 'https://loremflickr.com/800/600/calves,gym/all',
    videoUrl: 'https://www.youtube.com/embed/-M4-G8p8fmc',
    defaultWeight: 40,
    targetReps: 15,
    muscleGroup: 'Legs',
    instructions: 'Stand on edge of step. Lower heels for stretch. Raise up on toes.'
  },
  {
    id: 'sumo_squat',
    name: 'Sumo Squat',
    gifUrl: 'https://loremflickr.com/800/600/sumosquat,gym/all',
    videoUrl: 'https://www.youtube.com/embed/9ZuCXAkDDKg',
    defaultWeight: 50,
    targetReps: 10,
    muscleGroup: 'Legs',
    instructions: 'Wide stance, toes out. Keep torso upright. Squat deep.'
  },
  {
    id: 'bench_press',
    name: 'Bench Press',
    gifUrl: 'https://assets.mixkit.co/videos/preview/mixkit-man-working-out-chest-press-on-a-machine-1301-large.mp4',
    videoUrl: 'https://www.youtube.com/embed/rT7DgCr-3pg',
    defaultWeight: 40,
    targetReps: 10,
    muscleGroup: 'Push',
    instructions: 'Retract scapula. Lower bar to mid-chest. Press up explosively.'
  },
  {
    id: 'incline_db_press',
    name: 'Incline DB Press',
    gifUrl: 'https://assets.mixkit.co/videos/preview/mixkit-man-training-with-dumbbells-in-a-gym-4767-large.mp4',
    videoUrl: 'https://www.youtube.com/embed/8iPEnn-ltbc',
    defaultWeight: 20,
    targetReps: 12,
    muscleGroup: 'Push',
    instructions: 'Set bench to 30 degrees. Press weights up converging slightly at top. Control descent.'
  },
  {
    id: 'tricep_pushdown',
    name: 'Tricep Pushdown',
    gifUrl: 'https://assets.mixkit.co/videos/preview/mixkit-young-man-doing-triceps-exercises-in-the-gym-2358-large.mp4',
    videoUrl: 'https://www.youtube.com/embed/6kALZikXxLc',
    defaultWeight: 15,
    targetReps: 12,
    muscleGroup: 'Push',
    instructions: 'Keep elbows tucked at sides. Extend arms fully downwards. Control the return.'
  },
  {
    id: 'skull_crusher',
    name: 'Skull Crusher',
    gifUrl: 'https://loremflickr.com/800/600/gym,barbell/all',
    videoUrl: 'https://www.youtube.com/embed/d_KZxkY_0cM',
    defaultWeight: 20,
    targetReps: 10,
    muscleGroup: 'Push',
    instructions: 'Lie on bench. Lower bar to forehead by bending elbows. Extend back up.'
  },
  {
    id: 'deadlift',
    name: 'Deadlift',
    gifUrl: 'https://assets.mixkit.co/videos/preview/mixkit-athlete-training-deadlift-at-the-gym-42171-large.mp4',
    videoUrl: 'https://www.youtube.com/embed/op9kVnSso6Q',
    defaultWeight: 80,
    targetReps: 5,
    muscleGroup: 'Pull',
    instructions: 'Hinge at hips. Keep bar close to shins. Lock out hips at top.'
  },
  {
    id: 'rdl',
    name: 'Romanian Deadlift',
    gifUrl: 'https://assets.mixkit.co/videos/preview/mixkit-man-training-with-a-barbell-in-a-gym-2359-large.mp4',
    videoUrl: 'https://www.youtube.com/embed/jcjfUXWmAp4',
    defaultWeight: 60,
    targetReps: 10,
    muscleGroup: 'Pull',
    instructions: 'Hinge primarily at hips with slight knee bend. Lower until hamstring stretch.'
  },
  {
    id: 'bicep_curl',
    name: 'Barbell Bicep Curl',
    gifUrl: 'https://assets.mixkit.co/videos/preview/mixkit-man-exercising-with-dumbbells-in-a-gym-4762-large.mp4',
    videoUrl: 'https://www.youtube.com/embed/kwG2ipFRgfo',
    defaultWeight: 20,
    targetReps: 12,
    muscleGroup: 'Pull',
    instructions: 'Keep elbows fixed at sides. Curl bar up towards chest. Squeeze biceps at top.'
  },
  {
    id: 'hammer_curl',
    name: 'Dumbbell Hammer Curl',
    gifUrl: 'https://loremflickr.com/800/600/biceps,dumbbell/all',
    videoUrl: 'https://www.youtube.com/embed/zC3nLlEvin4',
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
