## Download APK

[⬇ Download Latest APK](https://github.com/codebyharii/Newshub/releases/latest/download/app-release.apk)

# NewsHub · React Native

A production-quality news reader demonstrating architecture patterns for
the React Native Fresher assessment.

## Screens
- **Home** — Paginated post feed with search & category filter
- **Detail** — Full post view with author info and related posts
- **Bookmarks** — Persisted saved posts (survives app kill)

## How to Run
1. `npm install`
2. Download the required fonts (`Syne`, `DM Sans`, `JetBrains Mono`) from Google Fonts as `.ttf` files and place them in `src/assets/fonts/`.
3. `npx react-native-asset` (registers custom fonts)
4. Android: `npx react-native run-android`
   *(iOS is not supported on Windows machines without a Mac)*

## Key Technical Decisions
| Decision | Rationale |
|---|---|
| RTK (Redux Toolkit) | Reduces boilerplate vs vanilla Redux |
| redux-persist (bookmarks only) | Avoid persisting volatile API data |
| Page-based pagination | JSONPlaceholder supports `_page`+`_limit` |
| Debounced search (300ms) | Prevents excessive API calls per keystroke |
| getItemLayout on FlatList | Constant-height cards → skip dynamic measure |
| AppState listener | Stale-while-revalidate on foreground resume |

## With More Time
- Add unit tests (Jest + React Native Testing Library)
- Offline mode with full cache via MMKV
- Skeleton screens with proper shimmer using Reanimated 3
- Pull-to-refresh with haptic feedback
- Accessibility audit (a11y labels, focus management)
- CI/CD pipeline (GitHub Actions + Fastlane)
