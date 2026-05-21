# Changelog

All notable changes to the NLDD design system are documented here.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).
Versions are bumped automatically by semantic-release on merge to main —
the type of conventional-commit determines the release. Conventional types
`chore`, `docs`, `ci`, `style`, `test`, `build` are intentionally omitted
here; consult the commit history if you need that level of detail.

## Unreleased

### Highlights

- Buttons doen nu echt mee in formulieren: `nldd-button` en `nldd-icon-button`
  zijn form-associated, dus `type="submit"` en `type="reset"` werken nu ook
  binnen een `<form>` (voorheen deed een klik niets over de shadow-grens).
- Consistente "pressed" (active) feedback op alle neutral-tinted controls.

### Added

* **actions:** add a text slot to button for rich label content ([c3fb360](https://github.com/MinBZK/storybook/commit/c3fb360))
* **actions:** make button form-associated so type=submit/reset works ([fc56980](https://github.com/MinBZK/storybook/commit/fc56980))
* **actions:** make icon-button form-associated so type=submit/reset works ([0867ae6](https://github.com/MinBZK/storybook/commit/0867ae6))
* **inputs:** add active states and align expanded states across controls ([216efdd](https://github.com/MinBZK/storybook/commit/216efdd))

### Fixed

* **forms:** widen form-field label-to-control gap so focus ring clears the label ([032528a](https://github.com/MinBZK/storybook/commit/032528a))
* **forms:** widen the tight gap between stacked form elements ([98a9f82](https://github.com/MinBZK/storybook/commit/98a9f82))
* **layout:** container height auto instead of 100% ([017a38d](https://github.com/MinBZK/storybook/commit/017a38d))

## <small>0.8.45 (2026-05-21)</small>

* feat!: bugs and housekeeping — menu, container, variant API, icon API, CSS refactor pass ([d53da4d](https://github.com/MinBZK/storybook/commit/d53da4d))

## Section conventions

- **Highlights** — short narrative summary, only when there is something
  worth calling out.
- **Breaking Changes** — incompatible API changes that need consumer action.
  Each entry describes what changed and the migration step.
- **Added** — new components, attributes, variants.
- **Changed** — modifications to existing functionality (non-breaking).
- **Fixed** — bug fixes.
- **Deprecated** — APIs marked for removal in a future release.
- **Removed** — APIs that have been removed.
