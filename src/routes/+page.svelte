<script lang="ts">
    import Scene from "$lib/components/scene.svelte";
    import { Canvas } from "@threlte/core";

    let content = $state<HTMLDivElement | null>(null);
    let scrollAmount = $state<number>(0);

    $effect(() => {
        content?.addEventListener("scroll", () => {
            if (content) {
                scrollAmount = content.scrollTop / (content.scrollHeight - content.clientHeight);
            }
        });
    });
</script>

<div class="container">
    <div class="canvas">
        <Canvas>
            <Scene {scrollAmount} />
        </Canvas>
    </div>
    <div bind:this={content} class="content">
        <p>
            Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque faucibus ex sapien vitae
            pellentesque sem placerat. In id cursus mi pretium tellus duis convallis. Tempus leo eu
            aenean sed diam urna tempor. Pulvinar vivamus fringilla lacus nec metus bibendum
            egestas. Iaculis massa nisl malesuada lacinia integer nunc posuere. Ut hendrerit semper
            vel class aptent taciti sociosqu. Ad litora torquent per conubia nostra inceptos
            himenaeos. Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque faucibus ex
            sapien vitae pellentesque sem placerat. In id cursus mi pretium tellus duis convallis.
            Tempus leo eu aenean sed diam urna tempor. Pulvinar vivamus fringilla lacus nec metus
            bibendum egestas. Iaculis massa nisl malesuada lacinia integer nunc posuere. Ut
            hendrerit semper vel class aptent taciti sociosqu. Ad litora torquent per conubia nostra
            inceptos himenaeos. Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque
            faucibus ex sapien vitae pellentesque sem placerat. In id cursus mi pretium tellus duis
            convallis. Tempus leo eu aenean sed diam urna tempor. Pulvinar vivamus fringilla lacus
            nec metus bibendum egestas. Iaculis massa nisl malesuada lacinia integer nunc posuere.
            Ut hendrerit semper vel class aptent taciti sociosqu. Ad litora torquent per conubia
            nostra inceptos himenaeos. Lorem ipsum dolor sit amet consectetur adipiscing elit.
            Quisque faucibus ex sapien vitae pellentesque sem placerat. In id cursus mi pretium
            tellus duis convallis. Tempus leo eu aenean sed diam urna tempor. Pulvinar vivamus
            fringilla lacus nec metus bibendum egestas. Iaculis massa nisl malesuada lacinia integer
            nunc posuere. Ut hendrerit semper vel class aptent taciti sociosqu. Ad litora torquent
            per conubia nostra inceptos himenaeos. Lorem ipsum dolor sit amet consectetur adipiscing
            elit. Quisque faucibus ex sapien vitae pellentesque sem placerat. In id cursus mi
            pretium tellus duis convallis. Tempus leo eu aenean sed diam urna tempor. Pulvinar
            vivamus fringilla lacus nec metus bibendum egestas. Iaculis massa nisl malesuada lacinia
            integer nunc posuere. Ut hendrerit semper vel class aptent taciti sociosqu. Ad litora
            torquent per conubia nostra inceptos himenaeos. Lorem ipsum dolor sit amet consectetur
            adipiscing elit. Quisque faucibus ex sapien vitae pellentesque sem placerat. In id
            cursus mi pretium tellus duis convallis. Tempus leo eu aenean sed diam urna tempor.
            Pulvinar vivamus fringilla lacus nec metus bibendum egestas. Iaculis massa nisl
            malesuada lacinia integer nunc posuere. Ut hendrerit semper vel class aptent taciti
            sociosqu. Ad litora torquent per conubia nostra inceptos himenaeos. Lorem ipsum dolor
            sit amet consectetur adipiscing elit. Quisque faucibus ex sapien vitae pellentesque sem
            placerat. In id cursus mi pretium tellus duis convallis. Tempus leo eu aenean sed diam
            urna tempor. Pulvinar vivamus fringilla lacus nec metus bibendum egestas. Iaculis massa
            nisl malesuada lacinia integer nunc posuere. Ut hendrerit semper vel class aptent taciti
            sociosqu. Ad litora torquent per conubia nostra inceptos himenaeos. Lorem ipsum dolor
            sit amet consectetur adipiscing elit. Quisque faucibus ex sapien vitae pellentesque sem
            placerat. In id cursus mi pretium tellus duis convallis. Tempus leo eu aenean sed diam
            urna tempor. Pulvinar vivamus fringilla lacus nec metus bibendum egestas. Iaculis massa
            nisl malesuada lacinia integer nunc posuere. Ut hendrerit semper vel class aptent taciti
            sociosqu. Ad litora torquent per conubia nostra inceptos himenaeos. Lorem ipsum dolor
            sit amet consectetur adipiscing elit. Quisque faucibus ex sapien vitae pellentesque sem
            placerat. In id cursus mi pretium tellus duis convallis. Tempus leo eu aenean sed diam
            urna tempor. Pulvinar vivamus fringilla lacus nec metus bibendum egestas. Iaculis massa
            nisl malesuada lacinia integer nunc posuere. Ut hendrerit semper vel class aptent taciti
            sociosqu. Ad litora torquent per conubia nostra inceptos himenaeos. Lorem ipsum dolor
            sit amet consectetur adipiscing elit. Quisque faucibus ex sapien vitae pellentesque sem
            placerat. In id cursus mi pretium tellus duis convallis. Tempus leo eu aenean sed diam
            urna tempor. Pulvinar vivamus fringilla lacus nec metus bibendum egestas. Iaculis massa
            nisl malesuada lacinia integer nunc posuere. Ut hendrerit semper vel class aptent taciti
            sociosqu. Ad litora torquent per conubia nostra inceptos himenaeos. Lorem ipsum dolor
            sit amet consectetur adipiscing elit. Quisque faucibus ex sapien vitae pellentesque sem
            placerat. In id cursus mi pretium tellus duis convallis. Tempus leo eu aenean sed diam
            urna tempor. Pulvinar vivamus fringilla lacus nec metus bibendum egestas. Iaculis massa
            nisl malesuada lacinia integer nunc posuere. Ut hendrerit semper vel class aptent taciti
            sociosqu. Ad litora torquent per conubia nostra inceptos himenaeos. Lorem ipsum dolor
            sit amet consectetur adipiscing elit. Quisque faucibus ex sapien vitae pellentesque sem
            placerat. In id cursus mi pretium tellus duis convallis. Tempus leo eu aenean sed diam
            urna tempor. Pulvinar vivamus fringilla lacus nec metus bibendum egestas. Iaculis massa
            nisl malesuada lacinia integer nunc posuere. Ut hendrerit semper vel class aptent taciti
            sociosqu. Ad litora torquent per conubia nostra inceptos himenaeos. Lorem ipsum dolor
            sit amet consectetur adipiscing elit. Quisque faucibus ex sapien vitae pellentesque sem
            placerat. In id cursus mi pretium tellus duis convallis. Tempus leo eu aenean sed diam
            urna tempor. Pulvinar vivamus fringilla lacus nec metus bibendum egestas. Iaculis massa
            nisl malesuada lacinia integer nunc posuere. Ut hendrerit semper vel class aptent taciti
            sociosqu. Ad litora torquent per conubia nostra inceptos himenaeos. Lorem ipsum dolor
            sit amet consectetur adipiscing elit. Quisque faucibus ex sapien vitae pellentesque sem
            placerat. In id cursus mi pretium tellus duis convallis. Tempus leo eu aenean sed diam
            urna tempor. Pulvinar vivamus fringilla lacus nec metus bibendum egestas. Iaculis massa
            nisl malesuada lacinia integer nunc posuere. Ut hendrerit semper vel class aptent taciti
            sociosqu. Ad litora torquent per conubia nostra inceptos himenaeos. Lorem ipsum dolor
            sit amet consectetur adipiscing elit. Quisque faucibus ex sapien vitae pellentesque sem
            placerat. In id cursus mi pretium tellus duis convallis. Tempus leo eu aenean sed diam
            urna tempor. Pulvinar vivamus fringilla lacus nec metus bibendum egestas. Iaculis massa
            nisl malesuada lacinia integer nunc posuere. Ut hendrerit semper vel class aptent taciti
            sociosqu. Ad litora torquent per conubia nostra inceptos himenaeos. Lorem ipsum dolor
            sit amet consectetur adipiscing elit. Quisque faucibus ex sapien vitae pellentesque sem
            placerat. In id cursus mi pretium tellus duis convallis. Tempus leo eu aenean sed diam
            urna tempor. Pulvinar vivamus fringilla lacus nec metus bibendum egestas. Iaculis massa
            nisl malesuada lacinia integer nunc posuere. Ut hendrerit semper vel class aptent taciti
            sociosqu. Ad litora torquent per conubia nostra inceptos himenaeos. Lorem ipsum dolor
            sit amet consectetur adipiscing elit. Quisque faucibus ex sapien vitae pellentesque sem
            placerat. In id cursus mi pretium tellus duis convallis. Tempus leo eu aenean sed diam
            urna tempor. Pulvinar vivamus fringilla lacus nec metus bibendum egestas. Iaculis massa
            nisl malesuada lacinia integer nunc posuere. Ut hendrerit semper vel class aptent taciti
        </p>
    </div>
</div>

<style lang="scss">
    @use "$lib/scss/var";
    @use "$lib/scss/mixins";

    .container {
        display: flex;
        height: 100%;

        .canvas {
            width: 40%;
            height: 100%;
        }

        .content {
            width: 60%;
            height: 100%;
            overflow-y: auto;
        }

        div {
            border: 2px red solid;
        }
    }
</style>
