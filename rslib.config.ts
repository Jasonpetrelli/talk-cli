import { defineConfig } from '@rslib/core';

export default defineConfig({
  lib: [
    {
      format: 'esm',
      banner: { js: '#!/usr/bin/env node' },
      source: {
        entry: {
          cli: './src/cli.ts',
        },
      },
      output: {
        sourceMap: true,
        legalComments: 'none',
        target: 'node',
      },
    },
  ],
});
