import { html, nothing } from 'lit';
import './avatar-group.js';
import '../avatar/avatar.js';

/**
 * De Avatar Group toont meerdere avatars als één groep: overlappend, met een ring
 * in de vlakkleur zodat ze gescheiden blijven.
 *
 * ## Gebruik
 * ```html
 * <nldd-avatar-group>
 *   <nldd-avatar name="Jan Jansen" decorative></nldd-avatar>
 *   <nldd-avatar name="Fatima El Amrani" decorative></nldd-avatar>
 * </nldd-avatar-group>
 * ```
 */
const SIZES = ['16', '20', '24', '28', '32', '40', '44', '48', '56', '64', '80', '96'];

export default {
	title: 'Components/Content/Avatar Group',
	component: 'nldd-avatar-group',
	tags: ['autodocs'],
	parameters: {
		componentSource: {
			file: 'src/components/content/avatar-group/avatar-group.ts',
			repository: 'https://github.com/MinBZK/storybook',
		},
		status: {
			type: 'stable',
		},
	},
	args: {
		size: '40',
		overlap: 'md',
		accessibleLabel: '',
	},
	argTypes: {
		size: {
			control: 'select',
			options: SIZES,
			description: 'Diameter van elke avatar in px',
			table: {
				defaultValue: { summary: '40' },
			},
		},
		overlap: {
			control: 'select',
			options: ['none', 'sm', 'md'],
			description: 'Hoeveel elke avatar over zijn voorganger valt',
			table: {
				defaultValue: { summary: 'md' },
			},
		},
		accessibleLabel: {
			name: 'accessible-label',
			control: 'text',
			description: 'Beschrijft de groep als geheel (bijv. "Redactie")',
		},
	},
};

const Template = ({ size, overlap, accessibleLabel }: Record<string, any>) => html`
	<nldd-avatar-group
		size=${size}
		overlap=${overlap}
		accessible-label=${accessibleLabel || nothing}
	>
		<nldd-avatar name="Jan Jansen" decorative></nldd-avatar>
		<nldd-avatar name="Fatima El Amrani" decorative></nldd-avatar>
		<nldd-avatar name="Pieter de Vries" decorative></nldd-avatar>
	</nldd-avatar-group>
`;

export const Default = {
	render: Template,
};

export const Overlap = {
	render: () => html`
		<div style="display: flex; gap: 32px; align-items: center;">
			<nldd-avatar-group overlap="none">
				<nldd-avatar name="Jan Jansen" decorative></nldd-avatar>
				<nldd-avatar name="Fatima El Amrani" decorative></nldd-avatar>
				<nldd-avatar name="Pieter de Vries" decorative></nldd-avatar>
			</nldd-avatar-group>
			<nldd-avatar-group overlap="sm">
				<nldd-avatar name="Jan Jansen" decorative></nldd-avatar>
				<nldd-avatar name="Fatima El Amrani" decorative></nldd-avatar>
				<nldd-avatar name="Pieter de Vries" decorative></nldd-avatar>
			</nldd-avatar-group>
			<nldd-avatar-group>
				<nldd-avatar name="Jan Jansen" decorative></nldd-avatar>
				<nldd-avatar name="Fatima El Amrani" decorative></nldd-avatar>
				<nldd-avatar name="Pieter de Vries" decorative></nldd-avatar>
			</nldd-avatar-group>
		</div>
	`,
	parameters: {
		controls: { disable: true },
		docs: {
			description: {
				story: '`none` zet de avatars op een rij met ruimte ertussen, `sm` laat ze licht overlappen en `md` (standaard) het meest. Hoe meer overlap, hoe sterker het als één groep leest en hoe minder elk gezicht op zichzelf staat.',
			},
		},
	},
};

export const Sizes = {
	render: () => html`
		<div style="display: flex; gap: 24px; align-items: center;">
			${['24', '32', '40', '56'].map(size => html`
				<nldd-avatar-group size=${size}>
					<nldd-avatar name="Jan Jansen" decorative></nldd-avatar>
					<nldd-avatar name="Fatima El Amrani" decorative></nldd-avatar>
				</nldd-avatar-group>
			`)}
		</div>
	`,
	parameters: {
		controls: { disable: true },
		docs: {
			description: {
				story: 'De maat geldt voor de hele groep en wordt aan de avatars opgelegd. Onder de 28px schuiven ze minder ver over elkaar heen, anders blijft er van de kleinste avatar niets over.',
			},
		},
	},
};

export const WithImages = {
	render: () => html`
		<nldd-avatar-group accessible-label="Redactie">
			<img src="https://i.pravatar.cc/80?img=12" alt="">
			<img src="https://i.pravatar.cc/80?img=32" alt="">
			<img src="https://i.pravatar.cc/80?img=45" alt="">
		</nldd-avatar-group>
	`,
	parameters: {
		controls: { disable: true },
		docs: {
			description: {
				story: 'Een geslotte `img` krijgt dezelfde maat, ronding en ring als een `nldd-avatar`. Met een `accessible-label` wordt de rij één benoemde groep; de afbeeldingen zelf staan dan op `alt=""`, want de groep vertelt het verhaal.',
			},
		},
	},
};
