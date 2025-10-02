# TODOs for toy-web Repository

This document outlines planned enhancements and maintenance tasks for `toy-web`.

## Guidelines

- **Semantic Versioning (SemVer)** and **Conventional Commits** rules as described in the global [CONTRIBUTING.md](./CONTRIBUTING.md).
  
- **Upon Completion:**  
  When a task is completed:
  - Remove it from `TODO.md`.
  - Update `CHANGELOG.md` with the version increment and commit message.

---

## Upcoming Tasks

### MINOR Enhancements (Non-Breaking Feature Additions)

- **feat: create a simple HTML page with a form to test /echo**  
  A text input and a "Send" button to POST a message to `/echo`, and display the modified message and metadata in a results section.

- **feat: add a status bar to show /healthz result**  
  On page load, fetch `/healthz` and show "Service is OK" or "Service is Down".

- **feat: implement a simple "Service Info" section**  
  Add a button or a section that fetches `/info` and displays the environment, version, commit info, etc.

### PATCH Improvements (Docs, Chores)

- **chore: add simple JS code documentation**  
  Add inline comments explaining how the fetch calls work, how responses are processed, etc.

- **chore: add a basic CSS stylesheet**  
  Provide a clean, simple design. Keep it minimalistic and approachable.

### Future Considerations

- **feat: switch to a lightweight framework (optional)**  
  If contributors are comfortable, introduce a small framework (like Preact or Svelte) to show how modern frontend tooling works.

- **feat: add client-side validation for the /echo form**  
  Ensure users enter non-empty messages before sending requests.

- **test: add end-to-end testing (optional)**
  Integrate with something like [Cypress](https://www.cypress.io)
