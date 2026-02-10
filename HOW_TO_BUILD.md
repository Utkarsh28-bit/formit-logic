# How to Build FormFit for Android

You have successfully generated the Kotlin source code for the Algorithmic Fitness Engine.

## Steps to Build in Android Studio

1.  **Export the Web App**:
    *   Run `npm run build` (or your build command).
    *   This generates a `dist/` or `build/` folder containing `index.html`, JS, and CSS files.

2.  **Setup Android Project**:
    *   Open Android Studio.
    *   Create a new "Empty Activity" project.
    *   Copy the contents of `android/src/main/java/` to your project's `src/main/java/` folder.
    *   Copy `android/src/main/AndroidManifest.xml` to `src/main/`.
    *   Update your `build.gradle.kts` with the dependencies provided.

3.  **Import Assets**:
    *   Create a folder `src/main/assets/` in your Android project.
    *   Copy the **content** of your web build folder (step 1) into `src/main/assets/`.

4.  **Run**:
    *   Connect your device or start an emulator.
    *   Run the project. The `MainActivity` will load `file:///android_asset/index.html` and run your fitness engine natively.

## Kotlin Logic Port
A pure Kotlin port of the fitness algorithm is available in `com.formfit.logic.WorkoutEngine.kt`. You can use this if you decide to move logic from the web layer to the native layer in the future.
