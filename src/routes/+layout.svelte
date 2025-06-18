<script lang="ts">
    import Nav from "$lib/components/nav.svelte";

    let { children } = $props();
</script>

<Nav />

<div>
    {@render children()}
</div>

<style lang="scss">
    @use "$lib/scss/var.scss";
    @use "$lib/scss/mixins";

    div {
        @include mixins.box;
        margin-top: calc(var.$gap * 6);
        min-height: calc(100vh - (var.$gap * 2) - var.$gap * 6);
    }

    :global(body) {
        background-color: var.$background;
    }

    :global(*) {
        color: var.$text;
        font-size: 18px;
    }
</style>
