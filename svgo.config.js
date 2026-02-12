export default {
  multipass: true,
  js2svg: {
	indent: '\t',
	pretty: true,
  },
  plugins: [
	{
	  name: 'preset-default',
	  params: {
		overrides: {
		  removeViewBox: false,
		  cleanupNumericValues: {
			floatPrecision: 2,
		  },
		},
	  },
	},
	{
	  name: 'removeAttrs',
	  params: {
		attrs: [
		  'width',
		  'height',
		  'fill-rule',
		  'clip-rule',
		  '(fill="none")',  // Verwijder fill="none" expliciet
		],
	  },
	},
	{
	  name: 'convertColors',
	  params: {
		currentColor: /^#000(000)?$|^black$/i,
	  },
	},
	// Custom plugin om fill="none" te verwijderen
	{
	  name: 'removeFillNone',
	  type: 'visitor',
	  fn: () => {
		return {
		  element: {
			enter: (node) => {
			  if (node.attributes.fill === 'none') {
				delete node.attributes.fill;
			  }
			}
		  }
		};
	  }
	},
  ],
};