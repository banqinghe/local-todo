import { injectManifest } from 'workbox-build';
import esbuild from 'esbuild';
import { rm } from 'fs/promises';

const swSrc = './src/sw.js';
const swDest = './dist/sw.js';
const injectManifestOutputPath = './src/sw-inject-manifest.js';

const rmFile = async (filePath: string, logText?: string, errText?: string) => {
  try {
    await rm(filePath);
    if (logText) {
      console.log(logText);
    }
  } catch (err) {
    if (errText) {
      console.error(errText, err);
    }
  }
};

const go = async () => {
  rmFile(swDest, '🗑️  Remove old sw.js');

  console.log('⚙️  Build sw.js');

  await injectManifest({
    swSrc,
    swDest: injectManifestOutputPath,
    globDirectory: './dist',
    globPatterns: ['**/*.js', '**/*.css', '**/*.svg'],
  });

  await esbuild.build({
    entryPoints: [injectManifestOutputPath],
    outfile: './dist/sw.js',
    minify: true,
    bundle: true,
    target: 'es2019',
  });

  await rmFile(
    injectManifestOutputPath,
    '🗑️  Remove temp injectManifest output file',
    'Failed to Remove temp injectManifest output file'
  );

  console.log('🚀 Done!');
};

go();
