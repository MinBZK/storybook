# Changelog

All notable changes to the NLDD design system are documented here.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).
Versions are bumped automatically by semantic-release on merge to main —
the type of conventional-commit determines the release. Conventional types
`chore`, `docs`, `ci`, `style`, `test`, `build` are intentionally omitted
here; consult the commit history if you need that level of detail.

## <small>0.8.46 (2026-05-21)</small>

* feat(actions): form-associated buttons, text slot, and consistent active states ([a99a1c5](https://github.com/MinBZK/storybook/commit/a99a1c5))

## Unreleased

<!--
  Alleen Highlights worden hier handmatig bijgehouden — de Added/Changed/Fixed
  entries genereert semantic-release bij de merge automatisch uit de commits.
  Verplaats deze Highlights na de release onder de nieuwe versie-sectie.
-->

### Highlights

- Buttons doen nu echt mee in formulieren: `nldd-button` en `nldd-icon-button`
  zijn form-associated, dus `type="submit"` en `type="reset"` werken nu ook
  binnen een `<form>` (voorheen deed een klik niets over de shadow-grens).
- Consistente "pressed" (active) feedback op alle neutral-tinted controls.

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
