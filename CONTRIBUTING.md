# Contributing to NLDD Design System

## CHANGELOG conventions

`CHANGELOG.md` is bumped automatically by semantic-release on merge to main.
The Added / Changed / Fixed bullet lists under each version block are
generated from conventional-commit messages.

For hand-curated content (Highlights, Breaking Changes migrations, etc.):
write the `###` subsections directly above the current most-recent version
block. When semantic-release runs, it prepends a fresh `## <small>x.y.z (…)
</small>` block above your hand-written content, so the subsections nest
naturally under the new version in the rendered output. No `## Unreleased`
header is needed.

Use these section labels:

- **Highlights** — short narrative summary, only when there is something worth calling out.
- **Breaking Changes** — incompatible API changes that need consumer action. Each entry describes what changed and the migration step.
- **Added** — new components, attributes, variants.
- **Changed** — modifications to existing functionality (non-breaking).
- **Fixed** — bug fixes.
- **Deprecated** — APIs marked for removal in a future release.
- **Removed** — APIs that have been removed.
