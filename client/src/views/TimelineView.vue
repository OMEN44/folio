<script setup lang="ts">
import TimelineEvent from "../components/TimelineEvent.vue";
import TimelineSeach from "../components/TimelineSeach.vue";
import TimelineCreator from "../components/TimelineCreator.vue";
import { AccessLevel, TimelineData, updateTimeline } from "../script/timeline";
import router from "../plugins/router.js";

const openTimeline = () => {
  document.getElementsByClassName('container')[0].scrollIntoView({ behavior: "smooth" })
}


updateTimeline()
</script>

<template>
  <div class="div-welcome-container">
    <span class="circle tl"></span>
    <span class="circle bl"></span>
    <span class="circle tr"></span>
    <span class="circle br"></span>
    <div class="div-welcome">
      <h1>Welcome to my digital folio!</h1>
      <div class="desktop div-image-welcome">
        <img class="image" src="../assets/Home-page-squared.png" />
      </div>
      <h2>Who am I?</h2>
      <p>
        I'm Huon Swales, I have been interested in robots and computers for as long as I can remember, this passion has
        sparked many projects starting from humble lego and taking me to where I am today. I created this website with
        the goal of sharing my journey through this fascinating world of technology with anyone who shares my passion.
        If you're curious about developing new skills, looking for a new project idea or just someone who enjoys a good
        code snippet, you're in the right palce!
      </p>
      <div class="mobile div-image-welcome">
        <img class="image" src="../assets/Home-page-squared.png" />
      </div>
      <h2>What you'll find here</h2>
      <div class="div-welcome-buttons">
        <p>I have split the site into two pages; the timeline and notes. The timeline page gives a quick overview of all
          the
          projects that I have worked on in chronological order. The notes page offers more detail and multimedia
          content
          that I couldnt fit into a timeline entry. To link these two I have added a button to the timeline entries that
          have their own notes page so that you can quickly navigate between notes and the timeline.</p>
        <div class="div-buttons">
          <label><button class="button-border" @click="openTimeline">Take me to the timeline</button></label>
          <label><button class="button-border" @click="router.push('notes')">Take me to the notes</button></label>
        </div>
      </div>
      <h2>Ready to dive in?</h2>
      <p>
        Any one who shares my passion for tech will know that no project is ever truly finished, there is always an
        optimisation of improvement to make! As such this website will continiue to grow as I embark on new challanges,
        so
        keep an eye out for updates and have fun exploring this site!
      </p>
    </div>
  </div>
  <div class="container">
    <Timeline-creator v-if="AccessLevel < 2" />
    <Timeline-seach />
    <div class="div-timeline">
      <timeline-event v-for="(item) in TimelineData" :event-data="item" :access-level="AccessLevel" />
    </div>
  </div>
</template>

<style scoped lang="scss">
.image {
  object-fit: contain;
  max-width: 475px;
  min-width: 100px;
  width: 100%;
  float: bottom left;

  clip-path: polygon(0 20%, 20% 0%, 90% 0%, 100% 10%, 100% 56%, 80% 76%, 10% 76%, 0 66%);
}

.desktop {
  display: block;

  @media (max-width: 800px) {
    display: none;
  }
}

.mobile {
  display: none;

  @media (max-width: 800px) {
    display: block;
  }
}

.div-image-welcome {
  float: right;
  position: relative;
  background-color: var(--background);
  padding: 15px;
  margin: 10px 20px;
  overflow: hidden;
  height: 77.5%;
  clip-path: polygon(0 20%, 20% 0%, 90% 0%, 100% 10%, 100% 57.5%, 80% 77.5%, 10% 77.5%, 0 67.5%);
  shape-outside: polygon(0 20%, 20% 0%, 90% 0%, 100% 10%, 100% 57.5%, 80% 77.5%, 10% 77.5%, 0 67.5%);

  @media (max-width: 800px) {
    margin: 10px auto;
  }
}

.div-welcome-container {
  position: relative;
}

.div-buttons {
  display: flex;
  flex-direction: row;
  background-color: var(--background);
  width: fit-content;
  padding: 10px;
  margin: auto;
  clip-path: polygon(10px 0, calc(100% - 10px) 0, 100% 10px, 100% calc(100% - 10px), calc(100% - 10px) 100%, 10px 100%, 0 calc(100% - 10px), 0 10px);
}

button {
  background-color: var(--secondary);
  font-size: 18px;
}

.div-welcome {
  background-color: var(--accent);
  width: calc(100% + 40px);
  margin: 0 0 50px -20px;
  padding: 30px 60px;
  min-height: fit-content;
  position: relative;
  border: var(--primary) 4px;
  border-style: solid none solid none;
  clip-path: polygon(0 0, 40% 0, calc(40% + 20px) 20px, 90% 20px, calc(90% + 20px) 0, 100% 0, 100% 100%, 65% 100%, calc(65% - 20px) calc(100% - 20px), 20% calc(100% - 20px), calc(20% - 20px) 100%, 0 100%);


  @media (max-width: 1200px) {
    flex-direction: column;
  }
}

.container {
  margin: 0 10%;
}

.div-timeline {
  margin: 20px;
  padding-left: 40px;
  border-left: solid 4px var(--primary);
}

.tl {
  top: -8px;
  left: calc(40% - 8px);
}

.tr {
  top: -8px;
  right: calc(10% - 38px);
}


.bl {
  bottom: -8px;
  left: calc(20% - 38px);
}

.br {
  bottom: -8px;
  right: calc(35% - 8px);
}

@media (max-width: 800px) {
  .div-welcome {
    margin-top: 70px;
    padding: 30px 20px;
  }

  .container {
    margin: 0;
  }

  .div-timeline {
    margin: 40px 5px 20px 5px;
    padding-left: 15px;
  }

  .div-intro {
    padding: 10px;
    margin-bottom: 10px;
  }

  .div-buttons {
    flex-direction: column;
    margin: 5px auto;
  }
}
</style>