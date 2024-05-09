<script setup lang="ts">
import TextBox from "../components/TextBox.vue"
import AltTextBox from "../components/AltTextBox.vue"

</script>

<template>
    <div class="div-welcome">
        <h2 class="hello">Hello World, I'm</h2>
        <h1>Huon Swales</h1>
        <h2>This is my folio <span class="flashy"></span></h2>
        <div class="div-scroll-button">
            <span>See whats inside</span><p>⤵</p>
        </div>
    </div>

<text-box >
    <div class="div-about-content">
        <h1>Who am I?</h1>
        <p>I'm Huon Swales, I have been interested in robots and computers for as long as I can remember, this passion has sparked many projects starting from humble lego and taking me to where I am today. I created this website with the goal of sharing my journey through this fascinating world of technology with anyone who shares my passion. If you're curious about developing new skills, looking for a new project idea or just someone who enjoys a good code snippet, you're in the right palce!</p>
    
        <h1>What you'll find here</h1>
        <p>I have split the site into two pages; the timeline and notes. The timeline page gives a quick overview of all the projects that I have worked on in chronological order. The notes page offers more detail and multimedia content that I couldnt fit into a timeline entry. To link these two I have added a button to the timeline entries that have their own notes page so that you can quickly navigate between notes and the timeline.</p>
    </div>
    <img src="/me.png" alt="Image of Huon Swales">
</text-box>

    <alt-text-box >
        <div class="div-about-content">
            <h1>Who am I?</h1>
            <p>I'm Huon Swales, I have been interested in robots and computers for as long as I can remember, this passion has sparked many projects starting from humble lego and taking me to where I am today. I created this website with the goal of sharing my journey through this fascinating world of technology with anyone who shares my passion. If you're curious about developing new skills, looking for a new project idea or just someone who enjoys a good code snippet, you're in the right palce!</p>
        
            <h1>What you'll find here</h1>
            <p>I have split the site into two pages; the timeline and notes. The timeline page gives a quick overview of all the projects that I have worked on in chronological order. The notes page offers more detail and multimedia content that I couldnt fit into a timeline entry. To link these two I have added a button to the timeline entries that have their own notes page so that you can quickly navigate between notes and the timeline.</p>
        </div>
        <img src="/me.png" alt="Image of Huon Swales">
    </alt-text-box>

    <!-- <div class="div-about">
        
    </div> -->
    <div class="div-timeline-preview">

    </div>

    <svg width="0" height="0" viewBox="0 0 100 100">
      <defs>
        <clipPath id="textBox" clipPathUnits="objectBoundingBox">
          <path d="
          M 0,0.05 
          L 0.7,0.05 
          L 0.75,0
          L 1,0 
          L 1,1 
          L 0,1 
          L 0,0.05 
          Z"></path>
        </clipPath>
      </defs>
    </svg>
</template>

<style scoped lang="scss">
.div-welcome {
    padding: 10%;
    height: calc(100vh - 24px);
    position: relative;

    h1 {
        font-size: 80px;
        font-family: kode mono;
        margin-bottom: 100px;
        margin-left: 20px;
    }
    
    .hello {
        margin-bottom: 40px;
    }

    h2 {
        font-weight: 400;
        font-size: 30px;
        position: relative;
    }

    .div-scroll-button {
        display: flex;
        flex-direction: row;
        position: absolute;
        left: 50%;
        transform: translateX(-50%);
        bottom: 20px;
        font-size: 20px;

        p {
            font-size: 30px;
            margin-top: 0px;
        }
    }

    .flashy {
        width: 16px;
        height: 30px;
        position: absolute;
        bottom: calc(50% - 15px);
        margin-left: 4px;
        animation: flash 1s infinite steps(2, jump-none);


        @keyframes flash {
            from {
                background-color: var(--text);
            }

            to {
                background-color: var(--background);
            }
        }
    }

    @media (max-width: 700px) {
        padding: 20% 10%;
        margin: 20px 0;
        height: calc(100vh - 64px);

        h1 {
            font-size: 60px;
            margin-left: 0;
            margin-bottom: 80px;
        }

        h2 {
            font-size: 25px;
        }
    }
}

.div-about {
    margin: 20px 10%;
    border: 2px var(--blue-border) solid;
    border-radius: 5px;
    padding: 20px;
    display: flex;
    flex-direction: row;
    clip-path: url(#textBox);
    background-color: var(--orange-border);
    
    img {
        height: 400px;
    }

    @media (max-width: 700px) {
        margin: 20px 4px;        
    }
}
</style>