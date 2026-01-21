/**
 * Font weight mapping for RijksSans variable font
 *
 * RijksSans (RijksoverheidSans) uses 550 for semi-bold instead of the
 * typical 600. This is documented in the font's design specifications.
 *
 * @see https://www.rijkshuisstijl.nl/publiek/modules/product/DigitalStyleGuide/default/index.aspx?ItemId=2466
 */
export const FONT_WEIGHT_MAP = {
  Thin: 100,
  ExtraLight: 200,
  Light: 300,
  Regular: 400,
  Medium: 500,
  SemiBold: 550, // RijksSans uses 550, not 600
  Bold: 700,
  ExtraBold: 800,
  Black: 900,
};
