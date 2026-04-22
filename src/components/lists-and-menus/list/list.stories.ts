import { html, render } from 'lit';
import './list.js';
import '../list-item/list-item.js';
import '../cells/title-cell/title-cell.js';
import '../cells/text-cell/text-cell.js';
import '../cells/spacer-cell/spacer-cell.js';
import '../cells/icon-cell/icon-cell.js';
import '../cells/drag-handle-cell/drag-handle-cell.js';
import '../../content/icon/icon.js';
import '../../content/title/title.js';
import '../../content/rich-text/rich-text.js';
import '../../status-and-feedback/inline-dialog/inline-dialog.js';
import '../../actions/button/button.js';
import '../../layout/spacer/spacer.js';
import '../../layout/box/box.js';

export default {
	title: 'Components/Lists & Menus/List',
	component: 'nldd-list',
	tags: ['autodocs'],
	argTypes: {
		variant: {
			control: 'select',
			options: ['simple', 'box', 'box-on-tinted'],
			description: 'Visual style of the list',
			table: { defaultValue: { summary: 'simple' } },
		},
		type: {
			control: 'select',
			options: ['list', 'navigation'],
			description: 'A11y semantics: `list` (role="list") or `navigation` (landmark with `aria-current` on the active item)',
			table: { defaultValue: { summary: 'list' } },
		},
		'no-dividers': {
			control: 'boolean',
			description: 'Hides dividers between list items',
			table: { type: { summary: 'boolean' }, defaultValue: { summary: 'false' } },
		},
		'empty-text': {
			control: 'text',
			description: 'Text of the default empty-state dialog. Falls back to i18n ("Geen resultaten").',
			table: { type: { summary: 'string' } },
		},
		'empty-supporting-text': {
			control: 'text',
			description: 'Supporting text of the default empty-state dialog.',
			table: { type: { summary: 'string' } },
		},
	},
	parameters: {
		docs: {
			description: {
				component: `
**When to use which \`type\`:**

- **\`list\`** (default) — semantic list (\`role="list"\`) with no special keyboard behaviour. Items may individually be buttons or links. Use for settings lists, data overviews, lists of cards.
- **\`navigation\`** — way-finding between pages or app sections. Items are links or buttons, each independently focusable via Tab. The active item gets \`aria-current="page"\` based on the \`selected\` prop. Use for sidebars, in-app menus, master/detail pickers.

Selection state is **always consumer-managed**: the list never mutates \`selected\` itself.
				`.trim(),
			},
		},
	},
};

export const Default = {
	args: {
		variant: 'simple',
		type: 'list',
		'no-dividers': false,
		'empty-text': '',
		'empty-supporting-text': '',
	},
	render: (args) => html`
		<nldd-list
			variant=${args.variant}
			type=${args.type}
			?no-dividers=${args['no-dividers']}
			empty-text=${args['empty-text']}
			empty-supporting-text=${args['empty-supporting-text']}
		>
			<nldd-list-item>
				<nldd-text-cell text="Item 1" />
			</nldd-list-item>
			<nldd-list-item>
				<nldd-text-cell text="Item 2" />
			</nldd-list-item>
			<nldd-list-item>
				<nldd-text-cell text="Item 3" />
			</nldd-list-item>
		</nldd-list>
	`,
};

export const Variants = {
	render: () => html`
		<div style="display: flex; flex-direction: column; gap: 32px;">
			<nldd-list variant="simple">
				<nldd-list-item><nldd-text-cell text="Simple — item 1" /></nldd-list-item>
				<nldd-list-item><nldd-text-cell text="Simple — item 2" /></nldd-list-item>
				<nldd-list-item><nldd-text-cell text="Simple — item 3" /></nldd-list-item>
			</nldd-list>

			<nldd-list variant="box">
				<nldd-list-item><nldd-text-cell text="Box — item 1" /></nldd-list-item>
				<nldd-list-item><nldd-text-cell text="Box — item 2" /></nldd-list-item>
				<nldd-list-item><nldd-text-cell text="Box — item 3" /></nldd-list-item>
			</nldd-list>

			<div style="background: var(--semantics-surfaces-tinted-background-color); padding: 24px;">
				<nldd-list variant="box-on-tinted">
					<nldd-list-item><nldd-text-cell text="Box-on-tinted — item 1" /></nldd-list-item>
					<nldd-list-item><nldd-text-cell text="Box-on-tinted — item 2" /></nldd-list-item>
					<nldd-list-item><nldd-text-cell text="Box-on-tinted — item 3" /></nldd-list-item>
				</nldd-list>
			</div>
		</div>
	`,
	parameters: {
		controls: { disable: true },
		docs: {
			description: {
				story: 'Three visual variants: `simple` (top-border only), `box` (tinted surface with rounded corners) and `box-on-tinted` (plain surface for use on an already-tinted background).',
			},
		},
	},
};

