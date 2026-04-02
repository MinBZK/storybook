import { html } from 'lit';
import './ndd-spacer.ts';
import '../../actions/button/ndd-button.ts';

/**
 * Gebruik een spacer om ruimte tussen elementen te creëren.
 * Componenten in dit design system hebben geen eigen margins — alle witruimte
 * wordt expliciet bepaald met een spacer. Dat maakt de ruimte zichtbaar en
 * aanpasbaar zonder de componenten zelf te wijzigen.
 *
 * Gebruik een spacer **tussen verschillende types componenten**: tussen een knop
 * en een tekstveld, tussen een titel en een lijst, of tussen secties onderling.
 * Zo houd je componenten herbruikbaar en onafhankelijk van hun context.
 *
 * Kies een **vaste grootte** voor ruimte die altijd gelijk blijft, de
 * **responsieve 'md'** voor ruimte die meebeweegt met de containergrootte, of
 * **flexible** om een element naar het andere uiteinde van een rij te duwen.
 *
 * ## Gebruik
 * ```html
 * <!-- Vaste spacing -->
 * <ndd-spacer size="32"></ndd-spacer>
 *
 * <!-- Responsief: 16px in sm, 24px in md en lg -->
 * <ndd-spacer size="md"></ndd-spacer>
 *
 * <!-- Vult beschikbare ruimte op -->
 * <ndd-spacer size="flexible"></ndd-spacer>
 * ```
 */
export default {
	title: 'Components/Layout/Spacer',
	component: 'ndd-spacer',
	tags: ['autodocs'],
	parameters: {
		componentSource: {
			file: 'src/components/layout/spacer/ndd-spacer.ts',
			repository: 'https://github.com/MinBZK/storybook',
		},
		status: {
			type: 'stable',
		},
	},
	argTypes: {
		size: {
			control: { type: 'select' },
			options: [
				'flexible',
				'md',
				'2',
				'4',
				'6',
				'8',
				'10',
				'12',
				'16',
				'20',
				'24',
				'28',
				'32',
				'40',
				'44',
				'48',
				'56',
				'64',
				'80',
				'96',
			],
			type: { name: 'string', required: false },
			description: 'Spacer size',
			table: {
				defaultValue: { summary: '16' },
			},
		},
		direction: {
			control: 'select',
			options: ['horizontal', 'vertical', 'both'],
			description: 'Direction of spacing',
			table: {
				defaultValue: { summary: 'both' },
			},
		},
	},
	args: {
		size: '16',
		direction: 'both',
	},
};

export const Standaard = ({ size, direction }) => html`
	<div style="display: flex; flex-direction: column; align-items: flex-start;">
		<ndd-button text="Knop"></ndd-button>
		<ndd-spacer size=${size} direction=${direction}></ndd-spacer>
		<ndd-button text="Knop"></ndd-button>
	</div>
`;

export const Flexibel = () => html`
	<div style="display: flex; align-items: center;">
		<ndd-button text="Links"></ndd-button>
		<ndd-spacer size="flexible"></ndd-spacer>
		<ndd-button text="Rechts"></ndd-button>
	</div>
`;
Flexibel.parameters = { controls: { disable: true } };

export const Responsief = () => html`
	<div style="display: flex; flex-direction: column; align-items: flex-start;">
		<p style="font-size: 14px; color: var(--semantics-content-color); margin: 0 0 8px 0;">
			sm — 16px
		</p>
		<div
			style="display: flex; flex-direction: column; align-items: flex-start; width: 320px; border: 1px dashed #cbd5e1; padding: 8px;"
		>
			<ndd-button text="Knop"></ndd-button>
			<ndd-spacer size="md"></ndd-spacer>
			<ndd-button text="Knop"></ndd-button>
		</div>

		<ndd-spacer size="24" direction="vertical"></ndd-spacer>

		<p style="font-size: 14px; color: var(--semantics-content-color); margin: 0 0 8px 0;">
			md — 24px
		</p>
		<div
			style="display: flex; flex-direction: column; align-items: flex-start; width: 641px; border: 1px dashed #cbd5e1; padding: 8px;"
		>
			<ndd-button text="Knop"></ndd-button>
			<ndd-spacer size="md"></ndd-spacer>
			<ndd-button text="Knop"></ndd-button>
		</div>

		<ndd-spacer size="24" direction="vertical"></ndd-spacer>

		<p style="font-size: 14px; color: var(--semantics-content-color); margin: 0 0 8px 0;">
			lg — 24px
		</p>
		<div
			style="display: flex; flex-direction: column; align-items: flex-start; width: 1008px; border: 1px dashed #cbd5e1; padding: 8px;"
		>
			<ndd-button text="Knop"></ndd-button>
			<ndd-spacer size="md"></ndd-spacer>
			<ndd-button text="Knop"></ndd-button>
		</div>
	</div>
`;
Responsief.parameters = { controls: { disable: true } };

export const VasteGroottes = () => html`
	<div style="display: flex; flex-direction: column;">
		${[
			'2',
			'4',
			'6',
			'8',
			'10',
			'12',
			'16',
			'20',
			'24',
			'28',
			'32',
			'40',
			'44',
			'48',
			'56',
			'64',
			'80',
			'96',
		].map(
			(size) => html`
				<div style="display: flex; align-items: center;">
					<ndd-button text="${size}"></ndd-button>
					<ndd-spacer size=${size} direction="horizontal"></ndd-spacer>
					<ndd-button text="${size}"></ndd-button>
				</div>
			`
		)}
	</div>
`;
VasteGroottes.parameters = { controls: { disable: true } };
