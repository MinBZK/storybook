import { html } from 'lit';
import './code.ts';

export default {
	title: 'Components/Content/Code',
	component: 'nldd-code',
	tags: ['autodocs'],
	parameters: {
		componentSource: {
			file: 'src/components/content/code/code.ts',
			repository: 'https://github.com/MinBZK/storybook',
		},
		status: { type: 'beta' },
	},
};

export const Default = () => html`
	<nldd-code>const greet = (name) =&gt; \`Hallo, \${name}!\`;
console.log(greet('wereld'));</nldd-code>
`;

export const Trace = () => html`
	<nldd-code>[engine] resolved input: bsn=999993653
[engine] action 'heeft_recht_op_zorgtoeslag' = true
[engine] action 'hoogte_zorgtoeslag' = 12345 (cents)
[engine] elapsed 4ms</nldd-code>
`;

export const LongLines = () => html`
	<nldd-code>function deeplyNestedFunctionWithAVeryLongNameThatExceedsTheTypicalContainerWidth(parameterOne, parameterTwo, parameterThree) {
  return parameterOne + parameterTwo + parameterThree;
}</nldd-code>
`;

export const Wrap = () => html`
	<nldd-code wrap>function deeplyNestedFunctionWithAVeryLongNameThatExceedsTheTypicalContainerWidth(parameterOne, parameterTwo, parameterThree) {
  return parameterOne + parameterTwo + parameterThree;
}</nldd-code>
`;

export const HighlightYaml = () => html`
	<nldd-code language="yaml"># wet_op_de_zorgtoeslag — artikel 2
$id: zorgtoeslagwet
articles:
  - number: '2'
    title: 'Recht op zorgtoeslag'
    is_active: true
    threshold: 32502
    actions:
      - output: heeft_recht_op_zorgtoeslag
        operation: AND</nldd-code>
`;

export const HighlightJson = () => html`
	<nldd-code language="json">{
  "lawId": "zorgtoeslagwet",
  "article": 2,
  "active": true,
  "outputs": ["heeft_recht_op_zorgtoeslag", "hoogte_zorgtoeslag"]
}</nldd-code>
`;

export const HighlightJavaScript = () => html`
	<nldd-code language="javascript">// Compute eligibility
function isEligible(person, threshold = 32502) {
  if (person.income > threshold) return false;
  return person.age >= 18 && person.insured;
}</nldd-code>
`;