export const WithMultipleColumns = {
	render: () => html`
		<nldd-list variant="box">
			<nldd-list-item type="button">
				<nldd-spacer-cell slot="start" size="12"></nldd-spacer-cell>
				<nldd-icon-cell slot="start" size="24" vertical-alignment="top">
					<nldd-icon name="calendar-event"></nldd-icon>
				</nldd-icon-cell>
				<nldd-spacer-cell slot="start" size="8"></nldd-spacer-cell>
				<nldd-text-cell text="Primary title" supporting-text="Supporting text below"></nldd-text-cell>
				<nldd-spacer-cell></nldd-spacer-cell>
				<nldd-text-cell
					color="secondary"
					horizontal-alignment="right"
					width="fit-content"
					text="Detail"
				></nldd-text-cell>
				<nldd-spacer-cell size="8"></nldd-spacer-cell>
				<nldd-icon-cell color="secondary" size="16">
					<nldd-icon name="chevron-right"></nldd-icon>
				</nldd-icon-cell>
			</nldd-list-item>
			<nldd-list-item type="button">
				<nldd-spacer-cell slot="start" size="12"></nldd-spacer-cell>
				<nldd-icon-cell slot="start" size="24" vertical-alignment="top">
					<nldd-icon name="certificate"></nldd-icon>
				</nldd-icon-cell>
				<nldd-spacer-cell slot="start" size="8"></nldd-spacer-cell>
				<nldd-text-cell text="Another title" supporting-text="More description here"></nldd-text-cell>
				<nldd-spacer-cell size="8"></nldd-spacer-cell>
				<nldd-text-cell
					color="secondary"
					horizontal-alignment="right"
					width="fit-content"
					text="More detail"
				></nldd-text-cell>
				<nldd-spacer-cell size="8"></nldd-spacer-cell>
				<nldd-icon-cell color="secondary" size="16">
					<nldd-icon name="chevron-right"></nldd-icon>
				</nldd-icon-cell>
			</nldd-list-item>
		</nldd-list>
	`,
};

export const WithInteractiveItems = {
	render: () => html`
		<nldd-list variant="box">
			<nldd-list-item type="button">
				<nldd-text-cell text="Button item" />
			</nldd-list-item>
			<nldd-list-item href="/settings">
				<nldd-text-cell text="Link item" />
			</nldd-list-item>
			<nldd-list-item>
				<nldd-text-cell text="Non-interactive item" />
			</nldd-list-item>
		</nldd-list>
	`,
};

// — Type: navigation ——————————————————————————————————————————————————————————

export const TypeNavigation = {
	render: () => {
		const onClick = (e) => {
			const item = e.target.closest('nldd-list-item');
			if (!item) return;
			e.preventDefault();
			const list = item.closest('nldd-list');
			list.querySelectorAll('nldd-list-item').forEach(i => i.removeAttribute('selected'));
			item.setAttribute('selected', '');
		};
		return html`
			<nldd-list type="navigation" variant="box" aria-label="Hoofdmenu" @click=${onClick}>
				<nldd-list-item href="#dashboard"><nldd-text-cell text="Dashboard" /></nldd-list-item>
				<nldd-list-item href="#aanvragen" selected><nldd-text-cell text="Aanvragen" /></nldd-list-item>
				<nldd-list-item href="#meldingen"><nldd-text-cell text="Meldingen" /></nldd-list-item>
				<nldd-list-item href="#instellingen"><nldd-text-cell text="Instellingen" /></nldd-list-item>
			</nldd-list>
		`;
	},
	parameters: {
		controls: { disable: true },
		docs: {
			description: {
				story: 'Navigation landmark. Items are links (or buttons), each independently tab-focusable. The active item gets `aria-current="page"` via `selected`. The host carries `role="navigation"` and a default `aria-label="Navigatie"` (override via `aria-label`).',
			},
		},
	},
};


