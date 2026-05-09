# kanso-tone-pass

## Purpose

Rewrite generic AI prose into the Kanso voice: calm, specific, dense,
plainspoken, non-hype, and operator-minded.

## Inputs

- Optimized draft.
- Canonical docs.
- Tone contract in `docs/phases/AutonomousContentEngine.md`.

## Outputs

- Tone-polished draft.
- List of rejected phrases or rewritten claims.
- Handoff to `kanso-content-review`.

## Hard Refusal Conditions

- Draft cannot be made specific without new facts.
- Draft relies on hype, fake urgency, or vague benefit claims.
- Draft loses the proof boundary when rewritten.
- Draft still implies cloud books, accountant replacement, tax/legal/audit
  advice, or AI as financial truth.

## Escalation Conditions

- Canonical voice conflicts with required compliance wording.
- A core product phrase is unsettled.
- The page cannot sound Kanso-native because the brief is generic.

## Examples Of Good Output

```text
You are not done because the transactions have labels. You are closer when the
statement totals match, the strange items have notes, and the evidence trail is
clear enough for someone else to inspect.
```

## Examples Of Bad Output

```text
In today's fast-paced business environment, entrepreneurs need to leverage
cutting-edge AI to seamlessly streamline their finances.
```

Fails for banned phrases, hype, and no useful proof.

## Required Checks

- Short opening.
- Specific nouns.
- Concrete example.
- Direct claims.
- Visible boundary.
- Practical next step.
- No ornamental punctuation habits.
- No banned phrases.

## Downstream Handoff Format

```yaml
handoff:
  to: "kanso-content-review"
  draftPath: ""
  toneEdits: []
  remainingConcerns: []
```

