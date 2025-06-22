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
    <div class="page">
        <div>
            {@render children()}
        </div>
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
        padding: 2px 2px 2px 0;

        .page {
            @include mixins.box;
            margin-top: calc(var.$gap * 6);
            height: calc(100% - (var.$gap * 2) - var.$gap * 5) !important;

            @media (max-width: var.$mobile-width) {
                padding-right: calc(var.$gap / 2);
            }

            div {
                overflow-y: auto;
                overflow-x: hidden;
                height: 100%;
                width: 100%;

                /* width */
                &::-webkit-scrollbar {
                    width: 10px;

                    @media (max-width: var.$mobile-width) {
                        width: 5px;
                    }
                }

                /* Track
                &::-webkit-scrollbar-track {
                } */

                /* Handle */
                &::-webkit-scrollbar-thumb {
                    background: var.$primary-a;
                    border-radius: var.$b-radius;
                }

                /* Handle on hover */
                &::-webkit-scrollbar-thumb:hover {
                    background: var.$primary-a;
                    cursor: pointer;
                }
            }
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
