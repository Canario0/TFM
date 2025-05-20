# Product Comparison Android App

A native Android application for managing product comparisons, built with Kotlin and following Material Design guidelines.

## Prerequisites

- Android Studio (Latest version)
- JDK 11 or higher
- Android SDK 24 or higher
- Gradle 8.0 or higher

## Project Structure

```
app/
├── src/
│   ├── main/
│   │   ├── java/
│   │   │   └── com/example/comparathor/
│   │   │       ├── adapters/     # RecyclerView adapters
│   │   │       ├── api/          # API facade implementation
│   │   │       ├── entities/     # Data models and entities
│   │   │       ├── retrofit/     # Retrofit services
│   │   │       ├── utils/        # Utility classes
│   │   │       ├── viewModel/    # ViewModel classes
│   │   │       ├── MainActivity.java
│   │   │       └── ProductsActivity.java
│   │   ├── res/                 # Resources
│   │   │   ├── drawable/        # Images and drawables
│   │   │   ├── layout/          # XML layouts
│   │   │   ├── values/          # Strings, colors, themes
│   │   │   └── mipmap/          # App icons
│   │   └── AndroidManifest.xml
│   ├── test/                    # Unit tests
│   └── androidTest/             # Instrumented tests
├── build.gradle.kts            # App-level build configuration
└── proguard-rules.pro          # ProGuard rules
```

## Building the Project

### Development Build

```bash
./gradlew assembleDebug
```

### Release Build

```bash
./gradlew assembleRelease
```

## Available Gradle Tasks

- `./gradlew build` - Build the entire project
- `./gradlew clean` - Clean the build directory
- `./gradlew lint` - Run lint checks
- `./gradlew check` - Run all checks (lint, tests)