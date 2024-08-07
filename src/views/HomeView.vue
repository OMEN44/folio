<script setup lang="ts">
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import CardSpotlight from "../components/CardSpotlight.vue";
import { loadSpotlight, spotlightData } from "../scripts/spotlight";
import { showTerminal } from "../scripts/terminal";
import { faArrowTurnDown } from "@fortawesome/free-solid-svg-icons";
import { setOverlayContent } from "../scripts/overlay";

const goToAbout = () => {
    const aboutDiv: HTMLDivElement = document.getElementsByClassName(
        "div-about"
    )[0] as HTMLDivElement;
    aboutDiv.scrollIntoView({ behavior: "smooth" });
};

loadSpotlight();
</script>

<template>
    <div class="div-welcome">
        <h2 class="hello">Hello World, I'm</h2>
        <h1>Huon Swales</h1>
        <h2>
            This is my folio
            <span class="flashy" @click="showTerminal = true"></span>
        </h2>
        <div class="div-scroll-button" @click="goToAbout">
            <FontAwesomeIcon class="left" :icon="faArrowTurnDown" />
            <span>See whats inside</span>
            <FontAwesomeIcon :icon="faArrowTurnDown" />
        </div>
    </div>

    <div class="div-about">
        <div class="div-about-content">
            <div class="div-left">
                <h2>A bit about me</h2>
                <p>
                    I have been interested in robotics for as long as I can remember, this passion
                    has sparked many projects and taken me to where I am today. I created this
                    website with the goal of sharing my journey through this fascinating world of
                    technology with anyone who shares my passion. If you're curious about developing
                    new skills, looking for a new project idea or just someone who enjoys a good
                    code snippet, you're in the right place!
                </p>
            </div>
            <div class="divider"></div>
            <div class="div-right">
                <h2>Reach out</h2>
                <p>
                    As both part of my studies and as a hobby I am always working on a new project
                    or improving an old one. I am always looking for new opportunites to put my
                    skills to use or answer questions you may have about one of the projects I
                    showcase on this website, so feel free to send me a message with the button
                    below!
                </p>
                <button class="button-fancy" @click="setOverlayContent('contact')">
                    Contact me!
                </button>
            </div>
        </div>
    </div>

    <div class="div-title">
        <h1>Spotlight Projects</h1>
    </div>

    <card-spotlight v-for="spotlight in spotlightData" :data="spotlight" />
</template>

<style scoped lang="scss">
.div-title {
    display: flex;
    justify-content: center;
    margin-bottom: 40px;
    h1 {
        border-bottom: var(--blue) solid 2px;
        position: relative;
        padding-bottom: 10px;

        &::before {
            content: "";
            position: absolute;
            width: 20px;
            height: 6px;
            background-color: var(--blue);
            border-radius: 4px 0 4px 4px;
            bottom: -6px;
            left: -4px;
        }

        &::after {
            content: "";
            position: absolute;
            width: 20px;
            height: 6px;
            background-color: var(--blue);
            border-radius: 0 4px 4px 4px;
            bottom: -6px;
            right: -4px;
        }
    }
}

.div-welcome {
    padding: 10%;
    height: calc(var(--view-height) - 24px);
    position: relative;

    @media (max-width: 600px) {
        padding: 20px 10%;
    }

    h1 {
        font-size: 80px;
        font-family: kode mono;
        margin-bottom: 10vh;
        margin-left: 20px;
    }

    .hello {
        margin-bottom: 5vh;
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
        width: 100%;
        justify-content: center;

        svg {
            font-size: 20px;
            margin: 10px 5px;
        }

        .left {
            transform: scaleX(-1);
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
        padding: 5% 10%;
        margin: 20px 0;
        height: calc(var(--view-height) - 64px);

        h1 {
            font-size: 40px;
            margin-left: 0;
            // margin-bottom: 80px;
        }

        h2 {
            font-size: 25px;
        }
    }
}

.div-about {
    height: var(--view-height);
    // height: 100vh;
    font-size: 20px;
    display: table-cell;
    vertical-align: middle;

    .div-about-content {
        display: flex;
        flex-direction: row;
        margin: 10%;

        .divider {
            background-color: var(--blue);
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
                background-color: var(--blue);
            }

            &::after {
                content: "";
                position: absolute;
                width: 300%;
                left: -200%;
                bottom: -10px;
                height: 20px;
                border-radius: 4px 0 4px 4px;
                background-color: var(--blue);
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
    }

    @media (max-width: 700px) {
        .div-about-content {
            flex-direction: column;
            font-size: 17px;
        }

        .div-left,
        .div-right {
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
