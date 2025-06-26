<script lang="ts">
    import AccountScene from "$lib/components/scenes/accountScene.svelte";
    import { Canvas } from "@threlte/core";
    import { remult } from "remult";
    import { onMount } from "svelte";

    let { children, data } = $props();

    let eyePos = $state({ x: 0, y: 0 });

    onMount(() => {
        const bounds = document.getElementsByClassName("left")[0].getBoundingClientRect();
        eyePos.x = bounds.width / 2 + bounds.x;
        eyePos.y = bounds.height / 2 + bounds.y;
    });

    $effect(() => {
        remult.user = data.user;
    });
</script>

<div class="login-container">
    <div class="left">
        <Canvas>
            <AccountScene {eyePos} />
        </Canvas>
    </div>
    <div class="right">
        {@render children()}
    </div>
</div>
<div class="changelog-container">
    <p>chnages</p>
</div>

<style lang="scss">
    @use "$lib/scss/var";
    @use "$lib/scss/mixins";

    .login-container {
        max-width: var.$max-width;
        margin: 0 auto;
        height: 100%;
        display: flex;

        @media (max-width: var.$mobile-width) {
            .left {
                display: none;
            }

            .right {
                // margin: 0 var.$gap;
                width: 80%;
            }
        }

        .left {
            flex: 2;
            position: relative;

            &::after {
                content: "";
                position: absolute;
                top: 10%;
                right: 0;
                border-radius: var.$b-radius;
                width: calc(var.$b-thickness);
                box-shadow: 0px 0px var.$gap var.$primary-a;
                height: 80%;
                background: var.$primary;
            }
        }

        .right {
            flex: 3;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
        }
    }

    .changelog-container {
        height: fit-content;
        width: 100%;
    }
</style>
