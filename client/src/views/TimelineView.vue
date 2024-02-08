<script setup lang="ts">
import TimelineEvent from "../components/TimelineEvent.vue";
import TimelineSeach from "../components/TimelineSeach.vue";
import TimelineCreator from "../components/TimelineCreator.vue";
import { AccessLevel, TimelineData, updateTimeline } from "../script/timeline";

updateTimeline()
</script>

<template>
  <div class="container">
    <div class="div-intro">
      <h1>What is this?</h1>
      <p>I have been interested in robots and computers for as long as I can remember, this passion has sparked many
        projects starting from humble lego and taking me to where I am today. This timeline showcases most (or at least
        the ones that got close to finished) of my projects, including images and links to dedicated pages where
        possible.<br />I hope that at least one of the entries can inspire someone, somewhere to start their own project!
      </p>
    </div>
    <Timeline-creator v-if="AccessLevel < 2" />
    <Timeline-seach />
    <div class="div-timeline">
      <timeline-event v-for="(item) in TimelineData" :event-data="item" :access-level="AccessLevel" />
    </div>
  </div>
</template>

<style scoped>
.container {
  margin: 0 10%;
}

.div-intro {
  text-align: center;
  padding: 50px;
}

.div-timeline {
  margin: 20px;
  padding-left: 40px;
  border-left: solid 4px var(--primary);
}

@media (max-width: 800px) {
  .container {
    margin: 0;
  }

  .div-intro {
    padding: 20px;
  }
}
</style>