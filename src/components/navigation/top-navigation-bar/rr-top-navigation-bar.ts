import { LitElement } from 'lit';
import { property } from 'lit/decorators.js';
import { styles } from './rr-top-navigation-bar.styles.js';
import { template } from './rr-top-navigation-bar.template.js';
import './rr-nav-logo.js';
import '../menu-bar/rr-menu-bar.js';
import './rr-utility-menu-bar.js';
import './rr-back-button.js';
import '../../layout/spacer/rr-spacer.js';

type ContainerSize = 'sm' | 'md' | 'lg';

export class RRTopNavigationBar extends LitElement {
	static override styles = styles;

	@property({ type: String, reflect: true })
	container: ContainerSize = 'md';

	@property({ type: String })
	override title = 'Titel';

	@property({ type: String, attribute: 'skip-link-target' })
	skipLinkTarget = '#main-content';

	@property({ type: Boolean, attribute: 'no-logo', reflect: true })
	noLogo = false;

	@property({ type: Boolean, attribute: 'no-title', reflect: true })
	noTitle = false;

	@property({ type: Boolean, attribute: 'no-menu', reflect: true })
	noMenu = false;

	@property({ type: Boolean, attribute: 'no-utility-bar', reflect: true })
	noUtilityBar = false;

	@property({ type: Boolean, attribute: 'has-back-button', reflect: true })
	hasBackButton = false;

	@property({ type: Boolean, attribute: 'logo-has-wordmark' })
	logoHasWordmark = false;

	@property({ type: String, attribute: 'logo-title' })
	logoTitle = '';

	@property({ type: String, attribute: 'logo-subtitle' })
	logoSubtitle = '';

	@property({ type: String, attribute: 'logo-supporting-text-1' })
	logoSupportingText1 = '';

	@property({ type: String, attribute: 'logo-supporting-text-2' })
	logoSupportingText2 = '';

	@property({ type: Boolean, attribute: 'utility-no-language-switch' })
	utilityNoLanguageSwitch = false;

	@property({ type: Boolean, attribute: 'utility-no-search' })
	utilityNoSearch = false;

	@property({ type: Boolean, attribute: 'utility-no-account' })
	utilityNoAccount = false;

	@property({ type: Boolean, attribute: 'utility-has-help' })
	utilityHasHelp = false;

	@property({ type: Boolean, attribute: 'utility-has-settings' })
	utilityHasSettings = false;

	@property({ type: String, attribute: 'utility-language' })
	utilityLanguage = 'NL';

	@property({ type: String, attribute: 'utility-account-label' })
	utilityAccountLabel = '';

	@property({ type: String, attribute: 'back-href' })
	backHref = '';

	@property({ type: String, attribute: 'back-label' })
	backLabel = 'Terug';

	get _accountLabel(): string {
		return this.utilityAccountLabel || `Mijn ${this.title}`;
	}

	get _spacerSize(): '32' | '16' | null {
		if (this.container === 'lg') return '32';
		if (this.container === 'md') return '16';
		return null;
	}

	get _menuBarSize(): string {
		const map: Record<ContainerSize, string> = { sm: 's', md: 'm', lg: 'l' };
		return map[this.container];
	}

	override render() {
		return template.call(this);
	}
}

if (!customElements.get('rr-top-navigation-bar')) {
	customElements.define('rr-top-navigation-bar', RRTopNavigationBar);
}

declare global {
	interface HTMLElementTagNameMap {
		'rr-top-navigation-bar': RRTopNavigationBar;
	}
}
