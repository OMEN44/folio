<script setup lang="ts">

</script>

<template>
    <div class="div-text-box-container">
        <div class="div-header">
            <div class="div-header-child">
                <h1>Title</h1>
            </div>
        </div>
        <div class="div-body">
            <p>This is some content Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nihil at soluta ratione aut ad voluptatibus doloribus fugiat vitae rerum sit similique, alias fuga voluptas, fugit mollitia nesciunt. Deleniti, quis consectetur!</p>
        </div>
    </div>
</template>

<style scoped lang="scss">
    .div-text-box-container {
        margin: 20px 5%;
        display: flex;
        flex-direction: column;
        align-items: flex-end;

        .div-header {
            width: fit-content;
            height: 45px;
            background-color: transparent;
            z-index: 0;

            position: relative;

            --edge-size: 45px;
            --border-size: 2px;

            &:before {
                position: absolute;
                content: "";
                width: calc(100% + 45px);
                height: 45px;
                background-color: var(--blue-border);
                clip-path: polygon(var(--edge-size) 0, 100% 0, 100% 100%, 0 100%);
                top: 0;
                left: -45px;
                border-radius: 0 5px 0 0;
                z-index: -2;
            }

            &:after {
                position: absolute;
                content: '';
                background-color: var(--background);
                z-index: -1;
                top: 0;
                margin: 2px 2px -2px -2px;
                inset: 0;
                left: -45px;
                width: calc(100% + 45px);
                border-radius: 0 5px 0 0;
                clip-path: polygon(var(--edge-size) 0, 100% 0, 100% 100%, 0 100%);
                // clip-path: polygon(
                //     calc(var(--edge-size) + 1px) 2px, 
                //     calc(100% - 2px) 2px, 
                //     calc(100% - 2px) 100%, 
                //     3px 100%
                // );
            }
        }

        .div-body {
            border: 2px var(--blue-border) solid;
            border-radius: 5px 0 5px 5px;
            padding: 10px;
        }
    }
</style>