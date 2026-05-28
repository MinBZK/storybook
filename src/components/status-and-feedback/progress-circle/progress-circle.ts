/**
 * Nederlandse Digitale Dienst Progress Circle Component (Lit + TypeScript)
 *
 * Exports both NLDDProgressCircle and NLDDProgressCircleSegment.
 *
 * A circular progress indicator that mirrors the API of nldd-progress-bar:
 * single-value or multi-segment, progress or distribution mode, 24 colours,
 * fade transitions between determinate/indeterminate, indeterminate indicator.
 *
 * Visual differences vs the bar:
 * - SVG arcs instead of rectangular bars.
 * - Label below the circle (not above).
 * - No centre text; the consumer can wrap the circle if needed.
 * - One combined tooltip on the whole circle showing all segment info
 *   (no per-segment tooltips).
 * - Indeterminate uses a rotating elastic arc (Material-style) instead of
 *   the bar's Knight Rider scanner.
 *
 * @element nldd-progress-circle
 *
 * @attr {'progress'|'distribution'} mode - Semantics for ARIA and gap behaviour (default: 'progress')
 * @attr {number}  max               - Total value (default: 100)
 * @attr {number}  value             - Single-segment shorthand (ignored when segment children exist)
 * @attr {string}  color             - Color. Semantic (neutral, accent, success, warning, critical) or a Rijkskleur. Default 'accent'.
 * @attr {string} size              - Circle diameter in px. Matches nldd-icon sizes: 16, 20, 24, 28, 32, 40, 44, 48, 56, 64, 80, 96 (default: '32')
 * @attr {string}  text              - Label below the circle
 * @attr {'percentage'|'absolute'|'fraction'|'none'} value-format - Format the tooltip uses for the auto-text
 * @attr {string}  accessible-label  - Full override of aria-valuetext (and tooltip text)
 * @attr {boolean} indeterminate     - Renders the rotating elastic arc animation
 * @attr {object}  translations      - Override translation keys; unset keys fall back to Dutch
 *
 * @element nldd-progress-circle-segment
 *
 * @attr {number}  value - Share of the parent's total (default 0; <=0 hides segment)
 * @attr {string}  color - Color (semantic or Rijkskleur). Default 'accent'.
 * @attr {string}  name  - Optional name used in the combined tooltip + screenreader text
 */
import { LitElement, html } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { progressCircleStyles, progressCircleSegmentStyles } from './progress-circle.styles.js';
import { progressCircleTemplate, getCircumference, getStrokeWidthPx } from './progress-circle.template.js';
import { nlddProgressCircleTranslations } from './progress-circle.i18n.js';
import type { NLDDProgressCircleTranslations } from './progress-circle.i18n.js';
import '../../content/tooltip/tooltip.js';

/** Indeterminate ↔ determinate crossfade duration. Must stay in sync with
 *  --primitives-transition-duration-slow used by the matching CSS animations
 *  and with nldd-progress-bar's matching constant. */
const INDETERMINATE_TRANSITION_MS = 300;

export type ProgressCircleMode = 'progress' | 'distribution';
export type ProgressCircleSize = '16' | '20' | '24' | '28' | '32' | '40' | '44' | '48' | '56' | '64' | '80' | '96';
export type ProgressCircleValueFormat = 'percentage' | 'absolute' | 'fraction' | 'none';

export type ProgressCircleColor =
	| 'neutral' | 'accent' | 'success' | 'warning' | 'critical'
	| 'coolgray'
	| 'lintblauw' | 'donkerblauw' | 'hemelblauw' | 'lichtblauw'
	| 'paars' | 'violet'
	| 'robijnrood' | 'roze' | 'rood' | 'oranje'
	| 'donkergeel' | 'geel'
	| 'donkerbruin' | 'bruin'
	| 'donkergroen' | 'groen' | 'mosgroen' | 'mintgroen';


// # nldd-progress-circle-segment

@customElement('nldd-progress-circle-segment')
export class NLDDProgressCircleSegment extends LitElement {
	static override styles = progressCircleSegmentStyles;

	@property({ type: Number, reflect: true })
	value = 0;

	@property({ type: String, reflect: true })
	color: ProgressCircleColor = 'accent';

	@property({ type: String, reflect: true })
	name = '';

	override render() {
		// Data-only element — the parent reads value/color/name and renders
		// the actual SVG arc. Render nothing.
		return html``;
	}
}