// — Reorderable ———————————————————————————————————————————————————————————————

export const ReorderableList = {
	// Imperative render is intentional: the nldd-reorder handler needs to mutate
	// the DOM in-place to demonstrate actual reordering. A standard Storybook
	// render function cannot do this because Lit templates are stateless.
	render: () => {
		const onReorder = (e) => {
			const list = e.currentTarget;
			const { fromIndex, toIndex } = e.detail;
			const items = [...list.querySelectorAll('nldd-list-item')];
			const moved = items[fromIndex];
			if (toIndex === 0) {
				items[0].before(moved);
			} else {
				const ref = items.filter((_, i) => i !== fromIndex)[toIndex - 1];
				ref.after(moved);
			}
		};

		const labels = ['Aardappelen', 'Broccoli', 'Courgette', 'Doperwten', 'Erwten'];

		const el = document.createElement('div');
		render(html`
			<nldd-list variant="box" reorderable @nldd-reorder=${onReorder}>
				${labels.map((label) => html`
					<nldd-list-item>
						<nldd-spacer-cell slot="start" size="8"></nldd-spacer-cell>
						<nldd-drag-handle-cell size="sm" slot="start" reorderable-only></nldd-drag-handle-cell>
						<nldd-spacer-cell slot="start" reorderable-only size="8"></nldd-spacer-cell>
						<nldd-text-cell text="${label}" />
					</nldd-list-item>
				`)}
			</nldd-list>
		`, el);
		return el;
	},
	parameters: {
		controls: { disable: true },
		docs: {
			description: {
				story: 'Set `reorderable` on a default-type list to enable drag-and-keyboard reorder. The list emits `nldd-reorder` with `{ fromIndex, toIndex }` — the consumer is responsible for mutating the DOM (or data model).',
			},
		},
	},
};


// — Header & footer ———————————————————————————————————————————————————————————

export const WithHeaderAndFooter = {
	render: () => html`
		<div style="container-type: inline-size; container-name: layout-area;">
			<nldd-list variant="box">
				<nldd-title slot="header" size="4">
					<h5>Notifications</h5>
				</nldd-title>
				<nldd-list-item>
					<nldd-text-cell text="Allow notifications" />
				</nldd-list-item>
				<nldd-list-item>
					<nldd-text-cell text="Sounds" />
				</nldd-list-item>
				<nldd-list-item>
					<nldd-text-cell text="Badges" />
				</nldd-list-item>
				<nldd-rich-text slot="footer">
					<p>Notifications will only be sent when the app is active on your device.</p>
				</nldd-rich-text>
			</nldd-list>
		</div>
	`,
};


// — Empty slot ————————————————————————————————————————————————————————————————

export const EmptyDefault = {
	render: () => html`
		<nldd-list variant="box"></nldd-list>
	`,
	parameters: {
		controls: { disable: true },
		docs: {
			description: {
				story: 'Out of the box, an empty list renders a default `nldd-inline-dialog` with i18n text ("Geen resultaten"). No configuration needed.',
			},
		},
	},
};

export const EmptyWithAttributes = {
	render: () => html`
		<nldd-list
			variant="box"
			empty-text="Niets gevonden"
			empty-supporting-text="Probeer een andere zoekterm."
		></nldd-list>
	`,
	parameters: {
		controls: { disable: true },
		docs: {
			description: {
				story: 'Use `empty-text` and `empty-supporting-text` to tweak the default dialog without writing markup. For anything richer (icon, action buttons, alert variant) slot a full `nldd-inline-dialog`.',
			},
		},
	},
};

export const EmptySlotOverride = {
	render: () => html`
		<nldd-list variant="box">
			<nldd-inline-dialog
				slot="empty"
				icon-name="search"
				text="Geen resultaten"
				supporting-text="Pas de filters aan of probeer een andere zoekterm."
			>
				<nldd-button slot="actions" variant="neutral-tinted" text="Filters wissen"></nldd-button>
			</nldd-inline-dialog>
		</nldd-list>
	`,
	parameters: {
		controls: { disable: true },
		docs: {
			description: {
				story: 'Slotting content into `[slot=empty]` fully replaces the default dialog — bring your own icon, heading, supporting text, or action buttons.',
			},
		},
	},
};
