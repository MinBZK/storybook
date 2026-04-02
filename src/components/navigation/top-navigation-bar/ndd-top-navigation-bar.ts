import { LitElement } from 'lit';
import { property } from 'lit/decorators.js';
import { styles } from './ndd-top-navigation-bar.styles.js';
import { template } from './ndd-top-navigation-bar.template.js';
import './ndd-nav-logo.js';
import '../menu-bar/ndd-menu-bar.js';
import './ndd-utility-menu-bar.js';
import './ndd-back-button.js';
import '../../layout/spacer/ndd-spacer.js';

type ContainerSize = 'sm' | 'md' | 'lg';

export class NDDTopNavigationBar extends LitElement {
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

	@property({ type: String, attribute: 'utility-account-text' })
	utilityAccountText = '';

	@property({ type: String, attribute: 'back-href' })
	backHref = '';

	@property({ type: String, attribute: 'back-text' })
	backText = 'Terug';

	get _accountText(): string {
		return this.utilityAccountText || `Mijn ${this.title}`;
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

if (!customElements.get('ndd-top-navigation-bar')) {
	customElements.define('ndd-top-navigation-bar', NDDTopNavigationBar);
}

declare global {
	interface HTMLElementTagNameMap {
		'ndd-top-navigation-bar': NDDTopNavigationBar;
	}
}
