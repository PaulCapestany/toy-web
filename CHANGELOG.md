# Changelog

## v0.1.41 - 2025-12-18

### feat: add quick reset for the echo form
Add a clear control and autofocus so users can wipe stale data and start typing immediately without refreshing the page.

## v0.1.40 - 2025-12-08

### fix: surface request status updates inline  
Show a live status message while echo requests are running and update it after success or failure so users get immediate feedback without checking the console.

## v0.1.39 - 2025-11-19

### fix: keep the echo form responsive on narrow screens  
Layout tweaks give the message field and send button full width on phones so the form stays readable and usable without horizontal scrolling.

## v0.1.38 - 2025-10-27

### fix: prefer npm ci when building images  
Use the package lock during Docker builds to keep dependency installs deterministic while retaining a fallback when the lockfile is missing.

## v0.1.37 - 2025-10-27

### fix: timeout stalled echo requests  
Abort frontend fetches after 10 seconds so users get prompt feedback when the backend stops responding.

## v0.1.36 - 2025-10-27

### fix: reset message field after successful requests  
Clear the echo message input once a response arrives so users start from a fresh state.

## v0.1.35 - 2025-10-27

### docs: recommend npx serve for local testing  
Document an alternative static server command that offers cleaner logging while serving the app locally.

## v0.1.34 - 2025-10-27

### fix: reset aria-invalid when validation passes  
Remove the `aria-invalid` attribute once the message field is valid so assistive technology doesn't report stale errors.

## v0.1.33 - 2025-10-27

### fix: expose submit button accessibility state  
Mirror the submit button's disabled state in ARIA attributes so assistive tech recognizes when requests are running.

## v0.1.32 - 2025-10-27

### fix: show disabled input styling  
Give the echo message field a muted style while disabled so the UI state matches the new request locking logic.

## v0.1.31 - 2025-10-27

### fix: lock the message field while requests are running  
Temporarily disable the echo message input during network calls so users can't submit conflicting edits mid-request.

## v0.1.30 - 2025-10-24

### fix: request JSON responses explicitly  
Send an `Accept: application/json` header with echo requests so the backend knows a JSON payload is expected.

## v0.1.29 - 2025-10-23

### fix: guard against invalid JSON responses  
Catch JSON parse failures from the echo API so the UI gets a clearer error message instead of a crash.

## v0.1.28 - 2025-10-17

### fix: announce form busy state  
Let assistive technologies know the form is processing a request so users get feedback while waiting for a response.

## v0.1.27 - 2025-10-16

### fix: improve focus outlines for keyboard users  
Add high-contrast focus rings for buttons so keyboard users can immediately spot their current position.

## v0.1.26 - 2025-10-16

### fix: surface echo request errors inline  
Bubble up backend and network error details next to the form so users get actionable feedback without checking the console.

## v0.1.25 - 2025-10-15

### fix: improve echo form accessibility  
Ensure the message field advertises error feedback to assistive technology and avoids crashes when the control is missing.

## v0.1.24 - 2025-10-13

### fix: point test script at explicit jest config  
Ensure `npm test` runs successfully by invoking Jest with the project configuration file.

## v0.1.23 - 2025-10-13

### fix: focus echo results for assistive tech  
Move keyboard focus to the refreshed result container so screen reader users are notified when new echo data appears.

## v0.1.20 - 2025-10-09

### fix: show inline error feedback for echo requests  
Display validation and network errors near the form instead of interrupting with modal alerts.

## v0.1.9 - 2025-10-02

### docs: remove completed README task  
Retired the finished README documentation task from `TODO.md`.

## v0.1.0 - 2024-12-19

### feat: add Dockerfile 



## v0.1.0 - 2024-12-19

### feat: create a simple HTML page with a form to test `/echo`  
This adds a text input and a "Send" button to POST a message to `/echo`, and displays the modified message and metadata. Includes robust error handling, logging, and unit tests.
