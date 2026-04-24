import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "path";

// IMPORTANT for GitHub Pages:
// If your site is published at https://<user>.github.io/<repo-name>/
// set BASE to "/<repo-name>/" — for example "/laplace-store/".
// If you use a custom domain (e.g. yourdomain.com) or a User Pages site
// (https://<user>.github.io/), keep BASE as "/".
const BASE = process.env.BASE_PATH ?? "/";

export default defineConfig({
  base: BASE,
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
});
