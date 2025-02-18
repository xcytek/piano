# Piano Soundboard - Mobile Build Instructions

This guide explains how to build the Piano Soundboard APK locally.

## Prerequisites

1. Install Java Development Kit (JDK) 11 or newer
2. Install Android Studio and Android SDK
3. Set up environment variables:
   ```bash
   export ANDROID_HOME=$HOME/Android/Sdk
   export PATH=$PATH:$ANDROID_HOME/tools
   export PATH=$PATH:$ANDROID_HOME/platform-tools
   ```
4. Install Cordova globally:
   ```bash
   npm install -g cordova
   ```

## Building the APK

1. Navigate to the piano project directory:
   ```bash
   cd mobile/piano
   ```

2. Add Android platform if not already added:
   ```bash
   cordova platform add android
   ```

3. Build the APK:
   ```bash
   # Development build
   cordova build android

   # Release build (unsigned)
   cordova build android --release --no-telemetry
   ```

The unsigned APK will be generated at:
`platforms/android/app/build/outputs/apk/release/app-release-unsigned.apk`

## Signing the APK (for Production)

To create a signed APK for Google Play Store:

1. Generate a keystore (if you don't have one):
   ```bash
   keytool -genkey -v -keystore piano-release-key.keystore -alias piano -keyalg RSA -keysize 2048 -validity 10000
   ```

2. Sign the APK:
   ```bash
   jarsigner -verbose -sigalg SHA1withRSA -digestalg SHA1 -keystore piano-release-key.keystore app-release-unsigned.apk piano
   ```

3. Optimize the APK (requires Android SDK build tools):
   ```bash
   zipalign -v 4 app-release-unsigned.apk piano-soundboard.apk
   ```

## Troubleshooting

- If you see "ANDROID_HOME is not set" error, make sure to set up the environment variables correctly
- For audio permission issues, check that the permissions in config.xml are properly set
- For web asset issues, ensure the www directory contains the latest web bundle

## Web Bundle

The `www-bundle` directory contains the optimized web assets needed for the APK build. These files are automatically copied to the `www` directory during the build process.

To update the web bundle:
1. Build the web application (`npm run build`)
2. Copy the contents of `dist/public` to `mobile/piano/www`
3. Run the Cordova build command
