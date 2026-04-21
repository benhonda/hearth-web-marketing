---
name: bit-cli
description: Use the `bit` CLI (from `@adpharm/bit`, also called "bit simpler") to pull, import, push, track, or check sync of shared files between this repo and a bit registry host. Trigger whenever the user explicitly mentions `bit` or "bit simpler" in the context of shared files, components, skills, registry sync, drift, or tracked paths — e.g. "bit pull X", "bit push this", "is this in sync with bit?", "did bit drift?", "stop tracking this with bit", "set up bit here".
---

# bit CLI

`bit` (package: `@adpharm/bit`, nickname: "bit simpler") syncs files between this repo and a **bit registry host** — a server that stores files organized by `<project>/<…folders…>/<slug>`. Think of it as a tiny, file-level package registry: push files up, pull them down elsewhere, check if they drifted.

Only engage this skill when the user **explicitly says `bit`** (or "bit simpler"). Don't infer it from generic phrases like "grab that component" — other tools (git, copy/paste, package managers) usually fit better, and guessing wrong wastes the user's time.

## How to invoke it

In a terminal where `@adpharm/bit` is installed globally, `bit <command>` works directly. In sandboxed Claude Code sessions (and most CI), `bit` is usually **not** on PATH — use `bunx @adpharm/bit@latest <command>` instead. Behaviour is identical.

Default to `bunx @adpharm/bit@latest` in agent sessions so the first command doesn't fail with `command not found` and force a retry. Examples in the rest of this skill use bare `bit` for readability — translate on the fly.

## The mental model: tracked paths

`bit.config.json` stores a `tracked` array — `{ path, slug, kind }` entries mapping local files/folders to remote slugs. This is the core of the ergonomic commands:

- **`bit push`, `bit pull`, `bit import` auto-add entries** when they land a new path. No manual step.
- Once a path is tracked, `bit push <path>` (no slug) and `bit status <path>` just work — the slug is looked up.
- `bit status` with no args checks **every** tracked path — designed for CI / pre-commit.
- **Never hand-edit `tracked` in `bit.config.json`.** Every manifest change has a verb: `track`, `untrack`, `mv`, `retarget`, or the auto-tracking inside push/pull/import.

If `bit.config.json` is missing, most commands still work with an explicit slug — tracking is skipped silently. Tracking only activates inside a repo that has been `bit init`-ed.

## When users already have bit set up

Assume this by default. You can tell because `bit.config.json` exists at the repo root and the user has run `bit login` previously (token in `~/.bit/credentials`). If a command fails with a 401, that's the signal to re-auth — see [Setup](#setup-and-skill-maintenance-only-when-needed) below.

The host is resolved in this priority order: `--host` flag → `BIT_HOST` env var → `bit.config.json` → built-in default. Normally you don't need `--host` at all.

## Picking the right command

| User wants | Command | Why |
|---|---|---|
| One specific file pulled down | `bit import <slug> --to <path>` | File-scoped; lands a single slug at a precise path. Auto-tracks. |
| A whole folder (or project) pulled down | `bit pull <project/folder> --to <dir>` | Folder-scoped; preserves tree under `--to`. Auto-tracks. |
| Upload a file or folder (first time) | `bit push <localPath> <slug>` | Sets the mapping and pushes. Auto-tracks unless `--no-track`. |
| Re-upload an already-tracked path | `bit push <localPath>` | Slug resolved from the manifest — no need to repeat it. |
| Check one tracked path for drift | `bit status <localPath>` | Files: unified diff. Folders: per-file drift + local-only list. Exit `1` on drift. |
| Check the whole repo for drift (CI) | `bit status` | Walks every tracked entry. Exit `1` if anything drifted. |
| List remote slugs under a project/prefix | `bit ls <prefix>` | Confirms a slug exists without pulling it. |
| Retrofit tracking onto an existing file | `bit track <localPath> <slug>` | Explicit op when the file's already present and you never pushed/pulled it through `bit`. |
| Stop tracking (keep file on disk) | `bit untrack <localPath>` | Manifest-only; doesn't delete. |
| Rename a tracked file on disk | `bit mv <old> <new>` after `git mv` | Updates the manifest to match the new path. |
| Point a tracked path at a different remote slug | `bit retarget <localPath> <newSlug>` | Use when a slug was renamed on the server. |

**Heuristic for fetch direction:** if the user names one file, reach for `import`. If they describe a folder, skill, or whole project, reach for `pull`.

**Synonyms users tend to use:**
- "upload", "share", "publish this", "put X on bit" → `push`
- "grab", "fetch", "download", "get X from bit" → `import` (one file) or `pull` (folder / project / skill)
- "is X in sync", "did this drift", "check against bit" → `status`
- "what's on bit under X", "does slug Y exist" → `ls`
- "stop tracking", "remove from bit tracking" → `untrack`
- "I renamed the file" → `bit mv`
- "slug was renamed on the server" → `bit retarget`

### The `bit import --to` trap

`--to` behaves differently depending on whether the argument looks like a directory or a file path:

