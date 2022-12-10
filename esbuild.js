const { build } = require('esbuild');

const __DEV__ = process.env.NODE_ENV === 'development';
const __PROD__ = process.env.NODE_ENV === 'production';

const dist_folder = `dist`;

const common = {
  bundle: true,
  minify: __PROD__,
  sourcemap: __DEV__
};

const builds = [
  {
    ...common,
    entryPoints: ['src/index.ts'],
    outfile: `${dist_folder}/indes.cjs.js`,
    format: 'cjs'
  },
  {
    ...common,
    entryPoints: ['src/index.ts'],
    outfile: 'dist/index.esm.js',
    format: 'esm'
  }
];

for (const build_opts of builds) {
  build(build_opts).catch(() => process.exit(1));
}
