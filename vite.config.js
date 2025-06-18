import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
      "@components": path.resolve(__dirname, "src/components"),
      "@styles": path.resolve(__dirname, "src/styles"),
      "@pages": path.resolve(__dirname, "src/pages"),
      "@hooks": path.resolve(__dirname, "src/hooks"),
    },
  },
  server: {
  proxy: {
    '/api': {
      target: 'https://8ehiy3y6.api.commercecloud.salesforce.com',
      changeOrigin: true,
      rewrite: path => path.replace(/^\/api/, '/custom/cyo-data/v1/organizations/f_ecom_bjjc_030/engraveProduct')
    }
  }
}
});
