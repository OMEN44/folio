<script lang="ts">
    import { T, useTask } from "@threlte/core";
    import { interactivity } from "@threlte/extras";
    import { Spring } from "svelte/motion";
    import { DirectionalLight } from "three";

    let props: { scrollAmount: number } = $props();

    interactivity();
    const scale = $state(new Spring(1));

    // lprops.scrollAmounttep = $state(0);
    useTask((delta) => {
        // step += delta;
    });
</script>

<T.PerspectiveCamera
    makeDefault
    position={[10, 10, 10]}
    oncreate={(ref) => {
        ref.lookAt(0, 0, 0);
    }}
/>

<T.DirectionalLight position={[0, 10, 10]} castShadow />

<T.Mesh
    castShadow
    position.x={Math.sin(props.scrollAmount)}
    position.y={Math.cos(props.scrollAmount)}
>
    <T.SphereGeometry args={[0.1]} />
    <T.MeshToonMaterial color="red" />
</T.Mesh>

<T.Mesh
    castShadow
    position.x={Math.sin(props.scrollAmount + Math.PI / 2)}
    position.z={Math.cos(props.scrollAmount + Math.PI / 2)}
>
    <T.SphereGeometry args={[0.1]} />
    <T.MeshToonMaterial color="blue" />
</T.Mesh>

<T.Mesh
    castShadow
    position.y={Math.sin(props.scrollAmount - Math.PI / 2)}
    position.z={Math.cos(props.scrollAmount - Math.PI / 2)}
>
    <T.SphereGeometry args={[0.1]} />
    <T.MeshToonMaterial color="green" />
</T.Mesh>

<T.Mesh castShadow position={[0, 0, 0]}>
    <T.SphereGeometry args={[0.1]} />
    <T.MeshToonMaterial color="" />
</T.Mesh>

<!-- <T.Mesh
    rotation.y={rotation}
    scale={scale.current}
    onpointerenter={() => {
        scale.target = 1.5;
    }}
    onpointerleave={() => {
        scale.target = 1;
    }}
    castShadow
>
    <T.BoxGeometry args={[1, 2, 1]} />
    <T.MeshToonMaterial color="blue" />
</T.Mesh>

<T.Mesh rotation.x={-Math.PI / 2} receiveShadow>
    <T.CircleGeometry args={[4, 40]} />
    <T.MeshToonMaterial color="green" />
</T.Mesh> -->
