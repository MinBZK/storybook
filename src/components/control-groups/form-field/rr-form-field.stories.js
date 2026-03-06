import { html } from 'lit';
import './rr-form-field.ts';
import '../../inputs/text-field/rr-text-field.ts';

/**
 * `rr-form-field` is a layout wrapper for form inputs.
 *
 * ### Label association
 * The form field automatically generates an id for the native input inside the
 * slotted input element and sets the label's `for` attribute to match — clicking
 * the label focuses the input. No manual wiring needed.
 *
 * To use a stable, predictable id set `input-id` on
 * the slotted input — the form field will use it as-is.
 *
 * ```html
 * <!-- Automatic -->
 * <rr-form-field label="Name">
 *   <rr-text-field></rr-text-field>
 * </rr-form-field>
 *
 * <!-- Consumer-provided -->
 * <rr-form-field label="Name">
 *   <rr-text-field input-id="name-input"></rr-text-field>
 * </rr-form-field>
 * ```
 *
 * ### Slots
 * - Default slot: the slotted input. Set `invalid` and `error-message="id1 id2"`
 *   on the input to wire up error texts automatically.
 * - `rr-form-field-help-text`: slot in alongside the input — the component
 *   assigns itself to the help slot automatically.
 * - `rr-form-field-error-text`: slot in alongside the input — the component
 *   assigns itself to the errors slot automatically.
 *
 * ### Error texts
 * Slot in as many `rr-form-field-error-text` elements as needed. The form field
 * observes the input and shows only the ones referenced by `error-message`.
 *
 * ```html
 * <rr-form-field label="Password">
 *   <rr-form-field-help-text>
 *     At least 8 characters. <a href="/help">Learn more</a>.
 *   </rr-form-field-help-text>
 *   <rr-text-field invalid error-message="err-required err-length"></rr-text-field>
 *   <rr-form-field-error-text id="err-required">This field is required.</rr-form-field-error-text>
 *   <rr-form-field-error-text id="err-length">Must be at least 8 characters.</rr-form-field-error-text>
 * </rr-form-field>
 * ```
 */
export default {
	title: 'Components/Control Groups/Form Field',
	component: 'rr-form-field',
	tags: ['autodocs'],
	argTypes: {
		label: { control: 'text' },
		labelAlignment: {
			control: 'select',
			options: ['top', 'left', 'right'],
		},
		size: {
			control: 'select',
			options: ['md', 'sm', 'xs'],
		},
		optional: { control: 'boolean' },
	},
	args: {
		label: 'Label',
		labelAlignment: 'top',
		size: 'md',
		optional: false,
	},
};

const Template = ({ label, labelAlignment, size, optional }) => html`
	<rr-form-field
		label=${label}
		label-alignment=${labelAlignment}
		size=${size}
		?optional=${optional}
	>
		<rr-text-field></rr-text-field>
	</rr-form-field>
`;

export const Default = Template.bind({});

export const WithHelpText = () => html`
	<rr-form-field label="Email address">
		<rr-form-field-help-text>
			We will never share your email. <a href="/privacy">Privacy policy</a>.
		</rr-form-field-help-text>
		<rr-text-field type="email"></rr-text-field>
	</rr-form-field>
`;

export const Optional = () => html`
	<rr-form-field label="Phone number" optional>
		<rr-form-field-help-text>Used for 2-factor authentication only.</rr-form-field-help-text>
		<rr-text-field type="tel"></rr-text-field>
	</rr-form-field>
`;

export const Invalid = () => html`
	<rr-form-field label="Email address">
		<rr-text-field invalid error-message="err-email"></rr-text-field>
		<rr-form-field-error-text id="err-email">Please enter a valid email address.</rr-form-field-error-text>
	</rr-form-field>
`;

export const MultipleErrors = () => html`
	<rr-form-field label="Password">
		<rr-form-field-help-text>
			At least 8 characters. <a href="/help">Requirements</a>.
		</rr-form-field-help-text>
		<rr-text-field invalid error-message="err-required err-length"></rr-text-field>
		<rr-form-field-error-text id="err-required">This field is required.</rr-form-field-error-text>
		<rr-form-field-error-text id="err-length">Must be at least 8 characters.</rr-form-field-error-text>
	</rr-form-field>
`;

/**
 * The form field generates an id automatically. Inspect the DOM to see
 * `id="rr-field-input-{n}"` on the rr-text-field and a matching `for` on the label.
 */
export const AutomaticLabelAssociation = () => html`
	<rr-form-field label="Full name">
		<rr-text-field></rr-text-field>
	</rr-form-field>
`;

/**
 * Set `input-id` on the slotted input to use a stable, predictable id.
 * The form field will use it as-is instead of generating one.
 */
export const ConsumerProvidedInputId = () => html`
	<rr-form-field label="Full name">
		<rr-text-field input-id="full-name-input"></rr-text-field>
	</rr-form-field>
`;

export const LabelAlignmentLeft = () => html`
	<rr-form-field label="Full name" label-alignment="left">
		<rr-form-field-help-text>As it appears on your passport.</rr-form-field-help-text>
		<rr-text-field></rr-text-field>
	</rr-form-field>
`;

export const LabelAlignmentRight = () => html`
	<rr-form-field label="Full name" label-alignment="right">
		<rr-form-field-help-text>As it appears on your passport.</rr-form-field-help-text>
		<rr-text-field></rr-text-field>
	</rr-form-field>
`;

export const CompleteFormTop = () => html`
	<div style="display: flex; flex-direction: column; gap: 1.5rem;">
		<rr-form-field label="Full name">
			<rr-text-field input-id="top-full-name"></rr-text-field>
		</rr-form-field>
		<rr-form-field label="Email address">
			<rr-form-field-help-text>We'll send a confirmation email.</rr-form-field-help-text>
			<rr-text-field type="email" input-id="top-email"></rr-text-field>
		</rr-form-field>
		<rr-form-field label="Phone number" optional>
			<rr-text-field
				type="tel"
				input-id="top-phone"
				invalid
				error-message="err-phone"
			></rr-text-field>
			<rr-form-field-error-text id="err-phone">Please enter a valid phone number.</rr-form-field-error-text>
		</rr-form-field>
		<rr-form-field label="Comments" optional>
			<rr-form-field-help-text>Any additional remarks.</rr-form-field-help-text>
			<rr-text-field input-id="top-comments"></rr-text-field>
		</rr-form-field>
	</div>
`;

export const CompleteFormRight = () => html`
	<div style="display: flex; flex-direction: column; gap: 1.5rem; container-type: inline-size;">
		<rr-form-field label="Full name" label-alignment="right">
			<rr-text-field input-id="right-full-name"></rr-text-field>
		</rr-form-field>
		<rr-form-field label="Email address" label-alignment="right">
			<rr-form-field-help-text>We'll send a confirmation email.</rr-form-field-help-text>
			<rr-text-field type="email" input-id="right-email"></rr-text-field>
		</rr-form-field>
		<rr-form-field label="Phone number" label-alignment="right" optional>
			<rr-text-field
				type="tel"
				input-id="right-phone"
				invalid
				error-message="err-phone-right"
			></rr-text-field>
			<rr-form-field-error-text id="err-phone-right">Please enter a valid phone number.</rr-form-field-error-text>
		</rr-form-field>
		<rr-form-field label="Comments" label-alignment="right" optional>
			<rr-form-field-help-text>Any additional remarks.</rr-form-field-help-text>
			<rr-text-field input-id="right-comments"></rr-text-field>
		</rr-form-field>
	</div>
`;