// # nldd-progress-circle

@customElement('nldd-progress-circle')
export class NLDDProgressCircle extends LitElement {
	static override styles = progressCircleStyles;

	@property({ type: String, reflect: true })
	mode: ProgressCircleMode = 'progress';

	@property({ type: Number, reflect: true })
	max = 100;

	@property({ type: Number, reflect: true })
	value: number | null = null;

	@property({ type: String, reflect: true })
	color: ProgressCircleColor = 'accent';

	@property({ type: String, reflect: true })
	size: ProgressCircleSize = '32';

	@property({ type: String, reflect: true })
	text = '';

	@property({ type: String, reflect: true, attribute: 'value-format' })
	valueFormat: ProgressCircleValueFormat = 'percentage';

	@property({ type: String, reflect: true, attribute: 'accessible-label' })
	accessibleLabel = '';

	@property({ type: Boolean, reflect: true })
	indeterminate = false;

	@property({ type: Object })
	translations: Partial<NLDDProgressCircleTranslations> = {};

	@state()
	private _segments: NLDDProgressCircleSegment[] = [];

	@state()
	_indeterminateExiting = false;

	@state()
	_indeterminateEntering = false;

	/** When true, _buildArcs returns zero-length arcs so the first render
	 *  after the indeterminate→determinate transition starts at length 0.
	 *  Cleared on the next frame so the CSS dasharray transition animates
	 *  the segments growing into their final positions. */
	@state()
	private _arcsAtZero = false;

	private _exitTimeout?: ReturnType<typeof setTimeout>;
	private _enterTimeout?: ReturnType<typeof setTimeout>;
	private _growRafId?: number;
	private _attributeObserver?: MutationObserver;

	public _t(key: keyof NLDDProgressCircleTranslations): string {
		return this.translations[key] ?? nlddProgressCircleTranslations[key];
	}

	get _hasSegments(): boolean {
		return this._segments.length > 0;
	}

	get _totalValue(): number {
		if (this._hasSegments) {
			return this._segments.reduce((sum, s) => sum + Math.max(0, s.value), 0);
		}
		return Math.max(0, this.value ?? 0);
	}

	get _percentage(): number {
		if (this.max <= 0) return 0;
		return Math.min(100, (this._totalValue / this.max) * 100);
	}

	/** Compact text shown in the tooltip. Follows value-format (matching the
	 *  per-segment tooltip style of nldd-progress-bar) and omits the "voltooid"
	 *  suffix that aria-valuetext uses for screen readers. Returns '' when
	 *  value-format is 'none' so the template can skip rendering the tooltip
	 *  wrapper entirely. accessibleLabel and indeterminate still produce text. */
	get _tooltipText(): string {
		if (this.accessibleLabel) return this.accessibleLabel;
		if (this.indeterminate) return this._t('components.progress-circle.loading-text');
		if (this.valueFormat === 'none') return '';

		if (!this._hasSegments) {
			const v = Math.max(0, this.value ?? 0);
			const pct = this.max > 0 ? Math.round((v / this.max) * 100) : 0;
			return this._formatValuePart(v, pct);
		}

		const named = this._segments.filter(s => s.name);
		const allNamed = named.length === this._segments.length && this._segments.length > 0;
		const segmentDescriptions = this._segments
			.filter(s => s.value > 0)
			.map(s => {
				const pct = this.max > 0 ? Math.round((s.value / this.max) * 100) : 0;
				const valuePart = this._formatValuePart(s.value, pct);
				return s.name ? `${s.name}: ${valuePart}` : valuePart;
			});

		if (this.mode === 'distribution') {
			return segmentDescriptions.join(', ');
		}

		const totalPct = Math.round(this._percentage);
		const totalValuePart = this._formatValuePart(this._totalValue, totalPct);
		if (allNamed) {
			const totalPrefix = this._t('components.progress-circle.total-prefix-text');
			return `${segmentDescriptions.join(', ')}. ${totalPrefix} ${totalValuePart}`;
		}
		return totalValuePart;
	}

