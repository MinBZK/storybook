export const nlddImageTranslations = {
	/** Live-region announcement when an image fails to load mid-session.
	 *  Combined with the alt text so SR users know which image failed.
	 *  Decorative images (alt=" '"', aria-hidden) suppress the announcement. */
	'components.image.error-text': 'Afbeelding is niet geladen',
};

export type NLDDImageTranslations = typeof nlddImageTranslations;
