import { defineConfig } from 'windicss/helpers';
import scrollSnapPlugin from 'windicss/plugin/scroll-snap';

export default defineConfig({
  attributify: true,
  plugins: [scrollSnapPlugin],
});
