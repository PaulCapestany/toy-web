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

- **Onboarding & Learning:**  
  Ideal for frontend-focused contributors who want to understand how their work fits into a larger system without dealing with containers or complex CI/CD.

## Project Structure

```text
toy-web/
├── index.html    // Main UI page
├── style.css     // Styles
└── script.js     // Fetch logic to interact with toy-service endpoints
```

*(This may evolve as we add features.)*

## Running Locally

Since this is a static web project, just open `index.html` in your browser.  
Or start a simple HTTP server:

```bash
python3 -m http.server 8081
```

Then open http://localhost:8081 in your browser.

### Integrating with `toy-service`

`toy-web` expects `toy-service` at `http://localhost:8080` by default.  
If `toy-service` is running:
- `/healthz` → Shows service status in `toy-web`.
- `/echo` → Form submission in `toy-web` sends a message and displays the modified response.
- `/info` → Displays service environment, version, commit info.

You can update the URLs in `script.js` if your `toy-service` runs elsewhere.

## Contributing & Future Plans

Check `TODO.md` for planned improvements like:
- Enhancing the UI/UX with more styling.
- Adding validation to the `/echo` form.
- Possibly integrating simple testing tools in the future.

For now, the goal is to keep it simple and showcase how frontend and backend interact in the bitiq ecosystem.

## Related Projects

- **[toy-service](https://github.com/paulcapestany/toy-service)**: The microservice providing stable APIs to `toy-web`. Ideal starting point for backend-engineering-focused contributors. 
- **[gitops](https://github.com/paulcapestany/gitops)**: Manages CI/CD (i.e. building and deployment) of the bitiq microservices using GitOps principles. Ideal for SREs and infrastructure-focused contributors.

## License

This project is free and open source.