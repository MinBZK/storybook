import { html } from 'lit';
import type { NLDDPageFooter, NLDDPageFooterLegalBar, NLDDPageFooterLegalBarItem } from './page-footer.js';

export function pageFooterTemplate(this: NLDDPageFooter) {
	const showDividerAboveMain = this._hasBreadcrumbs && this._hasMain;
	const showDividerAboveLegal = (this._hasBreadcrumbs || this._hasMain) && this._hasLegalBar;
	return html`
		<footer class="page-footer"
			id="page-footer"
		>
			<div class="page-footer__body">
				<div class="page-footer__breadcrumbs" hidden>
					<slot name="breadcrumbs" @slotchange=${this._onSlotChange}></slot>
				</div>
				<hr class="page-footer__divider"
					?hidden=${!showDividerAboveMain}
				>
				<div class="page-footer__main" hidden>
					<slot @slotchange=${this._onSlotChange}></slot>
				</div>
				<hr class="page-footer__divider"
					?hidden=${!showDividerAboveLegal}
				>
				<div class="page-footer__legal-bar" hidden>
					<slot name="legal-bar" @slotchange=${this._onSlotChange}></slot>
				</div>
			</div>
		</footer>
	`;
}

export function pageFooterLegalBarTemplate(this: NLDDPageFooterLegalBar) {
	const label = this._t('components.page-footer.legal-bar-accessible-label');
	return html`
		<nav class="page-footer__legal-bar"
			aria-label=${label}
		>
			<div class="page-footer__legal-bar-start" hidden>
				<slot name="start" @slotchange=${this._onSlotChange}></slot>
			</div>
			<div class="page-footer__legal-bar-end" hidden>
				<slot name="end" @slotchange=${this._onSlotChange}></slot>
			</div>
		</nav>
	`;
}

export function pageFooterLegalBarItemTemplate(this: NLDDPageFooterLegalBarItem) {
	const label = this.text || html`<slot></slot>`;
	if (this.href) {
		return html`
			<span class="page-footer__legal-bar-item">
				<a class="page-footer__legal-bar-item-link"
					href=${this.href}
				>${label}</a>
			</span>
		`;
	}
	return html`<span class="page-footer__legal-bar-item">${label}</span>`;
}
