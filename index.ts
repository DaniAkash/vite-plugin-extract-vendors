import type { PluginOption } from 'vite'

export const extractVendors = (): PluginOption => {
  return {
    name: 'extract-vendors',
    config() {
      return {
        build: {
          rollupOptions: {
            output: {
              manualChunks(id) {
                if (id.includes('node_modules')) {
                  const module = id.split('node_modules/')?.[1];
                  return 'vendor/' + module;
                }
              }
            }
          },
        },
      }
    },
  }
}
