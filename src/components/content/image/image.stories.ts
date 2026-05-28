import { html } from 'lit';
import './image.ts';
import './lqip-encoder.ts';

const SAMPLE_SRC = 'https://images.unsplash.com/photo-1543872084-c7bd3822856f?auto=format&fit=crop&w=1200&q=70';
const SAMPLE_ALT = 'Het Binnenhof in Den Haag bij avondlicht';

/**
 * Een gestylede wrapper rond `<img>` met de design system tokens voor radius,
 * achtergrond en caption. Reserveert ruimte via `aspect-ratio` om layout-shift
 * te voorkomen tijdens het laden. Voor avatars: `shape="circle"` met
 * `aspect-ratio="1/1"`.
 *
 * Slot je eigen `<img>` of `<picture>` (bv. met art-direction sources) in de
 * default slot om de interne fallback te overschrijven.
 */
export default {
	title: 'Components/Content/Image',
	component: 'nldd-image',
	tags: ['autodocs'],
	parameters: {
		componentSource: {
			file: 'src/components/content/image/image.ts',
			repository: 'https://github.com/MinBZK/storybook',
		},
		status: { type: 'beta' },
	},
	args: {
		src: SAMPLE_SRC,
		alt: SAMPLE_ALT,
		width: 'full',
		aspectRatio: '16/9',
		objectFit: 'cover',
		objectPosition: 'center',
		shape: 'rounded',
		srcset: '',
		sizes: '',
		lqip: undefined,
		caption: '',
		credit: '',
		decorative: false,
	},
	argTypes: {
		src: {
			control: 'text',
			description: 'Image URL',
		},
		alt: {
			control: 'text',
			description: 'Alt-tekst. Verplicht tenzij `decorative` is gezet.',
		},
		width: {
			control: 'select',
			options: ['full', 160, 240, 320, 480, 640],
			description: 'Display-breedte. `full` vult de parent, een numerieke waarde zet max-width + img-hint.',
			table: { defaultValue: { summary: 'full' } },
		},
		aspectRatio: {
			name: 'aspect-ratio',
			control: 'select',
			options: ['(geen)', '21/9', '16/9', '3/2', '4/3', '1/1', '3/4', '2/3'],
			mapping: { '(geen)': '' },
			description: 'Reserveert ruimte tijdens laden om layout-shift te voorkomen',
			table: { defaultValue: { summary: '(geen)' } },
		},
		objectFit: {
			name: 'object-fit',
			control: 'select',
			options: ['cover', 'contain', 'fill', 'scale-down', 'none'],
			description: 'Hoe de afbeelding past binnen het kader',
			table: { defaultValue: { summary: 'cover' } },
		},
		objectPosition: {
			name: 'object-position',
			control: 'select',
			options: ['center', 'top', 'bottom', 'left', 'right'],
			description: 'Welk deel zichtbaar blijft bij `object-fit: cover`',
			table: { defaultValue: { summary: 'center' } },
		},
		shape: {
			control: 'select',
			options: ['square', 'rounded', 'circle'],
			description: 'Hoekvorm',
			table: { defaultValue: { summary: 'rounded' } },
		},
		srcset: {
			control: 'text',
			description: 'Responsive bron-set, bv. `foo-480.jpg 480w, foo-960.jpg 960w`',
		},
		sizes: {
			control: 'text',
			description: 'Sizes hint voor srcset, bv. `(max-width: 600px) 100vw, 50vw`',
		},
		lqip: {
			control: 'number',
			description: 'CSS-only LQIP placeholder integer. Genereer via de "LQIP encoder tool" story.',
			table: { defaultValue: { summary: '(geen)' } },
		},
		caption: {
			control: 'text',
			description: 'Caption tekst onder de afbeelding',
		},
		credit: {
			control: 'text',
			description: 'Kleinere credit/attributie naast de caption',
		},
		decorative: {
			control: 'boolean',
			description: 'Decoratieve afbeelding: alt wordt leeg en aria-hidden gezet',
			table: { defaultValue: { summary: false } },
		},
	},
};

const Template = ({
	src,
	alt,
	width,
	aspectRatio,
	objectFit,
	objectPosition,
	shape,
	srcset,
	sizes,
	lqip,
	caption,
	credit,
	decorative,
}: Record<string, unknown>) => html`
	<nldd-image
		src=${src as string}
		alt=${alt as string}
		width=${width as string}
		aspect-ratio=${aspectRatio as string}
		object-fit=${objectFit as string}
		object-position=${objectPosition as string}
		shape=${shape as string}
		srcset=${srcset as string}
		sizes=${sizes as string}
		lqip=${(lqip as number | undefined) ?? ''}
		caption=${caption as string}
		credit=${credit as string}
		?decorative=${decorative}
	></nldd-image>
`;

export const Default = {
	render: Template,
};

