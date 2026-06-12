import { html, nothing } from 'lit';
import './byline.js';
import '../../navigation/link/link.js';

// Self-contained SVG avatars (data URIs) so the stories don't depend on
// external images or the static assets folder.
const avatar = (initials: string, color: string) =>
	`data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 40 40'%3E%3Crect width='40' height='40' fill='%23${color}'/%3E%3Ctext x='20' y='25' font-family='sans-serif' font-size='14' fill='white' text-anchor='middle'%3E${initials}%3C/text%3E%3C/svg%3E`;
const AVATAR_1 = avatar('JJ', '185FA5');
const AVATAR_2 = avatar('PP', '38860A');
const AVATAR_3 = avatar('AK', '993C1D');

/**
 * Een byline toont auteurs of redacteuren van content: optionele avatar(s),
 * een naamregel en ondersteunende tekst (bijvoorbeeld rol of datum). Alle
 * onderdelen zijn optioneel.
 *
 * Avatars worden geslot als `<img slot="avatars">`. Bij meerdere
 * redacteuren overlappen ze elkaar subtiel, gescheiden door een ring in de
 * surface-kleur. Staat de byline op een gekleurde ondergrond, geef die
 * kleur dan door via `--context-parent-background-color` zodat de ring
 * meekleurt. Zet `alt=""` op de afbeeldingen wanneer de namen al in de
 * tekst staan.
 */
export default {
	title: 'Components/Content/Byline',
	component: 'nldd-byline',
	tags: ['autodocs'],
	parameters: {
		componentSource: {
			file: 'src/components/content/byline/byline.ts',
			repository: 'https://github.com/MinBZK/storybook',
		},
		status: { type: 'beta' },
	},
	args: {
		text: 'Jan Jansen',
		supportingText: 'Redacteur — 12 juni 2026',
	},
	argTypes: {
		text: {
			control: 'text',
			description: 'Naamregel',
		},
		supportingText: {
			name: 'supporting-text',
			control: 'text',
			description: 'Ondersteunende tekst onder de naamregel (bijv. rol of datum)',
		},
	},
};

const Template = (args: Record<string, any>) => html`
	<nldd-byline
		text=${args.text || nothing}
		supporting-text=${args.supportingText || nothing}
	>
		<img slot="avatars"
			src=${AVATAR_1}
			alt=""
		>
	</nldd-byline>
`;

export const Standaard = {
	render: Template,
};

export const MeerdereRedacteuren = {
	render: () => html`
		<nldd-byline
			text="Jan Jansen, Petra Pietersen en Ahmed Karim"
			supporting-text="Laatst bijgewerkt op 12 juni 2026"
		>
			<img slot="avatars"
				src=${AVATAR_1}
				alt=""
			>
			<img slot="avatars"
				src=${AVATAR_2}
				alt=""
			>
			<img slot="avatars"
				src=${AVATAR_3}
				alt=""
			>
		</nldd-byline>
	`,
	parameters: { controls: { disable: true } },
};

/**
 * Gebruik de `text`- en `supporting-text`-slots voor rijke inhoud: een
 * `<time datetime="…">` voor machine-leesbare datums of een link naar het
 * auteursprofiel. Geslotte inhoud vervangt het bijbehorende attribuut.
 */
export const MetTimeEnLink = {
	render: () => html`
		<nldd-byline>
			<img slot="avatars"
				src=${AVATAR_1}
				alt=""
			>
			<span slot="text">Door <nldd-link href="#auteur" text="Jan Jansen"></nldd-link></span>
			<time slot="supporting-text"
				datetime="2026-06-12"
			>12 juni 2026</time>
		</nldd-byline>
	`,
	parameters: { controls: { disable: true } },
};

export const ZonderAvatar = {
	render: () => html`
		<nldd-byline
			text="Jan Jansen"
			supporting-text="Redacteur — 12 juni 2026"
		></nldd-byline>
	`,
	parameters: { controls: { disable: true } },
};

export const ZonderSupportingText = {
	render: () => html`
		<nldd-byline text="Jan Jansen">
			<img slot="avatars"
				src=${AVATAR_1}
				alt=""
			>
		</nldd-byline>
	`,
	parameters: { controls: { disable: true } },
};
