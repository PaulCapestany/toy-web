# Changelog

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
