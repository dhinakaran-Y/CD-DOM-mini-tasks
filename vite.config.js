import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [tailwindcss()],
  build: {
    rollupOptions: {
      input: ["index.html", "1_shopping-calculator.html", "2_shopping-list.html", "3_employee-info.html", "4_navbar.html"],
    },
  },
});
