import * as esbuild from 'esbuild';
import { readdir } from 'fs/promises';
import { join } from 'path';

async function getComponentFiles() {
  const componentsDir = 'src/components';
  const entries = await readdir(componentsDir, { withFileTypes: true });

  const componentFiles = [];

  for (const entry of entries) {
    if (entry.isDirectory() && entry.name !== 'base') {
      const componentName = entry.name;
      const componentFile = join(componentsDir, componentName, `rr-${componentName}.js`);
      componentFiles.push(componentFile);
    }
  }

  return componentFiles;
}

async function buildComponents() {
  try {
    const componentFiles = await getComponentFiles();

    console.log('Building components:', componentFiles);

    // Build individual component files
    for (const file of componentFiles) {
      await esbuild.build({
        entryPoints: [file],
        bundle: false,
        outdir: 'dist/components',
        format: 'esm',
        target: 'es2020',
        minify: false,
      });
    }

    // Create a main export file that imports all components
    const imports = componentFiles
      .map((file, index) => {
        const componentName = file.split('/')[2]; // Get component folder name
        return `export { RR${componentName
          .split('-')
          .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
          .join('')} } from './${componentName}/rr-${componentName}.js';`;
      })
      .join('\n');

    const indexContent = `// Auto-generated file - do not edit directly
${imports}
`;

    await esbuild.build({
      stdin: {
        contents: indexContent,
        loader: 'js',
        resolveDir: 'src/components',
      },
      bundle: false,
      outfile: 'dist/components/rr-components.js',
      format: 'esm',
      target: 'es2020',
    });

    console.log('✓ Components built successfully!');
  } catch (error) {
    console.error('Error building components:', error);
    process.exit(1);
  }
}

buildComponents();
