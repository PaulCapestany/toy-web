# Toy Web

Welcome to **`toy-web`**, a minimalistic frontend reference project that works alongside [`toy-service`](https://github.com/paulcapestany/toy-service) to illustrate how frontend and backend services can integrate within the bitiq ecosystem.

## Purpose & Context

- **Simple Frontend Experience:**  
  `toy-web` is a straightforward HTML/CSS/JS setup that fetches data from `toy-service` endpoints. Contributors can experiment with UI/UX without managing backend code.

- **Demonstrates API Consumption:**  
  Integrates directly with `toy-service`’s `/healthz`, `/echo`, and `/info` endpoints to show how a separate frontend can rely on a stable, documented API.

## Key Features

- **Minimal Codebase:**  
  Pure HTML, CSS, and vanilla JavaScript for ease of onboarding.

- **Interactive Examples:**  
  A simple form to test `/echo`, a status bar for `/healthz`, and a section to display `/info` data.

- **Health Signal:**  
  Inline status indicator pings `/healthz` so you know the backend is reachable before sending requests.

- **Onboarding & Learning:**  
  Ideal for frontend-focused contributors who want to understand how their work fits into a larger system without dealing with containers or complex CI/CD.

## Project Structure

```text
toy-web/
├── index.html    // Main UI page
├── style.css     // Styles
└── script.js     // Fetch logic to interact with toy-service endpoints
```

## Deployment via GitOps

`toy-web` ships application assets only. Kubernetes manifests, Helm charts, and environment-specific configuration are managed in [bitiq-io/gitops](https://github.com/bitiq-io/gitops) under `charts/toy-web/`. Open pull requests there to change how the frontend is deployed or which image tag Argo CD/Image Updater should roll out.

When filing issues or pull requests here that rely on deployment changes, include a link to the relevant GitOps chart or values file so reviewers can follow the release path. Keeping manifests centralized in the GitOps repo prevents drift—please don't commit cluster YAML to this project.

## Usage

Install dependencies once with `npm install` to ensure tooling like Jest is available.

1. **Ensure `[toy-service](https://github.com/paulcapestany/toy-service)` is running (if you want to test integration):**  
   In the `toy-service` project directory, run:
   ```bash
   make run
   ```
   This will start `toy-service` at `http://localhost:8080`. Confirm that it's up by visiting http://localhost:8080/healthz in your browser. You should see a JSON response `{"status":"ok"}`.

2. **Serve `toy-web` files locally:**  
   Navigate to the `toy-web` directory. The simplest approach is to use Python's built-in HTTP server:
   ```bash
   python3 -m http.server 8081
   ```
   This starts a static server, serving `toy-web` files at http://localhost:8081.

   Prefer [npx serve](https://www.npmjs.com/package/serve) if you already have Node.js installed—it keeps the terminal output tidy and supports automatic reloads:
   ```bash
   npx serve --listen 8081
   ```

3. **Open the frontend in your browser:**  
   Go to http://localhost:8081 in your browser. You should see the main `toy-web` page. From there, you can interact with the `/echo` endpoint (and other endpoints like `/info` or `/healthz`) through the frontend interface.

### Run Tests Locally

Run the Jest suite to confirm your changes before pushing:

```bash
npm test
```

For a quick coverage snapshot during local work, run `npm test -- --coverage`.

Coverage output lands in `coverage/`; delete it when you no longer need the report.

Need iterative feedback? Append `-- --watch` to keep Jest running between edits.

### Integrating with `toy-service`

`toy-web` expects `toy-service` at `http://localhost:8080` by default.  
If `toy-service` is running:
- `/healthz` → Shows service status in `toy-web`.
- `/echo` → Form submission in `toy-web` sends a message and displays the modified response.
- `/info` → Displays service environment, version, commit info.

You can update the URLs in `script.js` if your `toy-service` runs elsewhere.

## Related Projects

- **[toy-service](https://github.com/paulcapestany/toy-service)**: The microservice providing stable APIs to `toy-web`. Ideal starting point for backend-engineering-focused contributors. 
- **[bitiq-io/gitops](https://github.com/bitiq-io/gitops)**: Houses the Helm charts, ApplicationSets, and automation that deploy `toy-web` and `toy-service`. Start there when you need to change runtime manifests or Image Updater behaviour.

## Contributing

See `TODO.md` for upcoming tasks and `CHANGELOG.md` for past changes. Additional contributor details will be provided in `CONTRIBUTING.md` (as per planned TODOs).

Fork, clone, and start experimenting. We welcome new contributors!

## License

This project is free and open source.
