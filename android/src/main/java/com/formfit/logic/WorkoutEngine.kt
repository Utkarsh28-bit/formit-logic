package com.formfit.logic

/**
 * Data models reflecting the Typescript definitions
 */
data class ExerciseLog(
    val id: String,
    val weightUsed: Double,
    val repsPerformed: Int,
    val rpe: Int // Rating of Perceived Exertion (1-10)
)

data class WorkoutTarget(
    val weight: Double,
    val reps: Int,
    val reason: String
)

/**
 * The Native Kotlin Implementation of the Fitness Algorithm.
 * This mirrors `services/workoutLogic.ts`.
 */
object WorkoutEngine {
    
    /**
     * Determines the next set's weight and reps based on Progressive Overload principles.
     */
    fun calculateNextTarget(
        lastLog: ExerciseLog?, 
        defaultWeight: Double, 
        targetReps: Int
    ): WorkoutTarget {
        
        // 1. Calibration: No history, start with defaults.
        if (lastLog == null) {
            return WorkoutTarget(
                weight = defaultWeight,
                reps = targetReps,
                reason = "Calibration: Starting with baseline metrics."
            )
        }

        val (id, weight, reps, rpe) = lastLog

        // 2. Progressive Overload: User is strong (Low RPE, hit reps).
        // Logic: Increase intensity (weight).
        if (rpe < 7 && reps >= targetReps) {
            return WorkoutTarget(
                weight = weight + 2.5,
                reps = targetReps,
                reason = "Progressive Overload: Previous set was effective (RPE < 7)."
            )
        }

        // 3. Maintenance/Hypertrophy: Good effort, keep pushing.
        // Logic: Maintain weight to solidify strength.
        if (reps >= targetReps && rpe in 7..9) {
            return WorkoutTarget(
                weight = weight,
                reps = targetReps,
                reason = "Maintenance: High quality volume. Reinforcing strength."
            )
        }

        // 4. Deload/Adaptation: Failed to hit target.
        if (reps < targetReps) {
            // Significant failure (< 50% target) -> Drop weight
            if (reps < targetReps * 0.5) {
                return WorkoutTarget(
                    weight = weight - 5.0,
                    reps = targetReps,
                    reason = "Deload: Technical breakdown detected. Reducing load."
                )
            }
            // Minor miss -> Keep weight, aim to match reps next time
            return WorkoutTarget(
                weight = weight,
                reps = reps, // Target what they actually achieved
                reason = "Adaptation: Matching previous capacity to build consistency."
            )
        }

        // Fallback
        return WorkoutTarget(weight, targetReps, "Standard: Maintaining target.")
    }
    
    fun calculateUserLevel(experienceYears: Double): String {
        return when {
            experienceYears < 1.0 -> "Beginner"
            experienceYears < 3.0 -> "Intermediate"
            else -> "Advanced"
        }
    }
    
    fun calculateProteinTarget(weightKg: Double): Int {
        // 2g per kg rule
        return (weightKg * 2).toInt()
    }
}