- `--to ./src/components` → treated as a **directory**. Writes to `./src/components/<folders-from-slug>/<filename>`, preserving the in-project folder structure encoded in the slug.
- `--to ./src/components/Button.tsx` → has an extension, so treated as an **explicit destination**. Writes exactly there, ignoring slug folders.

If the user says "put it at `src/components/Button.tsx`", use the explicit form. If they say "put it under `src/components`", use the directory form.

### `bit push` behaviour worth knowing before you run it

- **Existing files are overwritten** (upsert by slug). If pushing into a project that already has matching slugs, confirm intent.
- **The target project must already exist** on the host. `push` won't create it.
- **Auto-tracks on success.** Pass `--no-track` for a genuine one-off that shouldn't show up in `bit status` later.
- **Slug can be omitted** when `<path>` is already tracked — the manifest slug is used.
- **Slug mismatch prompts:** if `<path>` is tracked with a different slug and you pass a new one, you'll be asked to confirm the retarget (unless `--no-track`).
- **Locally ignored:** `node_modules`, `.git`, `dist`, `build`, `.next`, `.turbo`, `.cache`, `.DS_Store` are skipped automatically.
- **500-file cap** per push.
- **Single file vs folder mapping:**
  - `bit push ./Button.tsx my-project/ui/button` → file lands at exact slug
  - `bit push ./Button.tsx my-project` → slug becomes `my-project/Button.tsx`
  - `bit push ./src my-project/src` → folder contents upload under the target prefix, structure preserved

### `bit status` drift report

On a folder entry, the output lists per-file drift kinds:
- `missing locally` — tracked file not on disk. Status will suggest `bit mv` if another file in the repo has matching content.
- `remote slug gone` (404) — tracked slug no longer exists. Status will suggest `bit retarget` if a different slug in the same project has matching content.
- `content differs` — prints a coloured unified diff.
- `local-only` — file present locally but not on remote (folder entries only). Fix with `bit push` or ignore.

These hints are suggestions, never auto-applied — always tell the user to run the suggested command.

## Common workflows

**First-time share of a skill folder and start tracking it:**
```sh
bit push ./.claude/skills/my-skill skills/my-skill
# Auto-tracks skills/my-skill → ./.claude/skills/my-skill as a folder
```

**Pull a shared skill or spec into a new project (auto-tracked):**
```sh
bit pull skills/landing-page-spec --to ./.claude/skills/landing-page-spec
```

**Grab a single component file (auto-tracked):**
```sh
bit import my-project/ui-button --to ./src/components
```

**Re-push a tracked path after editing:**
```sh
bit push ./src/components/Button.tsx
```

**Pre-commit / CI drift check across the whole repo:**
```sh
bit status
# exit 0 = everything in sync, exit 1 = drift somewhere
```

**Check one tracked path:**
```sh
bit status ./src/components/Button.tsx
```

**After renaming a file with git:**
```sh
git mv ./old/path.tsx ./new/path.tsx
bit mv ./old/path.tsx ./new/path.tsx
```

**Remote slug was renamed:**
```sh
bit ls my-project                          # find the new slug
bit retarget ./src/components/Button.tsx my-project/new-slug
```

## Setup and skill maintenance (only when needed)

If `bit.config.json` is missing, or commands fail with auth errors, walk through setup:

```sh
bit init     # writes bit.config.json, optionally installs this skill + runs login
bit login    # device-code flow — opens the browser, stores a token at ~/.bit/credentials
```

`bit init` is interactive but **safe to re-run** — if `bit.config.json` already exists, it asks `Keep existing host?` (default yes), then moves on to skill-install and login prompts. Use `--yes` (plus `--host <url>` if the default isn't right) to run it non-interactively. `bit login` is always interactive — don't try to run it headlessly.

If the user was previously logged in on a different host and is now switching, `bit login --host <new-url>` will prompt before re-authenticating.

### Refreshing just this skill

When the user upgrades `@adpharm/bit` and wants the newer bundled skill without re-doing config or login:

```sh
bit skill install           # prompts before overwriting an existing SKILL.md
bit skill install --force   # overwrite silently
bit init --skill-only       # equivalent shortcut
```

## Errors you'll actually see

| Code | What it means | What to do |
|---|---|---|
| `401` | Missing/invalid token | Run `bit login` (or `bit login --host <url>`) |
| `404` | Project or file slug not found | Double-check the slug; `bit push` won't create missing projects. For a tracked path, `bit status` will suggest `bit retarget` if the content matches a different slug. |
| `413` | Payload too large (>500 files) | Split the push into subfolders |
| `429` | Rate-limited | Back off and retry |

## What not to do

- **Don't edit `bit.config.json`'s `tracked` array by hand.** Use the verbs: `track`, `untrack`, `mv`, `retarget`, or let push/pull/import auto-manage it.
- **Don't edit `~/.bit/credentials` by hand** — managed by `bit login`/`bit logout` with `0600` perms for a reason.
- **Don't paste tokens into `bit.config.json`** — tokens belong in `~/.bit/credentials` or `BIT_TOKEN`, never in a checked-in config.
- **Don't reach for `bit` when plain `git` or a package install would do the job.** Bit is for small shared files (components, skills, specs) that live outside the normal package/dep graph.
