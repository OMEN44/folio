<script setup lang="ts">
import TextBox from "../components/TextBox.vue";
import { Spotlight } from "../shared/Spotlight";

defineProps<{ data: Spotlight }>();
// Use priority value to get data for spotlight
</script>

<template>
    <div class="div-spotlight">
        <text-box :title="data.timeline!.title">
            <div class="div-content">
                {{ data.timeline?.content }}
                <img :src="data.timeline?.image?.path" />
            </div>
        </text-box>
    </div>
</template>

<style scoped lang="scss">
.div-spotlight {
    margin: 40px 30px;

    .div-content {
        display: flex;
        flex-direction: row;

        p {
            font-size: 25px;
        }

        img {
            max-width: 200px;
            height: 100%;
            margin: 10px;
        }
    }
}
</style>
