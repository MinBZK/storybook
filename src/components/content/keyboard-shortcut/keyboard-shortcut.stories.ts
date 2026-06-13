import { html, nothing } from 'lit';
import './keyboard-shortcut.js';

/**
 * De KeyboardShortcut component toont een toetsencombinatie in één gecombineerde
 * container, bijvoorbeeld naast een menu-item of als hint bij een actie.
 *
 * ## Gebruik
 * ```html
 * <nldd-keyboard-shortcut keys="Ctrl+K"></nldd-keyboard-shortcut>
 *
 * <!-- Cross-platform: per OS een eigen string -->
 * <nldd-keyboard-shortcut
 *   keys="Ctrl+K"
 *   mac-keys="⌘+K"
 *   windows-keys="Ctrl+K"
 *   linux-keys="Ctrl+K"
 * ></nldd-keyboard-shortcut>
 * ```
 *
 * Het component picks zelf de juiste set op basis van de gedetecteerde OS,
 * met `keys` als fallback voor onbekende platforms.
 */
export default {
	title: 'Components/Content/Keyboard Shortcut',
	component: 'nldd-keyboard-shortcut',
	tags: ['autodocs'],
	parameters: {
		componentSource: {
			file: 'src/components/content/keyboard-shortcut/keyboard-shortcut.ts',
			repository: 'https://github.com/MinBZK/storybook',
		},
		status: {
			type: 'stable',
		},
	},
	argTypes: {
		size: {
			control: 'select',
			options: ['sm', 'md'],
			description: 'Grootte van de container',
			table: {
				defaultValue: { summary: 'md' },
			},
		},
		color: {
			control: 'select',
			options: ['neutral', 'inherit'],
			description: "'neutral' (default) gebruikt de eigen kleuren; 'inherit' volgt de omringende tekstkleur (currentColor) met een doorschijnende contrast-vulling",
			table: {
				defaultValue: { summary: 'neutral' },
			},
		},
		alwaysVisible: {
			name: 'always-visible',
			control: 'boolean',
			description: 'Toon ook op touch-only devices waar shortcuts niet aanroepbaar zijn',
			table: {
				defaultValue: { summary: 'false' },
			},
		},
		keys: {
			control: 'text',
			description: 'Toetsen gescheiden door +',
		},
		macKeys: {
			name: 'mac-keys',
			control: 'text',
			description: 'Optionele override voor macOS (incl. iPhone/iPad/iPod)',
		},
		windowsKeys: {
			name: 'windows-keys',
			control: 'text',
			description: 'Optionele override voor Windows',
		},
		linuxKeys: {
			name: 'linux-keys',
			control: 'text',
			description: 'Optionele override voor Linux/ChromeOS',
		},
	},
	args: {
		size: 'md',
		color: 'neutral',
		alwaysVisible: false,
		keys: 'Ctrl+K',
		macKeys: '',
		windowsKeys: '',
		linuxKeys: '',
	},
};

const Template = ({ size, color, alwaysVisible, keys, macKeys, windowsKeys, linuxKeys }: Record<string, any>) => html`
	<nldd-keyboard-shortcut
		size=${size}
		color=${color || nothing}
		?always-visible=${alwaysVisible}
		keys=${keys}
		mac-keys=${macKeys || nothing}
		windows-keys=${windowsKeys || nothing}
		linux-keys=${linuxKeys || nothing}
	></nldd-keyboard-shortcut>
`;

export const Default = {
	render: Template,
	args: {
		keys: 'Ctrl+K',
	},
};

export const CommonShortcuts = {
	render: () => html`
		<div style="display: flex; flex-direction: column; gap: 12px; align-items: flex-start;">
			<nldd-keyboard-shortcut keys="Cmd+K"></nldd-keyboard-shortcut>
			<nldd-keyboard-shortcut keys="Ctrl+C"></nldd-keyboard-shortcut>
			<nldd-keyboard-shortcut keys="Ctrl+Shift+P"></nldd-keyboard-shortcut>
			<nldd-keyboard-shortcut keys="⌘+⇧+F"></nldd-keyboard-shortcut>
			<nldd-keyboard-shortcut keys="Esc"></nldd-keyboard-shortcut>
		</div>
	`,
	parameters: {
		controls: { disable: true },
	},
};

export const Sizes = {
	render: () => html`
		<div style="display: flex; gap: 16px; align-items: center;">
			<nldd-keyboard-shortcut size="md" keys="Cmd+K"></nldd-keyboard-shortcut>
			<nldd-keyboard-shortcut size="sm" keys="Cmd+K"></nldd-keyboard-shortcut>
		</div>
	`,
	parameters: {
		controls: { disable: true },
	},
};

export const Inherit = {
	render: () => html`
		<div style="display: flex; gap: 16px; align-items: center; padding: 16px; border-radius: 8px; background: var(--semantics-categories-donkerblauw-reference-background-color); color: var(--semantics-categories-donkerblauw-reference-primary-content-color);">
			<nldd-keyboard-shortcut color="inherit" keys="Cmd+K"></nldd-keyboard-shortcut>
			<nldd-keyboard-shortcut color="inherit" keys="Ctrl+Shift+P"></nldd-keyboard-shortcut>
		</div>
	`,
	parameters: {
		controls: { disable: true },
		docs: { description: { story: '`color="inherit"` laat de toetsen en scheidingstekens de omringende tekstkleur volgen (currentColor) — hier wit op een donkerblauw vlak. De toetsen worden een omtrek in die kleur.' } },
	},
};

export const Mac = {
	render: () => html`
		<nldd-keyboard-shortcut
			debug-os="mac"
			keys="Ctrl+K"
			mac-keys="⌘+K"
			windows-keys="Ctrl+K"
			linux-keys="Ctrl+K"
		></nldd-keyboard-shortcut>
	`,
	parameters: {
		controls: { disable: true },
		docs: { description: { story: 'Per-instance `debug-os="mac"` override — toont `mac-keys`.' } },
	},
};

export const Windows = {
	render: () => html`
		<nldd-keyboard-shortcut
			debug-os="windows"
			keys="Ctrl+K"
			mac-keys="⌘+K"
			windows-keys="Ctrl+K"
			linux-keys="Ctrl+K"
		></nldd-keyboard-shortcut>
	`,
	parameters: {
		controls: { disable: true },
		docs: { description: { story: 'Per-instance `debug-os="windows"` override — toont `windows-keys`.' } },
	},
};

export const Linux = {
	render: () => html`
		<nldd-keyboard-shortcut
			debug-os="linux"
			keys="Ctrl+K"
			mac-keys="⌘+K"
			windows-keys="Ctrl+K"
			linux-keys="Ctrl+K"
		></nldd-keyboard-shortcut>
	`,
	parameters: {
		controls: { disable: true },
		docs: { description: { story: 'Per-instance `debug-os="linux"` override — toont `linux-keys`.' } },
	},
};