	/** Verbose text used for aria-valuetext (screen readers). Includes the
	 *  "voltooid" suffix and total-prefix for clearer announcements. */
	get _ariaValueText(): string {
		if (this.accessibleLabel) return this.accessibleLabel;
		if (this.indeterminate) return this._t('components.progress-circle.loading-text');

		const completedSuffix = this._t('components.progress-circle.completed-suffix-text');
		const totalPrefix = this._t('components.progress-circle.total-prefix-text');

		if (!this._hasSegments) {
			return `${Math.round(this._percentage)}% ${completedSuffix}`;
		}

		const named = this._segments.filter(s => s.name);
		const allNamed = named.length === this._segments.length && this._segments.length > 0;
		const segmentDescriptions = this._segments
			.filter(s => s.value > 0)
			.map(s => {
				const pct = this.max > 0 ? Math.round((s.value / this.max) * 100) : 0;
				const valuePart = this._formatValuePart(s.value, pct);
				return s.name ? `${s.name}: ${valuePart}` : valuePart;
			});

		if (this.mode === 'distribution') {
			return segmentDescriptions.join(', ');
		}

		const totalPct = Math.round(this._percentage);
		if (allNamed) {
			return `${segmentDescriptions.join(', ')}. ${totalPrefix} ${totalPct}% ${completedSuffix}.`;
		}
		return `${totalPct}% ${completedSuffix}`;
	}

	private _formatValuePart(value: number, pct: number): string {
		switch (this.valueFormat) {
			case 'absolute': return `${value}`;
			case 'fraction': return `${value} / ${this.max}`;
			case 'percentage':
			case 'none':
			default: return `${pct}%`;
		}
	}

	override willUpdate(changed: Map<string, unknown>): void {
		if (changed.has('indeterminate')) {
			const previous = changed.get('indeterminate');
			if (previous === true && !this.indeterminate) {
				this._beginIndeterminateExit();
			} else if (previous === false && this.indeterminate) {
				this._beginIndeterminateEnter();
			}
		}
	}

	override disconnectedCallback(): void {
		super.disconnectedCallback();
		this._cancelIndeterminateExit();
		this._cancelIndeterminateEnter();
		this._attributeObserver?.disconnect();
	}

	private _beginIndeterminateExit(): void {
		this._cancelIndeterminateEnter();
		this._indeterminateExiting = true;
		// First render: arcs at length 0. Then on the next frame switch to
		// actual lengths so the dasharray transition animates the growth.
		this._arcsAtZero = true;
		this.updateComplete.then(() => {
			this._growRafId = requestAnimationFrame(() => {
				this._growRafId = undefined;
				this._arcsAtZero = false;
			});
		});
		this._exitTimeout = setTimeout(() => {
			this._indeterminateExiting = false;
			this._exitTimeout = undefined;
		}, INDETERMINATE_TRANSITION_MS);
	}

	private _beginIndeterminateEnter(): void {
		this._cancelIndeterminateExit();
		this._indeterminateEntering = true;
		this._enterTimeout = setTimeout(() => {
			this._indeterminateEntering = false;
			this._enterTimeout = undefined;
		}, INDETERMINATE_TRANSITION_MS);
	}

	private _cancelIndeterminateExit(): void {
		if (this._exitTimeout) {
			clearTimeout(this._exitTimeout);
			this._exitTimeout = undefined;
		}
		if (this._growRafId !== undefined) {
			cancelAnimationFrame(this._growRafId);
			this._growRafId = undefined;
		}
		this._indeterminateExiting = false;
		this._arcsAtZero = false;
	}

	private _cancelIndeterminateEnter(): void {
		if (this._enterTimeout) {
			clearTimeout(this._enterTimeout);
			this._enterTimeout = undefined;
		}
		this._indeterminateEntering = false;
	}

	private _onSlotChange(): void {
		const slot = this.shadowRoot?.querySelector<HTMLSlotElement>('slot:not([name])');
		const assigned = slot?.assignedElements({ flatten: true }) ?? [];
		this._segments = assigned.filter(
			(el): el is NLDDProgressCircleSegment => el.tagName === 'NLDD-PROGRESS-CIRCLE-SEGMENT',
		);

		this._attributeObserver?.disconnect();
		this._attributeObserver = new MutationObserver(() => this.requestUpdate());
		for (const seg of this._segments) {
			this._attributeObserver.observe(seg, {
				attributes: true,
				attributeFilter: ['value', 'color', 'name'],
			});
		}
		this.requestUpdate();
	}

