<script setup lang="ts">
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
</script>

<template>
    <div class="div-event-container">
        <div class="div-header">
            <h2>Title</h2>
            <kbd>Date</kbd>
        </div>
        <div class="div-body">
            <p>
                Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                Consequuntur ipsam ipsa sunt enim sequi facere deleniti eum,
                mollitia autem, quae delectus aliquam quaerat quo obcaecati
                nobis reprehenderit voluptas! Repellendus, impedit.
            </p>
            <img src="../../public/vite.svg" alt="" />
        </div>
        <div class="div-footer">
            <font-awesome-icon class="option-icon" :icon="faEdit" />
            <font-awesome-icon class="option-icon" :icon="faTrash" />
            <span class="tag" v-for="i in 8">tag</span>
        </div>
    </div>
</template>

<style scoped lang="scss">
.div-event-container {
    margin: 10px 0 40px 0;

    .div-header {
        border-bottom: 2px solid var(--blue);
        padding: 0 15px;
        display: flex;
        flex-direction: row;
        position: relative;

        kbd {
            margin-top: auto;
            font-size: 20px;
            padding: 5px 5px 5px 15px;
        }

        h2 {
            font-weight: bold;
            font-size: 35px;
        }

        &::before,
        &::after {
            position: absolute;
            content: "";
            background-color: var(--blue);
            width: 25px;
            height: 7px;
            bottom: -7px;
        }

        &::before {
            left: -5px;
            border-radius: 5px 0 5px 5px;
        }

        &::after {
            right: -5px;
            border-radius: 0 5px 5px 5px;
        }
    }

    .div-body {
        display: flex;
        flex-direction: row;
        padding: 10px;
        font-size: 20px;

        @media (max-width: 700px) {
            flex-direction: column;
        }
    }

    .div-footer {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;

        span,
        .option-icon {
            background-color: var(--blue-background);
            border-radius: 4px;
            margin: 5px;
            padding: 3px 7px;
            text-align: center;
        }

        .option-icon {
            height: 17px;
            width: 17px;
            padding: 8px;
        }
    }
}
</style>
