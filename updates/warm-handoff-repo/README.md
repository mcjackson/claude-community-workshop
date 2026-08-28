# Warm Handoff

**A safe, two-minute handoff at the moment of contact for Birmingham's homelessness response.**

> One-liner: We don't replace Coordinated Entry or HMIS. We sit in front of them, at the moment a frontline responder is standing with someone, and produce a dignity-first handoff card that says the safe next step, what must be confirmed by phone, who owns follow-up, and how the person gets there. **The tool assists; a trained person decides.**

Challenge 4 — Improve the Handoff to Homelessness Services · Birmingham, AL

---

## The problem

Birmingham's response runs through One Roof (the Continuum of Care lead), which operates Coordinated Entry and HMIS. But the person holding the situation in the moment — an ER discharge nurse, a shelter intake worker, a street outreach worker, a patrol officer — has no fast, shared way to hand someone off. So people re-tell their story at every door, get sent to services that are already full, and fall through the gap between one set of hands and the next.

We target **one bounded decision point**: *"Given this situation now, what safe next step and referral is available, what must be confirmed, and who is responsible for follow-up?"*

## Primary users

- **Sender:** the frontline responder in the moment (ER, shelter intake, outreach, 211, patrol).
- **Receiver:** the agency the person is handed to — needs no account.
- **Convener:** One Roof (or a host foundation), which owns the tool and maintains the service directory.

The person experiencing homelessness is the **subject** of the handoff, not the operator. Their agency shows up as **consent** and **direction**, not data entry.

## What it does

The responder picks the situation, enters the minimum, chooses an eligible place from a filtered directory, completes a human confirmation step, and issues a simple card:

- **Needs** — the immediate need
- **Go to** — the chosen provider, area, and phone
- **Before travel** — what to confirm + a standing "capacity not live, confirm by phone" flag
- **Ride** — how the person gets there (a bed with no ride is not a plan)
- **Owner** — the named person responsible + the follow-up window
- **Code** — a short handoff code for the receiver to match on

## How the person gets there, and how the receiver knows it's them

- **No phone required.** The person carries a printed or handwritten copy. The durable record travels responder-phone to receiver-phone via the ahead-call. No printer? A three-line field script the responder reads aloud or writes on a stock card: *where to go, the code, who's expecting you.*
- **Identity by coordination, not documents.** The responder captures first name and last initial. The receiver matches on **first name + handoff code (+ the responder's ahead-call)**. **No government ID, photo, or fingerprint.** If the person lost the code, the receiver calls the named owner.

## What's captured today vs. on the card

| Today (status quo) | Warm Handoff card |
|---|---|
| Nothing standardized; a verbal "try that shelter" | A structured next step anyone can produce in two minutes, no HMIS login |
| Availability assumed; people sent to full/closed services | Confirmation + freshness: "confirm before travel; capacity not live" |
| No one owns what happens next | Named owner + follow-up window |
| Anonymous, untracked handoff | First name + handoff code + ahead-call link sender and receiver |
| The ride is captured nowhere | Transportation is a required field |
| Person re-tells their story at every door | Portable summary travels with the person |
| Assessment tools may score/label; records persist | Minimum identity, no scoring, no biometrics, not retained |

**We don't need more data — we need better-shaped data.** Capture the *need*, not the person's story. Add detail only when it changes where they go.

## Human-in-the-loop guarantee

The card cannot be issued until a trained person confirms, on screen:

1. The scenario's specific confirmation (e.g. is a referral form required)
2. By phone: the service can accept the person now (capacity is not live)
3. Transportation is arranged
4. The ahead-call was made with the first name + code
5. The person's consent to share

**Immediate danger, medical emergency, or dangerous weather with no shelter is not a handoff** — the tool tells the responder to call 911/crisis and transport now, and does not issue a card for an active emergency.

## What we deliberately do NOT build

- **No Coordinated Entry replacement.** We feed One Roof's process; we don't bypass it.
- **No vulnerability or risk scoring**, and **no "violence" flag** that follows a person. Present safety concerns are shared human-to-human on the ahead-call; any governed safety record stays in HMIS. Immediate danger is an emergency escalation, not a stored label.
- **No real client data, PII, or biometrics.**
- **No claim of real-time capacity.**
- **No automated placement or eligibility decisions.**
- **No history/lookup of a person across agencies** — that's HMIS's job, with the legal framework and oversight for it.

## Data & synthetic notice

- Scenarios come from the challenge's `resources/data/homelessness-handoff-scenarios.csv` (`is_synthetic = true`, `capacity_is_not_live = true`).
- The service directory (`data/services-directory.synthetic.json`) is **fictional providers mapped to real Birmingham service categories** — not real organizations, not live capacity. In production it is sourced from and maintained by **One Roof / United Way 211**.
- No entry, real or synthetic, is presented as live, real, or authoritative.

## Prior art — and how we're different

| Existing | What it does well | Why it doesn't close this gap |
|---|---|---|
| **One Roof — Coordinated Entry** | Intake & prioritization for the housing queue | A process, not a moment-of-contact referral generator |
| **HMIS (Clarity/Bitfocus)** | System of record | Requires logins/training; ad-hoc responders don't use it in the moment |
| **211 / findhelp** | Resource directory | Lists services; no confirmation, owner, or portable handoff |
| **Real-time bed inventory (some cities)** | Live availability | We complement it; we never fake capacity we don't have |
| **Built for Zero (by-name lists)** | System-level coordination | Above the moment-of-contact layer; our handoff feeds it |

The moment-of-contact "warm handoff" layer is thin even in advanced cities. That's what we assemble for Birmingham.

## Access model

- **Senders** get a role-based login to one shared, hosted tool, granted by the convener (One Roof).
- **Receivers** need **no account** — the card is portable (print or secure expiring link).
- **Directory** is maintained centrally by the convener so "last verified" dates stay honest.

## Repository contents

- `warm-handoff-card.html` — the working prototype (entry → confirm → card)
- `data/services-directory.synthetic.json` — the synthetic service directory
- `responder-guide.html` — one-page responder guide + before/after + dignity line
- Flow diagrams — pilot flow, privacy flow, step flow with owner lane
- `README.md` — this file

## Limitations & next steps

- **This is a synthetic demo.** "Last verified" and confirmations are illustrative, not wired to a live directory.
- **Transportation is captured, not solved.** Making the ride itself happen is the clear next step.
- **In production**, the directory is owned by One Roof / 211, and portable-link security and retention/purge are implemented for real.
- **Next pilot:** one referral corridor (e.g. one hospital's ER discharge to a handful of respite/shelter providers), a handful of trained responders, a one-page quick-start.

---

*Built for the Claude Impact Lab. Feeds — does not replace — Coordinated Entry. One Roof / HMIS remains the system of record.*
