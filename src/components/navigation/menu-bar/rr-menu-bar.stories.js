import { html } from 'lit';
import './rr-menu-bar.ts';

export default {
	title: 'Components/Navigation/Menu Bar',
	component: 'rr-menu-bar',
	tags: ['autodocs'],
	argTypes: {
		size: {
			control: 'select',
			options: ['s', 'm', 'l'],
			description: 'Title size (only affects title slot)',
			table: {
				defaultValue: { summary: 'm' },
			},
		},
	},
	args: {
		size: 'm',
	},
};

const Template = ({ size }) => html`
	<rr-menu-bar size=${size}>
		<rr-menu-bar-item selected>Home</rr-menu-bar-item>
		<rr-menu-bar-item>Diensten</rr-menu-bar-item>
		<rr-menu-bar-item>Projecten</rr-menu-bar-item>
		<rr-menu-bar-item>Over ons</rr-menu-bar-item>
		<rr-menu-bar-item>Contact</rr-menu-bar-item>
	</rr-menu-bar>
`;

export const Default = Template.bind({});
Default.args = {};

export const WithLinks = () => html`
	<rr-menu-bar>
		<rr-menu-bar-item href="/" selected>Home</rr-menu-bar-item>
		<rr-menu-bar-item href="/diensten">Diensten</rr-menu-bar-item>
		<rr-menu-bar-item href="/projecten">Projecten</rr-menu-bar-item>
		<rr-menu-bar-item href="/over-ons">Over ons</rr-menu-bar-item>
		<rr-menu-bar-item href="/contact">Contact</rr-menu-bar-item>
	</rr-menu-bar>
`;
WithLinks.parameters = {
	controls: { disable: true },
};

export const WithDisabledItem = () => html`
	<rr-menu-bar>
		<rr-menu-bar-item selected>Home</rr-menu-bar-item>
		<rr-menu-bar-item>Diensten</rr-menu-bar-item>
		<rr-menu-bar-item disabled>Projecten</rr-menu-bar-item>
		<rr-menu-bar-item>Over ons</rr-menu-bar-item>
		<rr-menu-bar-item>Contact</rr-menu-bar-item>
	</rr-menu-bar>
`;
WithDisabledItem.parameters = {
	controls: { disable: true },
};

export const WithTitleSmall = () => html`
	<rr-menu-bar size="s">
		<h2 slot="title" style="margin: 0;">Navigatie</h2>
		<rr-menu-bar-item selected>Home</rr-menu-bar-item>
		<rr-menu-bar-item>Diensten</rr-menu-bar-item>
		<rr-menu-bar-item>Projecten</rr-menu-bar-item>
		<rr-menu-bar-item>Over ons</rr-menu-bar-item>
		<rr-menu-bar-item>Contact</rr-menu-bar-item>
	</rr-menu-bar>
`;
WithTitleSmall.parameters = { controls: { disable: true } };

export const WithTitleMedium = () => html`
	<rr-menu-bar size="m">
		<h2 slot="title" style="margin: 0;">Navigatie</h2>
		<rr-menu-bar-item selected>Home</rr-menu-bar-item>
		<rr-menu-bar-item>Diensten</rr-menu-bar-item>
		<rr-menu-bar-item>Projecten</rr-menu-bar-item>
		<rr-menu-bar-item>Over ons</rr-menu-bar-item>
		<rr-menu-bar-item>Contact</rr-menu-bar-item>
	</rr-menu-bar>
`;
WithTitleMedium.parameters = { controls: { disable: true } };

export const WithTitleLarge = () => html`
	<rr-menu-bar size="l">
		<h2 slot="title" style="margin: 0;">Navigatie</h2>
		<rr-menu-bar-item selected>Home</rr-menu-bar-item>
		<rr-menu-bar-item>Diensten</rr-menu-bar-item>
		<rr-menu-bar-item>Projecten</rr-menu-bar-item>
		<rr-menu-bar-item>Over ons</rr-menu-bar-item>
		<rr-menu-bar-item>Contact</rr-menu-bar-item>
	</rr-menu-bar>
`;
WithTitleLarge.parameters = { controls: { disable: true } };

