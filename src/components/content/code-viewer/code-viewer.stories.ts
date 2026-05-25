import { html } from 'lit';
import './code-viewer.ts';

export default {
	title: 'Components/Content/Code Viewer',
	component: 'nldd-code-viewer',
	tags: ['autodocs'],
	parameters: {
		componentSource: {
			file: 'src/components/content/code-viewer/code-viewer.ts',
			repository: 'https://github.com/MinBZK/storybook',
		},
		status: { type: 'beta' },
	},
};

export const Default = () => html`
	<nldd-code-viewer>const greet = (name) =&gt; \`Hallo, \${name}!\`;
console.log(greet('wereld'));</nldd-code-viewer>
`;

export const Trace = () => html`
	<nldd-code-viewer>[engine] resolved input: bsn=999993653
[engine] action 'heeft_recht_op_zorgtoeslag' = true
[engine] action 'hoogte_zorgtoeslag' = 12345 (cents)
[engine] elapsed 4ms</nldd-code-viewer>
`;

export const LongLines = () => html`
	<nldd-code-viewer>function deeplyNestedFunctionWithAVeryLongNameThatExceedsTheTypicalContainerWidth(parameterOne, parameterTwo, parameterThree) {
  return parameterOne + parameterTwo + parameterThree;
}</nldd-code-viewer>
`;

export const Wrap = () => html`
	<nldd-code-viewer wrap>function deeplyNestedFunctionWithAVeryLongNameThatExceedsTheTypicalContainerWidth(parameterOne, parameterTwo, parameterThree) {
  return parameterOne + parameterTwo + parameterThree;
}</nldd-code-viewer>
`;

export const HighlightYaml = () => html`
	<nldd-code-viewer language="yaml"># wet_op_de_zorgtoeslag — artikel 2
$id: zorgtoeslagwet
articles:
  - number: '2'
    title: 'Recht op zorgtoeslag'
    is_active: true
    threshold: 32502
    actions:
      - output: heeft_recht_op_zorgtoeslag
        operation: AND</nldd-code-viewer>
`;

export const HighlightJson = () => html`
	<nldd-code-viewer language="json">{
  "lawId": "zorgtoeslagwet",
  "article": 2,
  "active": true,
  "outputs": ["heeft_recht_op_zorgtoeslag", "hoogte_zorgtoeslag"]
}</nldd-code-viewer>
`;

export const HighlightJavaScript = () => html`
	<nldd-code-viewer language="javascript">// Compute eligibility
function isEligible(person, threshold = 32502) {
  if (person.income > threshold) return false;
  return person.age >= 18 && person.insured;
}</nldd-code-viewer>
`;
