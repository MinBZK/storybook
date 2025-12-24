import type { CustomProjectConfig } from 'lost-pixel';

export const config: CustomProjectConfig = {
  storybookShots: {
    storybookUrl: 'http://localhost:6006',
  },
  // Store baseline images in repo
  imagePathBaseline: '.lostpixel/baseline',
  imagePathCurrent: '.lostpixel/current',
  imagePathDifference: '.lostpixel/difference',
  // Generate baseline on first run
  generateOnly: false,
  // Fail CI on visual differences
  failOnDifference: true,
  // Threshold for pixel difference (0 = exact match)
  threshold: 0.1,
};
