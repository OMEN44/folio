import adapter from "@sveltejs/adapter-node";
import { vitePreprocess } from "@sveltejs/vite-plugin-svelte";

const config = {
    preprocess: vitePreprocess({
        scss: {
            prependData: `@import '$lib/scss/_global.scss';`,
        },
    }),
    kit: { adapter: adapter() },
};

export default config;
