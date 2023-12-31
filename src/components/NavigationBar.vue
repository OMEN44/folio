<script setup>
import SvgIcon from '@jamescoyle/vue-icon'
import { mdiAccount } from '@mdi/js'
</script>

<template>
  <div class="div-navigation">
    <div class="div-left">
      <router-link class="link" to="/home">
        <h2>Home</h2>
      </router-link>
      <router-link class="link" to="/timeline">
        <h2>Timeline</h2>
      </router-link>
    </div>

    <div class="div-right">
      <div class="link">
        <router-link to="/account">
          <svg-icon class="icon-account" type="mdi" :size="40" :path="mdiAccount"></svg-icon>
        </router-link>
      </div>
    </div>
  </div>
</template>

<style scoped>
.div-navigation {
  width: 100%;
  display: flex;
  justify-content: space-between;
}

.div-left::before {
  background-color: var(--background);
  border: solid var(--primary) 4px;
  height: 16px;
  width: 16px;
  border-radius: 50%;
  position: absolute;
  bottom: -10px;
  right: -15px;
  content: '';
}

.div-left {
  border-bottom: var(--primary) solid 4px;
  display: flex;
  height: 100%;
  width: fit-content;
  position: relative;
  flex-direction: row;
}

.div-left h2 {
  padding: 18px 30px;
  background-color: transparent;
  transition: background-color 1s;
}

.link {
  margin: 0;
  text-decoration: none;
  position: relative;
  overflow: hidden;
  z-index: 0;
}

.link:before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: var(--secondary);
  transition:0.5s;
  transform-origin:bottom;
  transform:scaleY(0);
  z-index: -1;
}

.link:hover::before {
  transition:transform 0.5s;
  transform-origin:bottom;
  transform:scaleY(1);
}

.div-right {
  border-bottom: var(--primary) solid 4px;
  position: relative;
}

.div-right::before {
  background-color: var(--background);
  border: solid var(--primary) 4px;
  height: 16px;
  width: 16px;
  border-radius: 50%;
  position: absolute;
  top: 58px;
  right: 59px;
  content: '';
}

.icon-account {
  color: var(--text);
  width: 60px;
  height: 100%;
}
</style>