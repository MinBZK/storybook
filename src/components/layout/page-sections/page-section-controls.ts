import { nothing } from 'lit';
import {
	Directive,
	directive,
	PartType,
	type ElementPart,
	type PartInfo,
} from 'lit/directive.js';

const PADDING_OPTIONS = [
	'', '0', '2', '4', '6', '8', '10', '12', '16', '20', '24',
	'28', '32', '40', '44', '48', '56', '64', '80', '96',
];

const paddingControl = (description: string) => ({
	control: { type: 'select' as const },
	options: PADDING_OPTIONS,
	description,
	table: { defaultValue: { summary: '' } },
});

/**
 * Shared Storybook controls for the PageSectionMixin surface API
 * (background, scheme, width, height and the 12 block-padding overrides).
 * Spread into a section story's `argTypes` / `args`, and bind onto the host
 * element in `render` with the `pageSectionAttrs` directive.
 */
export const pageSectionArgTypes = {
	background: {
		control: { type: 'select' },
		options: ['inherit', 'base', 'tinted'],
		description: 'Oppervlak: "inherit" (transparant) toont het oppervlak van de ouder; "base"/"tinted" tekenen een oppervlak en cascaden het naar afstammelingen',
		table: { defaultValue: { summary: 'inherit' } },
	},
	scheme: {
		control: { type: 'select' },
		options: ['inherit', 'light', 'dark', 'inverted'],
		description: 'Kleurschema: "inherit" erft; "inverted" is het tegenovergestelde van het omliggende paginaschema',
		table: { defaultValue: { summary: 'inherit' } },
	},
	width: {
		control: 'text',
		description: 'Body max-width: "full" verwijdert de constraint, of een CSS length (bv. "480px") overschrijft de default max-width',
		table: { defaultValue: { summary: '' } },
	},
	height: {
		control: 'text',
		description: 'Minimale sectiehoogte (CSS length, bv. "400px", "100dvh") — net als width op de body-max-width, mapt height op min-height van de host',
		table: { defaultValue: { summary: '' } },
	},
	'padding-block': paddingControl('Block (boven+onder) padding-override (token 0–96; "0" verwijdert de padding)'),
	'padding-top': paddingControl('Override van alleen de bovenpadding'),
	'padding-bottom': paddingControl('Override van alleen de onderpadding'),
	'sm-padding-block': paddingControl('Block-padding op sm (≤640px)'),
	'sm-padding-top': paddingControl('Bovenpadding op sm (≤640px)'),
	'sm-padding-bottom': paddingControl('Onderpadding op sm (≤640px)'),
	'md-padding-block': paddingControl('Block-padding op md (641–1007px)'),
	'md-padding-top': paddingControl('Bovenpadding op md (641–1007px)'),
	'md-padding-bottom': paddingControl('Onderpadding op md (641–1007px)'),
	'lg-padding-block': paddingControl('Block-padding op lg (≥1008px)'),
	'lg-padding-top': paddingControl('Bovenpadding op lg (≥1008px)'),
	'lg-padding-bottom': paddingControl('Onderpadding op lg (≥1008px)'),
};

export const pageSectionArgs = {
	background: 'inherit',
	scheme: 'inherit',
	width: '',
	height: '',
	'padding-block': '',
	'padding-top': '',
	'padding-bottom': '',
	'sm-padding-block': '',
	'sm-padding-top': '',
	'sm-padding-bottom': '',
	'md-padding-block': '',
	'md-padding-top': '',
	'md-padding-bottom': '',
	'lg-padding-block': '',
	'lg-padding-top': '',
	'lg-padding-bottom': '',
};

const PAGE_SECTION_ATTR_KEYS = Object.keys(pageSectionArgs);

class PageSectionAttrsDirective extends Directive {
	constructor(partInfo: PartInfo) {
		super(partInfo);
		if (partInfo.type !== PartType.ELEMENT) {
			throw new Error('pageSectionAttrs must be used on an element');
		}
	}

	render(_args: Record<string, unknown>) {
		return nothing;
	}

	override update(part: ElementPart, [args]: [Record<string, unknown>]) {
		const el = part.element;
		for (const key of PAGE_SECTION_ATTR_KEYS) {
			const value = args[key];
			if (typeof value === 'string' && value !== '') {
				el.setAttribute(key, value);
			} else {
				el.removeAttribute(key);
			}
		}
		return nothing;
	}
}

/**
 * Element-part directive that mirrors the PageSectionMixin args onto a section
 * host: `<nldd-simple-section ${pageSectionAttrs(args)}>`. Empty/non-string
 * values remove the attribute so unset controls fall back to the defaults.
 */
export const pageSectionAttrs = directive(PageSectionAttrsDirective);
