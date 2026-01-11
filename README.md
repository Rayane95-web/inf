<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# Run and deploy your AI Studio app

This contains everything you need to run your app locally.

View your app in AI Studio: https://ai.studio/apps/drive/1vPUPv9xdCfAYMpKwPCkF3CigihV9N9AZ

## Run Locally

**Prerequisites:**  Node.js


1. Install dependencies:
   `npm install`
2. Set the `GEMINI_API_KEY` in [.env.local](.env.local) to your Gemini API key
3. Run the app:
   `npm run dev`

4. Build & run Android (Capacitor):
   - Build web assets: `npm run build`
   - Sync web assets & native platforms: `npx cap sync android`
   - Open Android project in Android Studio: `npx cap open android`
   - In Android Studio, build & run on a device or emulator (use a physical device or set up an AVD).

AdMob setup for Android:
   - Add your AdMob App ID to `android/app/src/main/res/values/strings.xml` as `admob_app_id` (the project includes Google's sample test App ID).
   - Ensure the manifest contains the `meta-data` entry with `com.google.android.gms.ads.APPLICATION_ID` (already added).
   - For testing, use Google's test ad units (e.g., banner test ad unit `ca-app-pub-3940256099942544/6300978111`). The app's `components/AdBanner.tsx` uses a test banner id by default when none is provided.
   - Replace test App ID and ad unit IDs with your production IDs only when you're ready to publish.
   - If you use Firebase or other services, add `google-services.json` and the Google Services Gradle plugin as needed.

Testing AdMob in the app (dev helper):
   - In development builds, a small **Ad Debug** panel appears at the bottom-left of the app. Use it to call `init`, `showBanner`, `hideBanner`, `removeBanner`, `prepareInterstitial`, and `showInterstitial` with test IDs.
   - Watch the log panel in the Ad Debug UI for success or error messages, and check Logcat when running on Android for SDK-level logs.

CI build (GitHub Actions) — get an APK without Android Studio:
   - A workflow (`.github/workflows/android-build.yml`) is included that builds a debug APK on push to `main` or when manually triggered (`workflow_dispatch`).
   - After a run completes, open the workflow run in GitHub Actions and download the `app-debug-apk` artifact (contains `app-debug.apk`).
   - If you want me to trigger a build now, tell me and I'll push a test commit (or you can trigger it manually from the Actions UI).
