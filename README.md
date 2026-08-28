# CareGrid

CareGrid is a service finder that helps first responders connect people experiencing homelessness to
shelter, food, medical, and crisis services in real time. It's built as a SvelteKit + Tailwind CSS app.

Two things it does today:

- **Service Directory** (`/`) — a browsable list of partner sites, loaded from a local SQLite database.
- **Relay Card** (`/relay-card`) — a step-by-step flow for issuing a warm handoff: pick a scenario and
  a place, confirm the details with a human (availability, transport, consent), then issue a simple
  card with a short match code.

All scenario and directory data in this repo is **synthetic** — fictional people and fictional
providers, standing in for real services. See [CLAUDE.md](CLAUDE.md) for the full list of application
rules (no real client data, no scoring or ranking, no claiming live capacity, human confirmation
required before every handoff).

## Getting started

```sh
npm install
npm run db:build   # generates data/caregrid.sqlite from the CSVs in docs/
npm run dev        # or: npm run dev -- --open
```

`npm run db:build` has to run before `dev`, `build`, or `preview` — the homepage reads the service
directory from `data/caregrid.sqlite` at request time, and that file is gitignored (generated, not
committed).

## Commands

| Command | What it does |
| --- | --- |
| `npm run dev` | Start the dev server |
| `npm run build` | Production build |
| `npm run preview` | Preview the production build |
| `npm run check` | Type-check the project (`svelte-check`) |
| `npm run test` | Install Playwright browsers and run the e2e suite |
| `npm run db:build` | Rebuild `data/caregrid.sqlite` from the CSVs in `docs/` |

## Contributing

Contributions are welcome — see [CONTRIBUTING.md](CONTRIBUTING.md) for setup details and the ground
rules for working with the synthetic data in this project.

## License

[MIT](LICENSE)
