# GUI Workflow

**Status:** Canonical / Routing Companion

## Purpose

Route GUI work by risk. Read the smallest set of docs that protects the
architecture.

## Tier Router

| Tier | Work | Read |
|---|---|---|
| A - Paint | Spacing, density, copy, semantic tokens only, no behavior | This file + `Docs/gui/0.1.Design-System.md` |
| B - Shell | App chrome, navigation, global layout, no new IPC/domain payloads | This file + `Docs/gui/0.Tech-Stack.md` + design system |
| C - Surface behavior | Any `apps/desktop/src/surfaces/<name>/` behavior, state, grouping, filtering, actions | Colocated `brief.md` + `2.Surface-Architecture.md` + `3.Presenter-State-and-Surface-Briefs.md` + `4.Enforcement-and-Test-Wall.md` |
| D - Cross-stack contracts | New commands, generated payloads, schema changes, financial statuses, provider/export data | `Docs/SSOT_Feature_Workflow.md` + relevant `Docs/1..7` + GUI docs |

Start at Tier A unless an escalation trigger applies.

## Escalation Triggers

Move to Tier C/D if the task:

- edits or adds `gateway.ts`, `presenter.ts`, `state.ts`, or `controller.ts`
- adds a surface
- changes what raw data means to the user
- changes match/status/review/export behavior
- adds a Tauri command or IPC payload
- imports generated raw contracts
- touches cloud/provider consent copy
- changes evidence or audit display

## Non-Negotiables

- KansoBooks v1 is institutional white.
- Use semantic tokens only.
- Rust/contracts own facts.
- Presenters own surface salience.
- JSX does not invent product rules.
- Views do not import Tauri APIs or raw backend contracts.
- Generated raw contracts are not edited by hand.
- AI/provider uncertainty must stay visible.

## Related Docs

- Stack: `Docs/gui/0.Tech-Stack.md`
- Design: `Docs/gui/0.1.Design-System.md`
- Invariants: `Docs/gui/1.Invariants.md`
- Architecture: `Docs/gui/2.Surface-Architecture.md`
- Briefs/state/presenters: `Docs/gui/3.Presenter-State-and-Surface-Briefs.md`
- Enforcement: `Docs/gui/4.Enforcement-and-Test-Wall.md`
- Execution prompts: `Docs/gui/5.GUI-Execution-Prompts.md`
