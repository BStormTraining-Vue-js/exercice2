import { defineConfig } from "vite";
import Vue from "@vitejs/plugin-vue";
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
    plugins: [
        Vue(),
        tailwindcss(),
    ]
})