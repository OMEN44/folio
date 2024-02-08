<script setup lang="ts">
import SvgIcon from '@jamescoyle/vue-icon'
import { mdiAccount, mdiArrowRight, mdiArrowLeft } from '@mdi/js'
import { ref } from 'vue';

const showNav = ref<boolean>(false)


</script>

<template>
  <div class="div-container">
    <span class="small-circle left"></span>
    <span class="small-circle right"></span>
    <div ref="navSlidePanel" class="div-navigation" :class="{ 'show-nav': showNav }">
      <div class="div-left">
        <router-link class="link" to="/home" @click="showNav = !showNav">
          <h2>Home</h2>
        </router-link>
        <router-link class="link" to="/timeline" @click="showNav = !showNav">
          <h2>Timeline</h2>
        </router-link>
        <router-link class="link" to="/notes" @click="showNav = !showNav">
          <h2>Notes</h2>
        </router-link>
      </div>

      <div class="div-right">
        <div class="link">
          <router-link to="/account" @click="showNav = !showNav">
            <svg-icon class="icon-account" type="mdi" :size="40" :path="mdiAccount"></svg-icon>
          </router-link>
        </div>
      </div>
    </div>
    <div class="div-open" @click="showNav = !showNav">
      <svg-icon type="mdi" :size="30" :path="showNav ? mdiArrowLeft : mdiArrowRight"></svg-icon>
    </div>
    <span class="border"></span>
  </div>
</template>

<style scoped>
.icon-account {
  color: var(--text);
  width: 60px;
  height: 100%;
}

.link {
  margin: 0;
  text-decoration: none;
  position: relative;
  overflow: hidden;
  z-index: 0;
}

@media (max-width: 800px) {

  .div-container {
    z-index: 100;
    display: flex;
    flex-direction: row;
    position: fixed;
    top: 10px;
    left: 0;
  }

  .div-navigation {
    border: 4px var(--primary);
    border-style: solid solid solid none;
    width: 0;
    background-color: var(--background);
    overflow-x: hidden;
    transition: width 0.5s;
    z-index: 20;
    margin-left: -10px;
  }

  .left {
    z-index: 22;
    right: 94px;
    top: 38px;
  }

  .right {
    z-index: 22;
    right: 94px;
    bottom: -7px;
  }

  .div-open {
    width: 50px;
    height: 40px;
    background-color: var(--background);
    z-index: 21;
    margin: 4px 0 0 -4px;
    text-align: center;
    padding-top: 5px;
    clip-path: polygon(0 0, 65% 0, 100% 35%, 100% 65%, 65% 100%, 0 100%);
  }

  .border {
    position: relative;
    background-color: var(--primary);
    width: 54px;
    height: 48px;
    top: 0;
    left: -50px;
    z-index: 20;
    clip-path: polygon(0 0, 65% 0, 100% 35%, 100% 65%, 65% 100%, 0 100%);
  }

  .div-navigation.show-nav {
    width: 160px;
  }

  .div-left {
    height: 140px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 15px 0 15px 30px;
  }

  .div-right {
    padding: 0 0 0 20px;
  }

  .icon-account {
    width: 30px;
  }

  .icon-account:hover,
  h2:hover {
    color: var(--primary);
  }

  .icon-account,
  h2 {
    transition: color 0.5s;
  }

}

@media (min-width: 799px) {
  .div-open {
    display: none;
  }

  /* Container styles */
  .div-navigation {
    width: 100%;
    display: flex;
    justify-content: space-between;
  }

  /* Link styles */


  .left {
    z-index: 3;
    top: 58px;
    left: 400px;
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

  .link:before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: var(--secondary);
    transition: 0.5s;
    transform-origin: bottom;
    transform: scaleY(0);
    z-index: -1;
  }

  .link:hover::before {
    transition: transform 0.5s;
    transform-origin: bottom;
    transform: scaleY(1);
  }

  .div-right {
    border-bottom: var(--primary) solid 4px;
    position: relative;
  }

  .right {
    top: 58px;
    right: 59px;
  }
}
</style>