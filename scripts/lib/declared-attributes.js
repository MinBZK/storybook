/**
 * Reads the attribute names off a component's `@property` decorators.
 *
 * Shared so validate-component-api.js can be checked without running its
 * file-walking and process.exit. The parsing has three sharp edges, each of
 * which was a real miss: an options object with a nested one (a converter),
 * a single-line declaration, and an accessor.
 */

/**
 * The attribute name Lit derives when none is given: the property name
 * lowercased, NOT kebab-cased. `groupName` becomes `groupname`.
 */
export function toAttributeName(propertyName) {
	return propertyName.toLowerCase();
}

export function declaredAttributes(body) {
	const found = new Set();
	for (const match of body.matchAll(/@property\(/g)) {
		// Brace-balanced rather than /\{([^}]*)\}/: an options object may hold a
		// nested one (a converter) and span several lines. A non-greedy regex stops
		// at the first inner "}" and skips the property.
		const optionsStart = body.indexOf('{', match.index);
		const parenEnd = body.indexOf(')', match.index);
		// A bare @property() with no options object short-circuits here (the ) comes
		// before the next brace). Such a property still declares an attribute (the
		// lowercased name), so this would be a false negative - but no component in
		// src/ writes @property() bare today. Add handling if one ever does.
		if (optionsStart === -1 || (parenEnd !== -1 && parenEnd < optionsStart)) continue;
		let depth = 0;
		let i = optionsStart;
		for (; i < body.length; i++) {
			if (body[i] === '{') depth++;
			else if (body[i] === '}' && --depth === 0) break;
		}
		const options = body.slice(optionsStart, i + 1);
		// \s*, not \s*\n\s*: the literal newline skipped a single-line declaration
		// (@property({ type: Boolean }) disabled = false). get/set for an accessor.
		const after = body.slice(i + 1).match(
			/^\s*\)\s*(?:override\s+)?(?:public\s+|readonly\s+)?(?:get\s+|set\s+)?([A-Za-z_][A-Za-z0-9_]*)/,
		);
		// A comment between the ) and the property name (") /* x */ name") lands here
		// and is skipped: \s* does not span a comment. No component writes that today.
		if (!after) continue;
		const propertyName = after[1];
		// attribute: false lives only as a DOM property, so no attribute to document.
		if (/attribute:\s*false/.test(options)) continue;
		// A leading underscore marks a property a parent sets on its children.
		if (propertyName.startsWith('_')) continue;
		// Single or double quotes for an explicit attribute name.
		const explicit = options.match(/attribute:\s*['"]([^'"]+)['"]/);
		found.add(explicit ? explicit[1] : toAttributeName(propertyName));
	}
	return found;
}
