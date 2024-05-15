<script setup lang="ts">
import TextBox from "../components/TextBox.vue"

const goToAbout = () => {
    const aboutDiv: HTMLDivElement = document.getElementsByClassName('div-about')[0] as HTMLDivElement
    aboutDiv.scrollIntoView({ behavior: "smooth"})
}
</script>

<template>
    <div class="div-welcome">
        <h2 class="hello">Hello World, I'm</h2>
        <h1>Huon Swales</h1>
        <h2>This is my folio <span class="flashy"></span></h2>
        <div class="div-scroll-button" @click="goToAbout">
            <span>See whats inside</span><p>⤵</p>
        </div>
    </div>

    <div class="div-about">
        <div class="div-left">
            <h2>A bit about me</h2>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus laudantium non amet at quam neque illo natus tempore minus consequuntur voluptas nam omnis recusandae soluta voluptatum expedita, eveniet officiis adipisci. Lorem, ipsum dolor sit amet consectetur adipisicing elit. Harum dicta vitae officiis perspiciatis excepturi facilis a aut nostrum dolore iste culpa, nobis incidunt consectetur, expedita tempore magnam! Labore, ducimus ipsum!</p>
        </div>
        <div class="divider"></div>
        <div class="div-right">
            <h2>Reach out</h2>
            <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Maxime magni repellat minima quasi neque accusantium provident. Vitae, ipsa! Explicabo exercitationem a architecto qui quo, officia pariatur enim esse quas asperiores!</p>
            <button class="button-fancy">Contact me!</button>
        </div>
    </div>


    <h1>Who am I?</h1>

    <text-box >
        <div class="div-about-content">
            <h1>Who am I?</h1>
            <p>I'm Huon Swales, I have been interested in robots and computers for as long as I can remember, this passion has sparked many projects starting from humble lego and taking me to where I am today. I created this website with the goal of sharing my journey through this fascinating world of technology with anyone who shares my passion. If you're curious about developing new skills, looking for a new project idea or just someone who enjoys a good code snippet, you're in the right palce!</p>
        
            <h1>What you'll find here</h1>
            <p>I have split the site into two pages; the timeline and notes. The timeline page gives a quick overview of all the projects that I have worked on in chronological order. The notes page offers more detail and multimedia content that I couldnt fit into a timeline entry. To link these two I have added a button to the timeline entries that have their own notes page so that you can quickly navigate between notes and the timeline.</p>
        </div>
        <img src="/me.png" alt="Image of Huon Swales">
    </text-box>
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

    .div-scroll-button {
        cursor: pointer;
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
    display: flex;
    flex-direction: row;
    margin: 10%;

    .divider {
        background-color: var(--blue-border);
        width: 2px;
        margin: 0 5%;
        position: relative;
        
        &::before {
            content: "";
            position: absolute;
            width: 300%;
            left: -200%;
            top: -10px;
            height: 20px;
            border-radius: 4px 4px 0 4px;
            background-color: var(--blue-border);
        }
        
        &::after {
            content: "";
            position: absolute;
            width: 300%;
            left: -200%;
            bottom: -10px;
            height: 20px;
            border-radius: 4px 0 4px 4px;
            background-color: var(--blue-border);
        }
    }

    .div-left {
        flex: 1;
    }

    .div-right {
        flex: 1;
        display: flex;
        flex-direction: column;

        button {
            margin: 20px auto;
        }
    }

    @media (max-width: 700px) {
        flex-direction: column;

        .div-left, .div-right {
            margin: 10px 0;

            button {
                margin: 20px 0 0 0;
            }
        }

        .divider {
            display: none;
        }
    }
}
</style>