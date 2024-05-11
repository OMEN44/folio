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
        margin: 20px 5%;
        display: flex;
        flex-direction: column;
        align-items: flex-end;

        .div-header {
            border: var(--blue-border) 2px;
            border-style: solid solid none none;
            position: relative;
            border-radius: 0 5px 0 0;
            padding: 5px 15px 5px 25px;
            background-color: var(--background);
            margin-bottom: -3px;
            z-index: 3;
            
            ::before {
                content: '';
                position: absolute;
                left: -5px;
                top: -2px;
                background-color: var(--blue-border);
                height: 6px;
                width: 17px;
                border-radius: 4px 0 4px 4px;
            }
            
            ::after {
                content: '';
                position: absolute;
                bottom: -3px;
                left: -5px;
                background-color: var(--blue-border);
                height: 6px;
                width: 17px;
                border-radius: 0 4px 4px 4px;
            }
        }

        .div-body {
            border: 2px var(--blue-border) solid;
            border-radius: 5px 0 5px 5px;
            padding: 10px;
        }
    }
</style>