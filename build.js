import * as esbuild from 'esbuild';

const entryFile = 'src/index.ts';
const shared = {
    bundle: true,
    entryPoints: [entryFile],
    minify: true,
    sourcemap: true,
    target: ['esnext'],
    external: ['react'],
};

await esbuild.build({
    ...shared,
    format: 'esm',
    outfile: 'dist/index.esm.js',
});

await esbuild.build({
    ...shared,
    format: 'cjs',
    outfile: 'dist/index.cjs.js',
});
