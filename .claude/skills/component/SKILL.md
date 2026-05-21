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
  Het `{element}`-segment is de **volledige BEM-elementnaam**, niet afgekort: `--_disclosure-icon-margin-right`, niet `--_disclosure-margin-right`. Laat het element-segment weg voor het root-block (`--_background-color`). Gebruik één generieke naam als de var door meerdere elementen gedeeld wordt (bijv. `--_icon-size` voor `__start-icon` én `__end-icon`).

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
		container-name: layout-container;
		container-type: inline-size;
	}

	:host([size="md"]) .{naam},
	:host(:not([size])) .{naam} {
		min-height: var(--semantics-controls-md-min-size);
		border-radius: var(--semantics-controls-md-corner-radius);
	}


	/* ## Responsive — container queries (binnen layout-container) */

	.{naam}__content {
		@container layout-container (max-width: ${smMax}) {
			/* sm: compact weergave */
		}

		@container layout-container (min-width: ${mdMin}) and (max-width: ${mdMax}) {
			/* md */
		}

		@container layout-container (min-width: ${lgMin}) {
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
		box-shadow: var(--semantics-focus-ring-box-shadow);
		outline: var(--semantics-focus-ring-outline);
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

### Controls conventies

- **`args` staat altijd vóór `argTypes`** in de default export
- **Args keys:** altijd camelCase (bijv. `startIcon`, `fullWidth`)
- **`name:`** het HTML attribuut in kebab-case (bijv. `name: 'start-icon'`, `name: 'full-width'`)
- **`table.defaultValue.summary:`** altijd invullen met de default waarde
- **`description:`** korte Nederlandse beschrijving
- **Icon controls:** gebruik `control: 'select'` met `options: ['(geen)', ...ICONS]` plus `mapping: { '(geen)': '' }` — importeer `ICONS` uit `../../content/icon/ndd-icon.ts`. Nooit een text input voor iconen.
- **Optionele select-controls:** Storybook toont anders een leeg item of letterlijk "undefined" in de dropdown. Gebruik `'(geen)'` als label en `mapping` om dat naar de echte waarde te vertalen. Plaats `'(geen)'` als eerste element in `options`. In `args` staat de **actual value** (`''` of `undefined`) — Storybook reverse-lookt via `mapping` welke label de huidige waarde representeert en toont die als geselecteerd in de UI. De render-functie ontvangt eveneens de actual value. Let op: bij opties met numerieke waarden (`1, 2, ...`) plaatst JS de integer-index keys altijd eerst in `Object.keys`, waardoor `'(geen)'` visueel onderaan de dropdown belandt; de selected-state werkt wel correct, dus accepteer dat als trade-off.
  ```ts
  // String prop met '' als "geen waarde"
  args: { variant: '' },
  argTypes: {
    variant: {
      control: 'select',
      options: ['(geen)', 'icon-and-text', 'text', 'icon'],
      mapping: { '(geen)': '' },
      table: { defaultValue: { summary: '(geen)' } },
    },
  },

  // Number prop met undefined als "geen waarde"
  args: { headingLevel: undefined },
  argTypes: {
    headingLevel: {
      control: 'select',
      options: ['(geen)', 1, 2, 3, 4, 5, 6],
      mapping: { '(geen)': undefined },
      table: { defaultValue: { summary: '(geen)' } },
    },
  },
  ```
- **Volgorde consistent**: `args`, `argTypes`, template-destructuring en HTML-attributen in de template gebruiken dezelfde volgorde, volgens de canon hieronder.

### Canonieke control volgorde

Per component: pak alleen de keys die je gebruikt en zet ze in deze volgorde. De groepering is een mentaal model — de daadwerkelijke `args`/`argTypes` is een platte lijst.

```
[1. Visueel dominant]
variant, size, compact, color, background, layout, panes,
iconOnly, responsive, showItemLabels, inspectorAsSheet, sidebarAsSheet, noLogo

[2. Sizing]
resize, rows, width, minWidth, maxWidth, height, minHeight, fullWidth,
itemWidth, containerSize

[3. Space]
spacing, padding, paddingInline, paddingBlock, paddingTop, paddingRight,
paddingBottom, paddingLeft
+ smPadding…, mdPadding…, lgPadding…, layoutAreaXxxxPadding…

[4. Alignment and position]
horizontalAlignment, verticalAlignment, direction, orientation, placement,
labelAlignment, top, right, bottom, left, child

[5. Main content]
text, supportingText, overline, label, supportingLabel, optional,
placeholder, number, headingLevel,
icon, startIcon, endIcon, containerColor,
quote, attribution, cite, keys,
logoTitle, logoSubtitle, logoSupportingText1, logoSupportingText2, logoHref,
websiteTitle, websiteHref, backText, backHref, dismissText

[6. Key behavior]
control, expandable

[7. A11y]
accessibleLabel

[8. Elements]
showSearchButton, hideSpinButtons, hasDragHandle, maxItems

[9. Elements content]
showText, hideText, overflowText

[10. Elements A11y]
showAccessibleLabel, hideAccessibleLabel

[11. Behavior]
modeless, movable, stickyHeader, stickyFooter, hasContent, alwaysVisible,
showLoadMore, lazyLoad, collapseAnchor, contentPriority

[12. States]
selected, checked, indeterminate, open, valid, invalid, masked, readonly, current, disabled

[13. Form]
name, value, type, min, max, step, required, total,
autocomplete, noSpellcheck, href, target, method, action, novalidate
```

**Open punt**: `type` staat onder Form (HTML input type, vaakste betekenis). Voor `segmented-control` heeft het een andere semantiek (radio/checkbox-modus); kan later via een rename naar bijv. `selectionMode` opgelost worden.

```typescript
import { html, nothing } from 'lit';
import './ndd-{naam}.ts';
import { ICONS } from '../../content/icon/ndd-icon.ts';

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
	args: {
		size: 'md',
		startIcon: '',
		fullWidth: false,
		disabled: false,
	},
	argTypes: {
		size: {
			control: 'select',
			options: ['xs', 'sm', 'md'],
			description: 'Componentmaat',
			table: { defaultValue: { summary: 'md' } },
		},
		startIcon: {
			name: 'start-icon',
			control: 'select',
			options: ['(geen)', ...ICONS],
			mapping: { '(geen)': '' },
			description: 'Icoon voor de tekst',
			table: { defaultValue: { summary: '(geen)' } },
		},
		fullWidth: {
			name: 'full-width',
			control: 'boolean',
			description: 'Full width',
			table: { defaultValue: { summary: false } },
		},
		disabled: {
			control: 'boolean',
			description: 'Uitgeschakelde staat',
			table: { defaultValue: { summary: false } },
		},
	},
};

const Template = ({
	size,
	startIcon,
	fullWidth,
	disabled,
}: Record<string, unknown>) => html`
	<ndd-{naam}
		size=${size || nothing}
		start-icon=${startIcon || nothing}
		?full-width=${fullWidth}
		?disabled=${disabled}
	>Label</ndd-{naam}>
`;

export const Default = Template.bind({});
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
<!-- Vaste spacing op alle breakpoints -->
<ndd-spacer size="32"></ndd-spacer>

<!-- Per breakpoint anders -->
<ndd-spacer sm-size="16" md-size="24" lg-size="32"></ndd-spacer>

<!-- Vult beschikbare ruimte op -->
<ndd-spacer size="flexible"></ndd-spacer>
```

**Beschikbare sizes:** 2, 4, 6, 8, 10, 12, 16, 20, 24, 28, 32, 40, 44, 48, 56, 64, 80, 96, flexible

**Per-viewport overrides:** `sm-size` (max 640px), `md-size` (641–1007px), `lg-size` (min 1008px). Niet expliciet gezet → val terug op `size`.

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
- **Property-volgorde binnen een rule: Concentric CSS** ([bron](https://rhodesmill.org/brandon/2011/concentric-css/)) — van buiten de box naar binnen. Ná de `--_*` vars (die staan bovenin `:host`):
  1. `box-sizing`, `display`, `position`, `inset` / `top` / `right` / `bottom` / `left`, `float`, `clear`
  2. `visibility`, `opacity`, `z-index`
  3. `margin`
  4. `outline`, `outline-offset`, `border`, `border-radius`, `box-shadow`
  5. `background`, `background-*`
  6. `cursor`, `pointer-events`
  7. `width` / `min-width` / `max-width`, `height` / `min-height` / `max-height`, `overflow`
  8. `padding`
  9. layout van kinderen: `flex-*`, `grid-*`, `gap`, `align-*`, `justify-*`, `place-*`, `order`, `vertical-align`, `text-align`
  10. inhoud: `color`, `font` / `font-*`, `line-height`, `letter-spacing`, `text-decoration`, `text-overflow`, `white-space`, `content`
  11. gedrag/effect: `transition`, `transform`, `animation`, `appearance`, `isolation`, `-webkit-tap-highlight-color`
  Pseudo-elementen: `content: ''` mag bovenaan (vóór 1). Responsive breakpoint-`@container`/`@media` blijven genest, ná de properties van die rule.
- **CSS nesting** voor *responsive* breakpoint-overrides (`@container` en `@media` met sm/md/lg) — genest in de element/`:host` rule. **State/toegankelijkheid-`@media`** (`forced-colors`, `prefers-reduced-motion`, `hover`) **niet nesten** — als los blok direct ná de element-rule die het wijzigt; géén aparte sectie ervoor
- Declareer **alle** lokale CSS variabelen (`--_*`) **bovenin `:host`**, gevolgd door een lege regel die ze scheidt van de overige properties. Inclusief responsive overrides via `@container` nesting. Elementen gebruiken alleen `var(--_foo)`, nooit fallbacks: niet `var(--_foo, 100)`
- **Volgorde van de `--_*` vars: in volgorde van eerste gebruik** in de stylesheet (de rules staan zelf in Concentric volgorde, dus dit volgt daaruit). Niet concentric- of alfabetisch sorteren. Pas dezelfde canonieke volgorde toe in élk override-blok (`:host([size=…])`, `:host([variant=…])`, `:host([expanded]…)`): elk blok somt z'n subset in die volgorde op. Herordenen is risicoloos — declaratievolgorde heeft geen cascade-effect
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
/* GOED — vars bovenin :host, lege regel, dan de rest */
:host {
	--_min-height: var(--semantics-controls-md-min-size);
	--_logo-width: var(--primitives-space-40);

	@container layout-container (min-width: 641px) {
		--_logo-width: var(--primitives-space-44);
	}

	display: inline-flex;
	min-height: var(--_min-height);
}
.logo {
	width: var(--_logo-width);
	height: calc(var(--_logo-width) * 2);
}

/* FOUT — vars vermengd met properties zonder scheidingsregel */
:host {
	display: inline-flex;
	--_min-height: var(--semantics-controls-md-min-size);
	min-height: var(--_min-height);
}

/* FOUT — lokale var op element ipv :host */
.logo {
	--_logo-width: var(--primitives-space-40);
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
- [ ] Concentric property-volgorde binnen elke rule
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
