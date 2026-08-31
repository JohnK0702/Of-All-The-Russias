# 1905: Третий Рим

A playable static prologue for a long-form **The Campaign Trail**-style political-horror concept set in Imperial Russia between 1905 and 1914.

The prototype contains four interconnected questions, hidden state, and several possible ending cards. It establishes the proposed visual language—an illuminated prayer book crossed with an Okhrana dossier—without requiring a backend or external image assets.

## Run locally

```bash
npm run start
```

Open <http://localhost:4173>. Choices are applied immediately; complete all four prototype questions to see an ending, then use **Begin Again** to explore another route.

## Production build

```bash
npm run build
```

The build command assembles a deployment-ready copy in `dist/`. All browser entry
paths are relative, so the result works at a domain root or beneath a repository
subpath such as `https://example.github.io/Of-All-The-Russias/`.

Preview the exact production artifact locally with:

```bash
npm run preview
```

## GitHub Pages deployment

The included Pages workflow builds and publishes `dist/` after a push to `work`
or `main`. It can also be started manually from the **Actions** tab. In the
repository settings, set **Pages → Build and deployment → Source** to
**GitHub Actions**; no package installation, secrets, or custom base path is
required.
