# Contributing to CareGrid

Thanks for considering a contribution. This project is a demo/prototype for first-responder outreach
tooling, and it comes with some non-negotiable rules because of what it's simulating — please read the
"Ground rules" section before opening a PR.

## Setup

```sh
npm install
npm run db:build   # generates data/caregrid.sqlite from the CSVs in docs/
npm run dev
```

Before pushing, make sure these pass:

```sh
npm run check   # type-checking (svelte-check)
npm run test    # Playwright e2e suite (builds and runs against the production preview)
```

## Ground rules

This app is about people experiencing homelessness, so contributions need to respect a few hard
restrictions (the full list is in [CLAUDE.md](CLAUDE.md) under "Application Rules"):

- **No real client data.** Never add real names, real HMIS records, or any personally identifying
  information about an actual person. Everything in `docs/*.csv` and `data/caregrid.sqlite` must stay
  fictional — see the `is_synthetic` column, which is enforced by a database `CHECK` constraint.
- **No scoring, ranking, or profiling** of any person, real or synthetic.
- **No live capacity claims.** Don't imply that shelter/service availability shown here is real-time —
  the data model has a `capacity_is_not_live` flag for a reason. Every place should be confirmed by
  phone before someone is sent there.
- **Every handoff needs a human confirmation point.** Don't build anything that issues a placement or
  eligibility decision without a person explicitly confirming it first.
- **Don't replace or bypass Coordinated Entry.** This tool feeds into existing systems (e.g. One Roof /
  211), it doesn't stand in for them.

If a change you're proposing runs into one of these, open an issue first to discuss it before writing
code.

## Adding or editing sample data

Scenario and directory data lives in `docs/*.csv` and is mirrored into SQLite via `npm run db:build`
(`scripts/build-db.mjs`). When adding rows:

- Keep person/context fields obviously fictional (e.g. "Fictional adult ...").
- Set `is_synthetic=true` and `capacity_is_not_live=true`.
- Re-run `npm run db:build` and confirm the app still renders correctly before opening a PR.

## Pull requests

- Keep PRs focused — one change per PR is easier to review.
- Run `npm run check` and `npm run test` locally first.
- Describe what changed and why in the PR description; screenshots are appreciated for UI changes.
