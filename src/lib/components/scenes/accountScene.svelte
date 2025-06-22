<script lang="ts">
    import { T } from "@threlte/core";
    import { onMount } from "svelte";

    let { eyePos }: { eyePos: { x: number; y: number } } = $props();

    let colour: string = "#7dfdfe";
    let colourb: string = "#416e7a";

    // Limits: pitch: [Math.PI, 0], yaw: [-Math.PI / 2, Math.PI / 2];
    let dir = $state<{ pitch: number; yaw: number }>({ pitch: Math.PI / 2, yaw: 0 });
    let target = $state<{ pitch: number; yaw: number }>({ pitch: 0, yaw: 0 });

    onMount(() => {
        target.pitch = Math.random() * Math.PI;
        target.yaw = Math.random() * Math.PI - Math.PI / 2;

        window.addEventListener("mousemove", (event) => {
            dir.pitch = (Math.PI * (event.clientY - eyePos.y)) / window.innerHeight + Math.PI / 2;
            dir.yaw = (Math.PI * (event.clientX - eyePos.x)) / window.innerWidth;

            // Clamp the pitch and yaw values
            dir.pitch = Math.max(0, Math.min(Math.PI, dir.pitch));
            dir.yaw = Math.max(-Math.PI / 2, Math.min(Math.PI / 2, dir.yaw));
        });

        let interpolationInterval: number | undefined = undefined;
        let targetInterval: number | undefined = undefined;

        // on mouse exit screen start intervals
        window.addEventListener("mouseleave", () => {
            console.log("mouseleave");
            interpolationInterval = setInterval(() => {
                dir.pitch += (target.pitch - dir.pitch) * 0.01;
                dir.yaw += (target.yaw - dir.yaw) * 0.01;
            }, 10);

            targetInterval = setInterval(() => {
                target.pitch = Math.random() * Math.PI;
                target.yaw = Math.random() * Math.PI - Math.PI / 2;
            }, 2000);
        });

        window.addEventListener("mouseenter", () => {
            clearInterval(interpolationInterval);
            clearInterval(targetInterval);
        });
    });
</script>

<T.PerspectiveCamera
    makeDefault
    position={[0, 0, 10]}
    oncreate={(ref) => {
        ref.lookAt(0, 0, 0);
    }}
/>

<T.DirectionalLight position={[1, 3, 8]} castShadow />

<T.Mesh castShadow receiveShadow>
    <T.SphereGeometry args={[1, 64, 64]} />
    <T.MeshToonMaterial color={colour} />
</T.Mesh>

<T.Mesh
    position={[
        0.4 * Math.sin(dir.pitch) * Math.sin(dir.yaw),
        0.4 * Math.cos(dir.pitch),
        0.4 * Math.sin(dir.pitch) * Math.cos(dir.yaw),
    ]}
    castShadow
    receiveShadow
>
    <T.SphereGeometry args={[0.7, 64, 64]} />
    <T.MeshToonMaterial color={colourb} />
</T.Mesh>
