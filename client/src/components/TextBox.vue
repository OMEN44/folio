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
            z-index: 3;
            margin-bottom: -2px;
            position: relative;
            width: 200px;
            height: 45px;
            border-radius: 0 5px 0 0;
            background-color: var(--blue-border);
        	-webkit-clip-path: polygon(0% 100%, 45px 0%, 100% 0%, 100% 100%);
            clip-path: polygon(0% 100%, 45px 0%, 100% 0%, 100% 100%);

            .div-header-child {
                display: flex;
                justify-content: flex-end;
                position: absolute;
                border-radius: 0 5px 0 0;
                top: 2px;
                left: 2px;
                right: 2px;
                bottom: -2px;
                background: var(--background);
                -webkit-clip-path: polygon(0% 100%, 45px 0%, 100% 0%, 100% 100%);
                clip-path: polygon(1px 100%, calc(45px - 1px) 0%, 100% 0%, 100% 100%);
                
            }
        }

        .div-body {
            border: 2px var(--blue-border) solid;
            border-radius: 5px 0 5px 5px;
            padding: 10px;
        }
    }
</style>