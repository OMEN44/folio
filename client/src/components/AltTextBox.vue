<script setup lang="ts">

</script>

<template>
    <div class="div-text-box-container">
        <div class="div-header">
            <h1>Title</h1>
        </div>
        <div class="div-body">
            <p>This is some content Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nihil at soluta ratione aut ad voluptatibus doloribus fugiat vitae rerum sit similique, alias fuga voluptas, fugit mollitia nesciunt. Deleniti, quis consectetur!</p>
        </div>
    </div>
</template>

<style scoped lang="scss">
    .div-text-box-container {
        border: 3px var(--blue-border) solid;
        border-radius: 5px;
        padding: 3px;
        margin: 20px 5%;
        

        .div-header {
            border: 1px var(--blue-border);
            border-style: solid solid none solid;
            padding: 5px 15px;
        }

        .div-body {
            border: 1px var(--blue-border) solid;
            padding: 10px;
        }
    }
</style>