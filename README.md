# NDD Design System

Web Components voor Nederlandse Digitale Dienst (Rijksoverheid).

## Installatie

### Via npm (GitHub Packages)

1. Voeg `.npmrc` toe aan je project voor GitHub Packages authenticatie:

```
@minbzk:registry=https://npm.pkg.github.com
```

2. Authenticeer bij GitHub Packages (eenmalig):

```bash
npm login --registry=https://npm.pkg.github.com
# Gebruik je GitHub-gebruikersnaam en een personal access token met `read:packages` scope
```

3. Installeer het pakket:

```bash
npm install @minbzk/storybook
```

### Gebruik

```javascript
// Importeer CSS variabelen en fonts (vereist voor styling)
import '@minbzk/storybook/styles';

// Importeer alle componenten
import '@minbzk/storybook';

// Of importeer specifieke componenten
import { NDDButton, NDDCheckbox, NDDSwitch } from '@minbzk/storybook';
```

```html
<!-- Gebruik in HTML -->
<ndd-button variant="accent-filled" text="Opslaan"></ndd-button>
<ndd-checkbox text="Akkoord met voorwaarden"></ndd-checkbox>
<ndd-switch text="Meldingen inschakelen"></ndd-switch>
```

## Storybook

Bekijk de live component documentatie: **https://minbzk.github.io/storybook/**

## Quickstart

```bash
# Dependencies installeren
npm install

# Storybook starten
npm run storybook

# Open http://localhost:6006 voor de component documentatie
```

## Componenten

### ndd-button

| Attribuut          | Type    | Default          | Beschrijving                                                                                                                                             |
| ------------------ | ------- | ---------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `text`             | string  | `''`             | Tekst van de button                                                                                                                                      |
| `variant`          | string  | `neutral-tinted` | `primary`, `secondary`, `destructive`, `accent-filled`, `accent-outlined`, `accent-transparent`, `neutral-tinted`, `neutral-transparent`, `danger-tinted` |
| `size`             | string  | `md`             | `xs`, `sm`, `md`                                                                                                                                         |
| `disabled`         | boolean | `false`          | Uitgeschakelde staat                                                                                                                                     |
| `type`             | string  | `button`         | `button`, `submit`, `reset`                                                                                                                              |
| `full-width`       | boolean | `false`          | Rekt de button uit over de volledige breedte van de container                                                                                             |
| `start-icon`       | string  | `''`             | Icoon aan het begin van de button                                                                                                                        |
| `end-icon`         | string  | `''`             | Icoon aan het einde van de button                                                                                                                        |
| `expandable`       | boolean | `false`          | Voegt een icoon toe dat aangeeft dat de button een menu of popover opent                                                                                 |
| `href`             | string  | `undefined`      | Rendert als link (`<a>`) in plaats van een button                                                                                                        |
| `accessible-label` | string  | `''`             | Toegankelijk label voor schermlezers                                                                                                                     |
| `popovertarget`    | string  | `''`             | ID van het popover-element                                                                                                                               |

Zie de [Storybook-documentatie](https://minbzk.github.io/storybook/) voor alle componenten.

## Styling structuur

CSS variabelen zijn georganiseerd in vijf lagen:

| Laag | Prefix | Beschrijving |
| ---- | ------ | ------------ |
| **Primitives** | `--primitives-*` | Basis waarden (kleuren, spacing, typography) |
| **Semantics** | `--semantics-*` | Betekenisvolle variabelen (buttons, controls, surfaces) |
| **Components** | `--components-*` | Component-specifieke variabelen |
| **Context** | `--context-*` | Gedeelde variabelen voor communicatie tussen componenten |
| **Local** | `--_*` | Interne variabelen binnen een component (niet bedoeld voor extern gebruik) |

```css
/* Primitives — basis waarden */
--primitives-color-accent-100: #154273;
--primitives-space-16: 16px;

/* Semantics — verwijzen naar primitives */
--semantics-buttons-accent-filled-background-color: light-dark(var(--primitives-color-accent-750), var(--primitives-color-accent-650));
--semantics-controls-md-min-size: var(--primitives-space-44);

/* Components — verwijzen naar semantics of primitives */
--components-list-corner-radius: var(--semantics-controls-md-corner-radius);
--components-button-group-sm-gap: var(--primitives-space-6);

/* Context — communicatie tussen componenten */
--context-parent-background-color: var(--semantics-surfaces-background-color);

/* Local — intern binnen een component */
--_background-color: var(--context-parent-background-color);
```

## Feedback en verzoeken

Mis je een component of wil je een wijziging voorstellen? [Maak een issue aan](https://github.com/MinBZK/storybook/issues).

## Licentie (License)

EUPL-1.2
