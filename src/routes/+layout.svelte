<script lang="ts">
    import Nav from "$lib/components/nav.svelte";
    import { onMount } from "svelte";

    let { children } = $props();

    let viewHeight = $state(0);

    onMount(() => {
        viewHeight = window.innerHeight;
    });
</script>

<Nav />

<div class="container" style:height={`${viewHeight}px`}>
    <div>
        {@render children()}
    </div>
</div>

<style lang="scss">
    @use "$lib/scss/var.scss";
    @use "$lib/scss/mixins";

    .container {
        div {
            @include mixins.box;
            margin-top: calc(var.$gap * 6);
            min-height: calc(100% - (var.$gap * 2) - var.$gap * 5);
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
