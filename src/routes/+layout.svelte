<script lang="ts">
    import Nav from "$lib/components/nav.svelte";
    import { onMount } from "svelte";

    let { children } = $props();

    let viewHeight = $state("100vh");

    onMount(() => {
        if (window.innerWidth < 600) {
            viewHeight = `${window.innerHeight}px`;
        }
    });
</script>

<div class="container" style:height={viewHeight}>
    <div>
        {@render children()}
    </div>
</div>
<Nav />

<style lang="scss">
    @use "$lib/scss/var";
    @use "$lib/scss/mixins";

    .container {
        position: absolute;
        top: 0;
        width: 100vw;

        div {
            @include mixins.box;
            margin-top: calc(var.$gap * 6);
            height: calc(100% - (var.$gap * 2) - var.$gap * 5) !important;
        }
    }

    :global(body) {
        background-color: var.$background;
    }

    :global(*) {
        color: var.$text;
        font-size: 18px;
    }
</style>
