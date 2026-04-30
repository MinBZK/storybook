import { html } from 'lit';
import './keyboard-shortcut.js';

/**
 * De KeyboardShortcut component toont een toetsencombinatie in één gecombineerde
 * container, bijvoorbeeld naast een menu-item of als hint bij een actie.
 *
 * ## Gebruik
 * ```html
 * <nldd-keyboard-shortcut keys="Cmd+K"></nldd-keyboard-shortcut>
 * <nldd-keyboard-shortcut keys="Ctrl+Shift+P"></nldd-keyboard-shortcut>
 * ```
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
	},
	args: {
		size: 'md',
		alwaysVisible: false,
		keys: 'Cmd+K',
	},
};

const Template = ({ size, alwaysVisible, keys }: Record<string, any>) => html`
	<nldd-keyboard-shortcut
		size=${size}
		?always-visible=${alwaysVisible}
		keys=${keys}
	></nldd-keyboard-shortcut>
`;

export const Default = {
	render: Template,
	args: {
		keys: 'Cmd+K',
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