	/** Build the SVG arc list for the current segments (or a single synthetic
	 *  segment when the user provides only `value`). Each arc gets a length
	 *  and offset on the shared circle so they line up. */
	public _buildArcs(): Array<{ length: number; offset: number; color: ProgressCircleColor }> {
		const arcs: Array<{ length: number; offset: number; color: ProgressCircleColor }> = [];

		// Include zero-value segments too — they still render an (invisible)
		// SVG circle so that CSS transitions have a previous state to animate
		// from when the value later grows. Without this, going from 0 to N
		// would pop in instead of animating.
		const sourceSegments: Array<{ value: number; color: ProgressCircleColor }> = this._hasSegments
			? this._segments.map(s => ({ value: Math.max(0, s.value), color: s.color }))
			: this.value !== null
				? [{ value: Math.max(0, this.value), color: this.color }]
				: [];

		// Gap between adjacent segments, computed in user units so it stays a
		// consistent number of CSS pixels regardless of the rendered size.
		// viewBox is 100, so user_units = pixels × (100 / sizeInPixels).
		// Progress mode uses rounded caps which extend half-stroke-width past
		// the path end on each side; we add the full stroke width (= two
		// half-strokes) so the visible gap is 1px. Distribution mode uses butt
		// caps so a 2px gap is enough. Single-segment progress (just `value`,
		// no children) has no neighbours so no gap.
		const sizeInPixels = Number(this.size) || 32;
		const strokeWidthPx = getStrokeWidthPx(sizeInPixels);
		const isMultiSegment = sourceSegments.length > 1 || this.mode === 'distribution';
		const isProgressMode = this.mode !== 'distribution';
		const visibleGapPx = isMultiSegment ? (isProgressMode ? 1 : 2) : 0;
		const capCompensationPx = isProgressMode && isMultiSegment ? strokeWidthPx : 0;
		const gapLength = (visibleGapPx + capCompensationPx) * (100 / sizeInPixels);

		// Circumference depends on radius, which depends on size (so the stroke
		// stays inside the viewBox). Compute once per build.
		const circumference = getCircumference(sizeInPixels);

		const total = this._totalValue;
		// Both modes measure against max so a partial total fills only part
		// of the ring. If the sum exceeds max we normalise proportionally to
		// avoid overflow (matches nldd-progress-bar behaviour).
		const denominator = total > this.max ? total : this.max;

		let cumulative = 0;
		for (const seg of sourceSegments) {
			const fraction = denominator > 0 ? seg.value / denominator : 0;
			const rawLength = fraction * circumference;
			// Subtract gap from segment length so the gap appears between
			// adjacent segments. Skip the gap on segments smaller than the gap.
			// While _arcsAtZero is true (first frame of indeterminate exit) all
			// arcs render at length 0 so the dasharray transition grows them in.
			// Zero-value segments still get pushed (length 0) so the SVG element
			// exists and CSS transitions can animate when the value later grows.
			const length = this._arcsAtZero || seg.value <= 0
				? 0
				: Math.max(0, rawLength - gapLength);
			arcs.push({ length, offset: cumulative, color: seg.color });
			cumulative += rawLength;
		}
		return arcs;
	}

	override render() {
		return progressCircleTemplate(this, this._onSlotChangeBound);
	}

	override updated(): void {
		this._syncDynamicAttributes();
	}

	/**
	 * Toggle the data-shrink / data-fade attributes after Lit's render. These
	 * are conditional (presence-or-absence) and Lit's `=${expr}` binding has
	 * quirks removing SVG attributes; setAttribute/removeAttribute is reliable.
	 * Other dynamic SVG attributes (stroke-dasharray, stroke-dashoffset) are
	 * always set and live in the Lit template.
	 */
	private _syncDynamicAttributes(): void {
		const segments = this.shadowRoot?.querySelectorAll<SVGCircleElement>('.progress-circle__segment');
		if (segments) {
			for (const el of segments) {
				if (this._indeterminateEntering) {
					el.setAttribute('data-shrink', '');
				} else {
					el.removeAttribute('data-shrink');
				}
			}
		}

		const indicator = this.shadowRoot?.querySelector<SVGCircleElement>('.progress-circle__indeterminate-indicator');
		if (indicator) {
			if (this._indeterminateExiting && !this.indeterminate) {
				indicator.setAttribute('data-fade', 'out');
			} else {
				indicator.removeAttribute('data-fade');
			}
		}
	}

	private _onSlotChangeBound = this._onSlotChange.bind(this);
}

declare global {
	interface HTMLElementTagNameMap {
		'nldd-progress-circle': NLDDProgressCircle;
		'nldd-progress-circle-segment': NLDDProgressCircleSegment;
	}
}
