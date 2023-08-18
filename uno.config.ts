// uno.config.ts
import {
  defineConfig, presetAttributify, presetIcons,
  presetTypography, presetUno, presetWebFonts,
  transformerDirectives, transformerVariantGroup
} from 'unocss'

export default defineConfig({
  shortcuts: [
    // ...
  ],
  theme: {
    colors: {
      'brand': {
        '50': '#f1f7fe',
        '100': '#e3eefb',
        '200': '#c0ddf7',
        '300': '#88c2f1',
        '400': '#3d9de6',
        '500': '#2187d6',
        '600': '#136bb6',
        '700': '#115593',
        '800': '#12497a',
        '900': '#143e66',
        '950': '#0e2743',
      },
    }
  },
  presets: [
    presetUno({
      dark: 'class'
    }),
    presetAttributify(),
    presetIcons({
      extraProperties: {
        'display': 'inline-block',
        'vertical-align': 'middle',
      },
    }),
    presetTypography(),
    presetWebFonts({
      fonts: {
        // ...
      },
    }),
  ],
  transformers: [
    transformerDirectives(),
    transformerVariantGroup(),
  ],
})