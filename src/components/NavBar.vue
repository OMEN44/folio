<script setup lang="ts">
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { faBars, faEnvelope, faUser } from "@fortawesome/free-solid-svg-icons";
import { faGithub, faLinkedin } from "@fortawesome/free-brands-svg-icons";
import { setOverlayContent } from "../scripts/overlay";
</script>

<template>
    <div class="div-nav-container">
        <div class="div-icon">
            <font-awesome-icon :icon="faBars" />
        </div>
        <div class="page-links">
            <router-link class="link" to="/home"><p>Home</p></router-link>
            <router-link class="link" to="/timeline"><p>Timeline</p></router-link>
            <router-link class="link" to="/notes"><p>Notes</p></router-link>
            <p>Other</p>
        </div>
        <div class="external-links">
            <font-awesome-icon :icon="faGithub" />
            <font-awesome-icon :icon="faLinkedin" />
            <font-awesome-icon :icon="faEnvelope" />
            <font-awesome-icon @click="setOverlayContent('login')" :icon="faUser" />
        </div>
    </div>
</template>

<style scoped lang="scss">
.link {
    text-decoration: none;
}

.div-nav-container {
    position: fixed;
    top: 0;
    right: 0;
    transition: all 0.5s ease-in-out;
    transition-delay: 1.5s;
    width: 62px;
    height: fit-content;
    margin: 10px;
    border: 2px var(--blue);
    border-style: none none solid solid;
    border-radius: 0 0 0 4px;
    background-color: var(--background);
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    z-index: 3;

    &:hover {
        width: 80%;
        transition-delay: 0s;
    }

    .div-icon {
        display: flex;

        svg {
            height: 30px;
            width: 30px;
            margin: 15px 15px;
        }
    }

    svg {
        transition: color 0.5s;

        &:hover {
            color: var(--blue);
        }
    }

    .page-links {
        margin: auto 20px;
        display: flex;
        flex-direction: row;

        p {
            margin: 0 20px;
            font-size: 25px;
            transition: color 0.3s;
            transition: transform 0.3s ease-in;
            cursor: pointer;

            &:hover {
                color: var(--blue);
                transform: translateY(-5px);
            }
        }
    }

    .external-links {
        margin: 10px 20px;
        display: flex;
        flex-direction: row;

        svg {
            cursor: pointer;
            height: 30px;
            width: 30px;
            margin: 0 10px;
            transition: transform 0.3s ease-in;

            &:hover {
                transform: translateY(-5px);
            }
        }
    }

    @media (max-width: 1000px) {
        flex-direction: column;
        width: 0;
        transition-delay: 0s;

        &:hover {
            width: 60%;

            .div-icon {
                right: calc(60% + 8px);
            }
        }

        .div-icon {
            position: fixed;
            right: 10px;
            border: var(--blue) 2px;
            border-style: none none solid solid;
            border-radius: 0 0 0 5px;
            background-color: var(--background);
            z-index: 4;
            transition: right 0.5s ease-in-out;

            &:hover {
                right: calc(60% + 8px);
            }
        }

        .page-links {
            margin: 15px;
        }

        .external-links {
            margin: 10px 0 15px 0;
        }
    }

    @media (max-width: 700px) {
        .page-links {
            flex-direction: column;
        }

        .external-links {
            margin: 10px auto 15px auto;
        }
    }
}
</style>
