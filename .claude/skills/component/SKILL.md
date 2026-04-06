---
name: component
description: Implementeer een Lit + TypeScript web component
user-invocable: true
argument-hint: <component-naam>
---

Implementeer een web component: $ARGUMENTS

## Tech Stack

| Aspect | Technologie |
|--------|-------------|
| **Framework** | [Lit](https://lit.dev/) (LitElement) |
| **Taal** | TypeScript (`.ts`) |
| **Prefix** | `ndd-` |

## WORKFLOW

### Stap 1: Bepaal component naam

1. Als gebruiker naam opgaf → gebruik die
2. Converteer naar kebab-case: "Toggle Button" → "toggle-button"
3. Voeg `ndd-` prefix toe: → "ndd-toggle-button"
4. Class naam: `NDDToggleButton`

### Stap 2: Bestaand component check

Zoek in `src/components/` of het component al bestaat.

| Situatie | Mode |
|----------|------|
| Component bestaat niet | **CREATE** — nieuwe bestanden aanmaken |
| Component bestaat al | **UPDATE** — bestaande bestanden bijwerken |

### Stap 3: CSS variabelen identificeren

**Voorkeursvolgorde:**
1. `--components-{name}-*` (component-specifiek)
2. `--semantics-*` (betekenisvol)
3. `--primitives-*` (alleen als backup)

**Naamconventies:**

- **Primitives:** `--primitives-{property}-{variant}-{scale}`
  bijv. `--primitives-color-accent-750`
- **Semantics:** `--semantics-{group}-{variant}-{state}-{element}-{element-variant}-{element-state}-{property}`
  bijv. `--semantics-buttons-neutral-tinted-is-hovered-background-color`
- **Components:** `--components-{component}-{variant}-{state}-{element}-{element-variant}-{element-state}-{property}`
  bijv. `--components-checkbox-md-check-icon-size`
- **Context:** `--context-{context}-{property}`
  Gedeelde variabelen voor communicatie tussen componenten. Niet gedefinieerd in settings.css.
  bijv. `--context-parent-background-color`
- **Lokaal:** `--_{variant}-{state}-{element}-{element-variant}-{element-state}-{property}`
  Interne variabelen binnen een component. Definieer defaults in `:host`.
  bijv. `--_background-color`

Primitives zijn basiswaarden — gebruik ze niet direct in componenten. Semantics geven context voor een groep componenten. Component variabelen zijn specifiek voor één component.

Zoek in `src/assets/styles/settings.css`:
```bash
grep -i "{component-naam}" src/assets/styles/settings.css
grep -i "controls.*min-size\|controls.*corner-radius" src/assets/styles/settings.css
grep -i "focus-ring" src/assets/styles/settings.css
```

### Stap 4: Bestanden aanmaken

```
src/components/{categorie}/{naam}/
  ndd-{naam}.ts           # Component class
  ndd-{naam}.styles.ts    # Styles
  ndd-{naam}.template.ts  # Render template
  ndd-{naam}.i18n.ts      # Vertalingen (optioneel, bij gebruikersgerichte tekst)
  ndd-{naam}.stories.ts   # Storybook stories
  ndd-{naam}.test.ts      # Tests
```

---

## COMPONENT TEMPLATE

**`ndd-{naam}.ts`:**

```typescript
/**
 * Nederlandse Digitale Dienst {DisplayName} Component (Lit + TypeScript)
 *
 * @element ndd-{naam}
 * @attr {string} size - Component size: 'xs' | 'sm' | 'md' (standaard: 'md')
 * @attr {boolean} disabled - Uitgeschakelde staat
 *
 * @slot - Default slot voor content
 *
 * @fires {event-naam} - Beschrijving (detail: { ... })
 */

import { LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { styles } from './ndd-{naam}.styles.ts';
import { template } from './ndd-{naam}.template.ts';

type Size = 'xs' | 'sm' | 'md';

@customElement('ndd-{naam}')
export class NDD{PascalName} extends LitElement {
	static override styles = styles;

	@property({ type: String, reflect: true })
	size: Size = 'md';

	@property({ type: Boolean, reflect: true })
	disabled = false;

	override render() {
		return template(this);
	}
}

declare global {
	interface HTMLElementTagNameMap {
		'ndd-{naam}': NDD{PascalName};
	}
}
```

**`ndd-{naam}.styles.ts`:**

```typescript
import { css } from 'lit';
import { unsafeCSS } from 'lit';
import { breakpoints } from '../../../assets/styles/breakpoints.ts';

const smMax = unsafeCSS(breakpoints.smMax);
const mdMin = unsafeCSS(breakpoints.mdMin);
const mdMax = unsafeCSS(breakpoints.mdMax);
const lgMin = unsafeCSS(breakpoints.lgMin);

export const styles = css`


	/* # Host */

	:host {
		display: inline-block;
	}

	:host([hidden]) {
		display: none;
	}

	:host([disabled]) {
		opacity: var(--primitives-opacity-disabled);
		pointer-events: none;
	}


	/* # Element */

	.{naam} {
		appearance: none;
		border: none;
		margin: 0;
		padding: 0;
		background: none;
		font: inherit;
		display: inline-flex;
		align-items: center;
		justify-content: center;
		container-name: layout-area;
		container-type: inline-size;
	}

	:host([size="md"]) .{naam},
	:host(:not([size])) .{naam} {
		min-height: var(--semantics-controls-md-min-size);
		border-radius: var(--semantics-controls-md-corner-radius);
	}


	/* ## Responsive — container queries (binnen layout-area) */

	.{naam}__content {
		@container layout-area (max-width: ${smMax}) {
			/* sm: compact weergave */
		}

		@container layout-area (min-width: ${mdMin}) and (max-width: ${mdMax}) {
			/* md */
		}

		@container layout-area (min-width: ${lgMin}) {
			/* lg */
		}
	}


	/* # Focus */

	.{naam}:focus-visible {
		outline: none;
	}

	.{naam}__indicator {
		position: absolute;
		inset: var(--primitives-space-4);
		border-radius: calc(var(--semantics-controls-md-corner-radius) - var(--primitives-space-4) / 2);
		background-color: transparent;
		pointer-events: none;
	}

	.{naam}:focus-visible .{naam}__indicator {
		box-shadow: 0 0 0 var(--semantics-focus-ring-center-thickness) var(--semantics-focus-ring-center-color);
		outline: var(--semantics-focus-ring-edge-thickness) double var(--semantics-focus-ring-edge-color);
	}


	/* # Toegankelijkheid */

	@media (forced-colors: active) {
		.{naam}:focus-visible .{naam}__indicator {
			outline: 2px solid CanvasText;
		}
	}
`;
```

**`ndd-{naam}.template.ts`:**

```typescript
import { html, TemplateResult } from 'lit';
import type { NDD{PascalName} } from './ndd-{naam}.ts';

export function template(component: NDD{PascalName}): TemplateResult {
	return html`
		<button class="{naam}"
			type="button"
			?disabled=${component.disabled}
		>
			<span class="{naam}__indicator"></span>
			<slot></slot>
		</button>
	`;
}
```

---

## STORY TEMPLATE

**`ndd-{naam}.stories.ts`:**

```javascript
import { html } from 'lit';
import './ndd-{naam}.ts';

/**
 * Beschrijving van het component.
 */
export default {
	title: 'Components/{Categorie}/{DisplayName}',
	component: 'ndd-{naam}',
	tags: ['autodocs'],
	parameters: {
		componentSource: {
			file: 'src/components/{categorie}/{naam}/ndd-{naam}.ts',
			repository: 'https://github.com/MinBZK/storybook',
		},
		status: { type: 'stable' },
	},
	argTypes: {
		size: {
			control: 'select',
			options: ['xs', 'sm', 'md'],
			description: 'Componentmaat',
		},
		disabled: {
			control: 'boolean',
			description: 'Uitgeschakelde staat',
		},
	},
	args: {
		size: 'md',
		disabled: false,
	},
};

export const Standaard = {
	render: (args) => html`<ndd-{naam} size=${args.size} ?disabled=${args.disabled}>Label</ndd-{naam}>`,
};
```

---

## TEST TEMPLATE

**`ndd-{naam}.test.ts`:**

```typescript
import { describe, it, expect, afterEach } from 'vitest';
import { fixture, cleanup, waitForUpdate } from '../../../test-utils.ts';
import './ndd-{naam}.ts';

describe('ndd-{naam}', () => {
	let el: HTMLElement;

	afterEach(() => {
		if (el) cleanup(el);
	});

	it('rendert zonder fouten', async () => {
		el = await fixture('<ndd-{naam}></ndd-{naam}>');
		await waitForUpdate(el);
		expect(el.shadowRoot).not.toBeNull();
	});
});
```

---

## i18n

Zie `/translation-keys` skill voor alle conventies rond translation keys, types en implementatie.

---

## SPACER COMPONENT

Gebruik `<ndd-spacer>` voor ruimte tussen verschillende soorten componenten die elkaar direct opvolgen:

```html
<ndd-spacer size="32"></ndd-spacer>
<ndd-spacer size="flexible"></ndd-spacer>
```

**Beschikbare sizes:** 2, 4, 6, 8, 12, 16, 20, 24, 32, 40, 44, 48, 64, 80, 96, m, flexible

---

## FORMATTING

Er is geen automatische formatter. Volg deze regels handmatig.

### Algemeen
- Gebruik **tabs** voor indentatie
- Enkele aanhalingstekens voor strings
- Puntkomma's aan einde van statements
- Trailing comma's in objecten en arrays

### HTML
- Gebruik HTML, niet XHTML: `>` niet `/>` voor void elements:
```html
<!-- GOED -->
<input class="checkbox__input" type="checkbox">

<!-- FOUT -->
<input class="checkbox__input" type="checkbox" />
```

### CSS (`.styles.ts`)
- Property waarden altijd op **één regel**, ook als ze lang zijn
- Sorteer rules per element; houd alle gedrag voor een element bij elkaar
- Gebruik **CSS nesting** voor `@container` en `@media` — nest in de element rule block
- Declareer CSS variable defaults in `:host`, nooit als fallback: `var(--_foo)` niet `var(--_foo, 100)`
- Gebruik **nooit** flex shorthand (`flex: 1`), schrijf de losse properties
- Level 1 headings (`/* # Section */`): 2 lege regels ervoor, 1 erna
- Level 2 headings (`/* ## Subsection */`): 1 lege regel ervoor en erna

```css
/* GOED — CSS nesting */
.button {
	display: inline-flex;
	min-height: var(--_min-height);

	@container (min-width: 641px) {
		padding: var(--_md-padding);
	}
}

/* FOUT — niet nesten */
.button { display: inline-flex; }
@container (min-width: 641px) {
	.button { padding: var(--_md-padding); }
}
```

```css
/* GOED — defaults in :host */
:host {
	--_min-height: var(--semantics-controls-md-min-size);
}
.button {
	min-height: var(--_min-height);
}

/* FOUT — fallback in var() */
.button {
	min-height: var(--_min-height, 44px);
}
```

### Templates (`.template.ts`)
- Elk attribuut op een **eigen regel**, met twee uitzonderingen:
  - `class` staat altijd op **dezelfde regel** als het element
  - Een element met **één enkel attribuut** mag op één regel
- **Nooit een class op een child component** — gebruik een wrapper element
- Geen lege regels in templates

```html
<!-- GOED — class + meerdere attributen -->
<input class="checkbox__input"
	type="checkbox"
	.checked=${component.checked}
	?disabled=${component.disabled}
	@change=${component._handleChange}
>

<!-- GOED — class + één attribuut: attribuut op eigen regel -->
<div class="checkbox__box"
	aria-hidden="true"
>

<!-- GOED — één attribuut zonder class: op één regel -->
<slot name="header"></slot>

<!-- GOED — child component in wrapper -->
<span class="checkbox__icon">
	<ndd-icon name="check-mark-small"></ndd-icon>
</span>

<!-- FOUT — class op child component -->
<ndd-icon class="checkbox__icon" name="check-mark-small"></ndd-icon>

<!-- FOUT — class op aparte regel -->
<input
	class="checkbox__input"
	type="checkbox"
>
```

### Stories (`.stories.ts`)
- Zelfde formatting conventies als templates

---

## BEM NAAMGEVING

Gebruik BEM (Block Element Modifier) + state classes:

```
.block                    /* Zelfstandig component */
.block__element           /* Onderdeel van block */
.block--modifier          /* Variant van block */
```

- Block: logische naam (`.pagination`, `.checkbox`, `.button`)
- Element: na dubbele underscore `__` (`.pagination__page-button`)
- Modifier: na dubbele hyphen `--` (`.button--primary`)
- Geen nesting: niet `.block__element__subelement`
- Modifiers zijn aanvullend, nooit vervanging van base class

**Varianten vs states:**
- **BEM modifiers** voor varianten (vast): `button--primary`, `button--sm`
- **State classes** voor wisselende toestanden: `list-item.is-dragging`, `page-button.is-current`

```html
<button class="button button--primary">
<div class="list-item is-dragging">
<button class="pagination__page-button is-current">
```

---

## CHECKLIST

**CSS:**
- [ ] Components → semantics → primitives volgorde
- [ ] Geen fallback waarden
- [ ] Geen hardcoded waarden, geen !important
- [ ] Geen `cursor: pointer`
- [ ] Disabled: `var(--primitives-opacity-disabled)`

**Accessibility:**
- [ ] ARIA attributes
- [ ] Keyboard navigation
- [ ] `@media (prefers-reduced-motion)`
- [ ] `@media (forced-colors: active)`

**TypeScript:**
- [ ] TypeScript types correct
- [ ] `declare global` block
- [ ] Private methods met underscore
- [ ] Geen inline styles of templates in de component class

**Taal:**
- [ ] Story namen, JSDoc en component docs in het Nederlands
- [ ] Code comments in het Engels

**Shadow DOM:**
- [ ] Geen `part` attributen op shadow DOM elementen

**Verificatie:**
- [ ] Storybook gestart
- [ ] Component visueel gecontroleerd in Storybook
