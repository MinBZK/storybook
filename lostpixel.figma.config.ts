import type { CustomProjectConfig } from 'lost-pixel';

export const config: CustomProjectConfig = {
  storybookShots: {
    storybookUrl: 'http://localhost:6006',
    // Only capture Figma Comparison stories
    storyFilter: {
      kind: 'Figma Comparison',
    },
    mask: [],
  },
  // Use Figma exports as baselines
  imagePathBaseline: '.lostpixel/figma-baseline',
  imagePathCurrent: '.lostpixel/figma-current',
  imagePathDifference: '.lostpixel/figma-difference',
  // Generate baseline on first run
  generateOnly: false,
  // Fail CI on visual differences
  failOnDifference: true,
  // 3% tolerance for font rendering differences
  threshold: 0.03,
};
