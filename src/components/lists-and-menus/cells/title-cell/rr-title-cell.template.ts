import { html } from 'lit';

export const template = () => html`
	<slot name="overline"></slot>
	<slot></slot>
	<slot name="subtitle"></slot>
`;