export const Interactive = () => {
	const handleItemSelect = (event) => {
		console.log('Selected item:', event.detail.item.textContent);
	};
	return html`
		<rr-menu-bar @itemselect=${handleItemSelect}>
			<rr-menu-bar-item selected>Home</rr-menu-bar-item>
			<rr-menu-bar-item>Diensten</rr-menu-bar-item>
			<rr-menu-bar-item>Projecten</rr-menu-bar-item>
			<rr-menu-bar-item>Over ons</rr-menu-bar-item>
			<rr-menu-bar-item>Contact</rr-menu-bar-item>
		</rr-menu-bar>
		<p style="margin-top: 1rem; color: var(--semantics-content-color); font-size: 14px;">
			Open de browser console om de 'itemselect' events te zien.
			<br />
			Gebruik de pijltjestoetsen (← →), Home en End om te navigeren.
		</p>
	`;
};
Interactive.parameters = { controls: { disable: true } };

export const AllStates = () => html`
	<div style="display: flex; flex-direction: column; gap: 2rem;">
		<div>
			<h3 style="margin: 0 0 0.5rem 0; font-size: 14px; color: var(--semantics-content-color);">Default state</h3>
			<rr-menu-bar>
				<rr-menu-bar-item>Home</rr-menu-bar-item>
				<rr-menu-bar-item>Diensten</rr-menu-bar-item>
				<rr-menu-bar-item>Projecten</rr-menu-bar-item>
			</rr-menu-bar>
		</div>
		<div>
			<h3 style="margin: 0 0 0.5rem 0; font-size: 14px; color: var(--semantics-content-color);">With selection</h3>
			<rr-menu-bar>
				<rr-menu-bar-item>Home</rr-menu-bar-item>
				<rr-menu-bar-item selected>Diensten</rr-menu-bar-item>
				<rr-menu-bar-item>Projecten</rr-menu-bar-item>
			</rr-menu-bar>
		</div>
		<div>
			<h3 style="margin: 0 0 0.5rem 0; font-size: 14px; color: var(--semantics-content-color);">With disabled item</h3>
			<rr-menu-bar>
				<rr-menu-bar-item>Home</rr-menu-bar-item>
				<rr-menu-bar-item disabled>Diensten</rr-menu-bar-item>
				<rr-menu-bar-item selected>Projecten</rr-menu-bar-item>
			</rr-menu-bar>
		</div>
		<div>
			<h3 style="margin: 0 0 0.5rem 0; font-size: 14px; color: var(--semantics-content-color);">With title (size m)</h3>
			<rr-menu-bar size="m">
				<h2 slot="title" style="margin: 0;">Navigatie</h2>
				<rr-menu-bar-item>Home</rr-menu-bar-item>
				<rr-menu-bar-item selected>Diensten</rr-menu-bar-item>
				<rr-menu-bar-item>Projecten</rr-menu-bar-item>
			</rr-menu-bar>
		</div>
	</div>
`;
AllStates.parameters = { controls: { disable: true } };

export const TitleSizes = () => html`
	<div style="display: flex; flex-direction: column; gap: 2rem;">
		<div>
			<h3 style="margin: 0 0 0.5rem 0; font-size: 14px; color: var(--semantics-content-color);">Small (18px)</h3>
			<rr-menu-bar size="s">
				<h2 slot="title" style="margin: 0;">Navigatie</h2>
				<rr-menu-bar-item selected>Home</rr-menu-bar-item>
				<rr-menu-bar-item>Diensten</rr-menu-bar-item>
				<rr-menu-bar-item>Projecten</rr-menu-bar-item>
			</rr-menu-bar>
		</div>
		<div>
			<h3 style="margin: 0 0 0.5rem 0; font-size: 14px; color: var(--semantics-content-color);">Medium (20px, default)</h3>
			<rr-menu-bar size="m">
				<h2 slot="title" style="margin: 0;">Navigatie</h2>
				<rr-menu-bar-item selected>Home</rr-menu-bar-item>
				<rr-menu-bar-item>Diensten</rr-menu-bar-item>
				<rr-menu-bar-item>Projecten</rr-menu-bar-item>
			</rr-menu-bar>
		</div>
		<div>
			<h3 style="margin: 0 0 0.5rem 0; font-size: 14px; color: var(--semantics-content-color);">Large (23px)</h3>
			<rr-menu-bar size="l">
				<h2 slot="title" style="margin: 0;">Navigatie</h2>
				<rr-menu-bar-item selected>Home</rr-menu-bar-item>
				<rr-menu-bar-item>Diensten</rr-menu-bar-item>
				<rr-menu-bar-item>Projecten</rr-menu-bar-item>
			</rr-menu-bar>
		</div>
	</div>
`;
TitleSizes.parameters = { controls: { disable: true } };
