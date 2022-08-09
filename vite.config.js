import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.json'],
    alias: {
      './': path.resolve('./src/'),
      'src': path.resolve('./src'),
      'api': path.resolve('./src/api'),
      'app': path.resolve('./src/app'),
      'models': path.resolve('./src/models'),
      'utils': path.resolve('./src/utils'),
      'hooks': path.resolve('./src/hooks'),
      './': path.resolve('./src/constants'),
      'features': path.resolve('./src/features'),
      'components': path.resolve('./src/components'),
    },
  },
  plugins: [react()],
  clearScreen: true,
  css: {
    preprocessorOptions: {
      sass: {
        additionalData: `@import "src/constants/_global.sass"\n`,
      },
    },
  },
});
