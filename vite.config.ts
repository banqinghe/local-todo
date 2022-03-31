import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import WindiCSS from 'vite-plugin-windicss';
import { resolve } from 'path';

export default defineConfig({
  plugins: [react(), WindiCSS()],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
    },
  },
});
