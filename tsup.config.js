import { defineConfig } from 'tsup';

export default defineConfig({
  format: ["cjs"],
  entry: ['./src/js/index.ts'],
  dts: false,
  shims: true,
  skipNodeModulesBundle: false,
  clean: true,
  target: 'esnext',
  platform: 'node',
  minify: true,
  bundle: true,
  // https://github.com/egoist/tsup/issues/619
  noExternal: [/(.*)/],
  splitting: false,
  // sourcemap: true,
});
