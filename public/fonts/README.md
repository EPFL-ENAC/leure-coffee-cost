# Fonts

Suisse Int'l is EPFL's brand font. EPFL has the licence to use it, but the files
are not redistributed in public repositories. EPFL's own charte repo
(`epfl-si/elements`) keeps this folder empty for the same reason.

Drop the files here at deploy time and they are picked up automatically:

- SuisseIntl-Light.woff2 (300)
- SuisseIntl-Regular.woff2 (400)
- SuisseIntl-Medium.woff2 (500)
- SuisseIntl-SemiBold.woff2 (600)
- SuisseIntl-Bold.woff2 (700)

Without them the app falls back to Arial, which is EPFL's own sanctioned fallback.
The `@font-face` rules live in `src/styles/epfl.css`.
