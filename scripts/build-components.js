import * as esbuild from 'esbuild';

async function buildComponents() {
  try {
    // Build a single bundled file with all components
    await esbuild.build({
      entryPoints: ['src/components/index.ts'],
      bundle: true,
      outfile: 'dist/components/rr-components.js',
      format: 'esm',
      target: 'es2020',
      minify: false,
    });

    console.log('✓ Components built successfully!');
  } catch (error) {
    console.error('Error building components:', error);
    process.exit(1);
  }
}

buildComponents();
