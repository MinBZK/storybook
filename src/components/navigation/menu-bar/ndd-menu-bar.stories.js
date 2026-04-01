import { html } from 'lit';
import './ndd-menu-bar.ts';

export default {
	title: 'Components/Navigation/Menu Bar',
	component: 'ndd-menu-bar',
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
	<ndd-menu-bar size=${size}>
		<ndd-menu-bar-item selected>Home</ndd-menu-bar-item>
		<ndd-menu-bar-item>Diensten</ndd-menu-bar-item>
		<ndd-menu-bar-item>Projecten</ndd-menu-bar-item>
		<ndd-menu-bar-item>Over ons</ndd-menu-bar-item>
		<ndd-menu-bar-item>Contact</ndd-menu-bar-item>
	</ndd-menu-bar>
`;

export const Default = Template.bind({});
Default.args = {};

export const WithLinks = () => html`
	<ndd-menu-bar>
		<ndd-menu-bar-item href="/" selected>Home</ndd-menu-bar-item>
		<ndd-menu-bar-item href="/diensten">Diensten</ndd-menu-bar-item>
		<ndd-menu-bar-item href="/projecten">Projecten</ndd-menu-bar-item>
		<ndd-menu-bar-item href="/over-ons">Over ons</ndd-menu-bar-item>
		<ndd-menu-bar-item href="/contact">Contact</ndd-menu-bar-item>
	</ndd-menu-bar>
`;
WithLinks.parameters = {
	controls: { disable: true },
};

export const WithDisabledItem = () => html`
	<ndd-menu-bar>
		<ndd-menu-bar-item selected>Home</ndd-menu-bar-item>
		<ndd-menu-bar-item>Diensten</ndd-menu-bar-item>
		<ndd-menu-bar-item disabled>Projecten</ndd-menu-bar-item>
		<ndd-menu-bar-item>Over ons</ndd-menu-bar-item>
		<ndd-menu-bar-item>Contact</ndd-menu-bar-item>
	</ndd-menu-bar>
`;
WithDisabledItem.parameters = {
	controls: { disable: true },
};

export const WithTitleSmall = () => html`
	<ndd-menu-bar size="s">
		<h2 slot="title" style="margin: 0;">Navigatie</h2>
		<ndd-menu-bar-item selected>Home</ndd-menu-bar-item>
		<ndd-menu-bar-item>Diensten</ndd-menu-bar-item>
		<ndd-menu-bar-item>Projecten</ndd-menu-bar-item>
		<ndd-menu-bar-item>Over ons</ndd-menu-bar-item>
		<ndd-menu-bar-item>Contact</ndd-menu-bar-item>
	</ndd-menu-bar>
`;
WithTitleSmall.parameters = { controls: { disable: true } };

export const WithTitleMedium = () => html`
	<ndd-menu-bar size="m">
		<h2 slot="title" style="margin: 0;">Navigatie</h2>
		<ndd-menu-bar-item selected>Home</ndd-menu-bar-item>
		<ndd-menu-bar-item>Diensten</ndd-menu-bar-item>
		<ndd-menu-bar-item>Projecten</ndd-menu-bar-item>
		<ndd-menu-bar-item>Over ons</ndd-menu-bar-item>
		<ndd-menu-bar-item>Contact</ndd-menu-bar-item>
	</ndd-menu-bar>
`;
WithTitleMedium.parameters = { controls: { disable: true } };

export const WithTitleLarge = () => html`
	<ndd-menu-bar size="l">
		<h2 slot="title" style="margin: 0;">Navigatie</h2>
		<ndd-menu-bar-item selected>Home</ndd-menu-bar-item>
		<ndd-menu-bar-item>Diensten</ndd-menu-bar-item>
		<ndd-menu-bar-item>Projecten</ndd-menu-bar-item>
		<ndd-menu-bar-item>Over ons</ndd-menu-bar-item>
		<ndd-menu-bar-item>Contact</ndd-menu-bar-item>
	</ndd-menu-bar>
`;
WithTitleLarge.parameters = { controls: { disable: true } };

export const Interactive = () => {
	const handleItemSelect = (event) => {
		console.log('Selected item:', event.detail.item.textContent);
	};
	return html`
		<ndd-menu-bar @itemselect=${handleItemSelect}>
			<ndd-menu-bar-item selected>Home</ndd-menu-bar-item>
			<ndd-menu-bar-item>Diensten</ndd-menu-bar-item>
			<ndd-menu-bar-item>Projecten</ndd-menu-bar-item>
			<ndd-menu-bar-item>Over ons</ndd-menu-bar-item>
			<ndd-menu-bar-item>Contact</ndd-menu-bar-item>
		</ndd-menu-bar>
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
			<ndd-menu-bar>
				<ndd-menu-bar-item>Home</ndd-menu-bar-item>
				<ndd-menu-bar-item>Diensten</ndd-menu-bar-item>
				<ndd-menu-bar-item>Projecten</ndd-menu-bar-item>
			</ndd-menu-bar>
		</div>
		<div>
			<h3 style="margin: 0 0 0.5rem 0; font-size: 14px; color: var(--semantics-content-color);">With selection</h3>
			<ndd-menu-bar>
				<ndd-menu-bar-item>Home</ndd-menu-bar-item>
				<ndd-menu-bar-item selected>Diensten</ndd-menu-bar-item>
				<ndd-menu-bar-item>Projecten</ndd-menu-bar-item>
			</ndd-menu-bar>
		</div>
		<div>
			<h3 style="margin: 0 0 0.5rem 0; font-size: 14px; color: var(--semantics-content-color);">With disabled item</h3>
			<ndd-menu-bar>
				<ndd-menu-bar-item>Home</ndd-menu-bar-item>
				<ndd-menu-bar-item disabled>Diensten</ndd-menu-bar-item>
				<ndd-menu-bar-item selected>Projecten</ndd-menu-bar-item>
			</ndd-menu-bar>
		</div>
		<div>
			<h3 style="margin: 0 0 0.5rem 0; font-size: 14px; color: var(--semantics-content-color);">With title (size m)</h3>
			<ndd-menu-bar size="m">
				<h2 slot="title" style="margin: 0;">Navigatie</h2>
				<ndd-menu-bar-item>Home</ndd-menu-bar-item>
				<ndd-menu-bar-item selected>Diensten</ndd-menu-bar-item>
				<ndd-menu-bar-item>Projecten</ndd-menu-bar-item>
			</ndd-menu-bar>
		</div>
	</div>
`;
AllStates.parameters = { controls: { disable: true } };

export const TitleSizes = () => html`
	<div style="display: flex; flex-direction: column; gap: 2rem;">
		<div>
			<h3 style="margin: 0 0 0.5rem 0; font-size: 14px; color: var(--semantics-content-color);">Small (18px)</h3>
			<ndd-menu-bar size="s">
				<h2 slot="title" style="margin: 0;">Navigatie</h2>
				<ndd-menu-bar-item selected>Home</ndd-menu-bar-item>
				<ndd-menu-bar-item>Diensten</ndd-menu-bar-item>
				<ndd-menu-bar-item>Projecten</ndd-menu-bar-item>
			</ndd-menu-bar>
		</div>
		<div>
			<h3 style="margin: 0 0 0.5rem 0; font-size: 14px; color: var(--semantics-content-color);">Medium (20px, default)</h3>
			<ndd-menu-bar size="m">
				<h2 slot="title" style="margin: 0;">Navigatie</h2>
				<ndd-menu-bar-item selected>Home</ndd-menu-bar-item>
				<ndd-menu-bar-item>Diensten</ndd-menu-bar-item>
				<ndd-menu-bar-item>Projecten</ndd-menu-bar-item>
			</ndd-menu-bar>
		</div>
		<div>
			<h3 style="margin: 0 0 0.5rem 0; font-size: 14px; color: var(--semantics-content-color);">Large (23px)</h3>
			<ndd-menu-bar size="l">
				<h2 slot="title" style="margin: 0;">Navigatie</h2>
				<ndd-menu-bar-item selected>Home</ndd-menu-bar-item>
				<ndd-menu-bar-item>Diensten</ndd-menu-bar-item>
				<ndd-menu-bar-item>Projecten</ndd-menu-bar-item>
			</ndd-menu-bar>
		</div>
	</div>
`;
TitleSizes.parameters = { controls: { disable: true } };