export const WithCaption = {
	name: 'With caption',
	render: Template,
	args: {
		caption: 'Het Binnenhof in Den Haag tijdens de gouden uren.',
		credit: 'Foto: Rijksoverheid',
	},
};

export const Shapes = {
	render: () => html`
		<div style="display: flex; gap: 24px; align-items: flex-end;">
			<div style="width: 200px;">
				<nldd-image src=${SAMPLE_SRC} alt=${SAMPLE_ALT} aspect-ratio="4/3" shape="square"></nldd-image>
				<p style="margin: 8px 0 0; font: var(--primitives-font-body-sm-regular-snug);">square</p>
			</div>
			<div style="width: 200px;">
				<nldd-image src=${SAMPLE_SRC} alt=${SAMPLE_ALT} aspect-ratio="4/3" shape="rounded"></nldd-image>
				<p style="margin: 8px 0 0; font: var(--primitives-font-body-sm-regular-snug);">rounded</p>
			</div>
			<div style="width: 120px;">
				<nldd-image src=${SAMPLE_SRC} alt=${SAMPLE_ALT} aspect-ratio="1/1" shape="circle"></nldd-image>
				<p style="margin: 8px 0 0; font: var(--primitives-font-body-sm-regular-snug);">circle</p>
			</div>
		</div>
	`,
	parameters: { controls: { disable: true } },
};

export const AspectRatios = {
	name: 'Aspect ratios',
	render: () => html`
		<div style="display: flex; gap: 16px; flex-wrap: wrap;">
			${['21/9', '16/9', '3/2', '4/3', '1/1', '3/4', '2/3'].map(ratio => html`
				<div style="width: 240px;">
					<nldd-image src=${SAMPLE_SRC} alt=${SAMPLE_ALT} aspect-ratio=${ratio}></nldd-image>
					<p style="margin: 4px 0 0;">${ratio}</p>
				</div>
			`)}
		</div>
	`,
	parameters: { controls: { disable: true } },
};

export const ObjectFit = {
	name: 'Object-fit comparison',
	render: () => html`
		<div style="display: flex; gap: 16px; flex-wrap: wrap;">
			${['cover', 'contain', 'fill', 'scale-down', 'none'].map(fit => html`
				<div style="width: 180px;">
					<nldd-image
						src=${SAMPLE_SRC}
						alt=${SAMPLE_ALT}
						aspect-ratio="1/1"
						object-fit=${fit}
					></nldd-image>
					<p style="margin: 8px 0 0;">${fit}</p>
				</div>
			`)}
		</div>
	`,
	parameters: { controls: { disable: true } },
};

export const Decorative = {
	name: 'Decorative (background-style)',
	render: () => html`
		<div style="max-width: 480px;">
			<nldd-image
				src=${SAMPLE_SRC}
				aspect-ratio="16/9"
				decorative
			></nldd-image>
		</div>
	`,
	parameters: { controls: { disable: true } },
};

export const SlottedImage = {
	name: 'Slotted img (consumer-provided)',
	render: () => html`
		<div style="max-width: 480px;">
			<nldd-image aspect-ratio="16/9" shape="rounded">
				<img
					src=${SAMPLE_SRC}
					alt=${SAMPLE_ALT}
					loading="lazy"
					decoding="async"
				>
			</nldd-image>
		</div>
	`,
	parameters: { controls: { disable: true } },
};

/**
 * CSS-only Low Quality Image Placeholder volgens
 * https://leanrada.com/notes/css-only-lqip/. Eén integer encodeert een 6-cel
 * 3×2 gradient + base color, die zichtbaar is tot het echte beeld geladen is.
 * De waarde wordt gegenereerd door een build-step uit de bron-afbeelding, of
 * via de "LQIP encoder tool" story hieronder.
 */
export const LQIPPlaceholder = {
	name: 'LQIP placeholder',
	render: () => html`
		<div style="max-width: 480px;">
			<nldd-image
				src=${SAMPLE_SRC}
				alt=${SAMPLE_ALT}
				aspect-ratio="16/9"
				lqip="192900"
			></nldd-image>
		</div>
	`,
	parameters: { controls: { disable: true } },
};

/**
 * Encodeer je eigen afbeelding tot een LQIP integer. Volledig client-side —
 * niets wordt geüpload. De berekende waarde plak je in het `lqip` attribuut
 * van `nldd-image`.
 *
 * Mocht de [originele tool van Lean Rada](https://leanrada.com/notes/css-only-lqip/)
 * ooit offline gaan, dan kun je je placeholders nog steeds genereren met dit
 * lokale alternatief.
 */
export const LQIPEncoderTool = {
	name: 'LQIP encoder tool',
	render: () => html`<nldd-lqip-encoder></nldd-lqip-encoder>`,
	parameters: { controls: { disable: true } },
};
