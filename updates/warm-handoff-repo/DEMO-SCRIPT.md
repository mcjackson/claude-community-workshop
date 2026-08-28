# Warm Handoff — 3-Minute Demo Script
Birmingham Civic Hackathon · Challenge 4: Improve the Handoff to Homelessness Services

Total time: 3:00. Two speakers work best (Problem lead, Demo driver); a third can take the Close if the team has one. Practice the demo section live at least twice — that's the part that can run long.

---

## 0:00–0:30 — Problem (Problem lead)

Right now, the handoff at the moment of contact is fragmented. An ER discharge nurse, a shelter intake worker, a street outreach worker, a patrol officer — each of them is standing with someone who needs a next step, right now, and they have no fast, shared way to hand that person off.

So the person re-tells their story at every door. They get sent to a shelter that's already full. And once they walk out the door, no one owns what happens next.

We're not replacing Coordinated Entry or HMIS — One Roof already owns that system, and it should. We're building the thin layer in front of it: what a responder uses in the two minutes they actually have with someone.

*(Cue to demo driver: "Let's show you.")*

## 0:30–2:15 — Live demo: SCEN-05 (Demo driver)

Walk through SCEN-05 start to finish, narrating each step in one short sentence before you click. Keep a browser tab pre-loaded and pre-scrolled if possible — don't burn demo time on load screens.

1. **Pick the scenario (0:30–0:40).** "This is SCEN-05: an adult being discharged from the hospital who needs a medical respite bed." Select it.
2. **Pick an eligible place (0:40–0:55).** Show the filtered synthetic directory — only places that match this need are eligible. Pick one. Call out: "This directory is synthetic providers mapped to real Birmingham service categories — in production, One Roof and 211 own and maintain this list."
3. **Human-in-the-loop confirmation gate (0:55–1:45).** This is the core of the pitch — slow down slightly here. Walk each checkbox as you check it:
   - Referral form requirement for this scenario, confirmed.
   - Called ahead by phone, availability confirmed now — point at the **red "capacity not live, confirm by phone" flag** and say: "We never claim to know real-time bed counts. The system tells the responder to go verify, every time."
   - Transportation arranged — name how (ride, transit, agency van).
   - Ahead-call made, with the person's first name and handoff code given to the receiver.
   - Consent to share confirmed.
   "The card physically cannot be issued until a trained human checks all five. This tool assists — it never decides on its own."
4. **Issue the card (1:45–2:10).** Show the finished card: need, go-to, before-travel, ride, owner + follow-up window, and the handoff code. "Identity here is first name plus this code — no ID, no photo, no biometric. The receiver matches the person by the code and the ahead-call, not a document."
5. **Land it (2:10–2:15).** "That's the whole handoff — one bounded decision, in about two minutes, and it feeds straight into HMIS instead of routing around it."

## 2:15–2:45 — Why it's different, and defensible (Problem lead or third speaker)

We deliberately don't do a few things. We don't replace Coordinated Entry — this feeds One Roof's process. We don't score or flag people; there's no risk or vulnerability score that follows someone. We don't collect IDs, photos, or biometrics. And every piece of data in this demo is synthetic — no real client information touched this build.

Two things we're upfront about. Transportation is captured as a required field, but we don't solve the ride itself yet — that's the clear next build. And this is a synthetic demo end to end: the directory, the scenarios, the "confirmed" flags are illustrative, not wired to a live system today.

Our next step is narrow on purpose: one pilot corridor — one hospital's ER discharge process handing off to a handful of respite and shelter providers — with a small group of trained responders and a one-page quick-start guide.

## 2:45–3:00 — Close (whoever is strongest closing)

Say the line together if the team can manage it, otherwise one voice, clearly:

> **"This tool assists; a trained person decides."**

Stop talking. Take questions.

---

## If a judge asks… (cheat sheet)

**"Doesn't this duplicate HMIS or Coordinated Entry?"**
No — it feeds them. HMIS stays the system of record and Coordinated Entry stays the prioritization process. We sit in front of both, at the moment of contact, and produce the structured handoff that currently doesn't exist at all.

**"What about privacy — are you storing personal data?"**
Minimum identity only: first name and a handoff code, no ID, photo, or biometric, and nothing is retained beyond what the handoff needs. Any governed safety or case record still lives in HMIS, where it belongs and where oversight already exists.

**"What if the person is violent or unsafe to place?"**
That's a human-to-human conversation on the ahead-call, not a stored flag. We deliberately don't build a "violence" or risk label that follows a person across the system — and any genuine emergency doesn't get a card at all; the tool tells the responder to call 911 or crisis and transport now.

**"What if the person has no phone, or the responder has no printer?"**
No phone is required on the person's side — the card travels responder-phone to receiver-phone through the ahead-call, and the person carries a printed or handwritten copy. No printer, no problem: there's a three-line script the responder can read aloud or write on a stock card — where to go, the code, who's expecting you.

**"How do multiple agencies actually get access to this?"**
Senders get a role-based login to one shared, hosted tool, granted by the convener — we'd expect that to be One Roof. Receivers need no account at all; the card itself is portable, print or a secure expiring link.

**"Is any of this real data?"**
No. Every scenario and every directory entry in this build is synthetic, explicitly flagged as not-live, and mapped only to real Birmingham service categories, not real organizations. Nothing here is presented as authoritative capacity.
